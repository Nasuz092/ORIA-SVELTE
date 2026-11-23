import type { RequestHandler } from './$types';

const TARGET_SHEET_NAME = 'Tracking_leads_web_oria';

const leadIpMap = new Map<string, { count: number; resetAt: number }>();
const recentLeadsMap = new Map<string, number>();

interface GeoInfo {
  location: string;
  district: string;
  city: string;
  region: string;
  country: string;
  isp: string;
  isHosting: boolean;
  isProxy: boolean;
  isMobileNet: boolean;
  cachedAt: number;
}
const geoCache = new Map<string, GeoInfo>();

const BOT_UA_REGEX =
  /bot|crawler|spider|slurp|headless|puppeteer|playwright|selenium|phantomjs|curl|wget|python-requests|scrapy|ahrefs|semrush|mj12bot|dotbot|bytespider|gptbot|claudebot|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|facebookexternalhit|whatsapp|telegrambot|discordbot|bingpreview|yandex/i;

function detectBotUserAgent(request: Request): boolean {
  const ua = request.headers.get('user-agent') || '';
  if (!ua.trim()) return true;
  return BOT_UA_REGEX.test(ua);
}

function formatIspWithFlags(geo: GeoInfo, isBotUa: boolean): string {
  const flags: string[] = [];
  if (isBotUa) flags.push('BOT');
  if (geo.isHosting) flags.push('DATA CENTER/VPS');
  if (geo.isProxy) flags.push('VPN/PROXY');

  const baseIsp = geo.isp || '-';
  if (flags.length === 0) return baseIsp;
  return `${baseIsp} [${flags.join(' | ')}]`;
}

function getRealClientIp(request: Request, getClientAddress?: () => string): string {
  const cfIp = request.headers.get('cf-connecting-ip');
  if (cfIp) return cfIp.trim();

  const xRealIp = request.headers.get('x-real-ip');
  if (xRealIp) return xRealIp.trim();

  const xff = request.headers.get('x-forwarded-for');
  if (xff) {
    const firstIp = xff.split(',')[0]?.trim();
    if (firstIp) return firstIp;
  }

  return getClientAddress ? getClientAddress() : 'unknown';
}

function isPrivateIp(ip: string): boolean {
  return (
    !ip ||
    ip === 'unknown' ||
    ip === '127.0.0.1' ||
    ip === '::1' ||
    ip.startsWith('10.') ||
    ip.startsWith('192.168.') ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(ip)
  );
}

async function resolveGeoLocation(ip: string, request: Request): Promise<GeoInfo> {
  const now = Date.now();
  const cached = geoCache.get(ip);
  if (cached && now - cached.cachedAt < 24 * 60 * 60 * 1000) {
    return cached;
  }

  const cfCity = request.headers.get('cf-ipcity') || '';
  const cfRegion = request.headers.get('cf-region') || '';
  const cfCountry = request.headers.get('cf-ipcountry') || '';

  let district = '';
  let city = cfCity;
  let region = cfRegion;
  let country = cfCountry;
  let isp = '';
  let isHosting = false;
  let isProxy = false;
  let isMobileNet = false;

  if (!isPrivateIp(ip)) {
    try {
      const geoRes = await fetch(
        `http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,regionName,city,district,isp,proxy,hosting,mobile`,
        { signal: AbortSignal.timeout(1800) }
      );
      if (geoRes.ok) {
        const g = await geoRes.json();
        if (g && g.status === 'success') {
          district = g.district || '';
          city = g.city || city;
          region = g.regionName || region;
          country = g.countryCode || g.country || country;
          isp = g.isp || '';
          isHosting = !!g.hosting;
          isProxy = !!g.proxy;
          isMobileNet = !!g.mobile;
        }
      }
    } catch {
      // Silently fallback to Cloudflare headers
    }
  }

  const parts = [district, city, region].filter(Boolean);
  const baseLocation = parts.length > 0 ? parts.join(', ') : 'Tidak Diketahui';
  const location = country ? `${baseLocation} (${country})` : baseLocation;

  const info: GeoInfo = {
    location,
    district: district || '-',
    city: city || '-',
    region: region || '-',
    country: country || '-',
    isp: isp || '-',
    isHosting,
    isProxy,
    isMobileNet,
    cachedAt: now
  };

  if (geoCache.size > 2000) {
    const firstKey = geoCache.keys().next().value;
    if (firstKey) geoCache.delete(firstKey);
  }
  geoCache.set(ip, info);

  return info;
}

