<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { FormattedProduct } from '$lib/types/product';
  import { getProductCategoryId } from '$lib/data/categories';

  interface FlagshipModel {
    id: string;
    name: string;
    tagline: string;
    desc: string;
    image: string;
    href: string;
  }

  let { products = [], activeIndex = $bindable(0) }: { products?: FormattedProduct[]; activeIndex?: number } = $props();

  // Dynamically resolve flagship machines from Strapi products
  const defaultModels: FlagshipModel[] = [
    {
      id: 'uv',
      name: 'UV FLATBED',
      tagline: 'ORIA UV Flatbed A3',
      desc: 'The high-precision ORIA UV Flatbed A3. An industrial multi-material printing platform that defines a new standard of micron accuracy across rigid, flexible, and cylindrical media.',
      image: '/images/showcase-products.png',
      href: '/produk/uv/oria-uv-flatbed-a3'
    },
    {
      id: 'sublimasi',
      name: 'SUBLIMASI',
      tagline: 'ORIA Sublim 1902',
      desc: 'The continuous-speed ORIA Sublim 1902. An industrial dye-sublimation powerhouse engineered for maximum ink efficiency, vivid saturation, and relentless 24/7 roll-to-roll textile manufacturing.',
      image: '/images/hero/sublim-oria-desktop.png',
      href: '/produk/sublimasi/oria-sublim-1902'
    },
    {
      id: 'outdoor',
      name: 'OUTDOOR',
      tagline: 'ORIA Outdoor 3204 ST',
      desc: 'The heavy-duty ORIA Outdoor 3204 ST. Engineered on a reinforced anti-vibration steel chassis for high-speed large format printing with unyielding all-weather durability.',
      image: '/images/hero/outdoor-oria-desktop.png',
      href: '/produk/outdoor/oria-outdoor-3204-st'
    }
  ];

  const models = $derived.by(() => {
    if (products.length === 0) return defaultModels;

    // Pick top flagship models from Strapi if available
    const uvProd = products.find(p => p.slug === 'oria-uv-flatbed-a3') || products.find(p => p.slug.includes('uv'));
    const sublimProd = products.find(p => p.slug === 'oria-sublim-1902' || p.slug === 'oria-sublim-1804') || products.find(p => p.slug.includes('sublim'));
    const outdoorProd = products.find(p => p.slug === 'oria-outdoor-3204-st') || products.find(p => p.slug.includes('outdoor'));
    const laserProd = products.find(p => p.slug === 'oria-fiber-laser-3015' || p.slug === 'oria-laser-cutting-6040') || products.find(p => p.slug.includes('laser'));

    const list: FlagshipModel[] = [];

    if (uvProd) {
      list.push({
        id: 'uv',
        name: 'UV FLATBED',
        tagline: uvProd.name,
        desc: uvProd.shortDescription || 'An industrial multi-material printing platform with micron accuracy across rigid, flexible, and cylindrical media.',
        image: uvProd.mainImageDesktopUrl || uvProd.imageUrl || '/images/showcase-products.png',
        href: `/produk/${getProductCategoryId(uvProd)}/${uvProd.slug}`
      });
    }

    if (sublimProd) {
      list.push({
        id: 'sublimasi',
        name: 'SUBLIMASI',
        tagline: sublimProd.name,
        desc: sublimProd.shortDescription || 'Industrial dye-sublimation powerhouse engineered for maximum ink efficiency, vivid saturation, and 24/7 roll-to-roll manufacturing.',
        image: sublimProd.mainImageDesktopUrl || sublimProd.imageUrl || '/images/hero/sublim-oria-desktop.png',
        href: `/produk/${getProductCategoryId(sublimProd)}/${sublimProd.slug}`
      });
    }

    if (outdoorProd) {
      list.push({
        id: 'outdoor',
        name: 'OUTDOOR',
        tagline: outdoorProd.name,
        desc: outdoorProd.shortDescription || 'Heavy-duty large format printing on reinforced anti-vibration steel chassis for all-weather durability.',
        image: outdoorProd.mainImageDesktopUrl || outdoorProd.imageUrl || '/images/hero/outdoor-oria-desktop.png',
        href: `/produk/${getProductCategoryId(outdoorProd)}/${outdoorProd.slug}`
      });
    }

    if (laserProd) {
      list.push({
        id: 'laser',
        name: 'FIBER LASER',
        tagline: laserProd.name,
        desc: laserProd.shortDescription || 'High-power optical fiber laser cutting system for micron-level metal fabrication.',
        image: laserProd.mainImageDesktopUrl || laserProd.imageUrl || '/images/core-precision.jpg',
        href: `/produk/${getProductCategoryId(laserProd)}/${laserProd.slug}`
      });
    }

    return list.length >= 3 ? list : defaultModels;
  });

  let isUserInteracted = $state(false);
  let autoplayTimer: ReturnType<typeof setInterval> | null = null;

  function selectModel(index: number, manual = true) {
    activeIndex = index;
    if (manual) {
      isUserInteracted = true;
    }
  }

  onMount(() => {
    autoplayTimer = setInterval(() => {
      if (!isUserInteracted) {
        activeIndex = (activeIndex + 1) % models.length;
      }
    }, 7000);
  });

  onDestroy(() => {
    if (autoplayTimer) clearInterval(autoplayTimer);
  });
