<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  let nama = $state('');
  let phone = $state('');
  let email = $state('');
  let selectedCategory = $state('');
  let selectedMachine = $state('');
  let pesan = $state('');
  let submitted = $state(false);
  let formError = $state('');

  let isCategoryOpen = $state(false);
  let isMachineOpen = $state(false);

  // Exact fallback matching live Strapi products
  const fallbackCategoryData: Record<string, string[]> = {
    'UV Flatbed & Cylinder': [
      'ORIA UV Cylinder E3',
      'ORIA UV DTF A3',
      'ORIA UV Flatbed A3',
      'ORIA UV Laser Marking 5W',
      'ORIA UV Mini Cylinder'
    ],
    'Sublimasi Textile': [
      'ORIA Heat Press 1720',
      'ORIA Heat Press 1942',
      'ORIA Sublim 1804',
      'ORIA Sublim 1902'
    ],
    'Laser Cutting & Engraving': [
      'ORIA Fiber Laser 1325',
      'ORIA Fiber Laser 3015',
      'ORIA Fiber Laser 6015',
      'ORIA Laser Cutting 1310',
      'ORIA Laser Cutting 1325',
      'ORIA Laser Cutting 1490',
      'ORIA Laser Cutting 6040',
      'ORIA Laser Cutting 6090',
      'ORIA Laser Galvo 1615',
      'ORIA Laser Marking 2020',
      'ORIA UV Laser Marking 5W'
    ],
    'CNC Router & Fabrication': [
      'ORIA CNC Metal 6090',
      'ORIA CNC Plasma 1325',
      'ORIA CNC Router 1325'
    ],
    'DTF Apparel Printing': [
      'ORIA DTF 6004',
      'ORIA DTG OR-DTG02',
      'ORIA UV DTF A3'
    ],
    'Outdoor Solvent Printing': [
      'ORIA Outdoor 3204 ST'
    ],
    'Indoor High Resolution': [
      'ORIA Indoor 1802',
      'ORIA Indoor 1902',
      'ORIA Indoor 1902 8 Warna',
      'ORIA Indoor 3202'
    ],
    'Single Pass Packaging': [
      'ORIA One Pass DC800SP'
    ]
  };

  const categoryData = $derived(
    data?.categoryData && Object.keys(data.categoryData).length > 0
      ? data.categoryData
      : fallbackCategoryData
  );

  const categories = $derived(
    data?.categories && data.categories.length > 0
      ? data.categories
      : Object.keys(fallbackCategoryData)
  );

  let availableMachines = $derived(selectedCategory ? categoryData[selectedCategory] || [] : []);

  function toggleCategory() {
    isCategoryOpen = !isCategoryOpen;
    isMachineOpen = false;
  }

  function toggleMachine() {
    isMachineOpen = !isMachineOpen;
    isCategoryOpen = false;
  }

  function selectCategory(cat: string) {
    selectedCategory = cat;
    selectedMachine = '';
    isCategoryOpen = false;
    isMachineOpen = false;
    formError = '';
  }

  function selectMachine(m: string) {
    selectedMachine = m;
    isMachineOpen = false;
    formError = '';
  }

  function closeDropdowns() {
    isCategoryOpen = false;
    isMachineOpen = false;
  }

  function onWindowClick(e: MouseEvent) {
    const target = e.target as HTMLElement | null;
    if (!target) return;
    if (isCategoryOpen && !target.closest('#category-dropdown-container')) {
      isCategoryOpen = false;
    }
    if (isMachineOpen && !target.closest('#machine-dropdown-container')) {
      isMachineOpen = false;
    }
  }

  function handleSubmit(e: Event) {
    e.preventDefault();
    if (!nama.trim() || !phone.trim() || !selectedCategory || !selectedMachine || !pesan.trim()) {
      formError = 'Mohon lengkapi semua bidang wajib sebelum mengirim.';
      return;
    }
    formError = '';
    submitted = true;
    const text = encodeURIComponent(
      `Halo ORIA, saya ingin berkonsultasi mengenai mesin industri.\n\n` +
      `Nama: ${nama.trim()}\n` +
      `No. WhatsApp/Telp: ${phone.trim()}\n` +
      `Email: ${email.trim() || '-'}\n` +
      `Kategori Mesin: ${selectedCategory}\n` +
      `Pilihan Unit Mesin: ${selectedMachine}\n` +
      `Pesan/Kebutuhan: ${pesan.trim()}`
    );
    window.open(`https://wa.me/6281252086455?text=${text}`, '_blank');
  }

  function handleScheduleVisit() {
    const text = encodeURIComponent(
      `Halo tim ORIA, saya ingin menjadwalkan kunjungan demo ke Showroom Surabaya (Ruko Royal Town Blok RB8, Gunung Anyar). Mohon informasi jadwal ketersediaan teknisi demo.`
    );
    window.open(`https://wa.me/6281252086455?text=${text}`, '_blank');
  }
