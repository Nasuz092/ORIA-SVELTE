<script lang="ts">
  import { page } from '$app/state';
  import type { PageData } from './$types';
  import ProdukHero from '$lib/sections/produk/ProdukHero.svelte';
  import ProdukOverview from '$lib/sections/produk/ProdukOverview.svelte';
  import ProdukCategories from '$lib/sections/produk/ProdukCategories.svelte';

  let { data }: { data: PageData } = $props();

  const products = $derived(data.products || []);

  let selectedCategory = $state('all');
  let searchQuery = $state('');

  $effect(() => {
    const catParam = page.url.searchParams.get('cat');
    if (catParam) {
      selectedCategory = catParam.toLowerCase();
    }
  });

  function handleCategorySelect(catId: string) {
    selectedCategory = catId;
    if (typeof window !== 'undefined') {
      const el = document.getElementById('catalog');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }
  }

  // Extract unique category options ordered by machine count in database
  const categoryTabs = [
    { key: 'all', label: 'All Machines' },
    { key: 'uv', label: 'UV Printing', match: ['uv', 'flatbed', 'rotary', 'cylinder', 'tumbler'] },
    { key: 'sublimasi', label: 'Sublimasi Textile', match: ['sublim', 'textile', 'fashion', 'kain'] },
    { key: 'laser', label: 'Laser Cutting', match: ['laser', 'co2', 'fiber', 'akrilik', 'mdf'] },
    { key: 'cnc', label: 'CNC Router', match: ['cnc', 'router', 'plasma', 'kayu', 'acp'] },
    { key: 'dtf', label: 'DTF Printing', match: ['dtf', 'apparel', 'kaos', 'dtg'] },
    { key: 'outdoor', label: 'Outdoor Printing', match: ['outdoor', 'solvent', 'spanduk', 'baliho', 'billboard'] },
    { key: 'indoor', label: 'Indoor Printing', match: ['indoor', 'eco-solvent', 'ecosolvent', 'banner', 'sticker', 'display'] },
    { key: 'consumable', label: 'Consumable & Ink', match: ['consumable', 'tinta', 'kertas'] }
  ];

  function matchesCategory(p: any, catKey: string): boolean {
    if (catKey === 'all') return true;
    const slug = (p.categorySlug || '').toLowerCase();
    const name = (p.categoryName || '').toLowerCase();
    const pName = (p.name || '').toLowerCase();

    if (catKey === 'laser') return pName.includes('laser');
    if (catKey === 'cnc') return (pName.includes('cnc') || pName.includes('router') || pName.includes('plasma')) && !pName.includes('laser');
    if (catKey === 'indoor') return slug.includes('indoor') || (pName.includes('indoor') && !pName.includes('outdoor')) || pName.includes('ecosolvent');
    if (catKey === 'outdoor') return (slug.includes('outdoor') || pName.includes('outdoor')) && !pName.includes('indoor') && !slug.includes('consumable');
    if (catKey === 'uv') return slug.includes('uv') || pName.includes('uv');
    if (catKey === 'sublimasi') return slug.includes('sublim') || (pName.includes('sublim') && !slug.includes('consumable'));
    if (catKey === 'dtf') return slug.includes('dtf') || slug.includes('dtg') || pName.includes('dtf') || pName.includes('dtg');
    if (catKey === 'consumable') return slug.includes('consumable') || pName.includes('tinta') || pName.includes('kertas');

    const tab = categoryTabs.find(t => t.key === catKey);
    if (tab?.match) {
      return tab.match.some(m => slug.includes(m) || name.includes(m) || pName.includes(m));
    }
    return slug.includes(catKey) || name.includes(catKey);
  }

  const filteredProducts = $derived(
    products.filter(p => {
      const matchCat = matchesCategory(p, selectedCategory);
      const query = searchQuery.trim().toLowerCase();
      const matchSearch = query === '' ||
        p.name.toLowerCase().includes(query) ||
        p.sku.toLowerCase().includes(query) ||
        p.shortDescription.toLowerCase().includes(query) ||
        p.categoryName.toLowerCase().includes(query);
      return matchCat && matchSearch;
    })
  );
</script>

<svelte:head>
  <title>ORIA Heritage - Industrial Machinery &amp; Digital Printing Portfolio</title>
  <meta
    name="description"
    content="Jelajahi seluruh kategori mesin industri ORIA: UV Flatbed, Sublimasi, Laser Cutting, CNC Router, DTF, dan Outdoor Printing berstandar presisi manufaktur."
  />
</svelte:head>

<!-- ======================================================================= -->
<!-- SECTION 1: Hero (Lotus Heritage Style - Full Bleed)                    -->
<!-- ======================================================================= -->
<ProdukHero />

<!-- ======================================================================= -->
<!-- SECTION 2: Overview Narrative (Lotus Iconic Heritage Style - Centered) -->
<!-- ======================================================================= -->
<ProdukOverview />

<!-- ======================================================================= -->
<!-- SECTION 3: Category Cards (Lotus Heritage Cars Style - Borderless 3-Col)-->
<!-- ======================================================================= -->
<ProdukCategories onSelectCategory={handleCategorySelect} />

