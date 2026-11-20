<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import type { FormattedProduct } from '$lib/types/product';
  import { CATEGORIES, matchesCategory } from '$lib/data/categories';

  interface FlagshipModel {
    id: string;
    name: string;
    tagline: string;
    desc: string;
    image: string;
    href: string;
  }

  let { products = [], activeIndex = $bindable(0) }: { products?: FormattedProduct[]; activeIndex?: number } = $props();

  const categoryTabs: { id: string; name: string; fallbackDesc: string; fallbackImage: string }[] = [
    {
      id: 'uv',
      name: 'UV FLATBED',
      fallbackDesc: 'Presisi cetak mikron pada media datar akrilik, kayu, kaca, dan silinder.',
      fallbackImage: '/images/categories/card-uv.webp'
    },
    {
      id: 'sublimasi',
      name: 'SUBLIMASI',
      fallbackDesc: 'Produksi massal jersey dan tekstil berkecepatan tinggi dengan saturasi warna pekat.',
      fallbackImage: '/images/categories/card-sublimasi.webp'
    },
    {
      id: 'outdoor',
      name: 'OUTDOOR',
      fallbackDesc: 'Cetak billboard dan baliho tahan cuaca ekstrem dengan sasis baja anti-vibrasi.',
      fallbackImage: '/images/categories/card-outdoor.webp'
    },
    {
      id: 'indoor',
      name: 'INDOOR',
      fallbackDesc: 'Cetak eco-solvent resolusi tinggi untuk stiker, poster, dan display interior.',
      fallbackImage: '/images/categories/card-indoor.webp'
    },
    {
      id: 'dtf',
      name: 'DTF',
      fallbackDesc: 'Sistem cetak film transfer digital untuk sablon kaos dan apparel custom.',
      fallbackImage: '/images/categories/card-dtf.webp'
    },
    {
      id: 'dtg',
      name: 'DTG',
      fallbackDesc: 'Cetak langsung ke atas kaos jadi dengan hasil warna tajam dan lembut di serat kain.',
      fallbackImage: '/images/categories/card-dtg.webp'
    },
    {
      id: 'laser',
      name: 'LASER CUTTING',
      fallbackDesc: 'Pemotongan dan pengukiran presisi pada akrilik, kayu, kain, hingga plat logam.',
      fallbackImage: '/images/categories/card-laser.webp'
    },
    {
      id: 'cnc',
      name: 'CNC ROUTER',
      fallbackDesc: 'Fabrikasi berat untuk pemotongan dan ukir kayu, MDF, ACP, dan logam industri.',
      fallbackImage: '/images/categories/card-cnc.webp'
    },
    {
      id: 'single-pass',
      name: 'SINGLE PASS',
      fallbackDesc: 'Cetak digital kemasan kardus dan corrugated box berkecepatan tinggi tanpa pelat.',
      fallbackImage: '/images/categories/card-single-pass.webp'
    }
  ];

  const models = $derived.by(() => {
    return categoryTabs.map((tab) => {
      const catInfo = CATEGORIES.find((c) => c.id === tab.id);
      const matched = products.find((p) => matchesCategory(p, tab.id));
      return {
        id: tab.id,
        name: tab.name,
        tagline: matched?.name || catInfo?.name || tab.name,
        desc: tab.fallbackDesc,
        image: matched?.mainImageDesktopUrl || matched?.imageUrl || catInfo?.heroImage || tab.fallbackImage,
        href: `/produk/${tab.id}`
      };
    });
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

    <!-- Atmospheric Dark Cinematic Gradient Overlay (Gradasi hitam ke transparan) -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/45 to-black/15 sm:from-black/85 sm:via-black/50 sm:to-black/20"></div>
  </div>

  <!-- Top-Left: Model Selector Tabs (Lotus Vertical Switcher) -->
  <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-10 lg:pt-12">
    <div class="flex flex-col items-start space-y-1.5 sm:space-y-2 lg:space-y-2.5">
      {#each models as model, index}
        <button
          type="button"
          onclick={() => selectModel(index, true)}
          onmouseenter={() => selectModel(index, true)}
          class="group text-left font-heading text-lg sm:text-2xl lg:text-3xl uppercase tracking-[0.22em] sm:tracking-[0.26em] transition-all duration-300 focus:outline-none cursor-pointer {index === activeIndex
            ? 'text-white font-normal opacity-100'
            : 'text-neutral-400 font-light opacity-40 hover:opacity-80 hover:text-white'}"
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
          <span>EKSPLORASI {models[activeIndex].name}</span>
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
