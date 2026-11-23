/**
 * Centralized WhatsApp Lead Tracking Utility for ORIA (oria.co.id)
 * Records all WhatsApp click events to Google Sheets (sheet: Tracking_leads_web_oria) via /api/save-lead
 */

let lastTrackedTime = 0;
let lastTrackedHref = '';

export function trackWaClick(options: {
  href?: string;
  message?: string;
  location?: string;
  targetEl?: HTMLElement | null;
}) {
  if (typeof window === 'undefined') return;

  try {
    const now = Date.now();
    const href = options.href || '';

    // Prevent duplicate firing within 1.5 seconds for the same click
    if (href && href === lastTrackedHref && now - lastTrackedTime < 1500) {
      return;
    }
    lastTrackedTime = now;
    lastTrackedHref = href;

    let waMessage = options.message || '';

    if (!waMessage && href) {
      try {
        const u = new URL(href, window.location.origin);
        waMessage = u.searchParams.get('text') || '';
      } catch (_) {
        if (href.includes('text=')) {
          waMessage = decodeURIComponent(href.split('text=')[1].split('&')[0]);
        }
      }
    }

    const isAdsFlag =
      href.includes('#ads') ||
      waMessage.includes('#ads') ||
      (typeof localStorage !== 'undefined' && localStorage.getItem('from_google_ads') === 'true') ||
      window.location.pathname.includes('landing-ads');

    let buttonLocation = options.location || 'Tombol WA';
    if (!options.location && options.targetEl) {
      const el = options.targetEl;
      if (el.closest('[data-wa-location]')) {
        buttonLocation = el.closest('[data-wa-location]')!.getAttribute('data-wa-location') || 'Tombol WA';
      } else if (
        el.getAttribute('aria-label')?.includes('WhatsApp') ||
        el.closest('[aria-label*="WhatsApp"]') ||
        el.classList.contains('fixed')
      ) {
        buttonLocation = 'Floating WA Kanan Bawah';
      } else if (window.location.pathname.startsWith('/landing-ads')) {
        buttonLocation = 'Landing Ads Button';
      } else if (
        window.location.pathname.startsWith('/produk/') &&
        window.location.pathname.split('/').filter(Boolean).length >= 3
      ) {
        buttonLocation = 'Tombol Detail Produk';
      } else if (el.closest('footer')) {
        buttonLocation = 'Footer Website';
      } else if (el.closest('header')) {
        buttonLocation = 'Header Website';
      } else {
        buttonLocation = 'Halaman ' + window.location.pathname;
      }
    }

    const payload = {
      type: 'wa_click',
      sheet_name: 'Tracking_leads_web_oria',
      source_web: 'oria.co.id',
      page_url: window.location.pathname + window.location.search + window.location.hash,
      landing_page:
        (typeof sessionStorage !== 'undefined' && sessionStorage.getItem('initial_landing_page')) ||
        window.location.pathname,
      traffic_source:
        (typeof localStorage !== 'undefined' && localStorage.getItem('traffic_source')) ||
        (document.referrer && document.referrer.includes(window.location.host)
          ? 'Internal Navigation'
          : document.referrer || 'Direct'),
      is_ads: isAdsFlag,
      button_location: buttonLocation,
      wa_message: waMessage || '(Chat langsung tanpa pesan template)',
      gclid: (typeof localStorage !== 'undefined' && localStorage.getItem('ads_gclid')) || '-',
      device: /Mobi|Android|iPhone|iPad/i.test(navigator.userAgent) ? 'Mobile' : 'Desktop'
    };

    const jsonStr = JSON.stringify(payload);

    fetch('/api/save-lead', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: jsonStr,
      keepalive: true
    }).catch(() => {
      if (typeof navigator !== 'undefined' && navigator.sendBeacon) {
        const blob = new Blob([jsonStr], { type: 'application/json' });
        navigator.sendBeacon('/api/save-lead', blob);
      }
    });
  } catch (err) {
    console.error('Error logging WA lead:', err);
  }
}
