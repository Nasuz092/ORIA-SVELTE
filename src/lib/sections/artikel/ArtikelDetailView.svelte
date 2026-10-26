<script lang="ts">
  import type { FormattedArticle } from '$lib/types/article';

  interface Props {
    article: FormattedArticle;
    relatedArticles?: FormattedArticle[];
  }

  let { article, relatedArticles = [] }: Props = $props();
</script>

<svelte:head>
  <title>{article.seoTitle}</title>
  <meta name="description" content={article.seoDescription} />
  <meta property="og:title" content={article.title} />
  <meta property="og:description" content={article.excerpt} />
  <meta property="og:image" content={article.imageUrl} />
</svelte:head>

<article class="w-full min-h-screen bg-white text-black pt-28 sm:pt-36 lg:pt-40 pb-16 sm:pb-24 px-6 sm:px-8">
  <div class="max-w-4xl mx-auto space-y-10">
    <!-- Back Button (Strict rule: Chevron only) -->
    <div>
      <a
        href="/artikel"
        class="group font-sans font-bold text-xs uppercase tracking-widest text-black hover:opacity-70 inline-flex items-center gap-2 transition-opacity"
      >
        <svg
          class="w-4 h-4 stroke-black transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>Kembali ke Editorial</span>
      </a>
    </div>

    <!-- Header Section -->
    <header class="space-y-4 border-b border-neutral-200 pb-8">
      <div class="font-sans text-xs font-bold uppercase tracking-widest text-neutral-500 flex items-center gap-2">
        <span class="bg-black text-white px-2.5 py-1 text-[10px] tracking-widest uppercase">
          {article.category}
        </span>
        <span>&bull;</span>
        <span>{article.readingTime} BACA</span>
      </div>

      <h1 class="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black leading-[1.15]">
        {article.title}
      </h1>

      <div class="font-sans text-xs text-neutral-500 flex flex-wrap items-center gap-2 pt-1">
        <span>Dipublikasikan pada {article.publishedDate}</span>
        <span>&bull;</span>
        <span class="font-semibold text-neutral-800">{article.author}</span>
      </div>
    </header>

    <!-- Cover Image -->
    {#if article.imageUrl}
      <div class="w-full aspect-[16/9] overflow-hidden bg-neutral-100 border border-neutral-200">
        <img
          src={article.imageUrl}
          alt={article.title}
          class="w-full h-full object-cover"
        />
      </div>
    {/if}

    <!-- Excerpt / Lead -->
    {#if article.excerpt}
      <div class="p-6 bg-neutral-50 border-l-4 border-black font-sans text-base sm:text-lg text-neutral-800 italic leading-relaxed">
        {article.excerpt}
      </div>
    {/if}

    <!-- Article Rich Body -->
    <div class="prose prose-neutral max-w-none font-sans text-base sm:text-lg text-neutral-900 leading-relaxed space-y-6 pt-2">
      {@html article.contentHtml}
    </div>

    <!-- Tags -->
    {#if article.tags && article.tags.length > 0}
      <div class="pt-8 border-t border-neutral-200 flex flex-wrap items-center gap-2">
        <span class="font-sans text-xs font-bold uppercase tracking-wider text-neutral-500 mr-2">Topik:</span>
        {#each article.tags as tag}
          <span class="text-xs bg-neutral-100 text-neutral-800 px-3 py-1 font-medium">
            #{tag}
          </span>
        {/each}
      </div>
    {/if}

    <!-- CTA Box -->
    <div class="mt-14 p-8 sm:p-10 bg-black text-white space-y-6">
      <div class="space-y-2">
        <div class="font-sans text-[11px] font-bold tracking-[0.2em] text-[#FFE500] uppercase">
          KONSULTASI BISNIS & TEKNOLOGI
        </div>
        <h3 class="font-heading font-black text-2xl sm:text-3xl text-white">
          Siap Meningkatkan Kapasitas Produksi Percetakan Anda?
        </h3>
        <p class="font-sans text-sm text-neutral-300 max-w-2xl leading-relaxed pt-1">
          Diskusikan spesifikasi mesin printing, laser, atau CNC yang tepat untuk target pasar Anda bersama tim engineering ORIA.
        </p>
      </div>

      <div class="pt-2">
        <a
          href="/kontak"
          class="inline-flex items-center gap-2 bg-[#FFE500] hover:bg-white text-black px-6 py-3.5 text-xs font-bold uppercase tracking-widest transition-colors duration-300 group"
        >
          <span>HUBUNGI KONSULTAN ORIA</span>
          <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Related Articles -->
    {#if relatedArticles && relatedArticles.length > 0}
      <div class="pt-16 border-t border-neutral-200 space-y-8">
        <div class="flex items-center justify-between">
          <h2 class="font-heading font-black text-2xl uppercase tracking-wider text-black">
            Artikel Terkait
          </h2>
          <a
            href="/artikel/semua"
            class="font-sans font-bold text-xs uppercase tracking-widest text-black hover:underline inline-flex items-center gap-1.5"
          >
            <span>Semua Artikel</span>
            <svg class="w-3.5 h-3.5 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          {#each relatedArticles as r}
            <a
              href="/artikel/{r.slug}"
              class="group block space-y-3"
            >
              <div class="aspect-[16/10] overflow-hidden bg-neutral-100 border border-neutral-200">
                <img
                  src={r.imageUrl}
                  alt={r.title}
                  class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                  loading="lazy"
                />
              </div>
              <h3 class="font-heading font-bold text-base text-black group-hover:underline line-clamp-2 leading-snug">
                {r.title}
              </h3>
              <p class="font-sans text-xs text-neutral-600 line-clamp-2">
                {r.excerpt}
              </p>
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</article>
