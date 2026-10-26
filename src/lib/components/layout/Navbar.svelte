<script lang="ts">
  import { page } from '$app/state';
  import { ScrollArea } from '$lib/components/ui/scroll-area';

  let drawerOpen = $state(false);
  let scrollY = $state(0);

  // Background transparan saat di atas Hero slider, dan gelap ber-blur saat di-scroll
  let isScrolled = $derived(scrollY > 20);

  function openDrawer() {
    drawerOpen = true;
  }

  function closeDrawer() {
    drawerOpen = false;
  }

  // Kategori produk terurut berdasarkan mesin terbanyak di database
  const productCategories = [
    { title: 'Laser Cutting', desc: 'Akrilik, Kayu, MDF, ACP', href: '/produk/laser' },
    { title: 'Indoor Printing', desc: 'Sticker, Banner, Display', href: '/produk/indoor' },
    { title: 'UV Printing', desc: 'Flatbed & Cylinder', href: '/produk/uv' },
    { title: 'Sublimasi', desc: 'Textile & Fashion', href: '/produk/sublimasi' },
    { title: 'CNC Router', desc: 'Fabrikasi & Woodworking', href: '/produk/cnc' },
    { title: 'DTF', desc: 'Custom Apparel', href: '/produk/dtf' },
    { title: 'Outdoor Printing', desc: 'Spanduk, Baliho, Billboard', href: '/produk/outdoor' }
  ];

  const secondaryNavLinks = [
    { name: 'Discover ORIA', href: '/tentang' },
    { name: 'Katalog Semua Mesin', href: '/produk' },
    { name: 'Artikel & Wawasan', href: '/artikel' },
    { name: 'Kontak & Showroom', href: '/kontak' }
  ];

  let isTentang = $derived(page.url.pathname === '/tentang');
  let isProductDetail = $derived(
    page.url.pathname.startsWith('/produk/') &&
    page.url.pathname.split('/').filter(Boolean).length >= 3
  );
  let isArtikel = $derived(page.url.pathname.startsWith('/artikel'));
  let hasSubNav = $derived(isTentang || isProductDetail || isArtikel);

  const tentangSubNavItems = [
    { id: 'oria-story', label: 'STORY' },
    { id: 'our-legacy', label: 'LEGACY' },
    { id: 'our-machines', label: 'MACHINES' },
    { id: 'our-core', label: 'CORE' },
    { id: 'standar-rekayasa', label: 'ENGINEERING' },
    { id: 'kapasitas-layanan', label: 'CAPACITY' },
    { id: 'visi-dedikasi', label: 'DEDICATION' },
    { id: 'showroom', label: 'SHOWROOM' }
  ];

  const productSubNavItems = [
    { id: 'overview', label: 'OVERVIEW' },
    { id: 'story', label: 'STORY' },
    { id: 'spec', label: 'SPEC' }
  ];

  const artikelSubNavItems = [
    { id: 'digital-print', label: 'DIGITAL PRINT', href: '/artikel/digital-print' },
    { id: 'business', label: 'BUSINESS', href: '/artikel/business' },
    { id: 'insight', label: 'INSIGHT', href: '/artikel/insight' },
    { id: 'product', label: 'PRODUCT', href: '/artikel/product' },
    { id: 'trivia', label: 'TRIVIA', href: '/artikel/trivia' }
  ];

  let currentSubNavItems = $derived(
    isProductDetail ? productSubNavItems : isTentang ? tentangSubNavItems : []
  );

  let activeSection = $state('overview');

  function scrollToSection(id: string, e?: MouseEvent) {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      activeSection = id;
    }
  }

  $effect(() => {
    if (typeof window !== 'undefined' && hasSubNav && !isArtikel) {
      if (isProductDetail) {
        activeSection = 'overview';
      } else if (isTentang) {
        activeSection = 'oria-story';
      }

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) {
              activeSection = entry.target.id;
            }
          }
        },
        { rootMargin: '-20% 0px -60% 0px' }
      );

      for (const item of currentSubNavItems) {
        const el = document.getElementById(item.id);
        if (el) observer.observe(el);
      }

      return () => observer.disconnect();
    }
  });

  $effect(() => {
    if (typeof document !== 'undefined') {
      if (drawerOpen) {
        document.body.style.overflow = 'hidden';
      } else {
        document.body.style.overflow = '';
      }
    }
  });

  // Sinkronisasi posisi scroll dari ScrollArea layout utama
  $effect(() => {
    function onLayoutScroll(e: Event) {
      const ce = e as CustomEvent<{ scrollY: number }>;
      if (ce.detail && typeof ce.detail.scrollY === 'number') {
        scrollY = ce.detail.scrollY;
      }
    }
    if (typeof window !== 'undefined') {
      window.addEventListener('layout-scroll', onLayoutScroll);
      return () => {
        window.removeEventListener('layout-scroll', onLayoutScroll);
      };
    }
  });
