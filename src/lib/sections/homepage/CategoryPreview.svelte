<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Siema from 'siema';
  import type { FormattedProduct } from '$lib/types/product';
  import { matchesCategory, getProductCategoryId } from '$lib/data/categories';

  let { products = [] }: { products?: FormattedProduct[] } = $props();

  const baseCategories = [
    {
      id: 'outdoor',
      title: 'Outdoor Printing',
      defaultTagline: 'ORIA OUTDOOR 3204 ST',
      defaultDesc: 'Mesin cetak spanduk flexi, baliho, dan billboard heavy-duty tahan cuaca ekstrem.',
      defaultHref: '/produk/outdoor/oria-outdoor-3204-st',
      image: '/images/categories/outdoor.webp',
      imgClass: 'max-h-[160px] sm:max-h-[200px] md:max-h-[235px] lg:max-h-[255px] max-w-[98%]',
      ctaText: 'DISCOVER'
    },
    {
      id: 'uv',
      title: 'UV Printing',
      defaultTagline: 'ORIA UV FLATBED A3',
      defaultDesc: 'Presisi cetak tinggi untuk media datar akrilik, kayu, kaca, dan merchandise.',
      defaultHref: '/produk/uv/oria-uv-flatbed-a3',
      image: '/images/categories/uv.webp',
      imgClass: 'max-h-[175px] sm:max-h-[220px] md:max-h-[255px] lg:max-h-[275px] max-w-[85%]',
      ctaText: 'DISCOVER'
    },
    {
      id: 'sublimasi',
      title: 'Sublimasi Textile',
      defaultTagline: 'ORIA SUBLIM 1902',
      defaultDesc: 'Inovasi cetak tekstil berkecepatan tinggi untuk apparel, jersey, dan fashion.',
      defaultHref: '/produk/sublimasi/oria-sublim-1902',
      image: '/images/categories/sublimasi.webp',
      imgClass: 'max-h-[170px] sm:max-h-[215px] md:max-h-[250px] lg:max-h-[270px] max-w-[95%]',
      ctaText: 'DISCOVER'
    },
    {
      id: 'laser',
      title: 'Laser Cutting',
      defaultTagline: 'ORIA LASER CUTTING 6040',
      defaultDesc: 'Potong dan grafir akrilik, kayu, MDF, dan souvenir dengan presisi tabung CO2 stabil.',
      defaultHref: '/produk/laser/oria-laser-cutting-6040',
      image: '/images/categories/laser.webp',
      imgClass: 'max-h-[170px] sm:max-h-[215px] md:max-h-[250px] lg:max-h-[270px] max-w-[85%]',
      ctaText: 'DISCOVER'
    },
    {
      id: 'dtf',
      title: 'DTF Printing',
      defaultTagline: 'ORIA DTF 6004',
      defaultDesc: 'Solusi transfer film otomatis untuk custom apparel dan sablon kaos massal.',
      defaultHref: '/produk/dtf/oria-dtf-6004',
      image: '/images/categories/dtf.webp',
      imgClass: 'max-h-[175px] sm:max-h-[220px] md:max-h-[255px] lg:max-h-[275px] max-w-[85%]',
      ctaText: 'DISCOVER'
    },
    {
      id: 'indoor',
      title: 'Indoor Printing',
      defaultTagline: 'ORIA INDOOR 3202',
      defaultDesc: 'Hasil cetak foto, poster, sticker, dan POSM display beresolusi tajam hingga lebar 3,2 meter.',
      defaultHref: '/produk/indoor/oria-indoor-3202',
      image: '/images/categories/indoor.webp',
      imgClass: 'max-h-[170px] sm:max-h-[215px] md:max-h-[250px] lg:max-h-[270px] max-w-[95%]',
      ctaText: 'DISCOVER'
    },
    {
      id: 'cnc',
      title: 'CNC Router',
      defaultTagline: 'ORIA CNC 6090',
      defaultDesc: 'Fabrikasi presisi logam, akrilik, reklame huruf timbul, dan panel dengan area kerja 60x90cm.',
      defaultHref: '/produk/cnc/oria-cnc-metal-6090',
      image: '/images/categories/cnc.webp',
      imgClass: 'max-h-[175px] sm:max-h-[220px] md:max-h-[255px] lg:max-h-[275px] max-w-[75%]',
      ctaText: 'DISCOVER'
    }
  ];

  const categories = $derived.by(() => {
    return baseCategories.map(cat => {
      const targetSlug = cat.defaultHref.split('/').pop()?.toLowerCase();
      const match =
        products.find(p => p.slug.toLowerCase() === targetSlug) ||
        products.find(p => p.name.toLowerCase() === cat.defaultTagline.toLowerCase()) ||
        products.find(p => matchesCategory(p, cat.id) && (cat.id !== 'uv' || p.name.toLowerCase().includes('flatbed'))) ||
        products.find(p => matchesCategory(p, cat.id));

      const count = products.filter(p => matchesCategory(p, cat.id)).length;
      return {
        id: cat.id,
        title: cat.title,
        tagline: match ? match.name : cat.defaultTagline,
        desc: cat.defaultDesc,
        href: match ? `/produk/${getProductCategoryId(match)}/${match.slug}` : cat.defaultHref,
        image: cat.image,
        imgClass: cat.imgClass,
        ctaText: 'DISCOVER',
        count
      };
    });
  });

  // Duplikasi kategori agar Siema dapat melakukan infinite loop mulus tanpa celah
  const carouselSlides = $derived([...categories, ...categories, ...categories]);

  let siemaEl: HTMLDivElement | null = $state(null);
  let controller: Siema | null = null;
  let activeIndex = $state(0);
  let currentCategoryIndex = $state(0);

  function updateCurrent() {
    if (!controller) return;
    const raw = controller.currentSlide;
    const total = carouselSlides.length;
    const n = categories.length;
    activeIndex = ((raw % total) + total) % total;
    currentCategoryIndex = ((raw % n) + n) % n;
  }

  function handlePrev() {
    controller?.prev();
  }

  function handleNext() {
    controller?.next();
  }

  onMount(() => {
    if (!siemaEl) return;

    controller = new Siema({
      selector: siemaEl,
      perPage: 1,
      loop: true,
      duration: 500,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      draggable: true,
      multipleDrag: false,
      threshold: 20,
      onChange: () => {
        updateCurrent();
      }
    });

    // Buat overflow visible pada container selector Siema agar slide kanan-kiri dapat mengintip (peek)
    if (siemaEl) {
      siemaEl.style.overflow = 'visible';
      const frame = siemaEl.firstElementChild as HTMLElement | null;
      if (frame) {
        frame.style.height = '100%';
        frame.style.display = 'flex';
        frame.style.alignItems = 'center';
        Array.from(frame.children).forEach((child) => {
          const el = child as HTMLElement;
          el.style.height = '100%';
          el.style.display = 'flex';
          el.style.alignItems = 'center';
          el.style.justifyContent = 'center';
          el.style.float = 'none';
        });
      }
    }

    updateCurrent();
  });

  onDestroy(() => {
    if (controller) {
      controller.destroy(true);
    }
  });

  let activeCategory = $derived(categories[currentCategoryIndex]);
