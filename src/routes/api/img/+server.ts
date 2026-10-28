import type { RequestHandler } from './$types';

const STRAPI_URL = (
  process.env.STRAPI_URL ||
  process.env.PUBLIC_STRAPI_URL ||
  (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_STRAPI_URL) ||
  'http://127.0.0.1:1338'
)
  .replace(/\/$/, '')
  .replace('localhost:1338', '127.0.0.1:1338');

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

export const GET: RequestHandler = async ({ url, fetch }) => {
  const imgPath = url.searchParams.get('url');

  if (!imgPath) {
    return new Response('Missing url parameter', { status: 400 });
  }

  // 1. Extract path and prevent arbitrary external URL proxying (Anti-SSRF)
  let cleanPath = imgPath;
  if (cleanPath.startsWith('http://') || cleanPath.startsWith('https://')) {
    try {
      const parsed = new URL(cleanPath);
      cleanPath = parsed.pathname + parsed.search;
    } catch {
      return new Response('Invalid URL format', { status: 400 });
    }
  }

  // 2. Ensure leading slash and reject path traversal
  if (!cleanPath.startsWith('/')) {
    cleanPath = '/' + cleanPath;
  }
  if (cleanPath.includes('..')) {
    return new Response('Path traversal prohibited', { status: 403 });
  }

  // 3. Construct URL targeting strictly the configured internal STRAPI_URL
  const fullUrl = `${STRAPI_URL}${cleanPath}`;

  try {
    const res = await fetch(fullUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 SvelteKit-Proxy',
        'Accept': 'image/*,*/*'
      }
    });

    if (!res.ok) {
      return new Response('Image not found', { status: 404 });
    }

    const contentType = (res.headers.get('content-type') || '').split(';')[0].trim().toLowerCase();

    // 4. Validate MIME Type to prevent serving non-image data (XSS/Payload defense)
    if (contentType && !ALLOWED_MIME_TYPES.has(contentType)) {
      return new Response('Invalid content type', { status: 415 });
    }

    const body = await res.arrayBuffer();

    return new Response(body, {
      status: 200,
      headers: {
        'Content-Type': contentType || 'image/webp',
        'Cache-Control': 'public, max-age=2592000, immutable', // 30 days
        'Vary': 'Accept'
      }
    });
  } catch {
    return new Response('Failed to fetch image', { status: 502 });
  }
};
