<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();

  const product = $derived(data.product);
  const relatedProducts = $derived(data.relatedProducts || []);

  let activeImage = $state('');

  $effect(() => {
    if (product) {
      activeImage = product.imageUrl;
    }
  });

  const allImages = $derived([
    product.imageUrl,
    ...(product.galleryUrls || []).filter(url => url !== product.imageUrl)
  ]);
</script>

<svelte:head>
  <title>{product.name} - Spesifikasi & Harga Resmi ORIA</title>
  <meta
    name="description"
    content={product.shortDescription || `Spesifikasi lengkap, harga, dan fitur ${product.name} merk ORIA bergaransi resmi distributor.`}
  />
  <meta property="og:title" content="{product.name} - ORIA" />
  <meta property="og:description" content={product.shortDescription || product.name} />
  <meta property="og:image" content={product.imageUrl} />
</svelte:head>

<div class="w-full bg-white text-black py-10 lg:py-16 px-6 lg:px-12">
  <div class="max-w-6xl mx-auto space-y-12">
    <!-- Breadcrumbs -->
    <nav class="flex items-center gap-2 text-xs font-sans text-gray-500 uppercase tracking-wider" aria-label="Breadcrumb">
      <a href="/" class="hover:text-black transition-colors">Beranda</a>
      <span>/</span>
      <a href="/produk" class="hover:text-black transition-colors">Produk</a>
      <span>/</span>
      <span class="text-black font-semibold truncate max-w-xs sm:max-w-md">{product.name}</span>
    </nav>

    <!-- Product Showcase Top Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
      <!-- Image & Gallery (Left Column: 7 cols) -->
      <div class="lg:col-span-7 space-y-4">
        <!-- Main Image Stage -->
        <div class="relative aspect-[4/3] bg-neutral-50 border border-gray-200 overflow-hidden flex items-center justify-center p-6 sm:p-10">
          <img
            src={activeImage || product.imageUrl}
            alt={product.name}
            class="w-full h-full object-contain select-none transition-all duration-300"
          />
          <span class="absolute top-4 left-4 bg-black text-white text-xs font-mono tracking-widest px-3 py-1 uppercase">
            {product.sku}
          </span>
        </div>

        <!-- Gallery Thumbnails (if multiple images) -->
        {#if allImages.length > 1}
          <div class="flex items-center gap-3 overflow-x-auto pb-2">
            {#each allImages as img, idx}
              <button
                type="button"
                onclick={() => (activeImage = img)}
                class="relative w-20 h-20 shrink-0 bg-neutral-50 border transition-all p-1 flex items-center justify-center {activeImage === img ? 'border-black ring-1 ring-black' : 'border-gray-200 opacity-70 hover:opacity-100'}"
                aria-label="Tampilkan gambar ke-{idx + 1}"
              >
                <img src={img} alt="{product.name} view {idx + 1}" class="w-full h-full object-contain" />
              </button>
            {/each}
          </div>
        {/if}
      </div>

      <!-- Info & CTA (Right Column: 5 cols) -->
      <div class="lg:col-span-5 flex flex-col justify-start space-y-6">
        <div class="space-y-2 border-b border-gray-200 pb-5">
          <div class="font-sans text-xs font-bold uppercase tracking-widest text-gray-500">
            {product.categoryName} • BRAND {product.brand}
          </div>
          <h1 class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl text-black leading-tight tracking-tight">
            {product.name}
          </h1>
          <div class="font-mono text-xs text-gray-600 pt-1">
            SKU: {product.sku}
          </div>
        </div>

        <!-- Price Section -->
        <div class="space-y-1">
          <div class="font-sans text-xs font-bold uppercase tracking-widest text-gray-400">
            Estimasi Investasi
          </div>
          <div class="font-heading font-black text-3xl sm:text-4xl text-black tracking-tight">
            {product.priceText}
          </div>
          <p class="font-sans text-xs text-gray-500">
            *Harga belum termasuk diskon promo, paket bundle tinta, dan biaya ekspedisi luar pulau.
          </p>
        </div>

        <!-- Short Description -->
        {#if product.shortDescription}
          <div class="font-sans text-sm text-gray-800 leading-relaxed bg-neutral-50 p-4 border-l-2 border-black">
            {product.shortDescription}
          </div>
        {/if}

        <!-- Service Badges -->
        <div class="space-y-2 pt-1 font-sans text-xs text-gray-700">
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 stroke-black shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Garansi Resmi Sparepart & Servis 1 Tahun</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 stroke-black shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Instalasi & Pelatihan Operator Langsung di Lokasi Anda</span>
          </div>
          <div class="flex items-center gap-2">
            <svg class="w-4 h-4 stroke-black shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <span>Dukungan Pasokan Tinta & Sparepart Original Terjamin</span>
          </div>
        </div>

        <!-- CTAs -->
        <div class="space-y-3 pt-4">
          <a
            href="/kontak?unit={encodeURIComponent(product.name)}"
            class="w-full text-center block bg-black text-white py-3.5 text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity"
          >
            Minta Penawaran Resmi
          </a>

          <a
            href="https://wa.me/6281252086455?text={encodeURIComponent(product.whatsappMessage)}"
            target="_blank"
            rel="noopener noreferrer"
            class="w-full text-center flex items-center justify-center gap-2 border-2 border-black text-black py-3 text-xs font-semibold uppercase tracking-widest hover:bg-black hover:text-white transition-colors"
          >
            <span>Konsultasi Teknis WhatsApp</span>
            <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>

    <!-- Technical Specifications & HTML Content -->
    {#if product.descriptionHtml}
      <div class="border-t border-gray-200 pt-12 space-y-8">
        <div class="space-y-2">
          <div class="font-sans font-bold text-xs uppercase tracking-widest text-black">
            Dokumentasi Teknis
          </div>
          <h2 class="font-heading font-black text-3xl text-black tracking-tight">
            Spesifikasi & Keunggulan Mesin
          </h2>
        </div>

        <div class="oria-content text-black leading-relaxed">
          {@html product.descriptionHtml}
        </div>
      </div>
    {/if}

    <!-- Bottom Consultation Banner -->
    <div class="bg-black text-white p-8 sm:p-12 space-y-6">
      <div class="space-y-2">
        <div class="font-sans text-xs uppercase tracking-widest text-gray-400 font-bold">
          Layanan Pelanggan ORIA
        </div>
        <h3 class="font-heading font-bold text-2xl sm:text-3xl">
          Ingin Uji Coba Sample Cetak atau Demo Langsung?
        </h3>
        <p class="font-sans text-sm text-gray-300 max-w-2xl leading-relaxed">
          Kirimkan file desain atau bahan produksi Anda untuk pengujian kualitas cetak dan presisi mesin langsung bersama tim teknis spesialis kami di showroom.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 pt-2">
        <a
          href="/kontak?unit={encodeURIComponent(product.name)}"
          class="bg-white text-black px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:opacity-90 transition-opacity"
        >
          Jadwalkan Kunjungan / Demo
        </a>
        <a
          href="https://wa.me/6281252086455?text={encodeURIComponent('Halo ORIA, saya ingin info demo untuk unit: ' + product.name)}"
          target="_blank"
          rel="noopener noreferrer"
          class="border border-white text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest hover:bg-white hover:text-black transition-colors"
        >
          Chat WhatsApp Langsung
        </a>
      </div>
    </div>

    <!-- Related Products -->
    {#if relatedProducts.length > 0}
      <div class="border-t border-gray-200 pt-12 space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-sans font-bold text-xs uppercase tracking-widest text-gray-500">
              Rekomendasi Terkait
            </div>
            <h2 class="font-heading font-bold text-2xl text-black">
              Mesin Alternatif & Penunjang Lainnya
            </h2>
          </div>
          <a href="/produk" class="text-xs font-semibold uppercase tracking-widest hover:underline hidden sm:block">
            Lihat Semua Mesin &rarr;
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {#each relatedProducts as rel}
            <a
              href="/produk/{rel.slug}"
              class="group block bg-white border border-gray-200 hover:border-black transition-colors p-4 space-y-3"
            >
              <div class="aspect-[4/3] bg-neutral-50 flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={rel.imageUrl}
                  alt={rel.name}
                  class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-mono uppercase text-gray-500">{rel.sku}</div>
                <div class="font-heading font-bold text-sm text-black group-hover:underline line-clamp-2">
                  {rel.name}
                </div>
                <div class="text-xs font-extrabold text-black pt-1">{rel.priceText}</div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.oria-content) {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    line-height: 1.75;
    color: #1a1a1a;
  }

  :global(.oria-content h2) {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: #000000;
  }

  :global(.oria-content h3) {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: #000000;
  }

  :global(.oria-content p) {
    margin-bottom: 1rem;
  }

  :global(.oria-content ol),
  :global(.oria-content ul) {
    margin-left: 1.5rem;
    margin-bottom: 1.25rem;
    list-style-position: outside;
  }

  :global(.oria-content ol) {
    list-style-type: decimal;
  }

  :global(.oria-content ul) {
    list-style-type: disc;
  }

  :global(.oria-content li) {
    margin-bottom: 0.35rem;
  }

  :global(.oria-content table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.75rem 0;
    font-size: 0.875rem;
  }

  :global(.oria-content table th),
  :global(.oria-content table td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e5e5;
    text-align: left;
  }

  :global(.oria-content table th) {
    background-color: #000000;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  :global(.oria-content table tr:nth-child(even)) {
    background-color: #f9f9f9;
  }

  :global(.oria-content .video-wrapper) {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    margin: 2rem 0;
    background: #000;
  }

  :global(.oria-content .video-wrapper iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  :global(.oria-content .btn-download-wrapper) {
    margin: 1.5rem 0;
  }

  :global(.oria-content .btn-download-wrapper button) {
    background-color: #000000 !important;
    color: #ffffff !important;
    border-radius: 0 !important;
    font-size: 0.75rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    padding: 0.875rem 1.75rem !important;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  :global(.oria-content .btn-download-wrapper button:hover) {
    opacity: 0.85;
  }
</style>
