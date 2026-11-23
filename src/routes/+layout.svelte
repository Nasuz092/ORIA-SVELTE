<script lang="ts">
  import '../app.css';
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import FloatingWhatsApp from '$lib/components/layout/FloatingWhatsApp.svelte';
  import PageTransition from '$lib/components/layout/PageTransition.svelte';
  import { ScrollArea } from '$lib/components/ui/scroll-area';

  let { children } = $props();
  let viewportEl = $state<HTMLElement | null>(null);

  // Reset scroll ke atas saat berpindah rute/halaman
  $effect(() => {
    const _path = page.url.pathname;
    if (viewportEl) {
      viewportEl.scrollTo({ top: 0, behavior: 'instant' });
    }
  });

  function handleScroll(e: Event) {
    const target = e.target as HTMLElement;
    if (target && typeof window !== 'undefined') {
      window.dispatchEvent(
        new CustomEvent('layout-scroll', { detail: { scrollY: target.scrollTop } })
      );
    }
  }

  const ADS_CONVERSION_SEND_TO = 'AW-18574322246/fJMtCPLPlrgdEMbU9phF';

  onMount(() => {
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const isAds =
        urlParams.has('gclid') ||
        urlParams.has('gbraid') ||
        urlParams.has('wbraid') ||
        (urlParams.get('utm_source') === 'google' && urlParams.get('utm_medium') === 'cpc') ||
        (window.document.referrer &&
          window.document.referrer.includes('googleads.g.doubleclick.net')) ||
        window.location.pathname.startsWith('/landing-ads');

      if (isAds) {
        localStorage.setItem('from_google_ads', 'true');
        localStorage.setItem('traffic_source', 'Google Ads (CPC)');
        const gclid = urlParams.get('gclid') || urlParams.get('gbraid') || urlParams.get('wbraid');
        if (gclid) localStorage.setItem('ads_gclid', gclid);
      }
    } catch (_) {}

    function appendAdsParam(urlStr: string): string {
      if (!urlStr) return urlStr;
      if (urlStr.includes('wa.me') || urlStr.includes('api.whatsapp.com')) {
        try {
          if (localStorage.getItem('from_google_ads') === 'true') {
            const u = new URL(urlStr);
            const text = u.searchParams.get('text') || '';
            if (text && !text.trim().endsWith('#ads')) {
              u.searchParams.set('text', `${text.trim()} #ads`);
              return u.toString();
            } else if (!text) {
              u.searchParams.set('text', '#ads');
              return u.toString();
            }
          }
        } catch (_) {}
      }
      return urlStr;
    }

    const handleLeadClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement | null)?.closest('a');
      if (!target) return;
      const href = target.getAttribute('href') || '';

      if (href.includes('wa.me') || href.includes('api.whatsapp.com')) {
        const isShareButton =
          Boolean(target.closest('[aria-label*="Bagikan"]')) ||
          Boolean(target.closest('[aria-label*="Share"]')) ||
          (href.includes('api.whatsapp.com/send?text=') && !href.includes('phone='));

        if (isShareButton) {
          const w = window as any;
          w.dataLayer = w.dataLayer || [];
          w.dataLayer.push({
            event: 'share',
            method: 'WhatsApp',
            content_type: 'article',
            item_id: page.url.pathname
          });
          return;
        }

        const modifiedHref = appendAdsParam(href);
        if (modifiedHref !== href) {
          target.setAttribute('href', modifiedHref);
        }

        const w = window as any;
        w.dataLayer = w.dataLayer || [];

        const isFloating =
          target.getAttribute('aria-label')?.includes('WhatsApp') || target.classList.contains('fixed');
        const isProductPage = page.url.pathname.split('/').filter(Boolean).length >= 3 && page.url.pathname.startsWith('/produk/');

        if (isFloating) {
          w.dataLayer.push({ event: 'Floating WA Click' });
          w.dataLayer.push({ event: 'floating_wa_click' });
        } else if (isProductPage) {
          w.dataLayer.push({ event: 'Product WA Click' });
          w.dataLayer.push({ event: 'product_wa_click' });
        } else {
          w.dataLayer.push({ event: 'Contact Form Lead' });
          w.dataLayer.push({ event: 'contact_form_lead' });
        }

        w.dataLayer.push({ event: 'generate_lead', lead_source: 'WhatsApp' });
        w.dataLayer.push({ event: 'whatsapp_lead', lead_source: 'WhatsApp' });

        if (typeof w.gtag === 'function') {
          w.gtag('event', 'whatsapp_lead', {
            event_category: 'engagement',
            event_label: modifiedHref,
            value: 1.0,
            currency: 'IDR',
            transport: 'beacon'
          });
          w.gtag('event', 'generate_lead', {
            event_category: 'engagement',
            event_label: modifiedHref,
            value: 1.0,
            currency: 'IDR',
            transport: 'beacon'
          });
          w.gtag('event', 'conversion', {
            send_to: ADS_CONVERSION_SEND_TO,
            value: 1.0,
            currency: 'IDR',
            transport: 'beacon'
          });
        }
      }

      if (href.startsWith('tel:')) {
        const w = window as any;
        w.dataLayer = w.dataLayer || [];
        w.dataLayer.push({ event: 'phone_call' });
        if (typeof w.gtag === 'function') {
          w.gtag('event', 'conversion', {
            send_to: ADS_CONVERSION_SEND_TO,
            value: 1.0,
            currency: 'IDR',
            transport: 'beacon'
          });
        }
      }
    };

    document.addEventListener('click', handleLeadClick, { passive: true });
    return () => {
      document.removeEventListener('click', handleLeadClick);
    };
  });
</script>

<svelte:head>
  <link rel="icon" href="/favicon.ico" sizes="any" />
  <link rel="icon" type="image/png" sizes="48x48" href="/favicon-48x48.png" />
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />
  <link rel="icon" type="image/png" sizes="192x192" href="/favicon-192x192.png" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
</svelte:head>

<PageTransition />

<ScrollArea
  class="h-[100svh] w-full"
  viewportClass="h-full w-full scroll-smooth"
  bind:viewportRef={viewportEl}
  onscroll={handleScroll}
>
  <div class="min-h-screen flex flex-col bg-white text-black font-sans relative">
    <Navbar />
    <main class="flex-1 w-full {page.url.pathname === '/' || page.url.pathname === '/tentang' || page.url.pathname.startsWith('/produk') || page.url.pathname.startsWith('/artikel') || page.url.pathname === '/kontak' || page.url.pathname === '/landing-ads' || (page.status && page.status >= 400) ? '' : 'pt-16 sm:pt-20'}">
      {@render children()}
    </main>
    <Footer />
  </div>
</ScrollArea>

<FloatingWhatsApp />

