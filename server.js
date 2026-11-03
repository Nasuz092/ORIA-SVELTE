import fs from 'fs';
import path from 'path';
import http from 'http';
import https from 'https';
import { fileURLToPath, pathToFileURL } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure 'logs' directory exists
const logDir = path.join(__dirname, 'logs');
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir, { recursive: true });
}

// Automatically copy php files and .htaccess from static to root if present
const staticDir = path.join(__dirname, 'static');
try {
  if (fs.existsSync(staticDir)) {
    const files = fs.readdirSync(staticDir);
    files.forEach(file => {
      if (file.endsWith('.php') || file === '.htaccess') {
        const sourcePath = path.join(staticDir, file);
        const destPath = path.join(__dirname, file);
        fs.copyFileSync(sourcePath, destPath);
      }
    });
  }
} catch (err) {
  console.error('Failed to auto-copy php/htaccess files to root:', err);
}

// Open log file stream (append mode)
const logStream = fs.createWriteStream(path.join(logDir, 'sveltekit.log'), { flags: 'a' });

// Store original write functions
const originalStdoutWrite = process.stdout.write;
const originalStderrWrite = process.stderr.write;

// Redirect stdout
process.stdout.write = function (chunk, _encoding, _callback) {
  const text = chunk.toString();
  logStream.write(`[INFO] [${new Date().toISOString()}] ${text}`);
  return originalStdoutWrite.apply(process.stdout, arguments);
};

// Redirect stderr
process.stderr.write = function (chunk, _encoding, _callback) {
  const text = chunk.toString();
  logStream.write(`[ERROR] [${new Date().toISOString()}] ${text}`);
  return originalStderrWrite.apply(process.stderr, arguments);
};

// Load .env file manually if it exists
const dotenvPath = path.join(__dirname, '.env');
if (fs.existsSync(dotenvPath)) {
  const dotenvContent = fs.readFileSync(dotenvPath, 'utf8');
  dotenvContent.split('\n').forEach(line => {
    const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?[\s]*$/);
    if (match) {
      const key = match[1];
      let value = match[2] || '';
      if (value.startsWith('"') && value.endsWith('"')) {
        value = value.substring(1, value.length - 1);
      } else if (value.startsWith("'") && value.endsWith("'")) {
        value = value.substring(1, value.length - 1);
      }
      if (!process.env[key]) {
        process.env[key] = value.trim();
      }
    }
  });
}

const STRAPI_URL = (process.env.STRAPI_URL || '').replace(/\/$/, '');
const LOCAL_BASE_DIRS = [
  path.join(__dirname, 'static'),
  '/home/mesinpri/domains/cms.oria.co.id/public_html/public',
  '/home/mesinpri/domains/cms.oria.com/public_html/public',
  '/home/markomas/domains/cms.oria.co.id/public_html/public',
  path.resolve(process.env.HOME || '/home', 'domains/cms.oria.co.id/public_html/public'),
  path.resolve(__dirname, '../cms.oria.co.id/public_html/public'),
  path.resolve(__dirname, '../../cms.oria.co.id/public_html/public'),
  path.resolve(__dirname, '../oria.com-Strapi/public')
];

const MIME_BY_EXT = {
  '.webp': 'image/webp',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.avif': 'image/avif',
  '.ico': 'image/x-icon'
};

const ALLOWED_MIME_TYPES = new Set([
  'image/jpeg',
  'image/jpg',
  'image/png',
  'image/webp',
  'image/gif',
  'image/svg+xml',
  'image/avif',
  'image/x-icon'
]);

// Persistent Keep-Alive connection pools to Strapi backend to prevent socket exhaustion
const httpAgent = new http.Agent({ keepAlive: true, maxSockets: 64, maxFreeSockets: 16, timeout: 15000 });
const httpsAgent = new https.Agent({ keepAlive: true, maxSockets: 64, maxFreeSockets: 16, timeout: 15000 });