function isDuplicate(key: string, ttlMs: number): boolean {
  const now = Date.now();
  for (const [k, timestamp] of recentLeadsMap.entries()) {
    if (now - timestamp > ttlMs) {
      recentLeadsMap.delete(k);
    }
  }
  if (recentLeadsMap.has(key)) {
    return true;
  }
  recentLeadsMap.set(key, now);
  return false;
}

export const POST: RequestHandler = async ({ request, getClientAddress }) => {
  try {
    const clientIp = getRealClientIp(request, getClientAddress);
    const now = Date.now();
    const data = await request.json();

    const isWaClick = data.type === 'wa_click';
    const limit = isWaClick ? 30 : 5;

    const ipData = leadIpMap.get(clientIp);
    if (ipData) {
      if (now < ipData.resetAt) {
        if (ipData.count >= limit) {
          return new Response(
            JSON.stringify({ error: 'Terlalu banyak permintaan. Silakan coba lagi beberapa saat lagi.' }),
            { status: 429, headers: { 'Content-Type': 'application/json' } }
          );
        }
        ipData.count += 1;
      } else {
        leadIpMap.set(clientIp, { count: 1, resetAt: now + 10 * 60 * 1000 });
      }
    } else {
      leadIpMap.set(clientIp, { count: 1, resetAt: now + 10 * 60 * 1000 });
    }

    const scriptUrl = process.env.GOOGLE_SCRIPT_URL;
    if (!scriptUrl) {
      console.error('Missing GOOGLE_SCRIPT_URL environment variable.');
      return new Response(
        JSON.stringify({ error: 'Konfigurasi Google Sheets API belum diset di server.' }),
        { status: 500, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const sheetName = data.sheet_name || TARGET_SHEET_NAME;

    if (isWaClick) {
      const waKey = `wa_${clientIp}_${data.button_location || ''}_${data.wa_message || ''}`;
      if (isDuplicate(waKey, 15 * 1000)) {
        return new Response(JSON.stringify({ success: true, duplicate: true }), {
          status: 200,
          headers: { 'Content-Type': 'application/json' }
        });
      }

      const geo = await resolveGeoLocation(clientIp, request);
      const isBotUa = detectBotUserAgent(request);
      const ispLabel = formatIspWithFlags(geo, isBotUa);

      const response = await fetch(scriptUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: 'wa_click',
          sheet_name: sheetName,
          sheetName,
          source_web: 'oria.co.id',
          page_url: data.page_url || '-',
          landing_page: data.landing_page || '-',
          traffic_source: data.traffic_source || 'Direct',
          is_ads: !!data.is_ads,
          button_location: data.button_location || 'Tombol WA',
          wa_message: data.wa_message || '-',
          gclid: data.gclid || '-',
          device: data.device || 'Mobile',
          location: geo.location,
          district: geo.district,
          city: geo.city,
          region: geo.region,
          isp: ispLabel,
          ip_address: clientIp,
          is_bot: isBotUa,
          is_hosting: geo.isHosting,
          is_proxy: geo.isProxy
        })
      });

      if (!response.ok) {
        const errText = await response.text();
        console.error('Failed to log WA lead to Google Sheets:', errText);
      }

      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const { name, phone, email, product, message, website } = data;
    if (website && website.trim() !== '') {
      return new Response(JSON.stringify({ success: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!name || !phone || !message) {
      return new Response(JSON.stringify({ error: 'Nama, nomor HP, dan pesan wajib diisi.' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const cleanPhone = (phone || '').replace(/\D/g, '');
    const cleanMsg = (message || '').trim().toLowerCase();
    const cleanProd = (product || '').trim().toLowerCase();
    const formKey = `lead_${cleanPhone}_${cleanProd}_${cleanMsg}`;
    if (isDuplicate(formKey, 5 * 60 * 1000)) {
      return new Response(JSON.stringify({ success: true, duplicate: true }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const geo = await resolveGeoLocation(clientIp, request);
    const isBotUa = detectBotUserAgent(request);
    const ispLabel = formatIspWithFlags(geo, isBotUa);

    const response = await fetch(scriptUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        sheet_name: sheetName,
        sheetName,
        source_web: 'oria.co.id',
        name,
        phone,
        email: email || '-',
        product: product || '-',
        message,
        location: geo.location,
        district: geo.district,
        city: geo.city,
        region: geo.region,
        isp: ispLabel,
        ip_address: clientIp,
        is_bot: isBotUa,
        is_hosting: geo.isHosting,
        is_proxy: geo.isProxy
      })
    });

    if (!response.ok) {
      const errText = await response.text();
      console.error('Failed to save to Google Sheet via Apps Script:', errText);
      return new Response(JSON.stringify({ error: 'Gagal mengirim data ke Google Sheets.' }), {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error: any) {
    console.error('Error in save-lead API:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};