</script>

<svelte:window
  bind:scrollY={scrollY}
  onkeydown={(e) => {
    if (e.key === 'Escape' && drawerOpen) closeDrawer();
  }}
/>

{#if hasSubNav}
  <!-- ================================================================= -->
  <!-- DUAL-ROW NAVBAR WITH SUBNAV (Tentang & Detail Produk)             -->
  <!-- ================================================================= -->
  <header
    class="w-full fixed top-0 left-0 z-40 overflow-hidden transition-colors duration-300 {isScrolled
      ? 'bg-black shadow-lg border-b border-white/10 pointer-events-auto'
      : 'bg-transparent border-b border-transparent pointer-events-none'}"
  >
    <!-- Hamburger Button (Fixed in Top Right, full size, optically leveled with menu) -->
    <div class="absolute top-0 right-0 z-50 h-14 sm:h-16 flex items-center justify-end px-6 sm:px-10 lg:px-16 pointer-events-auto">
      <button
        type="button"
        onclick={openDrawer}
        class="text-white p-2 hover:text-[#FFE500] focus:outline-none cursor-pointer transition-colors group flex items-center justify-center drop-shadow-md -translate-y-0.5 sm:-translate-y-1"
        aria-label="Buka Menu Navigasi"
      >
        <div class="flex flex-col items-end gap-1.5 w-6 sm:w-7">
          <span class="block w-full h-[2px] bg-white group-hover:bg-[#FFE500] transition-colors"></span>
          <span class="block w-4/5 h-[2px] bg-white group-hover:w-full group-hover:bg-[#FFE500] transition-all"></span>
          <span class="block w-full h-[2px] bg-white group-hover:bg-[#FFE500] transition-colors"></span>
        </div>
      </button>
    </div>

    <div class="w-full flex flex-col">
      <!-- ROW 1: Centered Logo Row (Smooth glide with exact negative margin, no max-height bouncing) -->
      <div
        class="w-full h-14 sm:h-16 transition-all duration-400 ease-[cubic-bezier(0.16,1,0.3,1)] flex items-center justify-center {isScrolled
          ? '-mt-14 sm:-mt-16 opacity-0 pointer-events-none'
          : 'mt-0 opacity-100 pointer-events-auto'}"
      >
        <a
          href="/"
          class="flex items-center justify-center hover:opacity-90 transition-opacity select-none focus:outline-none py-1 pointer-events-auto"
        >
          <img
            src="/images/oria-logo-hd.png"
            alt="Logo ORIA"
            class="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          />
        </a>
      </div>

      <!-- ROW 2: Subnav Row (Horizontally centered, transparent, no borders, no underline, yellow hover/active) -->
      <div
        class="w-full h-14 sm:h-16 transition-all duration-300 bg-transparent border-none flex items-center justify-center pointer-events-none"
      >
        <div class="w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 overflow-x-auto no-scrollbar flex items-center {isArtikel ? 'justify-start md:justify-center' : 'justify-center'} pointer-events-none">
          <nav
            aria-label={isProductDetail ? 'Navigasi Detail Produk' : isArtikel ? 'Navigasi Halaman Artikel' : 'Navigasi Halaman Tentang'}
            class="mx-auto flex items-center justify-center gap-6 sm:gap-8 md:gap-10 shrink-0 border-none pointer-events-auto"
          >
            {#if isArtikel}
              {#each artikelSubNavItems as item}
                {@const isActive = page.url.pathname.startsWith(item.href)}
                <a
                  href={item.href}
                  class="flex items-center text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-200 focus:outline-none border-none py-1 {isActive
                    ? 'text-[#FFE500] font-bold'
                    : 'text-white/75 hover:text-[#FFE500]'}"
                >
                  <span>{item.label}</span>
                </a>
              {/each}
            {:else}
              {#each currentSubNavItems as item}
                <a
                  href="#{item.id}"
                  onclick={(e) => scrollToSection(item.id, e)}
                  class="flex items-center text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-200 focus:outline-none border-none py-1 {activeSection === item.id
                    ? 'text-[#FFE500] font-bold'
                    : 'text-white/75 hover:text-[#FFE500]'}"
                >
                  <span>{item.label}</span>
                </a>
              {/each}
            {/if}
          </nav>
        </div>
      </div>
    </div>
  </header>
{:else}
  <!-- ================================================================= -->
  <!-- NORMAL PAGES NAVBAR (Homepage, Katalog, Artikel, Kontak, dll.)    -->
  <!-- 100% ORIGINAL: Tinggi, padding, logo, dan hamburger asli           -->
  <!-- ================================================================= -->
  <header
    class="w-full fixed top-0 left-0 z-40 transition-all duration-300 {isScrolled || (page.url.pathname !== '/' && !page.url.pathname.startsWith('/produk') && page.url.pathname !== '/kontak')
      ? 'bg-black/95 shadow-lg border-b border-white/10 py-3.5 sm:py-4'
      : 'bg-transparent border-b border-transparent py-4 sm:py-5'}"
  >
    <div class="relative w-full px-6 sm:px-10 lg:px-16 flex items-center justify-between">
      <!-- Left Spacer -->
      <div class="w-12 sm:w-16"></div>

      <!-- Centered Brand Logo (100% Persis di Tengah Layar Secara Mutlak) -->
      <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center pointer-events-auto">
        <a
          href="/"
          class="flex items-center justify-center hover:opacity-90 transition-opacity select-none py-1"
        >
          <img
            src="/images/oria-logo-hd.png"
            alt="Logo ORIA"
            class="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          />
        </a>
      </div>

      <!-- Right Hamburger Menu Button (Asli, sesuai desain awal) -->
      <div class="w-12 sm:w-16 flex items-center justify-end">
        <button
          type="button"
          onclick={openDrawer}
          class="text-white p-2.5 hover:text-[#FFE500] focus:outline-none cursor-pointer transition-colors group flex items-center justify-center drop-shadow-md"
          aria-label="Buka Menu Navigasi"
        >
          <div class="flex flex-col items-end gap-1.5 w-6 sm:w-7">
            <span class="block w-full h-[2px] bg-white group-hover:bg-[#FFE500] transition-colors"></span>
            <span class="block w-4/5 h-[2px] bg-white group-hover:w-full group-hover:bg-[#FFE500] transition-all"></span>
            <span class="block w-full h-[2px] bg-white group-hover:bg-[#FFE500] transition-colors"></span>
          </div>
        </button>
      </div>
    </div>
  </header>
{/if}

