<script lang="ts">
  import type { FormattedProduct } from '$lib/types/product';
  import { CATEGORIES, matchesCategory, getProductCategoryId } from '$lib/data/categories';

  let { products = [] }: { products?: FormattedProduct[] } = $props();

  let selectedCategory = $state('all');
  let searchQuery = $state('');

  const filterTabs = $derived([
    { id: 'all', label: 'SEMUA MESIN', count: products.length },
    ...CATEGORIES.map(cat => ({
      id: cat.id,
      label: cat.name.toUpperCase(),
      count: products.filter(p => matchesCategory(p, cat.id)).length
    }))
  ]);

  const filteredProducts = $derived(
    products.filter(p => {
      const matchCat = matchesCategory(p, selectedCategory);
      const q = searchQuery.trim().toLowerCase();
      const matchSearch =
        q === '' ||
        p.name.toLowerCase().includes(q) ||
        p.sku.toLowerCase().includes(q) ||
        p.categoryName.toLowerCase().includes(q) ||
        p.shortDescription.toLowerCase().includes(q);
      return matchCat && matchSearch;
    })
  );

  function resetFilters() {
    selectedCategory = 'all';
    searchQuery = '';
  }
</script>

<!-- ======================================================================= -->
<!-- SECTION: Full Machinery Portfolio & Catalog (All Published Strapi Units)-->
<!-- ======================================================================= -->
<section
  id="catalog"
  class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-t border-neutral-800 select-none scroll-mt-20"
