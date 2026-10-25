<script lang="ts">
  import type { FormattedProduct } from '$lib/types/product';
  import type { ProductKeySpec } from '$lib/utils/product-specs';

  let {
    product,
    cleanModelName,
    specs
  }: {
    product: FormattedProduct;
    cleanModelName: string;
    specs: ProductKeySpec[];
  } = $props();
</script>

<!-- ========================================================================= -->
<!-- HERO SECTION: FULL WIDTH, 100VH, GRADIENT HITAM DARI KIRI KE KANAN, TEKS PUTIH -->
<!-- ========================================================================= -->
<section id="overview" class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none">
  <!-- GAMBAR MESIN: Full width & 100vh (Desktop / Mobile dari Strapi) -->
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <picture class="w-full h-full">
      {#if product.mainImageMobileUrl}
        <source media="(max-width: 640px)" srcset={product.mainImageMobileUrl} />
      {/if}
      <img
        src={product.mainImageDesktopUrl || product.imageUrl}
        alt={product.name}
        class="w-full h-full object-cover object-center lg:object-[center_right] select-none"
        loading="eager"
      />
    </picture>
    <!-- Layer gradient hitam dari kiri ke kanan transparan -->
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>
  </div>

  <!-- KONTEN TEKS KIRI: Breadcrumbs & Judul (Agak Diturunkan), dan 4 Spesifikasi (Mepet ke Bawah) -->
  <div class="relative z-20 w-full h-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-14 lg:pb-16 flex flex-col justify-between pointer-events-none">
    <!-- ATAS: Breadcrumbs & Model Title (Agak Diturunkan) -->
    <div class="max-w-xl lg:max-w-2xl xl:max-w-3xl pointer-events-auto">
      <!-- Breadcrumbs & Category Bar (Menggunakan Chevron, Bukan '/') -->
      <nav class="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-neutral-300" aria-label="Breadcrumb">
        <a href="/produk" class="hover:text-[#FFE500] transition-colors">CATALOG</a>
        <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-neutral-400">{product.categoryName}</span>
        <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-[#FFE500] truncate max-w-[200px] sm:max-w-[280px] font-semibold">{product.sku}</span>
      </nav>

      <!-- Brand Prefix Kecil Elegan (Lotus Style: LOTUS EMIRA) -->
      <div class="mt-4 sm:mt-5 font-mono text-[11px] sm:text-xs md:text-sm tracking-[0.35em] uppercase text-neutral-300 drop-shadow-md">
        ORIA &middot; INDUSTRIAL MACHINERY
      </div>

      <!-- Main Model Name: Kuning, Ukuran Pas & Terbaca Mewah -->
      <h1 class="mt-2 sm:mt-3 font-heading font-normal tracking-[0.18em] sm:tracking-[0.22em] text-3xl sm:text-4xl md:text-5xl lg:text-5xl xl:text-6xl uppercase text-[#FFE500] leading-[1.12] drop-shadow-[0_4px_24px_rgba(0,0,0,0.95)]">
        {cleanModelName}
      </h1>

      <!-- Full Machine Name Sub-Label (White) -->
      <div class="mt-2 font-sans font-medium text-xs sm:text-sm md:text-base tracking-wider text-neutral-200 drop-shadow-md">
        {product.name}
      </div>
    </div>

    <!-- BAWAH: 4 Spesifikasi Utama (Mepet ke Bawah, Di Mobile 1 Baris ke Bawah) -->
    <div class="pointer-events-auto w-full pt-6">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-8 border-t border-white/20 pt-5 sm:pt-6 max-w-5xl">
        {#each specs as s}
          {@const isSize = s.val.includes('x') || s.val.endsWith('m') || s.val.endsWith('cm') || s.val.endsWith('mm')}
          <div class="flex sm:flex-col items-baseline sm:items-start justify-between sm:justify-start gap-2 sm:gap-1.5 pb-2 sm:pb-0 border-b border-white/10 sm:border-b-0">
            <!-- Metric Primary Value -->
            <div class="font-heading font-medium tracking-tight text-white drop-shadow-md flex items-baseline gap-1.5">
              {#if isSize && s.val.includes(' ')}
                {@const parts = s.val.split(' ')}
                <span class="text-xl sm:text-2xl lg:text-3xl font-bold text-[#FFE500]">{parts[0]}</span>
                <span class="text-xs sm:text-sm lg:text-base font-normal text-[#FFE500] tracking-normal">{parts.slice(1).join(' ')}</span>
              {:else if s.val.includes(' ')}
                {@const parts = s.val.split(' ')}
                <span class="text-xl sm:text-2xl lg:text-3xl font-bold">{parts[0]}</span>
                <span class="text-xs sm:text-sm lg:text-base font-normal text-neutral-300 tracking-normal">{parts.slice(1).join(' ')}</span>
              {:else}
                <span class="text-xl sm:text-2xl lg:text-3xl font-bold">{s.val}</span>
              {/if}
            </div>
            <!-- Metric Unit & Subtitle -->
            <div class="space-y-0.5 min-w-0">
              <div class="font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider {isSize ? 'text-[#FFE500]' : 'text-white'} drop-shadow-sm truncate">
                {s.unit}
              </div>
              <div class="font-sans text-[10px] sm:text-[11px] text-neutral-300 leading-tight line-clamp-2 drop-shadow-sm">
                {s.desc}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