// Fast In-Memory Image Cache (up to 50MB) for frequent images
const imgCache = new Map();
let currentCacheBytes = 0;
const MAX_CACHE_BYTES = 50 * 1024 * 1024; // 50 MB
const CACHE_TTL_MS = 60 * 60 * 1000; // 1 hour

/**
 * Image proxy handler — intercepts /api/img?url=... requests.
 * Fetches the image from Strapi server-side so the CMS domain never reaches the browser.
 */
function handleImageProxy(req, res) {
  try {
    const reqUrl = new URL(req.url, 'http://localhost');
    const imgPath = reqUrl.searchParams.get('url');

    if (!imgPath) {
      res.writeHead(400, { 'Content-Type': 'text/plain' });
      res.end('Missing url parameter');
      return;
    }

    // 1. Extract path and prevent arbitrary external URL proxying (Anti-SSRF)
    let cleanPath = imgPath;
    if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
      try {
        const parsed = new URL(cleanPath);
        cleanPath = parsed.pathname + parsed.search;
      } catch {
        res.writeHead(400, { 'Content-Type': 'text/plain' });
        res.end('Invalid URL format');
        return;
      }
    }

    // 2. Ensure leading slash and reject path traversal
    if (!cleanPath.startsWith('/')) {
      cleanPath = '/' + cleanPath;
    }
    if (cleanPath.includes('..')) {
      res.writeHead(403, { 'Content-Type': 'text/plain' });
      res.end('Path traversal prohibited');
      return;
    }

    // Direct Local SSD Bypass for uploads (Ultra-fast 0ms latency, zero socket overload)
    if (cleanPath.startsWith('/uploads/')) {
      const pathnameOnly = cleanPath.split('?')[0];
      const ext = path.extname(pathnameOnly).toLowerCase();
      const candidateFiles = [
        pathnameOnly,
        pathnameOnly.replace(/^\/+/, '')
      ];
      if (ext === '.png' || ext === '.jpg' || ext === '.jpeg') {
        candidateFiles.unshift(pathnameOnly.replace(/\.(png|jpe?g)$/i, '.webp'));
        candidateFiles.unshift(pathnameOnly.replace(/^\/+/, '').replace(/\.(png|jpe?g)$/i, '.webp'));
      }

      for (const baseDir of LOCAL_BASE_DIRS) {
        for (const cand of candidateFiles) {
          const fullLocalPath = path.join(baseDir, cand);
          try {
            if (fs.existsSync(fullLocalPath) && fs.statSync(fullLocalPath).isFile()) {
              const candExt = path.extname(fullLocalPath).toLowerCase();
              const contentType = MIME_BY_EXT[candExt] || 'image/webp';
              res.writeHead(200, {
                'Content-Type': contentType,
                'Cache-Control': 'public, max-age=31536000, immutable',
                'Vary': 'Accept',
                'X-Content-Type-Options': 'nosniff'
              });
              fs.createReadStream(fullLocalPath).pipe(res);
              return;
            }
          } catch {
            // Fall through to next candidate
          }
        }
      }
    }

    if (!STRAPI_URL) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('STRAPI_URL not configured');
      return;
    }

    // 3. Check In-Memory Cache first (instant <1ms response, 0 backend calls)
    const cached = imgCache.get(cleanPath);
    if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
      res.writeHead(200, {
        'Content-Type': cached.contentType,
        'Content-Length': cached.buffer.length,
        'Cache-Control': 'public, max-age=2592000, immutable',
        'X-Proxy-Cache': 'HIT',
        'Vary': 'Accept'
      });
      res.end(cached.buffer);
      return;
    }

    const fullUrl = `${STRAPI_URL}${cleanPath}`;
    const parsed = new URL(fullUrl);
    const client = parsed.protocol === 'https:' ? https : http;
    const agent = parsed.protocol === 'https:' ? httpsAgent : httpAgent;

    const proxyReq = client.get(fullUrl, {
      agent,
      headers: {
        'User-Agent': 'Mozilla/5.0 SvelteKit-Proxy',
        'Accept': 'image/*,*/*'
      },
      timeout: 10000
    }, (proxyRes) => {
      if (proxyRes.statusCode !== 200) {
        res.writeHead(proxyRes.statusCode || 502, { 'Content-Type': 'text/plain' });
        res.end('Image not found');
        return;
      }

      const rawType = (proxyRes.headers['content-type'] || '').split(';')[0].trim().toLowerCase();
      if (rawType && !ALLOWED_MIME_TYPES.has(rawType)) {
        res.writeHead(415, { 'Content-Type': 'text/plain' });
        res.end('Invalid content type');
        return;
      }

      const contentType = rawType || 'image/webp';
      const chunks = [];

      proxyRes.on('data', (chunk) => {
        chunks.push(chunk);
      });

      proxyRes.on('end', () => {
        const buffer = Buffer.concat(chunks);

        // Cache image if within memory limits
        if (buffer.length < 5 * 1024 * 1024 && (currentCacheBytes + buffer.length <= MAX_CACHE_BYTES)) {
          imgCache.set(cleanPath, {
            buffer,
            contentType,
            timestamp: Date.now()
          });
          currentCacheBytes += buffer.length;
        }

        if (!res.headersSent) {
          res.writeHead(200, {
            'Content-Type': contentType,
            'Content-Length': buffer.length,
            'Cache-Control': 'public, max-age=2592000, immutable',
            'X-Proxy-Cache': 'MISS',
            'Vary': 'Accept'
          });
          res.end(buffer);
        }
      });
    });

    // Handle timeout explicitly so socket never hangs into "Connection Timeout"
    proxyReq.on('timeout', () => {
      proxyReq.destroy();
      if (!res.headersSent) {
        res.writeHead(504, { 'Content-Type': 'text/plain' });
        res.end('Gateway Timeout');
      }
    });

    proxyReq.on('error', (err) => {
      console.error('[img-proxy] fetch error:', err.message);
      if (!res.headersSent) {
        res.writeHead(502, { 'Content-Type': 'text/plain' });
        res.end('Failed to fetch image');
      }
    });
  } catch (err) {
    console.error('[img-proxy] error:', err.message);
    if (!res.headersSent) {
      res.writeHead(500, { 'Content-Type': 'text/plain' });
      res.end('Internal error');
    }
  }
}

