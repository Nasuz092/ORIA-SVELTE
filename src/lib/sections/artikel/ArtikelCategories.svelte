<script lang="ts">
  import type { FormattedArticle } from '$lib/types/article';

  interface Props {
    articles?: FormattedArticle[];
    selectedCategory?: string;
    onSelectCategory?: (category: string) => void;
  }

  let { articles = [], selectedCategory = 'ALL', onSelectCategory }: Props = $props();

  const categories = [
    {
      id: 'Digital Print',
      name: 'Digital Print',
      tagline: 'UV, DTF & TEXTILE INOVASI',
      description: 'Teknologi cetak UV flatbed, roll-to-roll, DTF apparel, dan konfigurasi printhead industri.',
      image: '/images/categories/uv.webp'
    },
    {
      id: 'Business',
      name: 'Business Strategy',
      tagline: 'STRATEGI & PELUANG BISNIS',
      description: 'Kalkulasi ROI mesin percetakan, manajemen modal kerja, dan strategi ekspansi workshop.',
      image: '/images/articles/article-business-guide.webp'
    },
    {
      id: 'Insight',
      name: 'Industry Insight',
      tagline: 'TREN & ANALISIS PASAR',
      description: 'Arah perkembangan advertising, signage modern, tren material, dan analisis pasar cetak 2026.',
      image: '/images/engineering-excellence.png'
    },
    {
      id: 'Product',
      name: 'Product & Machine',
      tagline: 'BEDAH MESIN & FITUR',
      description: 'Review mendalam keunggulan teknis lini mesin ORIA, komparasi fitur, dan performa produksi.',
      image: '/images/hero/outdoor-oria-desktop.png'
    },
    {
      id: 'Trivia',
      name: 'Technical Trivia',
      tagline: 'TIPS & MAINTENANCE',
      description: 'Fakta penting printhead, pencegahan clogging, panduan perawatan rutin, dan tips teknisi.',
      image: '/images/articles/article-maintenance.webp'
    }
  ];

  function getCount(catId: string): number {
    return articles.filter(
      (a) => a.category.toLowerCase().trim() === catId.toLowerCase().trim()
    ).length;
  }

  function handleCategoryClick(catId: string) {
    if (onSelectCategory) {
      onSelectCategory(catId);
    }
    const target = document.getElementById('articles');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
</script>

<!-- ======================================================================= -->
<!-- SECTION: Artikel Categories (Lotus Press Aesthetic - Luxury Dark Grid)  -->
<!-- ======================================================================= -->
<section id="categories" class="w-full bg-[#050508] text-white py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 border-t border-neutral-900 select-none">
  <div class="max-w-7xl mx-auto space-y-12 sm:space-y-16">
    <!-- Section Header (Lotus Editorial Typography) -->
    <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-b border-neutral-900 pb-8">
      <div class="space-y-3">
        <div class="font-heading font-black text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FFE500]">
          PRESS & KNOWLEDGE PILLARS
        </div>
        <h2 class="font-heading font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-none">
          EXPLORE BY CATEGORY
        </h2>
      </div>
      <p class="font-sans text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
        Pilih kategori untuk memfilter wawasan teknis, analisis bisnis percetakan digital, dan panduan mesin cetak ORIA.
      </p>
    </div>

    <!-- Category Cards Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {#each categories as cat}
        {@const count = getCount(cat.id)}
        {@const isSelected = selectedCategory === cat.id}
        <button
          type="button"
          onclick={() => handleCategoryClick(cat.id)}
          class="group text-left flex flex-col justify-between bg-[#0b0b10] border transition-all duration-400 ease-out overflow-hidden hover:-translate-y-1 cursor-pointer focus:outline-none {isSelected
            ? 'border-[#FFE500] shadow-[0_0_25px_rgba(255,229,0,0.15)] ring-1 ring-[#FFE500]'
            : 'border-white/10 hover:border-[#FFE500]/50 hover:shadow-2xl'}"
        >
          <!-- Card Image Header -->
          <div class="relative w-full aspect-[16/10] overflow-hidden bg-neutral-950">
            <img
              src={cat.image}
              alt={cat.name}
              class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0b0b10] via-black/30 to-black/40"></div>

            <!-- Category Top Tag -->
            <div class="absolute top-4 left-4">
              <span class="inline-block bg-[#FFE500] text-black font-heading font-black text-[10px] tracking-[0.2em] uppercase px-2.5 py-1">
                {cat.id}
              </span>
            </div>

            <!-- Article Count Pill -->
            <div class="absolute top-4 right-4">
              <span class="inline-block bg-black/75 backdrop-blur-sm text-neutral-300 font-sans text-[11px] font-semibold tracking-wider uppercase px-2.5 py-1 border border-white/15">
                {count} {count === 1 ? 'ARTICLE' : 'ARTICLES'}
              </span>
            </div>
          </div>

          <!-- Card Content Body -->
          <div class="p-6 sm:p-7 flex flex-col justify-between flex-1 space-y-4">
            <div class="space-y-2">
              <div class="font-heading font-semibold text-[11px] tracking-[0.22em] text-[#FFE500] uppercase">
                {cat.tagline}
              </div>
              <h3 class="font-heading font-black text-xl sm:text-2xl text-white uppercase tracking-wide group-hover:text-[#FFE500] transition-colors leading-snug">
                {cat.name}
              </h3>
              <p class="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-2">
                {cat.description}
              </p>
            </div>

            <!-- Card Bottom Action with Chevron (Strict: Chevron only, no arrows) -->
            <div class="pt-3 border-t border-white/5 flex items-center justify-between">
              <span class="inline-flex items-center gap-2 font-heading font-bold text-xs uppercase tracking-[0.22em] text-white/90 group-hover:text-[#FFE500] transition-colors">
                <span>VIEW {cat.id.toUpperCase()}</span>
                <svg
                  class="w-4 h-4 stroke-current stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </span>
              {#if isSelected}
                <span class="text-[10px] font-heading font-bold text-[#FFE500] tracking-widest uppercase">
                  ACTIVE
                </span>
              {/if}
            </div>
          </div>
        </button>
      {/each}
    </div>
  </div>
</section>
