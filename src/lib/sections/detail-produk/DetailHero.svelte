<script lang="ts">
  import type { FormattedProduct } from '$lib/types/product';
  import type { ProductKeySpec } from '$lib/utils/product-specs';

  let {
    product,
    cleanModelName,
    specs,
    categoryId
  }: {
    product: FormattedProduct;
    cleanModelName: string;
    specs: ProductKeySpec[];
    categoryId?: string;
  } = $props();
</script>

<!-- ========================================================================= -->
<!-- HERO SECTION: FULL WIDTH, 100VH, GRADIENT HITAM DARI KIRI KE KANAN, TEKS PUTIH -->
<!-- ========================================================================= -->
<section id="overview" class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none">
  <!-- GAMBAR MESIN: Full width & 100vh, hanya sisi kanan (mesin) yang diambil sehingga space kiri terpotong -->
  <div class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden">
    <picture class="w-full h-full block overflow-hidden">
      {#if product.mainImageMobileUrl}
        <source media="(max-width: 640px)" srcset={product.mainImageMobileUrl} />
      {/if}
      <img
        src={product.mainImageDesktopUrl || product.imageUrl}
        alt={product.name}
        class="w-full h-full object-cover object-right select-none scale-[1.3] sm:scale-[1.45] lg:scale-[1.65] origin-[90%_75%] transition-transform duration-700"
        loading="eager"
      />
    </picture>
    <!-- Layer gradient hitam dari kiri ke kanan transparan -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black sm:via-black/85 lg:via-black/70 lg:to-transparent"></div>
  </div>

  <!-- KONTEN TEKS KIRI: Breadcrumbs & Judul, dan 4 Spesifikasi (2x2 di Desktop, 1 Kolom di Mobile, Tanpa Garis) -->
  <div class="relative z-20 w-full h-full px-6 sm:px-10 lg:px-16 pb-12 sm:pb-14 lg:pb-16 pointer-events-none">
    <div class="w-full h-full max-w-7xl mx-auto flex flex-col justify-between">
      <!-- ATAS: Breadcrumbs & Model Title Langsung (Diturunkan di bawah navbar row story & spec agar breadcrumb bisa diklik) -->
      <div class="max-w-xl lg:max-w-3xl xl:max-w-4xl pointer-events-auto pt-36 sm:pt-44 lg:pt-48">
        <!-- Breadcrumbs & Category Bar -->
        <nav class="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-neutral-300 font-medium" aria-label="Breadcrumb">
          <a href="/produk" class="hover:text-[#FFE500] transition-colors cursor-pointer">CATALOG</a>
          <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          {#if categoryId}
            <a href="/produk/{categoryId}" class="text-neutral-400 hover:text-[#FFE500] transition-colors cursor-pointer">{product.categoryName}</a>
          {:else}
            <span class="text-neutral-400">{product.categoryName}</span>
          {/if}
          <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
          <span class="text-[#FFE500] truncate max-w-[200px] sm:max-w-[280px] font-medium">{product.sku}</span>
        </nav>

        <!-- Main Model Name (Ukuran font seimbang & elegan, tidak terlalu besar atau terlalu kecil) -->
        <h1 class="mt-3 sm:mt-4 font-heading font-medium tracking-[0.16em] sm:tracking-[0.2em] text-3xl sm:text-4xl md:text-5xl lg:text-6xl uppercase text-[#FFE500] leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">
          {cleanModelName}
        </h1>
      </div>

      <!-- BAWAH: 4 Spesifikasi Utama (2x2 di Desktop, 1 Kolom di Mobile, Nilai font-medium, Tanpa Garis) -->
      <div class="pointer-events-auto w-full pt-6">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-6 sm:gap-y-8 max-w-3xl">
          {#each specs.slice(0, 4) as s}
            {@const isSize = s.val.includes('x') || s.val.endsWith('m') || s.val.endsWith('cm') || s.val.endsWith('mm')}
            <div class="flex sm:flex-col items-baseline sm:items-start justify-between sm:justify-start gap-1.5 sm:gap-2">
              <!-- Metric Primary Value (font-medium, bukan bold/black) -->
              <div class="font-heading font-medium tracking-tight text-white drop-shadow-lg flex items-baseline gap-2">
                {#if isSize && s.val.includes(' ')}
                  {@const parts = s.val.split(' ')}
                  <span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#FFE500] leading-none">{parts[0]}</span>
                  <span class="text-sm sm:text-base lg:text-xl font-medium text-[#FFE500] tracking-normal">{parts.slice(1).join(' ')}</span>
                {:else if s.val.includes(' ')}
                  {@const parts = s.val.split(' ')}
                  <span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-none">{parts[0]}</span>
                  <span class="text-sm sm:text-base lg:text-xl font-medium text-neutral-300 tracking-normal">{parts.slice(1).join(' ')}</span>
                {:else}
                  <span class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-none">{s.val}</span>
                {/if}
              </div>
              <!-- Metric Unit & Subtitle -->
              <div class="space-y-1 min-w-0">
                <div class="font-sans font-medium text-xs sm:text-sm uppercase tracking-wider {isSize ? 'text-[#FFE500]' : 'text-white'} drop-shadow-sm truncate">
                  {s.unit}
                </div>
                <div class="font-sans text-xs sm:text-[13px] text-neutral-300 leading-snug line-clamp-2 drop-shadow-sm font-normal">
                  {s.desc}
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    </div>
  </div>
</section>