</script>

<!-- ======================================================================= -->
<!-- SECTION: Flagship Model Switcher (Lotus Eletre / Emira / Emeya Style)  -->
<!-- ======================================================================= -->
<section
  id="flagship"
  class="relative w-full h-[92svh] min-h-[620px] max-h-[920px] bg-black text-white flex flex-col justify-between overflow-hidden select-none"
  aria-label="Flagship Industrial Machinery Showcase"
>
  <!-- Background Images with Cross-Fade Transition -->
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    {#each models as model, index}
      <div
        class="absolute inset-0 transition-opacity duration-700 ease-in-out {index === activeIndex ? 'opacity-100' : 'opacity-0'}"
      >
        <img
          src={model.image}
          alt={model.tagline}
          class="w-full h-full object-cover object-center lg:object-[center_right] transform scale-100 transition-transform duration-1000 ease-out"
          loading={index === 0 ? 'eager' : 'lazy'}
        />
      </div>
    {/each}

    <!-- Atmospheric Dark Cinematic Gradient Overlays (Lotus Luxury Aesthetics) -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/70"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-black/20"></div>
  </div>

  <!-- Top-Left: Model Selector Tabs (Lotus Vertical Switcher) -->
  <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 lg:pt-16">
    <div class="flex flex-col items-start space-y-2.5 sm:space-y-3.5">
      {#each models as model, index}
        <button
          type="button"
          onclick={() => selectModel(index, true)}
          onmouseenter={() => selectModel(index, true)}
          class="group text-left font-heading text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[0.25em] sm:tracking-[0.3em] transition-all duration-300 focus:outline-none cursor-pointer {index === activeIndex
            ? 'text-white font-normal opacity-100'
            : 'text-neutral-400 font-light opacity-35 hover:opacity-75 hover:text-white'}"
          aria-pressed={index === activeIndex}
        >
          <span class="block transition-transform duration-300 {index === activeIndex ? 'translate-x-1 sm:translate-x-2' : 'group-hover:translate-x-1'}">
            {model.name}
          </span>
        </button>
      {/each}
    </div>
  </div>

  <!-- Bottom Row: Narrative Description & Explore CTA Button -->
  <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 lg:pb-16">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8">
      <!-- Narrative Description (Left) -->
      <div class="max-w-xl">
        <p class="font-sans text-xs sm:text-sm lg:text-base text-neutral-200 leading-relaxed drop-shadow-md transition-all duration-500">
          {models[activeIndex].desc}
        </p>
      </div>

      <!-- Explore Button with Chevron (Right - Strict Rule: Chevron only, no arrows) -->
      <div class="flex-shrink-0">
        <a
          href={models[activeIndex].href}
          class="group inline-flex items-center gap-3 border border-white/80 hover:border-white px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
        >
          <span>EXPLORE {models[activeIndex].name}</span>
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
  </div>
</section>
