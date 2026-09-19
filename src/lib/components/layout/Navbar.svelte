<script lang="ts">
  import { page } from '$app/state';

  let mobileOpen = $state(false);
  let mobileProductsOpen = $state(false);
  let desktopDropdownOpen = $state(false);
  let scrollY = $state(0);
  let dropdownTimeout: any;

  // Background transparan saat belum di-scroll (scrollY <= 15) dan mobile menu tertutup.
  // Saat di-scroll atau saat menu mobile terbuka, background menjadi putih bersih.
  let isScrolled = $derived(scrollY > 15);

  function toggleMobile() {
    mobileOpen = !mobileOpen;
    if (!mobileOpen) {
      mobileProductsOpen = false;
    }
  }

  function closeMobile() {
    mobileOpen = false;
    mobileProductsOpen = false;
  }

  function toggleMobileProducts(e: MouseEvent) {
    e.preventDefault();
    mobileProductsOpen = !mobileProductsOpen;
  }

  function handleDesktopEnter() {
    clearTimeout(dropdownTimeout);
    desktopDropdownOpen = true;
  }

  function handleDesktopLeave() {
    dropdownTimeout = setTimeout(() => {
      desktopDropdownOpen = false;
    }, 180);
  }

  const productCategories = [
    { title: 'Indoor Printing', desc: 'Sticker, Banner, Display', href: '/produk?cat=indoor' },
    { title: 'Outdoor Printing', desc: 'Spanduk, Baliho, Billboard', href: '/produk?cat=outdoor' },
    { title: 'Sublimasi', desc: 'Textile & Fashion', href: '/produk?cat=sublimasi' },
    { title: 'DTF', desc: 'Custom Apparel', href: '/produk?cat=dtf' },
    { title: 'UV Printing', desc: 'Flatbed & Cylinder', href: '/produk?cat=uv' },
    { title: 'Laser Cutting', desc: 'Akrilik, Kayu, MDF, ACP', href: '/produk?cat=laser' },
    { title: 'CNC Router', desc: 'Fabrikasi & Woodworking', href: '/produk?cat=cnc' }
  ];

  const mainNavLinks = [
    { name: 'Beranda', href: '/' },
    { name: 'Tentang', href: '/tentang' },
    { name: 'Artikel', href: '/artikel' },
    { name: 'Kontak', href: '/kontak' }
  ];
</script>

<svelte:window bind:scrollY={scrollY} />

<header
  class="w-full fixed top-0 left-0 z-50 transition-all duration-300 {isScrolled || mobileOpen
    ? 'bg-white/95 backdrop-blur-md shadow-xs border-b border-black/5 py-4'
    : 'bg-transparent border-b border-transparent py-5'}"
