<script lang="ts">
  import SEO from '$lib/components/seo/SEO.svelte';
  import type { FormattedArticle } from '$lib/types/article';
  import type { ArticleCategoryMeta } from '$lib/data/article-categories';

  interface Props {
    category: ArticleCategoryMeta;
    articles?: FormattedArticle[];
  }

  let { category, articles = [] }: Props = $props();

  const seoTitle = $derived(`${category.label} - Editorial & Wawasan | ORIA Indonesia`);
  const seoDesc = $derived(
    category.subtitle ||
      `Arsip publikasi dan panduan mendalam kategori ${category.label} dari ORIA Indonesia.`
  );
  const canonicalPath = $derived(`/artikel/${category.id}`);
</script>

<SEO
  title={seoTitle}
  description={seoDesc}
  canonical={canonicalPath}
  image="/images/oria-hero-banner.png"
  breadcrumbs={[
    { name: 'Beranda', url: '/' },
    { name: 'Editorial & Wawasan', url: '/artikel' },
    { name: category.label, url: canonicalPath }
  ]}
  customSchemas={[
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': `https://oria.co.id${canonicalPath}#collection`,
      url: `https://oria.co.id${canonicalPath}`,
      name: category.label,
      description: seoDesc
    }
  ]}
/>

<!-- ======================================================================= -->
<!-- SECTION: Lotus Editorial Category Archive & Articles Showcase           -->
<!-- ======================================================================= -->
<section class="w-full min-h-[90svh] bg-[#050508] text-white pt-28 sm:pt-36 lg:pt-40 pb-20 sm:pb-28 px-6 sm:px-10 lg:px-16 select-none">
  <div class="max-w-7xl mx-auto space-y-12 sm:space-y-16">
    <!-- Lotus Editorial Header (Matching Lotus Cars Press Room) -->
    <div class="space-y-4 sm:space-y-5 border-b border-white/10 pb-8 sm:pb-12">
      <!-- Editorial Kicker -->
      <div class="font-heading font-black text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FFE500]">
        ORIA EDITORIAL &middot; {category.label}
      </div>

      <!-- Spaced Title (Lotus Style) -->
      <h1 class="font-heading font-light text-4xl sm:text-5xl lg:text-7xl uppercase text-white tracking-[0.22em] sm:tracking-[0.3em] leading-tight">
        {@html category.spacedTitle}
      </h1>

      <!-- Editorial Narrative Subtitle -->
      <p class="font-sans text-xs sm:text-sm md:text-base text-neutral-300 max-w-3xl uppercase tracking-widest leading-relaxed">
        {category.subtitle}
      </p>

      <!-- Publications Meta Count -->
      <div class="pt-2 text-xs font-sans text-neutral-400 tracking-wider uppercase">
        Menampilkan <span class="text-[#FFE500] font-bold">{articles.length}</span> publikasi resmi
      </div>
    </div>

    <!-- Articles Grid (Lotus 2-Column Luxury Editorial Grid) -->
    {#if articles.length > 0}
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 lg:gap-12">
        {#each articles as a}
          <article class="group flex flex-col justify-between bg-[#0c0c12] hover:bg-[#13131c] transition-all duration-300 pb-7 overflow-hidden border border-white/5 hover:border-white/15">
            <div>
              <!-- Media Image Container (Lotus 16:10 Aspect Ratio) -->
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
                <div class="absolute top-4 left-4">
                  <span class="inline-block bg-[#FFE500] text-black font-heading font-black text-[10px] tracking-[0.2em] uppercase px-3 py-1 shadow-md">
                    {a.category}
                  </span>
                </div>
              </a>

              <!-- Card Content Body -->
              <div class="pt-6 px-6 sm:px-8 space-y-3.5">
                <div class="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-400 flex items-center gap-2">
                  <span>{a.publishedDate}</span>
                  <span>&bull;</span>
                  <span>{a.readingTime}</span>
                </div>

                <h2 class="font-heading font-bold text-xl sm:text-2xl text-white group-hover:text-[#FFE500] leading-snug transition-colors line-clamp-2">
                  <a href="/artikel/{a.slug}" class="focus:outline-none">
                    {a.title}
                  </a>
                </h2>

                <p class="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed line-clamp-3">
                  {a.excerpt}
                </p>
              </div>
            </div>

            <!-- Card Bottom Action with Chevron (Strict: Chevron only, no arrows) -->
            <div class="pt-6 px-6 sm:px-8">
              <a
                href="/artikel/{a.slug}"
                class="font-heading font-bold text-xs uppercase tracking-[0.22em] text-[#FFE500] group-hover:text-white inline-flex items-center gap-2 transition-colors focus:outline-none"
              >
                <span>{a.ctaText || 'BACA ARTIKEL'}</span>
                <svg
                  class="w-4 h-4 stroke-current stroke-[2.5] transition-transform duration-300 group-hover:translate-x-1.5"
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
      <div class="py-24 text-center bg-[#0c0c12] border border-white/5 p-8 space-y-5">
        <p class="font-heading font-medium text-lg text-neutral-400 uppercase tracking-widest">
          Belum ada artikel yang dipublikasikan dalam kategori {category.label}
        </p>
        <div>
          <a
            href="/artikel/digital-print"
            class="inline-flex items-center gap-2 px-6 py-3 bg-[#FFE500] text-black font-heading font-bold text-xs uppercase tracking-[0.2em] hover:bg-[#fff04d] transition-colors cursor-pointer"
          >
            <span>JELAJAHI DIGITAL PRINT</span>
            <svg class="w-4 h-4 stroke-black stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    {/if}
  </div>
</section>
