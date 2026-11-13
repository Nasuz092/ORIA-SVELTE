<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
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
  <div class="min-h-screen flex flex-col bg-[#050508] text-white font-sans relative">
    <Navbar />
    <main class="flex-1 w-full {page.url.pathname === '/' || page.url.pathname === '/tentang' || page.url.pathname.startsWith('/produk') || page.url.pathname.startsWith('/artikel') || page.url.pathname === '/kontak' || page.url.pathname === '/landing-ads' || (page.status && page.status >= 400) ? '' : 'pt-16 sm:pt-20'}">
      {@render children()}
    </main>
    <Footer />
  </div>
</ScrollArea>