>
  <div class="max-w-7xl mx-auto px-6 lg:px-12 flex items-center justify-between">
    <!-- Brand Logo -->
    <a href="/" class="font-heading font-black text-2xl tracking-tighter text-black flex items-center gap-2">
      ORIA
    </a>

    <!-- Desktop Navigation -->
    <nav class="hidden md:flex items-center gap-8 text-sm font-medium tracking-wide">
      <a
        href="/"
        class="text-black transition-opacity hover:opacity-60 {page.url.pathname === '/' ? 'font-bold underline underline-offset-4' : ''}"
      >
        Beranda
      </a>

      <!-- Desktop Produk Link with Hover Dropdown -->
      <!-- svelte-ignore a11y_no_static_element_interactions -->
      <div
        class="relative"
        onmouseenter={handleDesktopEnter}
        onmouseleave={handleDesktopLeave}
      >
        <a
          href="/produk"
          class="text-black transition-opacity hover:opacity-60 flex items-center gap-1.5 py-1 {page.url.pathname.startsWith('/produk') ? 'font-bold underline underline-offset-4' : ''}"
        >
          Produk
          <svg
            class="w-3.5 h-3.5 stroke-black transition-transform duration-200 {desktopDropdownOpen ? 'rotate-180' : ''}"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>

        <!-- Desktop Dropdown Card -->
        {#if desktopDropdownOpen}
          <div
            class="absolute top-full -left-4 mt-2 w-80 bg-white/98 backdrop-blur-xl border border-black/10 shadow-2xl rounded-2xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200"
          >
            <!-- All Products Direct Link -->
            <a
              href="/produk"
              class="flex items-center justify-between px-3 py-2.5 rounded-xl hover:bg-black/5 text-black font-heading font-bold text-xs uppercase tracking-wider transition-colors group"
            >
              <span>Semua Mesin & Produk</span>
              <svg class="w-3.5 h-3.5 stroke-black transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>

            <div class="h-px bg-black/10 my-1.5 mx-2"></div>

            <!-- Category Links -->
            <div class="flex flex-col gap-0.5">
              {#each productCategories as cat}
                <a
                  href={cat.href}
                  class="flex items-center justify-between px-3 py-2 rounded-xl hover:bg-black/5 transition-colors group"
                >
                  <div>
                    <div class="text-xs font-heading font-bold text-black group-hover:text-black">
                      {cat.title}
                    </div>
                    <div class="text-[11px] text-black/60">
                      {cat.desc}
                    </div>
                  </div>
                  <svg class="w-3.5 h-3.5 stroke-black/40 group-hover:stroke-black group-hover:translate-x-0.5 transition-all flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              {/each}
            </div>
          </div>
        {/if}
      </div>

      {#each mainNavLinks.slice(1) as link}
        <a
          href={link.href}
          class="text-black transition-opacity hover:opacity-60 {page.url.pathname === link.href ? 'font-bold underline underline-offset-4' : ''}"
        >
          {link.name}
        </a>
      {/each}
    </nav>

    <!-- Right Action CTA -->
    <div class="hidden md:flex items-center gap-4">
      <a
        href="/kontak"
        class="bg-black text-white px-5 py-2.5 text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
      >
        Hubungi Kami
      </a>
    </div>

    <!-- Mobile Hamburger Toggle -->
    <button
      type="button"
      onclick={toggleMobile}
      class="md:hidden text-black p-2 focus:outline-none cursor-pointer"
      aria-label="Toggle Navigation"
    >
      {#if mobileOpen}
        <svg class="w-6 h-6 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      {:else}
        <svg class="w-6 h-6 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      {/if}
    </button>
  </div>

  <!-- Mobile Dropdown Menu (Absolute Overlay agar tidak pernah mendorong konten Hero ke bawah) -->
  {#if mobileOpen}
    <div
      class="md:hidden absolute top-full left-0 w-full bg-white/98 backdrop-blur-xl border-b border-black/10 shadow-lg px-6 pb-6 pt-3 flex flex-col gap-2 text-base font-medium max-h-[80vh] overflow-y-auto"
    >
      <a
        href="/"
        onclick={closeMobile}
        class="text-black py-2 {page.url.pathname === '/' ? 'font-bold underline underline-offset-4' : ''}"
      >
        Beranda
      </a>

      <!-- Mobile Produk Accordion Toggle (Klik untuk buka/tutup kategori) -->
      <div class="py-1">
        <button
          type="button"
          onclick={toggleMobileProducts}
          class="w-full flex items-center justify-between text-black py-2 font-medium cursor-pointer focus:outline-none"
        >
          <span class={page.url.pathname.startsWith('/produk') ? 'font-bold underline underline-offset-4' : ''}>
            Produk
          </span>
          <svg
            class="w-4 h-4 stroke-black transition-transform duration-200 {mobileProductsOpen ? 'rotate-180' : ''}"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <!-- Sub-menu Kategori di Mobile -->
        {#if mobileProductsOpen}
          <div class="pl-3 pr-1 py-2 flex flex-col gap-2 border-l-2 border-black/10 mt-1 mb-2 bg-black/[0.02] rounded-r-xl">
            <a
              href="/produk"
              onclick={closeMobile}
              class="text-xs font-heading font-bold text-black uppercase tracking-wider py-1.5 flex items-center justify-between"
            >
              <span>Semua Produk</span>
              <svg class="w-3.5 h-3.5 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
            <div class="h-px bg-black/10 my-0.5"></div>
            {#each productCategories as cat}
              <a
                href={cat.href}
                onclick={closeMobile}
                class="py-1.5 flex items-center justify-between group"
              >
                <div>
                  <div class="text-xs font-heading font-semibold text-black">
                    {cat.title}
                  </div>
                  <div class="text-[10px] text-black/60">
                    {cat.desc}
                  </div>
                </div>
                <svg class="w-3 h-3 stroke-black/40 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            {/each}
          </div>
        {/if}
      </div>

      {#each mainNavLinks.slice(1) as link}
        <a
          href={link.href}
          onclick={closeMobile}
          class="text-black py-2 {page.url.pathname === link.href ? 'font-bold underline underline-offset-4' : ''}"
        >
          {link.name}
        </a>
      {/each}

      <a
        href="/kontak"
        onclick={closeMobile}
        class="bg-black text-white text-center py-3 text-xs font-semibold uppercase tracking-widest mt-3"
      >
        Hubungi Kami
      </a>
    </div>
  {/if}
</header>
