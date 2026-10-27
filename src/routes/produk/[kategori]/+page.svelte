<script lang="ts">
  import type { PageData } from './$types';
  import SEO from '$lib/components/seo/SEO.svelte';

  let { data }: { data: PageData } = $props();

  const category = $derived(data.category);
  const products = $derived(data.products || []);

  const categoryItemListSchema = $derived({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: `Lini Mesin ${category.name} ORIA`,
    description: category.description,
    numberOfItems: products.length,
    itemListElement: products.map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.name,
      url: `https://oria.co.id/produk/${category.id}/${p.slug}`
    }))
  });
</script>

<SEO
  title="Mesin {category.name} ORIA | Spesifikasi, Harga & Garansi Resmi"
  description={category.description}
  keywords="mesin {category.name.toLowerCase()}, jual mesin {category.heroLine2.toLowerCase()}, spesifikasi mesin {category.name.toLowerCase()} oria, distributor mesin percetakan"
  canonical="/produk/{category.id}"
  image={category.heroImage}
  breadcrumbs={[
    { name: 'Beranda', url: '/' },
    { name: 'Produk', url: '/produk' },
    { name: category.name, url: `/produk/${category.id}` }
  ]}
  customSchemas={[categoryItemListSchema]}
/>

<!-- ======================================================================= -->
<!-- SECTION 1: Category Hero (Lotus Style - Custom Category)               -->
<!-- ======================================================================= -->
<section class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none flex flex-col justify-end">
  <!-- Hero Background Image -->
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <picture>
      {#if category.heroImageMobile}
        <source media="(max-width: 768px)" srcset={category.heroImageMobile} />
      {/if}
      <img
        src={category.heroImage}
        alt={category.name}
        class="w-full h-full object-cover object-center lg:object-[center_45%]"
        loading="eager"
      />
    </picture>
    <!-- Cinematic Dark Gradient Overlay (Gradasi hitam ke transparan) -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/90 sm:via-black/40 sm:to-transparent"></div>
  </div>

  <!-- Bottom Left: Lotus-Style Hero Typography -->
  <div class="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24">
    <div class="max-w-7xl mx-auto w-full">
      <div class="space-y-3 sm:space-y-4 max-w-3xl">
        <!-- Tag / Category in Yellow Tracked Heading (Ukuran font seimbang & elegan) -->
        <h1 class="font-heading font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#FFE500] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
          <span class="block">{category.heroLine1}</span>
          <span class="block mt-1 sm:mt-1.5">{category.heroLine2}</span>
        </h1>

        <!-- Subtitle in White Tracked Uppercase -->
        <div class="font-heading font-medium text-xs sm:text-sm md:text-base tracking-[0.28em] text-white uppercase pt-1 sm:pt-2 drop-shadow-md">
          {category.heroSubtitle}
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================================= -->
<!-- SECTION 2: Category Products Grid (1:1 Product Image, Title, CTA Button)-->
<!-- ======================================================================= -->
<section id="products-grid" class="w-full bg-white text-black py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none border-t border-neutral-200">
  <div class="max-w-7xl mx-auto">
    <!-- Back to All Categories Breadcrumb (Chevron only) -->
    <div class="mb-12 sm:mb-16">
      <a
        href="/produk"
        class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600 hover:text-black transition-colors group"
      >
        <svg
          class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>ALL CATEGORIES</span>
      </a>
    </div>

    <!-- 3-Column Borderless Grid (Lotus Heritage Style) -->
    {#if products.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
        {#each products as product (product.id)}
          <a
            href="/produk/{category.id}/{product.slug}"
            class="group block flex flex-col focus:outline-none cursor-pointer"
          >
            <!-- 1:1 Ratio Machine Image Box: Full width, hanya sisi kanan (mesin) yang diambil sehingga space kiri terpotong -->
            <div class="w-full aspect-square overflow-hidden bg-neutral-100 relative border border-neutral-200 shadow-sm">
              <img
                src={product.mainImageDesktopUrl || product.imageUrl}
                alt={product.name}
                class="w-full h-full object-cover object-right scale-100 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none select-none"
                loading="lazy"
              />
            </div>

            <!-- Nama Produk & Tombol Lihat Detail -->
            <div class="mt-5 space-y-2.5">
              <!-- Nama Produk -->
              <h2 class="font-heading font-medium text-base sm:text-lg lg:text-xl text-black uppercase tracking-[0.16em] group-hover:underline transition-colors leading-snug">
                {product.name}
              </h2>

              <!-- Tombol Lihat Detail dengan Chevron (Strict Rule: Chevron only, no arrows) -->
              <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700 group-hover:text-black transition-colors">
                <span>VIEW SPECIFICATIONS</span>
                <svg
                  class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke-width="2.5"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </div>
          </a>
        {/each}
      </div>
    {:else}
      <!-- Empty State -->
      <div class="text-center py-20 space-y-4">
        <p class="font-heading text-lg sm:text-xl uppercase tracking-wider text-neutral-600">
          Belum ada produk terdaftar di kategori ini.
        </p>
        <a
          href="/produk"
          class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black hover:underline"
        >
          <span>LIHAT KATEGORI LAINNYA</span>
          <svg
            class="w-4 h-4 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    {/if}
  </div>
</section>
