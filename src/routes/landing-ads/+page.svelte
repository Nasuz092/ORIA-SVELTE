<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const waNumber = process.env.WA_NUMBER || '6281252086455';

  function getWaUrl(message: string): string {
    return `https://wa.me/${waNumber}?text=${encodeURIComponent(message)}`;
  }

  // Active category filter tab (default 'all' or first category)
  let activeTab = $state('all');

  const categories = $derived(data.categoryGroups || []);

  const displayedGroups = $derived.by(() => {
    if (activeTab === 'all') return categories;
    return categories.filter((g) => g.category.id === activeTab);
  });
</script>

<svelte:head>
  <title>Mesin Digital Printing & Fabrikasi Industri ORIA — Penawaran Khusus Iklan</title>
  <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate" />
  <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate" />
  <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate" />
</svelte:head>

<!-- ================================================================= -->
<!-- SECTION 1: HERO PANORAMIC ADVERTISING (Full Width, Lotus/ORIA Style) -->
<!-- ================================================================= -->
<section class="relative w-full min-h-[92svh] sm:min-h-[100svh] flex items-center bg-black text-white select-none overflow-hidden">
  <!-- Panoramic Background Image -->
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <img
      src="/images/our-drive-workshop.png"
      alt="Workshop Mesin Digital Printing ORIA"
      class="w-full h-full object-cover object-center"
      loading="eager"
    />
    <!-- Deep Cinematic Luxury Gradient -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/40 sm:from-black/90 sm:via-black/70 sm:to-black/30"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black/60"></div>
  </div>

  <!-- Hero Content -->
  <div class="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-24 sm:pt-28 pb-16 sm:pb-24 flex flex-col justify-center">
    <div class="max-w-3xl space-y-6 sm:space-y-8">
      <!-- Section Tagline without pills -->
      <p class="font-heading font-light text-xs sm:text-sm tracking-[0.28em] sm:tracking-[0.32em] uppercase text-[#FFE500]">
        INDUSTRIAL PRINTING &amp; FABRICATION SYSTEMS
      </p>

      <!-- Main Headline: Sharp, Monospaced Luxury, Full Width Tracking -->
      <h1 class="font-heading font-bold text-3xl sm:text-5xl lg:text-6xl tracking-[0.12em] sm:tracking-[0.16em] uppercase leading-[1.1] text-white">
        SOLUSI MESIN CETAK <br />
        <span class="text-[#FFE500]">BERGARANSI RESMI</span>
      </h1>

      <!-- Value Subheadline -->
      <p class="font-sans text-sm sm:text-base lg:text-lg text-neutral-300 leading-relaxed font-normal max-w-2xl">
        Investasi mesin industri presisi tinggi dengan durabilitas komponen kelas dunia, jaminan ketersediaan suku cadang original, dan pendampingan teknisi ke seluruh kota di Indonesia.
      </p>

      <!-- Trust Pillars Grid: Sharp Rectangular Cells, No Rounded -->
      <div class="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-2">
        <div class="p-3.5 sm:p-4 bg-neutral-950/80 border border-white/15">
          <p class="font-heading text-lg sm:text-xl font-bold text-[#FFE500]">100%</p>
          <p class="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mt-1">Garansi Resmi</p>
        </div>
        <div class="p-3.5 sm:p-4 bg-neutral-950/80 border border-white/15">
          <p class="font-heading text-lg sm:text-xl font-bold text-[#FFE500]">GRATIS</p>
          <p class="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mt-1">Instalasi &amp; Training</p>
        </div>
        <div class="p-3.5 sm:p-4 bg-neutral-950/80 border border-white/15">
          <p class="font-heading text-lg sm:text-xl font-bold text-[#FFE500]">READY</p>
          <p class="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mt-1">Sparepart &amp; Tinta</p>
        </div>
        <div class="p-3.5 sm:p-4 bg-neutral-950/80 border border-white/15">
          <p class="font-heading text-lg sm:text-xl font-bold text-[#FFE500]">NASIONAL</p>
          <p class="text-[11px] sm:text-xs text-neutral-300 uppercase tracking-wider mt-1">Layanan Teknisi</p>
        </div>
      </div>

      <!-- Action Buttons with Chevron (Strictly No Arrows) -->
      <div class="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4">
        <a
          href={getWaUrl('Halo ORIA, saya tertarik konsultasi promo mesin digital printing dari iklan Google. Mohon informasi katalog & harga.')}
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFE500] text-black font-heading font-bold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors duration-200"
        >
          <span>KONSULTASI VIA WHATSAPP</span>
          <svg class="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>

        <a
          href="#katalog-iklan"
          class="inline-flex items-center justify-center gap-3 px-8 py-4 border border-white/30 text-white font-heading font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase hover:border-[#FFE500] hover:text-[#FFE500] transition-colors duration-200 bg-black/50"
        >
          <span>PILIHAN MESIN UNGGULAN</span>
          <svg class="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </a>
      </div>
    </div>
  </div>
