<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
  import PageTransition from '$lib/components/layout/PageTransition.svelte';
  import favicon from '$lib/assets/favicon.png';
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
  <link rel="icon" type="image/png" href={favicon} />
  <link rel="apple-touch-icon" href="/images/oria-logo-hd.png" />
</svelte:head>

<PageTransition />

<ScrollArea
  class="h-[100svh] w-full"
  viewportClass="h-full w-full"
  bind:viewportRef={viewportEl}
  onscroll={handleScroll}
>
  <div class="min-h-screen flex flex-col bg-[#050508] text-white font-sans relative">
    <Navbar />
    <main class="flex-1 w-full {page.url.pathname === '/' || page.url.pathname === '/tentang' || page.url.pathname.startsWith('/produk') || page.url.pathname.startsWith('/artikel') || page.url.pathname === '/kontak' || (page.status && page.status >= 400) ? '' : 'pt-16 sm:pt-20'}">
      {@render children()}
    </main>
    <Footer />
  </div>
</ScrollArea>

