<script lang="ts">
  import { onMount } from 'svelte';
  import { page } from '$app/state';
  import { ScrollArea } from '$lib/components/ui/scroll-area';

  interface LanguageOption {
    code: string;
    label: string;
    shortLabel: string;
    flag: string;
  }

  const languages: LanguageOption[] = [
    { code: 'id', label: 'Indonesia (ID)', shortLabel: 'ID', flag: '🇮🇩' },
    { code: 'en', label: 'English (EN)', shortLabel: 'EN', flag: '🇬🇧' },
    { code: 'zh-CN', label: 'Chinese (ZH)', shortLabel: 'ZH', flag: '🇨🇳' },
    { code: 'ja', label: 'Japanese (JA)', shortLabel: 'JA', flag: '🇯🇵' },
    { code: 'ar', label: 'Arabic (AR)', shortLabel: 'AR', flag: '🇸🇦' }
  ];

  let isLangOpen = $state(false);
  let selectedLang = $state('Indonesia (ID)');
  let selectedShort = $state('ID');
  let selectedCode = $state('id');

  function toggleLang() {
    isLangOpen = !isLangOpen;
  }

  function closeLang() {
    isLangOpen = false;
  }

  function changeLanguage(lang: LanguageOption) {
    selectedLang = lang.label;
    selectedShort = lang.shortLabel;
    selectedCode = lang.code;
    isLangOpen = false;

    if (typeof window === 'undefined') return;

    const host = window.location.hostname;
    if (lang.code === 'id') {
      const expire = 'expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
      document.cookie = `googtrans=; ${expire}`;
      document.cookie = `googtrans=; ${expire} domain=${host};`;
      document.cookie = `googtrans=; ${expire} domain=.${host};`;
      if (!/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
        const rootDomain = host.replace(/^www\./, '');
        document.cookie = `googtrans=; ${expire} domain=.${rootDomain};`;
      }
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = '';
        select.dispatchEvent(new Event('change'));
      }
      window.dispatchEvent(new CustomEvent('language-change', { detail: 'id' }));
      window.location.reload();
      return;
    } else {
      document.cookie = `googtrans=/id/${lang.code}; path=/;`;
      document.cookie = `googtrans=/id/${lang.code}; path=/; domain=${host};`;
      if (!/^\d+\.\d+\.\d+\.\d+$/.test(host)) {
        document.cookie = `googtrans=/id/${lang.code}; path=/; domain=.${host.replace(/^www\./, '')};`;
      }
      const select = document.querySelector<HTMLSelectElement>('.goog-te-combo');
      if (select) {
        select.value = lang.code;
        select.dispatchEvent(new Event('change'));
      } else {
        window.location.reload();
      }
    }
    window.dispatchEvent(new CustomEvent('language-change', { detail: lang.code }));
  }

  onMount(() => {
    if (typeof document !== 'undefined') {
      const match = document.cookie.match(/googtrans=\/id\/([a-zA-Z-]+)/);
      if (match && match[1]) {
        const found = languages.find((l) => l.code === match[1]);
        if (found) {
          selectedLang = found.label;
          selectedShort = found.shortLabel;
          selectedCode = found.code;
        }
      }

      function onGlobalLang(e: Event) {
        const ce = e as CustomEvent<string>;
        if (ce.detail) {
          const found = languages.find((l) => l.code === ce.detail);
          if (found) {
            selectedLang = found.label;
            selectedShort = found.shortLabel;
            selectedCode = found.code;
          }
        }
      }
      window.addEventListener('language-change', onGlobalLang);
      return () => {
        window.removeEventListener('language-change', onGlobalLang);
      };
    }
  });

  let drawerOpen = $state(false);
  let scrollY = $state(0);

  // Background solid hitam untuk halaman dengan latar terang (Detail Artikel, Legal) atau saat di-scroll
  let isLightTopPage = $derived(
    page.data?.mode === 'article' ||
    Boolean(page.data?.article) ||
    page.url.pathname.startsWith('/cookie-statement') ||
    page.url.pathname.startsWith('/privacy') ||
    page.url.pathname.startsWith('/terms-conditions')
  );
  let isScrolled = $derived(scrollY > 20 || isLightTopPage);

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
  let isArticleDetail = $derived(
    page.data?.mode === 'article' || Boolean(page.data?.article)
  );
  let isArtikelCategory = $derived(
    page.url.pathname.startsWith('/artikel/') &&
    page.url.pathname.replace(/\/+$/, '') !== '/artikel' &&
    !isArticleDetail
  );
  let hasSubNav = $derived(isTentang || isProductDetail || isArtikelCategory);

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

  let currentProductSubNavItems = $derived.by(() => {
    const hasGallery = Boolean(page.data?.product?.galleryUrls && page.data.product.galleryUrls.length > 0);
    if (hasGallery) {
      return [
        { id: 'overview', label: 'OVERVIEW' },
        { id: 'story', label: 'STORY' },
        { id: 'gallery', label: 'GALLERY' },
        { id: 'spec', label: 'SPEC' }
      ];
    }
    return [
      { id: 'overview', label: 'OVERVIEW' },
      { id: 'story', label: 'STORY' },
      { id: 'spec', label: 'SPEC' }
    ];
  });

  const artikelSubNavItems = [
    { id: 'digital-print', label: 'DIGITAL PRINT', href: '/artikel/digital-print' },
    { id: 'business', label: 'BUSINESS', href: '/artikel/business' },
    { id: 'insight', label: 'INSIGHT', href: '/artikel/insight' },
    { id: 'product', label: 'PRODUCT', href: '/artikel/product' },
    { id: 'trivia', label: 'TRIVIA', href: '/artikel/trivia' }
  ];

  let currentSubNavItems = $derived(
    isProductDetail ? currentProductSubNavItems : isTentang ? tentangSubNavItems : []
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
    if (typeof window !== 'undefined' && hasSubNav && !isArtikelCategory) {
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
  <!-- 2-TIER SUBNAV NAVBAR (Produk Detail, Tentang, Kategori Artikel)  -->
  <!-- ================================================================= -->
  <header
    class="w-full fixed top-0 left-0 z-40 pointer-events-auto bg-transparent"
  >
    <!-- ROW 1: Controls (Language on Left, Centered Logo, Hamburger on Right) -->
    <div class="relative w-full h-14 sm:h-16 flex items-center justify-between px-4 sm:px-10 lg:px-16 transition-colors duration-300 {isScrolled ? 'bg-black shadow-lg' : 'bg-transparent'}">
      <!-- Left: Language Translate Selector Button -->
      <div class="relative z-50">
        <button
          type="button"
          onclick={toggleLang}
          class="flex items-center gap-2 text-white hover:text-[#FFE500] transition-colors cursor-pointer group focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={isLangOpen}
          aria-label="Pilih Bahasa"
        >
          <span class="text-xs font-semibold tracking-wider hidden sm:inline">{selectedLang}</span>
          <span class="text-xs font-semibold tracking-wider sm:hidden">{selectedShort}</span>
          <div class="w-6 h-6 border border-[#FFE500] flex items-center justify-center text-[#FFE500] group-hover:bg-[#FFE500] group-hover:text-black transition-colors">
            <svg
              class="w-3.5 h-3.5 stroke-current transition-transform duration-200 {isLangOpen ? 'rotate-180' : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {#if isLangOpen}
          <!-- Backdrop to close on click outside -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="fixed inset-0 z-40 bg-transparent"
            onclick={closeLang}
          ></div>

          <!-- Dropdown Menu -->
          <div
            class="absolute top-full left-0 mt-2 z-50 min-w-[170px] bg-neutral-950 border border-white/15 shadow-2xl py-1.5 rounded-none backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200"
            role="listbox"
          >
            {#each languages as lang}
              <button
                type="button"
                onclick={() => changeLanguage(lang)}
                class="w-full text-left px-4 py-2.5 text-xs flex items-center justify-between gap-3 transition-colors cursor-pointer {selectedCode === lang.code
                  ? 'bg-[#FFE500] text-black font-bold'
                  : 'text-neutral-300 hover:bg-white/10 hover:text-[#FFE500]'}"
                role="option"
                aria-selected={selectedCode === lang.code}
              >
                <span class="flex items-center gap-2.5">
                  <span class="text-sm">{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {#if selectedCode === lang.code}
                  <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Center: ORIA Logo (Persistent, stays visible on scroll) -->
      <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <a
          href="/"
          class="flex items-center justify-center hover:opacity-90 transition-opacity select-none focus:outline-none py-1"
        >
          <img
            src="/images/oria-logo-hd.png"
            alt="Logo ORIA"
            class="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          />
        </a>
      </div>

      <!-- Right: Hamburger Button (In Row 1) -->
      <div class="relative z-50">
        <button
          type="button"
          onclick={openDrawer}
          class="text-white p-2 hover:text-[#FFE500] focus:outline-none cursor-pointer transition-colors group flex items-center justify-center drop-shadow-md"
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

    <!-- ROW 2: Subnav Row (Transparent when at top, solid black when scrolled or hovered, no blur) -->
    <div
      class="w-full h-11 sm:h-12 flex items-center overflow-x-auto no-scrollbar [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden overscroll-x-contain transition-colors duration-300 {isScrolled ? 'bg-black' : 'bg-transparent hover:bg-black'}"
    >
      <div class="min-w-full w-max flex items-center px-4 sm:px-10 lg:px-16 {isProductDetail ? 'justify-center' : 'md:justify-center'}">
        <nav
          aria-label={isProductDetail ? 'Navigasi Detail Produk' : isArtikelCategory ? 'Navigasi Kategori Artikel' : 'Navigasi Halaman Tentang'}
          class="flex items-center gap-6 sm:gap-8 md:gap-10 shrink-0"
        >
          {#if isArtikelCategory}
            {#each artikelSubNavItems as item}
              {@const activeCatSlug = page.data?.category?.id || (page.data?.article?.category ? page.data.article.category.toLowerCase().trim().replace(/\s+/g, '-') : '')}
              {@const isActive = page.url.pathname.startsWith(item.href) || activeCatSlug === item.id}
              <a
                href={item.href}
                class="flex items-center text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-200 focus:outline-none border-none bg-transparent hover:bg-transparent py-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] {isActive
                  ? 'text-[#FFE500] font-bold'
                  : 'text-white hover:text-[#FFE500]'}"
              >
                <span>{item.label}</span>
              </a>
            {/each}
          {:else}
            {#each currentSubNavItems as item}
              <a
                href="#{item.id}"
                onclick={(e) => scrollToSection(item.id, e)}
                class="flex items-center text-[11px] sm:text-xs md:text-[13px] font-semibold tracking-[0.14em] uppercase whitespace-nowrap transition-colors duration-200 focus:outline-none border-none bg-transparent hover:bg-transparent py-1 drop-shadow-[0_2px_6px_rgba(0,0,0,0.85)] {activeSection === item.id
                  ? 'text-[#FFE500] font-bold'
                  : 'text-white hover:text-[#FFE500]'}"
              >
                <span>{item.label}</span>
              </a>
            {/each}
          {/if}
          <!-- Spacer presisi ~8px agar aman dari scrollbar tanpa terlalu renggang (hanya untuk non-detail produk) -->
          {#if !isProductDetail}
            <span class="w-2 md:hidden shrink-0 inline-block pointer-events-none" aria-hidden="true"></span>
          {/if}
        </nav>
      </div>
    </div>
  </header>
{:else}
  <!-- ================================================================= -->
  <!-- NORMAL PAGES NAVBAR (Homepage, Katalog, Artikel, Kontak, dll.)    -->
  <!-- ================================================================= -->
  <header
    class="w-full fixed top-0 left-0 z-40 transition-colors duration-300 pointer-events-auto {isScrolled
      ? 'bg-black shadow-lg border-b border-white/10'
      : 'bg-transparent border-b border-transparent'}"
  >
    <div class="relative w-full h-14 sm:h-16 flex items-center justify-between px-4 sm:px-10 lg:px-16">
      <!-- Left: Language Translate Selector Button -->
      <div class="relative z-50">
        <button
          type="button"
          onclick={toggleLang}
          class="flex items-center gap-2 text-white hover:text-[#FFE500] transition-colors cursor-pointer group focus:outline-none"
          aria-haspopup="listbox"
          aria-expanded={isLangOpen}
          aria-label="Pilih Bahasa"
        >
          <span class="text-xs font-semibold tracking-wider hidden sm:inline">{selectedLang}</span>
          <span class="text-xs font-semibold tracking-wider sm:hidden">{selectedShort}</span>
          <div class="w-6 h-6 border border-[#FFE500] flex items-center justify-center text-[#FFE500] group-hover:bg-[#FFE500] group-hover:text-black transition-colors">
            <svg
              class="w-3.5 h-3.5 stroke-current transition-transform duration-200 {isLangOpen ? 'rotate-180' : ''}"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </button>

        {#if isLangOpen}
          <!-- Backdrop to close on click outside -->
          <!-- svelte-ignore a11y_click_events_have_key_events -->
          <!-- svelte-ignore a11y_no_static_element_interactions -->
          <div
            class="fixed inset-0 z-40 bg-transparent"
            onclick={closeLang}
          ></div>

          <!-- Dropdown Menu -->
          <div
            class="absolute top-full left-0 mt-2 z-50 min-w-[170px] bg-neutral-950 border border-white/15 shadow-2xl py-1.5 rounded-none backdrop-blur-md animate-in fade-in slide-in-from-top-2 duration-200"
            role="listbox"
          >
            {#each languages as lang}
              <button
                type="button"
                onclick={() => changeLanguage(lang)}
                class="w-full text-left px-4 py-2.5 text-xs flex items-center justify-between gap-3 transition-colors cursor-pointer {selectedCode === lang.code
                  ? 'bg-[#FFE500] text-black font-bold'
                  : 'text-neutral-300 hover:bg-white/10 hover:text-[#FFE500]'}"
                role="option"
                aria-selected={selectedCode === lang.code}
              >
                <span class="flex items-center gap-2.5">
                  <span class="text-sm">{lang.flag}</span>
                  <span>{lang.label}</span>
                </span>
                {#if selectedCode === lang.code}
                  <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                {/if}
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Centered Brand Logo (100% Persis di Tengah Layar Secara Mutlak) -->
      <div class="absolute left-1/2 -translate-x-1/2 flex items-center justify-center">
        <a
          href="/"
          class="flex items-center justify-center hover:opacity-90 transition-opacity select-none focus:outline-none py-1"
        >
          <img
            src="/images/oria-logo-hd.png"
            alt="Logo ORIA"
            class="h-7 sm:h-8 md:h-9 w-auto object-contain brightness-0 invert drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]"
          />
        </a>
      </div>

      <!-- Right Hamburger Menu Button -->
      <div class="relative z-50">
        <button
          type="button"
          onclick={openDrawer}
          class="text-white p-2 hover:text-[#FFE500] focus:outline-none cursor-pointer transition-colors group flex items-center justify-center drop-shadow-md"
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

<!-- SLIDE-IN DRAWER DARI KANAN KE KIRI (Warna Kuning #FFE500, teks dan ikon hitam solid) -->
<aside
  class="fixed top-0 right-0 h-full z-50 w-full sm:w-[85vw] md:w-[65vw] lg:w-[48vw] xl:w-[40vw] bg-[#FFE500] text-black flex flex-col justify-between transform transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] shadow-2xl border-l border-black/15 p-6 sm:p-10 lg:p-12 {drawerOpen ? 'translate-x-0' : 'translate-x-full'}"
  aria-label="Menu Navigasi Utama"
  aria-hidden={!drawerOpen}
>
  <!-- Drawer Top: Brand Logo oria-logo-hd.png (Hitam) & Close Button (Hitam) -->
  <div class="flex items-center justify-between pb-5 border-b border-black/15 flex-shrink-0">
    <a
      href="/"
      onclick={closeDrawer}
      class="flex items-center"
    >
      <img
        src="/images/oria-logo-hd.png"
        alt="Logo ORIA"
        class="h-6 sm:h-7 w-auto object-contain brightness-0"
      />
    </a>

    <button
      type="button"
      onclick={closeDrawer}
      class="w-10 h-10 rounded-full flex items-center justify-center text-black/70 hover:text-black hover:bg-black/10 transition-colors cursor-pointer focus:outline-none"
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
      scrollbarClass="bg-black/10"
      thumbClass="bg-black/25 hover:bg-black/45"
    >
      <div class="py-4 flex flex-col gap-3 sm:gap-4">
        <div class="font-sans font-bold text-[10px] uppercase tracking-[0.25em] text-black/60 mb-1">
          Lini Mesin Industrial
        </div>

        {#each productCategories as cat}
          <a
            href={cat.href}
            onclick={closeDrawer}
            class="group flex items-center justify-between text-lg sm:text-2xl lg:text-[1.55rem] font-heading font-black uppercase tracking-[0.14em] text-black hover:text-black/60 transition-colors py-1 sm:py-1.5"
          >
            <span class="group-hover:translate-x-1 transition-transform duration-300">{cat.title}</span>
            <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-transform duration-300 group-hover:translate-x-1.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </a>
        {/each}

        <!-- Divider -->
        <div class="h-px bg-black/15 my-4 sm:my-5"></div>

        <!-- Secondary Links (Discover ORIA, Artikel, Showroom) -->
        <div class="flex flex-col gap-2 sm:gap-2.5">
          {#each secondaryNavLinks as link}
            <a
              href={link.href}
              onclick={closeDrawer}
              class="group flex items-center justify-between text-xs sm:text-sm font-heading font-bold uppercase tracking-widest text-black/80 hover:text-black transition-colors py-1"
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
  <div class="border-t border-black/15 pt-5 flex flex-col gap-2.5 text-xs tracking-wider text-black/80 font-sans flex-shrink-0">
    <a
      href="/kontak"
      onclick={closeDrawer}
      class="flex items-center gap-2.5 text-black hover:text-black/60 transition-colors uppercase font-semibold"
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
      class="flex items-center gap-2.5 text-black hover:text-black/60 transition-colors uppercase font-semibold"
    >
      <svg class="w-4 h-4 stroke-current flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
        <path stroke-linecap="round" stroke-linejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
      </svg>
      <span>WhatsApp: +62 812-5208-6455</span>
    </a>
  </div>
</aside>