<!-- BACKDROP OVERLAY UNTUK DRAWER (Murni Gelap Transparan Tanpa Blur) -->
{#if drawerOpen}
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <!-- svelte-ignore a11y_click_events_have_key_events -->
  <div
    class="fixed inset-0 bg-black/50 z-50 transition-opacity duration-300 animate-in fade-in"
    onclick={closeDrawer}
    onwheel={(e) => e.preventDefault()}
    ontouchmove={(e) => e.preventDefault()}
  ></div>
{/if}

<!-- SLIDE-IN DRAWER DARI KANAN KE KIRI (Setengah layar, warna hitam solid, scrollbar shadcn-svelte) -->
<aside
  class="fixed top-0 right-0 h-full z-50 w-full sm:w-[85vw] md:w-[65vw] lg:w-[48vw] xl:w-[40vw] bg-[#09090b] text-white flex flex-col justify-between transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl border-l border-white/10 p-6 sm:p-10 lg:p-12 {drawerOpen ? 'translate-x-0' : 'translate-x-full'}"
  aria-label="Menu Navigasi Utama"
  aria-hidden={!drawerOpen}
>
  <!-- Drawer Top: Brand Logo oria-logo-hd.png & Close Button -->
  <div class="flex items-center justify-between pb-5 border-b border-white/10 flex-shrink-0">
    <a
      href="/"
      onclick={closeDrawer}
      class="flex items-center"
    >
      <img
        src="/images/oria-logo-hd.png"
        alt="Logo ORIA"
        class="h-6 sm:h-7 w-auto object-contain brightness-0 invert"
      />
    </a>

    <button
      type="button"
      onclick={closeDrawer}
      class="w-10 h-10 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-white/10 transition-colors cursor-pointer focus:outline-none"
      aria-label="Tutup Menu"
    >
      <svg class="w-6 h-6 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
    </button>
  </div>

  <!-- Drawer Middle Navigation dengan shadcn-svelte ScrollArea -->
  <div class="flex-1 my-4 overflow-hidden">
    <ScrollArea
      class="h-full w-full pr-3 sm:pr-4"
      scrollbarClass="bg-white/10"
      thumbClass="bg-white/30 hover:bg-white/50"
    >
      <div class="py-4 flex flex-col gap-3 sm:gap-4">
        <div class="font-sans font-bold text-[10px] uppercase tracking-[0.25em] text-[#FFE500] mb-1">
          Lini Mesin Industrial
        </div>

        {#each productCategories as cat}
          <a
            href={cat.href}
            onclick={closeDrawer}
            class="group flex items-center justify-between text-lg sm:text-2xl lg:text-[1.55rem] font-heading font-black uppercase tracking-[0.14em] text-white hover:text-[#FFE500] transition-colors py-1 sm:py-1.5"
          >
            <span class="group-hover:translate-x-1 transition-transform duration-300">{cat.title}</span>
            <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-transform duration-300 group-hover:translate-x-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        {/each}

        <!-- Divider -->
        <div class="h-px bg-white/10 my-4 sm:my-5"></div>

        <!-- Secondary Links (Discover ORIA, Artikel, Showroom) -->
        <div class="flex flex-col gap-2 sm:gap-2.5">
          {#each secondaryNavLinks as link}
            <a
              href={link.href}
              onclick={closeDrawer}
              class="group flex items-center justify-between text-xs sm:text-sm font-heading font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors py-1"
            >
              <span class="group-hover:translate-x-1 transition-transform duration-300">{link.name}</span>
              <svg class="w-3.5 h-3.5 stroke-current transition-transform duration-300 group-hover:translate-x-1 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </a>
          {/each}
        </div>
      </div>
    </ScrollArea>
  </div>

  <!-- Drawer Bottom: Showroom & WhatsApp Support -->
  <div class="border-t border-white/10 pt-5 flex flex-col gap-2.5 text-xs tracking-wider text-white/70 font-sans flex-shrink-0">
    <a
      href="/kontak"
      onclick={closeDrawer}
      class="flex items-center gap-2.5 text-white/80 hover:text-[#FFE500] transition-colors uppercase font-semibold"
    >
      <svg class="w-4 h-4 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
      </svg>
      <span>Showroom Surabaya & Jakarta</span>
    </a>

    <a
      href="https://wa.me/6281252086455"
      target="_blank"
      rel="noopener noreferrer"
      class="flex items-center gap-2.5 text-white/80 hover:text-[#FFE500] transition-colors uppercase font-semibold"
    >
      <svg class="w-4 h-4 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span>WhatsApp: +62 812-5208-6455</span>
    </a>
  </div>
</aside>