>
  <div class="max-w-7xl mx-auto space-y-12 sm:space-y-16">
    <!-- Header: Editorial Lotus Heritage Title -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
      <div class="space-y-3 max-w-2xl">
        <span class="font-sans font-bold text-xs uppercase tracking-[0.25em] text-[#FFE500]">
          KATALOG RESMI ORIA
        </span>
        <h2 class="font-heading font-medium text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.16em] text-white leading-tight">
          PORTOFOLIO MESIN LENGKAP
        </h2>
        <p class="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
          Menampilkan seluruh {products.length} unit mesin industri dan percetakan presisi bergaransi resmi ORIA yang siap diuji langsung di demo lab showroom kami.
        </p>
      </div>

      <!-- Live Search Input -->
      <div class="w-full md:w-80 flex-shrink-0">
        <label for="catalog-search" class="sr-only">Cari mesin atau spesifikasi</label>
        <div class="relative">
          <input
            id="catalog-search"
            type="text"
            bind:value={searchQuery}
            placeholder="Cari tipe, SKU, kategori..."
            class="w-full bg-neutral-900 border border-neutral-800 focus:border-[#FFE500] text-white text-xs px-4 py-3 pr-10 uppercase tracking-widest placeholder:text-neutral-500 placeholder:normal-case focus:outline-none transition-colors"
          />
          {#if searchQuery}
            <button
              type="button"
              onclick={() => (searchQuery = '')}
              class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-white text-xs font-bold p-1 cursor-pointer"
              aria-label="Bersihkan pencarian"
            >
              ✕
            </button>
          {:else}
            <div class="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500 pointer-events-none">
              <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                <circle cx="11" cy="11" r="8" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M21 21l-4.35-4.35" />
              </svg>
            </div>
          {/if}
        </div>
      </div>
    </div>

    <!-- Category Filter Tabs (Scrollable on Mobile, Wrap on Desktop) -->
    <div class="flex items-center gap-2 overflow-x-auto no-scrollbar pb-2">
      {#each filterTabs as tab}
        {#if tab.count > 0 || tab.id === 'all'}
          <button
            type="button"
            onclick={() => (selectedCategory = tab.id)}
            class="flex-shrink-0 px-4 sm:px-5 py-2.5 text-xs font-semibold uppercase tracking-[0.18em] transition-all duration-200 border cursor-pointer {selectedCategory === tab.id
              ? 'bg-[#FFE500] text-black border-[#FFE500] font-bold shadow-md'
              : 'bg-neutral-900/80 text-neutral-400 border-neutral-800 hover:border-neutral-600 hover:text-white'}"
          >
            <span>{tab.label}</span>
            <span class="ml-1.5 opacity-70 text-[10px]">({tab.count})</span>
          </button>
        {/if}
      {/each}
    </div>

    <!-- Product Grid (Responsive: 1-col mobile, 2-col tablet, 3-col desktop) -->
    {#if filteredProducts.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
        {#each filteredProducts as product (product.id)}
          {@const catId = getProductCategoryId(product)}
          <div
            class="group flex flex-col bg-neutral-950 border border-neutral-800 hover:border-neutral-600 transition-all duration-300 overflow-hidden"
          >
            <!-- 1:1 Aspect Ratio Machine Image Frame -->
            <a
              href="/produk/{catId}/{product.slug}"
              class="relative aspect-square w-full bg-black overflow-hidden flex items-center justify-center p-6 border-b border-neutral-900 block cursor-pointer"
            >
              <img
                src={product.cardImageUrl || product.mainImageDesktopUrl || product.imageUrl}
                alt={product.name}
                class="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none select-none"
                loading="lazy"
              />

              <!-- Top Left: SKU Tag -->
              <span class="absolute top-4 left-4 bg-white/10 backdrop-blur-md text-white text-[10px] font-mono tracking-widest px-2.5 py-1 uppercase border border-white/15">
                {product.sku}
              </span>

              <!-- Top Right: Featured Badge if active -->
              {#if product.isFeatured}
                <span class="absolute top-4 right-4 bg-[#FFE500] text-black text-[10px] font-bold tracking-widest px-2 py-0.5 uppercase shadow-sm">
                  FLAGSHIP
                </span>
              {/if}
            </a>

            <!-- Card Content Details -->
            <div class="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-6">
              <div class="space-y-2.5">
                <!-- Category Name -->
                <div class="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-[#FFE500]">
                  {product.categoryName}
                </div>

                <!-- Product Title Link -->
                <h3 class="font-heading font-medium text-lg sm:text-xl text-white uppercase tracking-[0.14em] leading-snug group-hover:text-[#FFE500] transition-colors">
                  <a href="/produk/{catId}/{product.slug}" class="focus:outline-none">
                    {product.name}
                  </a>
                </h3>

                <!-- Short Description -->
                {#if product.shortDescription}
                  <p class="font-sans text-xs text-neutral-400 line-clamp-2 leading-relaxed pt-1">
                    {product.shortDescription}
                  </p>
                {/if}
              </div>

              <!-- Price & CTA Action Buttons (Strict Rule: Chevron Only, No Arrows) -->
              <div class="space-y-4 pt-2 border-t border-neutral-900">
                <div class="flex items-baseline justify-between">
                  <span class="text-[10px] uppercase font-mono tracking-widest text-neutral-500">Estimasi / Harga</span>
                  <span class="font-sans font-bold text-sm sm:text-base text-white tracking-wide">
                    {product.priceText}
                  </span>
                </div>

                <div class="flex items-center gap-3">
                  <!-- View Specification Button (Chevron only) -->
                  <a
                    href="/produk/{catId}/{product.slug}"
                    class="flex-1 inline-flex items-center justify-center gap-2 bg-white text-black hover:bg-[#FFE500] hover:text-black py-3 px-4 text-xs font-bold uppercase tracking-[0.2em] transition-all duration-300 group/btn cursor-pointer shadow-sm"
                  >
                    <span>SPESIFIKASI</span>
                    <svg
                      class="w-3.5 h-3.5 stroke-current transition-transform duration-300 group-hover/btn:translate-x-1"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke-width="2.5"
                      aria-hidden="true"
                    >
                      <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                    </svg>
                  </a>

                  <!-- Direct WhatsApp Button -->
                  <a
                    href="https://wa.me/6281252086455?text={encodeURIComponent(product.whatsappMessage)}"
                    target="_blank"
                    rel="noopener noreferrer"
                    class="size-10 border border-neutral-800 hover:border-[#FFE500] hover:text-[#FFE500] text-neutral-300 flex items-center justify-center transition-colors cursor-pointer flex-shrink-0"
                    title="Konsultasi WhatsApp {product.name}"
                    aria-label="Konsultasi WhatsApp untuk unit {product.name}"
                  >
                    <svg class="w-4 h-4 fill-current" viewBox="0 0 24 24" aria-hidden="true">
                      <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.82 9.82 0 0012.04 2m.01 1.67c2.2 0 4.26.86 5.82 2.42a8.23 8.23 0 012.41 5.83c0 4.54-3.7 8.24-8.24 8.24-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.19 8.19 0 01-1.26-4.38c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.01-1.24-.74-.66-1.24-1.48-1.39-1.73-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.15.17-.25.25-.42.08-.17.04-.32-.02-.45-.06-.13-.56-1.35-.77-1.85-.2-.49-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.88.86-.88 2.1s.9 2.43 1.03 2.6c.13.17 1.77 2.7 4.28 3.79.6.26 1.07.41 1.43.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.15-1.18-.06-.12-.22-.19-.47-.32z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        {/each}
      </div>
    {:else}
      <!-- Empty Search State -->
      <div class="py-24 text-center space-y-5 border border-dashed border-neutral-800 p-8 sm:p-12">
        <div class="text-neutral-500 font-mono text-sm tracking-widest uppercase">0 Mesin Ditemukan</div>
        <h3 class="font-heading text-xl sm:text-2xl uppercase tracking-wider text-white">
          Tidak ada unit mesin yang cocok dengan kriteria "{searchQuery}"
        </h3>
        <p class="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mx-auto">
          Coba periksa kembali ejaan kata kunci atau reset filter kategori untuk melihat seluruh 34 unit portofolio kami.
        </p>
        <div class="pt-2">
          <button
            type="button"
            onclick={resetFilters}
            class="px-6 py-3 bg-[#FFE500] text-black font-sans font-bold text-xs uppercase tracking-widest hover:bg-white transition-colors cursor-pointer"
          >
            RESET FILTER &amp; PENCARIAN
          </button>
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