</section>

<!-- ================================================================= -->
<!-- SECTION 2: BRAND MANIFESTO (Full Width, Industrial Excellence)     -->
<!-- ================================================================= -->
<section class="w-full bg-[#050508] text-white py-16 sm:py-24 px-6 sm:px-10 lg:px-16 border-y border-white/10 select-none">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
    <div class="lg:col-span-5 space-y-2">
      <p class="font-heading font-light text-xs tracking-[0.28em] uppercase text-[#FFE500]">
        PRECISION ENGINEERING
      </p>
      <h2 class="font-heading font-light text-2xl sm:text-4xl tracking-[0.2em] uppercase text-white leading-tight">
        DEDIKASI KUALITAS TANPA KOMPROMI
      </h2>
    </div>
    <div class="lg:col-span-7 space-y-5 text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
      <p>
        Setiap unit mesin ORIA dirancang menggunakan sasis baja monokok berbobot tinggi untuk mengeliminasi vibrasi saat carriage beroperasi pada kecepatan puncak, dipadukan dengan linear guide presisi mikron dan sistem suplai tinta industri.
      </p>
      <p>
        Kami memberikan pendampingan langsung dari kalkulasi modal awal, estimasi biaya cetak riil per meter, hingga pelatihan teknisi operator sampai mampu berproduksi mandiri secara efisien.
      </p>
    </div>
  </div>
</section>