<!-- ======================================================================= -->
<!-- SECTION 4: Machine Catalog & Filters (Clean Architectural Grid)        -->
<!-- ======================================================================= -->
<div id="catalog" class="w-full bg-white text-black py-20 sm:py-28 px-6 sm:px-10 lg:px-16 scroll-mt-20 border-t border-neutral-200">
  <div class="max-w-7xl mx-auto space-y-12">
    <!-- Section Header -->
    <div class="space-y-3">
      <div class="font-mono text-xs uppercase tracking-[0.25em] text-neutral-500 font-semibold">
        FULL PORTFOLIO
      </div>
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black">
        CATALOG &amp; SPECIFICATIONS
      </h2>
      <p class="font-sans text-sm sm:text-base text-neutral-600 max-w-2xl leading-relaxed pt-1">
        Jelajahi seluruh mesin industri ORIA berkinerja tinggi yang dirancang untuk stabilitas operasional, efisiensi konsumsi bahan, dan presisi mikron.
      </p>
    </div>

    <!-- Filters & Search -->
    <div class="space-y-6">
      <!-- Search Input -->
      <div class="max-w-md">
        <label for="search" class="font-sans font-bold text-xs uppercase tracking-widest block mb-2 text-black">
          Cari Tipe Mesin / SKU / Kategori
        </label>
        <div class="relative">
          <input
            id="search"
            type="text"
            bind:value={searchQuery}
            placeholder="Ketik tipe mesin, misal: DTG, UV, Laser, CNC..."
            class="w-full bg-white text-black text-sm p-3 pr-10 border-b-2 border-black focus:outline-none placeholder:text-black placeholder:opacity-40"
          />
          {#if searchQuery}
            <button
              type="button"
              onclick={() => searchQuery = ''}
              class="absolute right-2 top-3 text-xs font-bold uppercase text-black hover:opacity-60"
            >
              Hapus
            </button>
          {/if}
        </div>
      </div>

      <!-- Categories Filter Tabs -->
      <div class="flex flex-wrap gap-x-6 gap-y-3 pt-2 text-xs font-semibold uppercase tracking-wider border-b border-gray-200 pb-4">
        {#each categoryTabs as tab}
          <button
            type="button"
            onclick={() => selectedCategory = tab.key}
            class="pb-1 transition-all {selectedCategory === tab.key ? 'text-black font-black border-b-2 border-black -mb-[17px]' : 'text-gray-500 hover:text-black'}"
          >
            {tab.label}
          </button>
        {/each}
      </div>
    </div>

    <!-- Product Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 pt-4">
      {#each filteredProducts as p (p.id)}
        <div class="group flex flex-col bg-white border border-gray-200 hover:border-black transition-colors duration-200 overflow-hidden">
          <!-- Product Image Container -->
          <a
            href="/produk/{p.slug}"
            class="relative aspect-[4/3] bg-neutral-50 overflow-hidden flex items-center justify-center p-4 border-b border-gray-100"
          >
            <img
              src={p.imageUrl}
              alt={p.name}
              class="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300 ease-out"
              loading="lazy"
            />
            <span class="absolute top-3 left-3 bg-black text-white text-[10px] font-mono tracking-widest px-2 py-0.5 uppercase">
              {p.sku}
            </span>
          </a>

          <!-- Product Details -->
          <div class="p-5 flex-1 flex flex-col justify-between space-y-4">
            <div class="space-y-2">
              <div class="font-sans text-[11px] font-bold uppercase tracking-widest text-gray-500">
                {p.categoryName}
              </div>
              <h3 class="font-heading font-bold text-lg text-black leading-snug group-hover:underline">
                <a href="/produk/{p.slug}">
                  {p.name}
                </a>
              </h3>
              {#if p.shortDescription}
                <p class="font-sans text-xs text-gray-700 line-clamp-2 leading-relaxed">
                  {p.shortDescription}
                </p>
              {/if}
            </div>

            <div class="space-y-4 pt-2">
              <div class="font-sans font-extrabold text-base text-black">
                {p.priceText}
              </div>

              <!-- Action Links (Strict Rule: Chevron only, never arrow) -->
              <div class="flex items-center gap-3 pt-1">
                <a
                  href="/produk/{p.slug}"
                  class="flex-1 inline-flex items-center justify-center gap-2 bg-black text-white py-2.5 px-4 text-xs font-semibold uppercase tracking-widest hover:opacity-85 transition-opacity group/btn"
                >
                  <span>Detail Mesin</span>
                  <svg class="w-3.5 h-3.5 stroke-current transition-transform duration-300 group-hover/btn:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
                <a
                  href="https://wa.me/6281252086455?text={encodeURIComponent(p.whatsappMessage)}"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Konsultasi WhatsApp untuk {p.name}"
                  class="border border-black p-2.5 hover:bg-black hover:text-white transition-colors flex items-center justify-center"
                  title="WhatsApp"
                >
                  <svg class="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      {/each}
    </div>

    <!-- Empty State -->
    {#if filteredProducts.length === 0}
      <div class="py-20 text-center space-y-4 border border-dashed border-gray-300 p-8">
        <p class="font-sans text-base text-black font-medium">
          Tidak ada mesin yang sesuai dengan pencarian atau filter yang dipilih.
        </p>
        <button
          type="button"
          onclick={() => { searchQuery = ''; selectedCategory = 'all'; }}
          class="font-sans font-bold text-xs uppercase tracking-widest bg-black text-white px-5 py-2.5 hover:opacity-80 transition-opacity"
        >
          Reset Filter &amp; Pencarian
        </button>
      </div>
    {/if}
  </div>
</div>
