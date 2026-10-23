<script lang="ts">
  import '../app.css';
  import { page } from '$app/state';
  import Navbar from '$lib/components/layout/Navbar.svelte';
  import Footer from '$lib/components/layout/Footer.svelte';
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

<ScrollArea
  class="h-[100svh] w-full"
  viewportClass="h-full w-full"
  bind:viewportRef={viewportEl}
  onscroll={handleScroll}
>
  <div class="min-h-screen flex flex-col bg-white text-black font-sans relative">
    <Navbar />
    <main class="flex-1 w-full bg-white text-black {page.url.pathname === '/' || page.url.pathname === '/tentang' ? '' : 'pt-16 sm:pt-20'}">
      {@render children()}
    </main>
    <Footer />
  </div>
</ScrollArea>

