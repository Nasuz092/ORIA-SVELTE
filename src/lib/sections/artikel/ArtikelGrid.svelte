<script lang="ts">
  import type { FormattedArticle } from '$lib/types/article';

  interface Props {
    articles?: FormattedArticle[];
    selectedCategory?: string;
    onSelectCategory?: (category: string) => void;
  }

  let { articles = [], selectedCategory = 'ALL', onSelectCategory }: Props = $props();

  const filterTabs = [
    'ALL',
    'Digital Print',
    'Business',
    'Insight',
    'Product',
    'Trivia'
  ];

  function getCount(tab: string): number {
    if (tab === 'ALL') return articles.length;
    return articles.filter(
      (a) => a.category.toLowerCase().trim() === tab.toLowerCase().trim()
    ).length;
  }

  let filteredArticles = $derived(
    selectedCategory === 'ALL'
      ? articles
      : articles.filter(
          (a) => a.category.toLowerCase().trim() === selectedCategory.toLowerCase().trim()
        )
  );

  function handleTabClick(tab: string) {
    if (onSelectCategory) {
      onSelectCategory(tab);
    }
  }
</script>

<!-- ======================================================================= -->
<!-- SECTION: Artikel Grid (Lotus Editorial Article Archive & Filter)        -->
<!-- ======================================================================= -->
<section id="articles" class="w-full bg-[#050508] text-white py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 select-none">
  <div class="max-w-7xl mx-auto space-y-10 sm:space-y-12">
    <!-- Header & Interactive Category Filter Tabs (Borderless) -->
    <div class="space-y-6 sm:space-y-8">
      <div class="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 pb-2">
        <div>
          <div class="font-heading font-black text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FFE500]">
            ORIA EDITORIAL DESK
          </div>
          <h2 class="font-heading font-black text-3xl sm:text-4xl uppercase tracking-tight text-white leading-none pt-2">
            LATEST ARTICLES & RELEASES
          </h2>
        </div>
        <div class="text-xs sm:text-sm font-sans text-neutral-400">
          Showing <span class="text-white font-bold">{filteredArticles.length}</span> of {articles.length} publications
        </div>
      </div>

      <!-- Filter Tabs Bar (Horizontal Scrollable, Borderless) -->
      <div class="flex items-center gap-2 sm:gap-3 overflow-x-auto no-scrollbar pb-2">
        {#each filterTabs as tab}
          {@const count = getCount(tab)}
          {@const isActive = selectedCategory.toLowerCase() === tab.toLowerCase()}
          <button
            type="button"
            onclick={() => handleTabClick(tab)}
            class="shrink-0 px-4 sm:px-5 py-2.5 text-xs font-heading font-bold uppercase tracking-[0.16em] transition-all duration-200 cursor-pointer focus:outline-none flex items-center gap-2 {isActive
              ? 'bg-[#FFE500] text-black shadow-lg font-black'
              : 'bg-[#0c0c12] text-neutral-300 hover:bg-[#181824] hover:text-white'}"
          >
            <span>{tab}</span>
            <span
              class="text-[10px] px-1.5 py-0.5 rounded-none {isActive
                ? 'bg-black text-[#FFE500] font-black'
                : 'bg-white/10 text-neutral-400'}"
            >
              {count}
            </span>
          </button>
        {/each}
      </div>
    </div>

    <!-- Articles Grid (Borderless Luxury Dark Cards) -->
    {#if filteredArticles.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10">
        {#each filteredArticles as a}
          <article class="group flex flex-col justify-between bg-[#0c0c12] hover:bg-[#13131c] transition-all duration-300 pb-6 overflow-hidden">
            <div>
              <!-- Media Image Box -->
              <a
                href="/artikel/{a.slug}"
                class="block aspect-[16/10] w-full overflow-hidden bg-neutral-950 relative"
              >
                <img
                  src={a.imageUrl}
                  alt={a.title}
                  class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
                <div class="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent opacity-60"></div>
                <!-- Yellow Category Tag -->
                <div class="absolute top-3.5 left-3.5">
                  <span class="inline-block bg-[#FFE500] text-black font-heading font-black text-[10px] tracking-[0.2em] uppercase px-2 py-0.5">
                    {a.category}
                  </span>
                </div>
              </a>

              <!-- Content Area -->
              <div class="pt-5 px-6 space-y-3">
                <div class="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <span>{a.publishedDate}</span>
                  <span>•</span>
                  <span>{a.readingTime}</span>
                </div>
                <h3 class="font-heading font-bold text-lg sm:text-xl text-white group-hover:text-[#FFE500] leading-snug line-clamp-2 transition-colors">
                  <a href="/artikel/{a.slug}" class="focus:outline-none">
                    {a.title}
                  </a>
                </h3>
                <p class="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                  {a.excerpt}
                </p>
              </div>
            </div>

            <!-- CTA Chevron (Strict: Chevron only, no arrows) -->
            <div class="pt-5 px-6">
              <a
                href="/artikel/{a.slug}"
                class="font-heading font-bold text-xs uppercase tracking-[0.22em] text-[#FFE500] group-hover:text-white inline-flex items-center gap-2 transition-colors focus:outline-none"
              >
                <span>{a.ctaText || 'BACA ARTIKEL'}</span>
                <svg
                  class="w-4 h-4 stroke-current stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </a>
            </div>
          </article>
        {/each}
      </div>
    {:else}
      <!-- Empty State -->
      <div class="py-20 text-center bg-[#0c0c12] p-8 space-y-4">
        <p class="font-heading font-medium text-lg text-neutral-400 uppercase tracking-widest">
          Belum ada artikel dalam kategori ini
        </p>
        <div>
          <button
            type="button"
            onclick={() => handleTabClick('ALL')}
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE500] text-black font-heading font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#fff04d] transition-colors cursor-pointer"
          >
            <span>TAMPILKAN SEMUA ARTIKEL</span>
            <svg class="w-4 h-4 stroke-black stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>
    {/if}
  </div>
</section>