<!-- ================================================================= -->
<!-- SECTION 3: PRODUCT CATALOG (1-2 Products per Category, Full Width)-->
<!-- ================================================================= -->
<section id="katalog-iklan" class="w-full bg-black text-white py-20 sm:py-28 px-6 sm:px-10 lg:px-16 select-none">
  <div class="max-w-7xl mx-auto space-y-12 sm:space-y-16">
    <!-- Section Header (No Pill Badge) -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-white/15 pb-8">
      <div>
        <p class="font-heading font-light text-xs sm:text-sm tracking-[0.28em] uppercase text-[#FFE500]">
          CURATED MACHINE LINEUP
        </p>
        <h2 class="font-heading font-medium text-2xl sm:text-4xl lg:text-5xl tracking-[0.16em] uppercase text-white mt-2">
          KATALOG PILIHAN MESIN ORIA
        </h2>
      </div>

      <!-- Quick Category Navigation (Sharp Rectangular Buttons) -->
      <div class="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        <button
          type="button"
          onclick={() => (activeTab = 'all')}
          class="px-4 py-2 text-xs font-heading tracking-[0.16em] uppercase whitespace-nowrap transition-colors {activeTab === 'all'
            ? 'bg-[#FFE500] text-black font-bold'
            : 'bg-neutral-950 text-neutral-300 hover:text-white border border-white/15'}"
        >
          SEMUA KATEGORI
        </button>
        {#each categories as group}
          <button
            type="button"
            onclick={() => (activeTab = group.category.id)}
            class="px-4 py-2 text-xs font-heading tracking-[0.16em] uppercase whitespace-nowrap transition-colors {activeTab === group.category.id
              ? 'bg-[#FFE500] text-black font-bold'
              : 'bg-neutral-950 text-neutral-300 hover:text-white border border-white/15'}"
          >
            {group.category.name}
          </button>
        {/each}
      </div>
    </div>

    <!-- Product Category Groups -->
    <div class="space-y-20 sm:space-y-28">
      {#each displayedGroups as group (group.category.id)}
        <div class="space-y-8 sm:space-y-10">
          <!-- Category Title Header -->
          <div class="space-y-1.5 border-l-2 border-[#FFE500] pl-4 sm:pl-6">
            <h3 class="font-heading font-medium text-xl sm:text-2xl lg:text-3xl tracking-[0.16em] uppercase text-white">
              {group.category.name}
            </h3>
            <p class="font-sans text-xs sm:text-sm text-neutral-400 max-w-2xl leading-relaxed">
              {group.category.description}
            </p>
          </div>

          <!-- 1-2 Products Grid per Category -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
            {#if group.products.length > 0}
              {#each group.products as product (product.id)}
                <div class="group flex flex-col bg-neutral-950 border border-white/15 hover:border-white/40 transition-colors duration-300">
                  <!-- Product Image Container -->
                  <div class="relative w-full aspect-[16/10] overflow-hidden bg-black flex items-center justify-center p-6 sm:p-8">
                    <img
                      src={product.imageUrl || group.category.cardImage}
                      alt={product.name}
                      class="max-h-full max-w-full object-contain transition-transform duration-700 ease-out group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>

                  <!-- Product Details -->
                  <div class="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-6 border-t border-white/10">
                    <div class="space-y-3">
                      <p class="font-heading text-[11px] tracking-[0.2em] uppercase text-[#FFE500]">
                        {group.category.name}
                      </p>
                      <h4 class="font-heading font-medium text-xl sm:text-2xl text-white group-hover:text-[#FFE500] transition-colors leading-snug">
                        {product.name}
                      </h4>
                      <p class="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                        {product.shortDescription || `Solusi mesin ${product.name} dirancang khusus untuk memenuhi standar produksi industri dengan presisi tinggi dan efisiensi konsumsi daya.`}
                      </p>
                    </div>

                    <!-- Price & Promo Tag -->
                    <div class="pt-2 border-t border-white/10 flex items-center justify-between">
                      <div>
                        <p class="text-[10px] sm:text-[11px] uppercase tracking-wider text-neutral-400">Harga Promo Iklan</p>
                        <p class="font-heading font-bold text-base sm:text-lg text-white">
                          {product.priceText || 'Hubungi Kami'}
                        </p>
                      </div>
                      <span class="text-[11px] uppercase tracking-wider text-[#FFE500] font-semibold">
                        Paket Usaha Lengkap
                      </span>
                    </div>

                    <!-- CTAs with Chevron Only -->
                    <div class="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                      <a
                        href={getWaUrl(`Halo ORIA, saya tertarik dengan mesin *${product.name}* dari penawaran iklan Google. Boleh minta brosur, spesifikasi lengkap, dan penawaran harga terbaik?`)}
                        target="_blank"
                        rel="noopener noreferrer"
                        class="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#FFE500] text-black font-heading font-bold text-xs tracking-[0.16em] uppercase hover:bg-white transition-colors"
                      >
                        <span>TANYA HARGA &amp; PROMO</span>
                        <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>

                      <a
                        href={`/produk/${group.category.id}/${product.slug}`}
                        class="flex items-center justify-center gap-2 py-3.5 px-4 border border-white/20 text-white font-heading font-medium text-xs tracking-[0.16em] uppercase hover:border-[#FFE500] hover:text-[#FFE500] transition-colors bg-neutral-900"
                      >
                        <span>DETAIL SPESIFIKASI</span>
                        <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                        </svg>
                      </a>
                    </div>
                  </div>
                </div>
              {/each}
            {:else}
              <!-- Fallback Category Card if no products returned -->
              <div class="group flex flex-col bg-neutral-950 border border-white/15">
                <div class="relative w-full aspect-[16/10] overflow-hidden bg-black flex items-center justify-center p-6 sm:p-8">
                  <img
                    src={group.category.cardImage}
                    alt={group.category.name}
                    class="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <div class="p-6 sm:p-8 flex flex-col flex-1 justify-between space-y-6 border-t border-white/10">
                  <div class="space-y-3">
                    <p class="font-heading text-[11px] tracking-[0.2em] uppercase text-[#FFE500]">
                      {group.category.name}
                    </p>
                    <h4 class="font-heading font-medium text-xl sm:text-2xl text-white">
                      {group.category.heroLine1} {group.category.heroLine2}
                    </h4>
                    <p class="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
                      {group.category.description}
                    </p>
                  </div>

                  <a
                    href={getWaUrl(`Halo ORIA, saya tertarik dengan informasi lini mesin ${group.category.name} dari iklan Google. Mohon kirimkan katalog dan penawaran terbaik.`)}
                    target="_blank"
                    rel="noopener noreferrer"
                    class="flex items-center justify-center gap-2 py-3.5 px-4 bg-[#FFE500] text-black font-heading font-bold text-xs tracking-[0.16em] uppercase hover:bg-white transition-colors"
                  >
                    <span>KONSULTASI UNIT &amp; HARGA</span>
                    <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>

<!-- ================================================================= -->
<!-- SECTION 4: AFTERSALES & NATIONAL SERVICE COVERAGE (Full Width)     -->
<!-- ================================================================= -->
<section class="relative w-full min-h-[580px] flex items-center overflow-hidden bg-black select-none px-6 sm:px-10 lg:px-16 py-20 sm:py-28 border-t border-white/15">
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <img
      src="/images/showcase-about.png"
      alt="Layanan Teknisi & Showroom ORIA Surabaya"
      class="w-full h-full object-cover object-center"
      loading="lazy"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/85 to-black/60 sm:to-black/50"></div>
  </div>

  <div class="relative z-10 w-full max-w-7xl mx-auto space-y-10">
    <div class="max-w-2xl space-y-3">
      <p class="font-heading font-light text-xs sm:text-sm tracking-[0.28em] uppercase text-[#FFE500]">
        NATIONAL SERVICE NETWORK
      </p>
      <h2 class="font-heading font-medium text-2xl sm:text-4xl lg:text-5xl tracking-[0.16em] uppercase text-white leading-tight">
        LAYANAN TEKNISI &amp; DUKUNGAN RESMI SELURUH INDONESIA
      </h2>
      <p class="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed pt-2">
        Komitmen kami tidak berhenti saat mesin terkirim. Tim teknisi profesional siap melayani instalasi, maintenance berkala, hingga kalibrasi warna di seluruh kota di Indonesia.
      </p>
    </div>

    <!-- 4 Coverage Pillars -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      <div class="p-6 bg-neutral-950/85 border border-white/15 space-y-2.5">
        <h4 class="font-heading font-medium text-base sm:text-lg text-[#FFE500] uppercase tracking-wider">
          Instalasi Langsung
        </h4>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Pemasangan mesin di lokasi usaha Anda dengan standar pengujian operasional menyeluruh.
        </p>
      </div>

      <div class="p-6 bg-neutral-950/85 border border-white/15 space-y-2.5">
        <h4 class="font-heading font-medium text-base sm:text-lg text-[#FFE500] uppercase tracking-wider">
          Training Operator
        </h4>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Pelatihan teknis pengoperasian mesin dan software RIP hingga operator Anda mahir berproduksi.
        </p>
      </div>

      <div class="p-6 bg-neutral-950/85 border border-white/15 space-y-2.5">
        <h4 class="font-heading font-medium text-base sm:text-lg text-[#FFE500] uppercase tracking-wider">
          Jaminan Sparepart
        </h4>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Ketersediaan suku cadang, printhead, dan tinta original ready stock di gudang resmi kami.
        </p>
      </div>

      <div class="p-6 bg-neutral-950/85 border border-white/15 space-y-2.5">
        <h4 class="font-heading font-medium text-base sm:text-lg text-[#FFE500] uppercase tracking-wider">
          Showroom &amp; Demo
        </h4>
        <p class="text-xs sm:text-sm text-neutral-300 leading-relaxed">
          Uji coba langsung hasil cetak menggunakan bahan Anda di Showroom Royal Town Surabaya.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ================================================================= -->
<!-- SECTION 5: FINAL AD CONVERSION BANNER (High Impact, Full Width)    -->
<!-- ================================================================= -->
<section class="w-full bg-[#050508] text-white py-20 sm:py-28 px-6 sm:px-10 lg:px-16 border-t border-white/15 select-none">
  <div class="max-w-4xl mx-auto text-center space-y-6 sm:space-y-8">
    <p class="font-heading font-light text-xs sm:text-sm tracking-[0.3em] uppercase text-[#FFE500]">
      START YOUR PRODUCTION TODAY
    </p>

    <h2 class="font-heading font-bold text-2xl sm:text-4xl lg:text-5xl tracking-[0.16em] uppercase text-white leading-tight">
      SIAP MEMILIKI MESIN INDUSTRIAL BERGARANSI RESMI?
    </h2>

    <p class="font-sans text-sm sm:text-base text-neutral-300 max-w-2xl mx-auto leading-relaxed">
      Dapatkan penawaran harga khusus iklan Google hari ini, bonus paket tinta awal, konsultasi kalkulasi Balik Modal (ROI), serta jadwal demo cetak gratis.
    </p>

    <div class="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
      <a
        href={getWaUrl('Halo ORIA, saya ingin konsultasi penawaran harga promo mesin dari iklan Google serta bonus paket usaha.')}
        target="_blank"
        rel="noopener noreferrer"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-10 py-5 bg-[#FFE500] text-black font-heading font-bold text-xs sm:text-sm tracking-[0.2em] uppercase hover:bg-white transition-colors duration-200"
      >
        <span>HUBUNGI VIA WHATSAPP SEKARANG</span>
        <svg class="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>

      <a
        href="/kontak"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-5 border border-white/20 text-white font-heading font-semibold text-xs sm:text-sm tracking-[0.2em] uppercase hover:border-[#FFE500] hover:text-[#FFE500] transition-colors duration-200 bg-neutral-950"
      >
        <span>LOKASI SHOWROOM SURABAYA</span>
        <svg class="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>
  </div>
</section>

<!-- ================================================================= -->
<!-- STICKY BOTTOM FLOATING BAR FOR MOBILE (Google Ads Instant Conversion) -->
<!-- ================================================================= -->
<aside
  class="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-black/95 backdrop-blur-md border-t border-white/20 p-3 select-none"
  aria-label="Aksi Cepat WhatsApp"
>
  <a
    href={getWaUrl('Halo ORIA, saya ingin konsultasi promo mesin digital printing via iklan Google.')}
    target="_blank"
    rel="noopener noreferrer"
    class="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 bg-[#FFE500] text-black font-heading font-bold text-xs tracking-[0.16em] uppercase hover:bg-white transition-colors"
  >
    <span>KONSULTASI VIA WHATSAPP</span>
    <svg class="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  </a>
</aside>