const handlerPath = path.join(__dirname, 'build', 'handler.js');

// Start SvelteKit Server using handler.js
import(pathToFileURL(handlerPath).href)
  .then(({ handler }) => {
    const rawPort = process.env.PORT || '3000';
    const socketPath = process.env.SOCKET_PATH;
    const HOST = process.env.HOST || '0.0.0.0';

    const server = http.createServer((req, res) => {
      // Set global defensive security headers
      res.setHeader('X-Frame-Options', 'SAMEORIGIN');
      res.setHeader('X-Content-Type-Options', 'nosniff');
      res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
      res.setHeader(
        'Content-Security-Policy',
        "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';"
      );
      res.setHeader(
        'Permissions-Policy',
        'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
      );
      res.setHeader(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains; preload'
      );

      // Intercept /api/img proxy requests before SvelteKit handles them
      if (req.url && (req.url.startsWith('/api/img') || req.url.startsWith('/uploads/'))) {
        handleImageProxy(req, res);
        return;
      }
      // Pass everything else to SvelteKit
      handler(req, res);
    });

    if (socketPath) {
      server.listen(socketPath, () => {
        console.log(`[server] Listening on socket: ${socketPath}`);
      });
    } else if (isNaN(Number(rawPort))) {
      // Socket string passed by Phusion Passenger in process.env.PORT
      server.listen(rawPort, () => {
        console.log(`[server] Listening on socket: ${rawPort}`);
      });
    } else {
      const PORT = Number(rawPort);
      server.listen(PORT, HOST, () => {
        console.log(`[server] Listening on http://${HOST}:${PORT}`);
      });
    }

    server.on('error', (err) => {
      console.error('[server] Error:', err);
    });
  })
  .catch(err => {
    console.error('Failed to start SvelteKit server:', err);
    process.exit(1);
  });