</script>

<section class="relative w-full bg-white text-black pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden select-none">
  <!-- Top Center Header (Lotus Style: OUR MODELS) -->
  <div class="text-center mb-6 sm:mb-8">
    <h2 class="font-heading font-bold text-base sm:text-lg lg:text-xl uppercase tracking-[0.3em] text-neutral-800">
      OUR MODELS
    </h2>
  </div>

  <!-- Carousel Stage with Center Active Machine and Side Peek Previews (Equally Centered) -->
  <div class="relative w-full max-w-7xl mx-auto h-[210px] sm:h-[260px] md:h-[290px] lg:h-[320px] px-2 sm:px-6 flex items-center justify-center">
    <!-- Siema Viewport Container (Centered, sized so adjacent slides peek outside) -->
    <div
      bind:this={siemaEl}
      class="siema-carousel w-[82vw] sm:w-[70vw] md:w-[60vw] lg:w-[54vw] max-w-3xl h-full mx-auto cursor-grab active:cursor-grabbing"
    >
      {#each carouselSlides as cat, idx}
        <div class="w-full h-full flex-shrink-0 px-2 sm:px-4 md:px-6 transition-all duration-500 {idx === activeIndex ? 'opacity-100 scale-100' : 'opacity-35 sm:opacity-45 scale-[0.88]'}">
          <!-- Machine Display Card: Perfectly centered with pure white background -->
          <div class="relative w-full h-full flex items-center justify-center">
            <img
              src={cat.image}
              alt={cat.title}
              class="w-auto object-contain select-none pointer-events-none transition-transform duration-500 {cat.imgClass}"
              draggable="false"
              loading="lazy"
            />
          </div>
        </div>
      {/each}
    </div>

    <!-- Floating Navigation Controls: Centered at horizontal midline, Transparent Box -->
    <!-- Left Chevron Button -->
    <button
      type="button"
      onclick={handlePrev}
      class="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 border-2 border-neutral-300 hover:border-[#FFE500] bg-transparent text-neutral-800 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none group"
      aria-label="Model Sebelumnya"
    >
      <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
    </button>

    <!-- Right Chevron Button -->
    <button
      type="button"
      onclick={handleNext}
      class="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 border-2 border-neutral-300 hover:border-[#FFE500] bg-transparent text-neutral-800 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none group"
      aria-label="Model Berikutnya"
    >
      <svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
      </svg>
    </button>
  </div>

  <!-- Bottom Details: Active Model Name, Description, and Discover CTA (Lotus Style) -->
  {#if activeCategory}
    <div class="mt-6 sm:mt-8 text-center flex flex-col items-center px-6">
      <!-- Model Title (Enlarged) -->
      <h3 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.16em] text-neutral-900 transition-all duration-300">
        {activeCategory.tagline}
      </h3>

      <!-- Model Description (Enlarged) -->
      <p class="mt-2 font-sans text-sm sm:text-base lg:text-[17px] text-neutral-600 font-normal max-w-xl mx-auto leading-relaxed transition-all duration-300">
        {activeCategory.desc}
      </p>

      <!-- CTA Button: Transparent Box, Adapts to Section Background -->
      <div class="mt-5 sm:mt-6">
        <a
          href={activeCategory.href}
          class="inline-flex items-center gap-2.5 px-10 sm:px-12 py-3.5 sm:py-4 border border-black text-black hover:bg-black hover:text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-all duration-300 group bg-transparent"
        >
          <span>{activeCategory.ctaText}</span>
          <svg
            class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            aria-hidden="true"
          >
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>
  {/if}
</section>

<style>
  :global(.siema-carousel > div) {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
  }
  :global(.siema-carousel > div > div) {
    height: 100% !important;
    display: flex !important;
    align-items: center !important;
    justify-content: center !important;
    float: none !important;
  }
</style>