</script>

<svelte:window onclick={onWindowClick} />

<svelte:head>
  <title>Contact Us & Showroom - ORIA Industrial Printing</title>
  <meta
    name="description"
    content="Hubungi tim penjualan dan engineering ORIA. Kunjungi Flagship Showroom Surabaya untuk demo langsung mesin UV, DTF, Laser, dan CNC."
  />
</svelte:head>

<div class="w-full bg-[#050508] text-white select-none">
  <!-- ======================================================================= -->
  <!-- 1. HERO SECTION: Lotus Style (Matching Produk Page Position & Typography)-->
  <!-- ======================================================================= -->
  <section class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none flex flex-col justify-end">
    <!-- Showroom & Workshop Visual (Desktop 4:3 / Mobile 3:4) -->
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <picture>
        <source media="(max-width: 768px)" srcset="/images/contact/hero-mobile.png" />
        <img
          src="/images/contact/hero-desktop.png"
          alt="ORIA Flagship Showroom & Workshop"
          class="w-full h-full object-cover object-center lg:object-[center_35%]"
          loading="eager"
        />
      </picture>
      <!-- Cinematic Dark Gradient Overlay (Gradasi hitam ke transparan) -->
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/90 sm:via-black/40 sm:to-transparent"></div>
    </div>

    <!-- Bottom Left: Lotus-Style Hero Typography (Sama persis seperti Halaman Produk) -->
    <div class="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24">
      <div class="max-w-7xl mx-auto w-full">
        <div class="space-y-3 sm:space-y-4 max-w-3xl">
          <!-- Tag / Heading in Yellow Tracked (Ukuran font seimbang & elegan) -->
          <h1 class="font-heading font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#FFE500] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
            <span class="block">ORIA</span>
            <span class="block mt-1 sm:mt-1.5 text-white">CONTACT US</span>
          </h1>

          <!-- Subtitle in White Tracked Uppercase -->
          <div class="font-heading font-medium text-xs sm:text-sm md:text-base tracking-[0.28em] text-white uppercase pt-1 sm:pt-2 drop-shadow-md">
            CENTRES &amp; CONSULTATION
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 2. DIRECT CONTACT INFO & CHANNELS (Clean White & Minimal Section)       -->
  <!-- ======================================================================= -->
  <section class="w-full bg-white text-black border-b border-neutral-200 py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16">
    <div class="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center justify-between gap-8 lg:gap-12">
      <!-- Left: Simple, Direct Narrative -->
      <div class="space-y-3 max-w-2xl">
        <div class="font-heading font-black text-xs uppercase tracking-[0.25em] text-neutral-500">
          PUSAT LAYANAN &amp; KONSULTASI RESMI
        </div>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-black uppercase tracking-tight leading-tight">
          HOW CAN WE ASSIST YOUR BUSINESS?
        </h2>
        <p class="font-sans text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed">
          Hubungi konsultan teknis ORIA untuk konsultasi pemilihan unit mesin, analisa kebutuhan workshop, serta penjadwalan demo privat langsung di Flagship Showroom.
        </p>
      </div>

      <!-- Right: Action Buttons (WhatsApp Hotline & Email Sales) -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 shrink-0">
        <a
          href="https://wa.me/6281252086455"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-3 px-6 py-4 bg-[#FFE500] text-black font-heading font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#ebd300] transition-colors shadow-sm"
        >
          <span>WHATSAPP HOTLINE</span>
          <svg class="w-4 h-4 stroke-black stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href="mailto:sales@oria.co.id"
          class="inline-flex items-center justify-center gap-3 px-6 py-4 bg-neutral-100 hover:bg-neutral-200 text-black border-0 font-heading font-bold text-xs uppercase tracking-[0.2em] transition-colors"
        >
          <span>EMAIL SALES</span>
          <svg class="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 3. ORIA CENTRES: FLAGSHIP SHOWROOM (OUR CAPACITY Layout - Typographic)   -->
  <!-- ======================================================================= -->
  <section class="w-full py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 bg-[#050508] text-white border-b border-white/10 select-none">
    <div class="max-w-7xl mx-auto space-y-16">
      <!-- Section Heading (Exact OUR CAPACITY Lotus Style) -->
      <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
        <div class="space-y-3 max-w-2xl">
          <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white">
            FLAGSHIP SHOWROOM &amp; EXPERIENCE
          </h2>
          <p class="font-sans text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed pt-1">
            Saksikan langsung demo operasional, uji cetak bahan Anda sendiri, dan diskusikan kalkulasi ROI bersama insinyur aplikasi ORIA.
          </p>
        </div>

        <!-- Action CTAs (Strict rule: Chevron only) -->
        <div class="flex flex-wrap items-center gap-3 shrink-0">
          <button
            type="button"
            onclick={handleScheduleVisit}
            class="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#FFE500] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#fff04d] transition-colors cursor-pointer"
          >
            <span>Jadwalkan Kunjungan</span>
            <svg class="w-3.5 h-3.5 stroke-black stroke-[3]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
          <a
            href="https://maps.google.com/?q=Ruko+Royal+Town+Gunung+Anyar+Surabaya"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-6 py-3.5 bg-white/5 text-neutral-200 hover:text-white hover:bg-white/10 font-heading font-bold text-xs uppercase tracking-wider transition-colors"
          >
            <span>Google Maps</span>
            <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>

      <!-- 3 Clean Borderless Columns (Exact OUR CAPACITY Layout) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
        <!-- Column 1: Surabaya Location -->
        <div class="space-y-3">
          <div class="font-heading font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            SURABAYA<span class="text-[#FFE500] font-normal">.</span>
          </div>
          <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">
            HEADQUARTERS &amp; SHOWROOM
          </div>
          <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Ruko Royal Town Blok RB8, Gunung Anyar, Surabaya, Jawa Timur 60294. Lokasi strategis dengan display unit mesin industri lengkap.
          </p>
          <div class="pt-2">
            <a
              href="https://maps.google.com/?q=Ruko+Royal+Town+Gunung+Anyar+Surabaya"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#FFE500] hover:underline"
            >
              <span>Petunjuk Rute Maps</span>
              <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Column 2: Live Demo & Testing -->
        <div class="space-y-3">
          <div class="font-heading font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight uppercase">
            LIVE DEMO<span class="text-[#FFE500] font-normal">.</span>
          </div>
          <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">
            LIVE DEMO &amp; TESTING
          </div>
          <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Unit aktif siap uji: UV Flatbed 2513 &amp; 3220, DTF Apparel 60cm, Fiber Laser, Heavy CNC 1325, dan Sublimasi Tekstil.
          </p>
          <div class="pt-2">
            <button
              type="button"
              onclick={handleScheduleVisit}
              class="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#FFE500] hover:underline cursor-pointer"
            >
              <span>Jadwalkan Live Demo</span>
              <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <!-- Column 3: Hotline & Hours -->
        <div class="space-y-3">
          <div class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight tabular-nums">
            <span class="text-white">+62 812</span><span class="text-[#FFE500] font-normal">-5208-6455</span>
          </div>
          <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">
            KONSULTASI &amp; OPERASIONAL
          </div>
          <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
            Senin – Jumat: 08.30 – 17.00 WIB<br />
            Sabtu: 08.30 – 15.00 WIB (Minggu: By Appointment). Konsultasi teknis dan kalkulasi ROI workshop Anda.
          </p>
          <div class="pt-2">
            <a
              href="https://wa.me/6281252086455"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#FFE500] hover:underline"
            >
              <span>Hubungi Hotline Langsung</span>
              <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 4. CONSULTATION FORM SECTION (Separate Section with Clean White BG)     -->
  <!-- ======================================================================= -->
  <section class="w-full bg-white text-black border-t border-neutral-200 py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16">
    <div class="max-w-4xl mx-auto space-y-10">
      <div class="space-y-3">
        <div class="font-heading font-black text-xs uppercase tracking-[0.25em] text-neutral-500">
          FORMULIR KONSULTASI RESMI
        </div>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-black uppercase tracking-tight">
          REQUEST QUOTATION &amp; SPECIFICATIONS
        </h2>
        <p class="font-sans text-xs sm:text-sm md:text-base text-neutral-600 leading-relaxed">
          Isi rincian kebutuhan usaha Anda di bawah ini untuk terhubung langsung dengan konsultan teknis ORIA.
        </p>
      </div>

      {#if formError}
        <div class="p-4 bg-red-50 text-red-700 text-xs font-sans tracking-wide">
          {formError}
        </div>
      {/if}

      {#if submitted}
        <div class="p-8 sm:p-12 bg-neutral-50 space-y-4 text-center">
          <div class="w-12 h-12 mx-auto rounded-full bg-[#FFE500]/30 flex items-center justify-center text-black">
            <svg class="w-6 h-6 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 class="font-heading font-bold text-xl text-black uppercase tracking-wide">
            Pesan Berhasil Diteruskan
          </h3>
          <p class="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed max-w-md mx-auto">
            Percakapan WhatsApp telah dibuka. Tim sales &amp; engineering ORIA siap melayani konsultasi spesifikasi mesin Anda.
          </p>
          <button
            type="button"
            onclick={() => (submitted = false)}
            class="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-black hover:underline pt-2 cursor-pointer"
          >
            <span>Kirim Formulir Lain</span>
            <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      {:else}
        <form onsubmit={handleSubmit} class="space-y-6">
          <!-- 1. Nama (Mandatory) -->
          <div class="space-y-2">
            <label for="nama" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-800 block">
              NAMA LENGKAP / WORKSHOP *
            </label>
            <input
              id="nama"
              type="text"
              required
              bind:value={nama}
              placeholder="Contoh: Hendra Pratama / CV Berkah Advertising"
              class="w-full bg-neutral-100 text-neutral-900 text-sm px-4 py-3.5 border-0 focus:ring-1 focus:ring-black focus:outline-none transition-all placeholder:text-neutral-400 rounded-none"
            />
          </div>

          <!-- 2. No. Telp (Mandatory) -->
          <div class="space-y-2">
            <label for="phone" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-800 block">
              NOMOR TELEPON / WHATSAPP *
            </label>
            <input
              id="phone"
              type="tel"
              required
              bind:value={phone}
              placeholder="Contoh: 0812-5208-6455"
              class="w-full bg-neutral-100 text-neutral-900 text-sm px-4 py-3.5 border-0 focus:ring-1 focus:ring-black focus:outline-none transition-all placeholder:text-neutral-400 rounded-none"
            />
          </div>

          <!-- 3. Email (Opsional) -->
          <div class="space-y-2">
            <label for="email" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-600 block">
              ALAMAT EMAIL (OPSIONAL)
            </label>
            <input
              id="email"
              type="email"
              bind:value={email}
              placeholder="Contoh: hendra@perusahaan.co.id"
              class="w-full bg-neutral-100 text-neutral-900 text-sm px-4 py-3.5 border-0 focus:ring-1 focus:ring-black focus:outline-none transition-all placeholder:text-neutral-400 rounded-none"
            />
          </div>

          <!-- 4. Kategori Mesin (Mandatory - Custom Dropdown) -->
          <div class="space-y-2">
            <label for="cat-button" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-800 block">
              KATEGORI MESIN *
            </label>
            <div id="category-dropdown-container" class="relative">
              <button
                id="cat-button"
                type="button"
                onclick={toggleCategory}
                class="w-full bg-neutral-100 text-neutral-900 text-sm px-4 py-3.5 border-0 focus:ring-1 focus:ring-black focus:outline-none flex items-center justify-between cursor-pointer rounded-none transition-colors"
                aria-haspopup="listbox"
                aria-expanded={isCategoryOpen}
              >
                <span class={selectedCategory ? 'text-black font-medium' : 'text-neutral-500'}>
                  {selectedCategory || 'Pilih Kategori Mesin...'}
                </span>
                <svg
                  class="w-4 h-4 stroke-black stroke-[2.5] transition-transform duration-200 {isCategoryOpen ? 'rotate-180' : ''}"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {#if isCategoryOpen}
                <div class="absolute top-full left-0 right-0 mt-1 z-50 bg-white shadow-2xl py-1 max-h-60 overflow-y-auto no-scrollbar rounded-none border border-neutral-200 animate-in fade-in slide-in-from-top-1 duration-150">
                  {#each categories as cat}
                    <button
                      type="button"
                      onclick={() => selectCategory(cat)}
                      class="w-full text-left px-4 py-3 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer {selectedCategory === cat
                        ? 'bg-[#FFE500] text-black font-bold'
                        : 'text-neutral-800 hover:bg-[#FFE500] hover:text-black hover:font-semibold'}"
                    >
                      <span>{cat}</span>
                      {#if selectedCategory === cat}
                        <svg class="w-4 h-4 stroke-current stroke-[3]" fill="none" viewBox="0 0 24 24">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      {/if}
                    </button>
                  {/each}
                </div>
              {/if}
            </div>
          </div>

          <!-- 5. Pilih Mesin (Mandatory - Muncul Hanya Setelah Kategori Dipilih) -->
          {#if selectedCategory}
            <div class="space-y-2 animate-in fade-in slide-in-from-top-2 duration-200">
              <label for="machine-button" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-800 block">
                PILIH MESIN *
              </label>
              <div id="machine-dropdown-container" class="relative">
                <button
                  id="machine-button"
                  type="button"
                  onclick={toggleMachine}
                  class="w-full bg-neutral-100 text-neutral-900 text-sm px-4 py-3.5 border-0 focus:ring-1 focus:ring-black focus:outline-none flex items-center justify-between cursor-pointer rounded-none transition-colors"
                  aria-haspopup="listbox"
                  aria-expanded={isMachineOpen}
                >
                  <span class={selectedMachine ? 'text-black font-medium' : 'text-neutral-500'}>
                    {selectedMachine || 'Pilih Unit Mesin...'}
                  </span>
                  <svg
                    class="w-4 h-4 stroke-black stroke-[2.5] transition-transform duration-200 {isMachineOpen ? 'rotate-180' : ''}"
                    fill="none"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
                  </svg>
                </button>

                {#if isMachineOpen}
                  <div class="absolute top-full left-0 right-0 mt-1 z-50 bg-white shadow-2xl py-1 max-h-60 overflow-y-auto no-scrollbar rounded-none border border-neutral-200 animate-in fade-in slide-in-from-top-1 duration-150">
                    {#each availableMachines as m}
                      <button
                        type="button"
                        onclick={() => selectMachine(m)}
                        class="w-full text-left px-4 py-3 text-xs sm:text-sm flex items-center justify-between transition-colors cursor-pointer {selectedMachine === m
                          ? 'bg-[#FFE500] text-black font-bold'
                          : 'text-neutral-800 hover:bg-[#FFE500] hover:text-black hover:font-semibold'}"
                      >
                        <span>{m}</span>
                        {#if selectedMachine === m}
                          <svg class="w-4 h-4 stroke-current stroke-[3]" fill="none" viewBox="0 0 24 24">
                            <polyline points="20 6 9 17 4 12" />
                          </svg>
                        {/if}
                      </button>
                    {/each}
                  </div>
                {/if}
              </div>
            </div>
          {/if}

          <!-- 6. Pesan / Kebutuhan (Mandatory) -->
          <div class="space-y-2">
            <label for="pesan" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-800 block">
              PESAN / KEBUTUHAN PRODUKSI *
            </label>
            <textarea
              id="pesan"
              rows="4"
              required
              bind:value={pesan}
              placeholder="Jelaskan kebutuhan cetak, estimasi volume harian, atau pertanyaan teknis yang ingin Anda diskusikan..."
              class="w-full bg-neutral-100 text-neutral-900 text-sm px-4 py-3.5 border-0 focus:ring-1 focus:ring-black focus:outline-none transition-all placeholder:text-neutral-400 rounded-none"
            ></textarea>
          </div>

          <!-- Submit Button with Chevron (Strict rule: Chevron only) -->
          <div class="pt-3">
            <button
              type="submit"
              class="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFE500] hover:bg-[#ebd300] text-black font-heading font-black text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 shadow-md group cursor-pointer border-0"
            >
              <span>KIRIM VIA WHATSAPP RESMI</span>
              <svg
                class="w-4 h-4 stroke-black stroke-[3] transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </form>
      {/if}
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 5. "HOW CAN WE DO BETTER?" BANNER SECTION (Lotus-Inspired Aesthetic)    -->
  <!-- ======================================================================= -->
  <section class="relative w-full bg-[#050508] text-white overflow-hidden py-24 sm:py-32 lg:py-36 min-h-[440px] flex items-center">
    <!-- Background Image with Fade (Pristine clean visual from reference) -->
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <picture>
        <source srcset="/images/contact/how-can-we-do-better-clean.webp" type="image/webp" />
        <img
          src="/images/contact/how-can-we-do-better-clean.png"
          alt="Innovation & Precision"
          class="w-full h-full object-cover object-right md:object-center"
          loading="lazy"
        />
      </picture>
      <!-- Dark Cinematic Gradient Overlay on Left to ensure seamless contrast -->
      <div class="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/85 to-transparent md:via-[#050508]/40 md:to-transparent"></div>
    </div>

    <!-- Content on Left Side (Pure Lotus Minimalist Aesthetic) -->
    <div class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <div class="max-w-xl space-y-6">
        <h2 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white uppercase tracking-tight leading-tight">
          HOW CAN WE DO BETTER?
        </h2>
        <div class="space-y-4 font-sans text-xs sm:text-sm md:text-base text-neutral-300 leading-relaxed">
          <p>
            At ORIA we continuously strive to deliver an exceptional experience to all of our customers.
          </p>
          <p>
            If you feel there is more we can do, or want to discuss any issues you are experiencing, please reach out to us and we will endeavour to resolve your query as quickly as possible.
          </p>
        </div>
      </div>
    </div>
  </section>
</div>
