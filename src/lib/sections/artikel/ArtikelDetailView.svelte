<script lang="ts">
  import SEO from '$lib/components/seo/SEO.svelte';
  import { SITE_URL } from '$lib/constants/seo';
  import { getArticleCategory } from '$lib/data/article-categories';
  import type { FormattedArticle } from '$lib/types/article';

  interface Props {
    article: FormattedArticle;
    relatedArticles?: FormattedArticle[];
  }

  let { article, relatedArticles = [] }: Props = $props();

  let isCopied = $state(false);

  const catMeta = $derived(getArticleCategory(article.category || 'digital-print'));
  const catSlug = $derived(catMeta?.id || 'digital-print');
  const catLabel = $derived(catMeta?.label || article.category || 'DIGITAL PRINT');
  const canonicalUrl = $derived(`/artikel/${catSlug}/${article.slug}`);

  const articleJsonLd = $derived({
    '@context': 'https://schema.org',
    '@type': 'Article',
    '@id': `${SITE_URL}${canonicalUrl}#article`,
    headline: article.title,
    description: article.seoDescription || article.excerpt,
    image: [
      article.imageUrl?.startsWith('http')
        ? article.imageUrl
        : `${SITE_URL}${article.imageUrl || '/images/oria-hero-banner.png'}`
    ],
    datePublished: article.publishedDate || '2026-01-01',
    dateModified: article.publishedDate || '2026-01-01',
    author: {
      '@type': 'Person',
      name: article.author || 'Tim Redaksi ORIA'
    },
    publisher: {
      '@type': 'Organization',
      name: 'ORIA Indonesia',
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/images/oria-logo.png`
      }
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}${canonicalUrl}`
    }
  });

  async function copyPageUrl() {
    if (typeof window === 'undefined') return;
    try {
      await navigator.clipboard.writeText(window.location.href);
      isCopied = true;
      setTimeout(() => {
        isCopied = false;
      }, 2500);
    } catch {
      isCopied = true;
      setTimeout(() => {
        isCopied = false;
      }, 2500);
    }
  }

  function shareToWhatsApp() {
    if (typeof window === 'undefined') return;
    const text = `Halo, saya membaca artikel menarik: *${article.title}*\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  }

  function consultWhatsApp() {
    const text = `Halo Tim Ahli ORIA, saya ingin konsultasi setelah membaca artikel: *${article.title}*.`;
    window.open(`https://wa.me/6281252086455?text=${encodeURIComponent(text)}`, '_blank');
  }

  let formattedContent = $derived.by(() => {
    if (!article?.contentHtml) return '';
    let html = article.contentHtml;
    // Wrap standalone tables in responsive table container
    html = html.replace(/<table([\s\S]*?)<\/table>/gi, (match: string) => {
      return `<div class="article-table-container">${match}</div>`;
    });
    return html;
  });

  let ctaConfig = $derived.by(() => {
    const cat = (article.category || '').toLowerCase();
    if (cat.includes('business') || cat.includes('bisnis') || cat.includes('modal')) {
      return {
        topic: 'BUSINESS & INVESTMENT',
        image: '/images/our-drive-showroom.png',
        headline: 'MULAI BISNIS DIGITAL PRINTING.<br />HITUNG ESTIMASI ROI SEKARANG.',
        subtitle:
          'Dapatkan simulasi modal usaha percetakan industri, estimasi biaya produksi per meter, dan paket mesin ORIA bergaransi resmi untuk akselerasi bisnis Anda.',
        buttonText: 'Konsultasi Modal Bisnis',
        message: `Halo Tim ORIA, saya ingin konsultasi simulasi bisnis setelah membaca artikel: ${article.title}`
      };
    }
    if (cat.includes('uv') || cat.includes('laser') || cat.includes('cnc') || cat.includes('mesin')) {
      return {
        topic: 'INDUSTRIAL MACHINERY',
        image: '/images/showcase-products.png',
        headline: 'PILIH MESIN TERBAIK.<br />UJI KUALITAS DI SHOWROOM.',
        subtitle:
          'Bandingkan performa printhead, kecepatan cetak, dan presisi mekanik langsung bersama tim spesialis kami di demo lab showroom Surabaya & Jakarta.',
        buttonText: 'Jadwalkan Demo Mesin',
        message: `Halo Tim ORIA, saya ingin jadwalkan demo unit mesin setelah membaca artikel: ${article.title}`
      };
    }
    return {
      topic: 'ENGINEERING & PRODUCTION',
      image: '/images/engineering-excellence.png',
      headline: 'WUJUDKAN KREASI INDUSTRIAL.<br />PRODUKSI PRESISI TANPA BATAS.',
      subtitle:
        'Eksplorasi potensi mesin digital printing format besar, laser cutting, dan CNC router berstandar industri dengan jaminan purna jual resmi.',
      buttonText: 'Konsultasi Spesialis Sekarang',
      message: `Halo Tim ORIA, saya ingin konsultasi teknis setelah membaca artikel: ${article.title}`
    };
  });
</script>

<SEO
  title={article.seoTitle || `${article.title} | ORIA Editorial`}
  description={article.seoDescription || article.excerpt}
  canonical={canonicalUrl}
  image={article.imageUrl}
  type="article"
  breadcrumbs={[
    { name: 'Beranda', url: '/' },
    { name: 'Editorial & Wawasan', url: '/artikel' },
    { name: catLabel, url: `/artikel/${catSlug}` },
    { name: article.title, url: canonicalUrl }
  ]}
  articleSchema={articleJsonLd}
/>

<div class="bg-white min-h-screen font-sans text-black select-text">
  <!-- ======================================================================= -->
  <!-- 1. HEADER (Breadcrumb, Pill Badge, Date, Huge Headline, Wide Image)     -->
  <!-- ======================================================================= -->
  <header class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-36 sm:pt-40 lg:pt-44">
    <!-- Integrated Breadcrumbs Nav -->
    <nav
      class="flex items-center gap-2.5 text-[11px] lg:text-xs font-sans tracking-[0.2em] text-slate-400 mb-4 sm:mb-6 flex-wrap"
      aria-label="Breadcrumb"
    >
      <a
        href="/"
        class="text-slate-500 hover:text-black transition-colors flex items-center"
        aria-label="Beranda"
      >
        <svg class="w-3.5 h-3.5 lg:w-4 lg:h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      </a>
      <span class="text-slate-300 text-xs">/</span>
      <a
        href="/artikel"
        class="text-slate-500 hover:text-black transition-colors uppercase font-medium"
      >
        EDITORIAL &amp; WAWASAN
      </a>
      {#if article.category}
        <span class="text-slate-300 text-xs">/</span>
        <span class="text-slate-500 uppercase font-medium">
          {article.category}
        </span>
      {/if}
      <span class="text-slate-300 text-xs">/</span>
      <span
        class="text-slate-900 uppercase font-bold tracking-wider truncate max-w-[200px] sm:max-w-xs md:max-w-md lg:max-w-lg"
      >
        {article.title}
      </span>
    </nav>

    <!-- Top Metadata Row: Pill Badge on Left, Date on Right -->
    <div class="flex items-center justify-between pb-3">
      <span
        class="inline-block px-3 py-1 bg-black text-white text-[10px] sm:text-xs font-bold uppercase tracking-widest rounded-full select-none"
      >
        {article.category || 'ARTIKEL'}
      </span>
      <span class="text-xs sm:text-sm font-medium text-slate-700 tracking-wider">
        {article.publishedDate}
      </span>
    </div>

    <!-- Thin Horizontal Line -->
    <div class="w-full border-t border-slate-300"></div>

    <!-- Huge Bold Headline (Matching MesinPrintingJersey.id scale) -->
    <h1
      class="text-[32px] sm:text-5xl lg:text-6xl xl:text-7xl font-heading font-black uppercase text-black tracking-wider leading-[0.96] mt-6 sm:mt-8 mb-8 sm:mb-12"
    >
      {article.title}
    </h1>

    <!-- Big Wide Featured Image (Landscape 21:9 / 16:9) -->
    {#if article.imageUrl}
      <div class="w-full aspect-video sm:aspect-[21/9] overflow-hidden bg-slate-900 select-none">
        <img
          src={article.imageUrl}
          alt={article.title}
          class="w-full h-full object-cover object-center"
          loading="eager"
        />
      </div>
    {/if}
  </header>

  <!-- ======================================================================= -->
  <!-- 2. TLDR SECTION (Jakarta/Surabaya Editorial Lead)                       -->
  <!-- ======================================================================= -->
  {#if article.excerpt}
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12 pb-8 border-b border-slate-200 font-sans">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-12 items-baseline">
        <div class="lg:col-span-3 text-sm font-bold uppercase tracking-wider text-black">
          SURABAYA / JAKARTA, ID
        </div>
        <div class="lg:col-span-9">
          <p class="text-lg sm:text-xl lg:text-2xl text-slate-900 leading-relaxed font-normal">
            {article.excerpt}
          </p>
        </div>
      </div>
    </section>
  {/if}

  <!-- ======================================================================= -->
  <!-- 3. ISI KONTEN (Left: Sticky Action Bar | Right: Article Rich Text)       -->
  <!-- ======================================================================= -->
  <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 font-sans">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
      <!-- Left Column: Sticky Action Bar -->
      <aside class="lg:col-span-3 lg:sticky lg:top-24 select-none">
        <div class="border-t border-b border-slate-200 divide-y divide-slate-200">
          <!-- Share Button -->
          <button
            type="button"
            onclick={shareToWhatsApp}
            class="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-black hover:bg-slate-50 transition-colors px-1 cursor-pointer"
          >
            <span class="flex items-center gap-2.5">
              <svg class="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                <circle cx="18" cy="5" r="3" />
                <circle cx="6" cy="12" r="3" />
                <circle cx="18" cy="19" r="3" />
                <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
                <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
              </svg>
              Share Article
            </span>
          </button>

          <!-- Copy Button -->
          <button
            type="button"
            onclick={copyPageUrl}
            class="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-black hover:bg-slate-50 transition-colors px-1 cursor-pointer"
          >
            <span class="flex items-center gap-2.5">
              {#if isCopied}
                <svg class="w-4 h-4 text-emerald-600 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span class="text-emerald-600">Copied!</span>
              {:else}
                <svg class="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
                </svg>
                <span>Copy Link</span>
              {/if}
            </span>
          </button>

          <!-- Consult WhatsApp Button -->
          <button
            type="button"
            onclick={consultWhatsApp}
            class="w-full py-3.5 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-800 hover:text-black hover:bg-slate-50 transition-colors px-1 cursor-pointer"
          >
            <span class="flex items-center gap-2.5">
              <svg class="w-4 h-4 stroke-current stroke-2" fill="none" viewBox="0 0 24 24">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
              </svg>
              Konsultasi Ahli
            </span>
          </button>
        </div>

        {#if article.tags && article.tags.length > 0}
          <div class="mt-8 pt-4 border-t border-slate-200">
            <span class="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
              Topik Terkait
            </span>
            <div class="flex flex-wrap gap-1.5">
              {#each article.tags as tag}
                <span
                  class="px-2 py-0.5 bg-slate-100 text-slate-700 text-[10px] uppercase tracking-wider font-semibold"
                >
                  #{tag}
                </span>
              {/each}
            </div>
          </div>
        {/if}
      </aside>

      <!-- Right Column: Article Rich Text Content -->
      <div class="lg:col-span-9 max-w-3xl article-body">
        {#if article.contentHtml}
          {@html formattedContent}
        {:else}
          <p class="text-slate-600 leading-relaxed">
            {article.excerpt || 'Konten artikel sedang disiapkan.'}
          </p>
        {/if}
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 4. INLINE TOPIC-BASED CTA BANNER                                        -->
  <!-- ======================================================================= -->
  <section class="w-full bg-slate-900 border-t border-b border-slate-200 overflow-hidden relative select-none font-sans">
    <div class="relative w-full min-h-[380px] sm:min-h-[440px] flex items-center">
      <!-- Background Image -->
      <img
        src={ctaConfig.image}
        alt={ctaConfig.topic}
        class="absolute inset-0 w-full h-full object-cover object-center opacity-30 mix-blend-luminosity filter brightness-75 pointer-events-none"
        loading="lazy"
      />

      <!-- Gradient Overlay -->
      <div
        class="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/85 to-transparent pointer-events-none"
      ></div>

      <!-- Content Container -->
      <div class="relative max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16 z-10">
        <div class="max-w-2xl">
          <!-- Topic Tagline with Yellow Indicator -->
          <div class="flex items-center gap-2 mb-3">
            <span class="w-1.5 h-3 bg-[#FFE500]"></span>
            <span
              class="text-xs font-mono uppercase tracking-[0.25em] text-[#FFE500] font-bold"
            >
              {ctaConfig.topic}
            </span>
          </div>

          <!-- Bold Headline -->
          <h2
            class="text-3xl sm:text-4xl lg:text-5xl font-heading font-black uppercase text-white tracking-wider leading-[1.0] mb-4"
          >
            {@html ctaConfig.headline}
          </h2>

          <!-- Subtitle -->
          <p class="text-sm sm:text-base text-slate-300 leading-relaxed font-normal mb-8">
            {ctaConfig.subtitle}
          </p>

          <!-- Reusable CTA Button with Chevron (Strict Rule: Chevron only, no arrows) -->
          <div>
            <a
              href={`https://wa.me/6281252086455?text=${encodeURIComponent(ctaConfig.message)}`}
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-3 px-8 py-3.5 bg-[#FFE500] text-black font-heading font-bold text-xs uppercase tracking-widest hover:bg-white hover:text-black transition-all duration-300 shadow-xl"
            >
              <span>{ctaConfig.buttonText}</span>
              <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 5. READ MORE RELATED ARTICLES GRID                                      -->
  <!-- ======================================================================= -->
  {#if relatedArticles && relatedArticles.length > 0}
    <section class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20 border-t border-slate-200 font-sans">
      <h2
        class="text-2xl sm:text-3xl lg:text-4xl font-heading font-bold uppercase text-black tracking-wider mb-8 sm:mb-12"
      >
        READ MORE
      </h2>

      <!-- 3 Columns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
        {#each relatedArticles as item}
          <a
            href={`/artikel/${item.slug}`}
            class="group flex flex-col select-none cursor-pointer"
          >
            <div class="relative w-full aspect-[4/3] overflow-hidden bg-slate-900 mb-4">
              <img
                src={item.imageUrl}
                alt={item.title}
                class="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 select-none"
                loading="lazy"
              />
            </div>

            <div class="flex items-center gap-3 mb-2.5">
              <span
                class="inline-block px-2.5 py-0.5 bg-black text-white text-[9px] sm:text-[10px] font-bold uppercase tracking-wider rounded-full"
              >
                {item.category || 'ARTIKEL'}
              </span>
              <span class="text-[11px] sm:text-xs font-medium text-slate-500">
                {item.publishedDate}
              </span>
            </div>

            <h3
              class="text-lg sm:text-xl font-heading font-bold uppercase text-black group-hover:text-[#b3a100] transition-colors line-clamp-3 leading-snug tracking-wider"
            >
              {item.title}
            </h3>
          </a>
        {/each}
      </div>
    </section>
  {/if}
</div>

<style>
  :global(.article-body p) {
    margin-bottom: 1.5rem;
    line-height: 1.85;
    color: #1e293b;
    font-size: 1.0625rem;
  }

  :global(.article-body h2) {
    font-family: inherit;
    font-size: 1.875rem;
    font-weight: 800;
    text-transform: uppercase;
    color: #000000;
    margin-top: 2.75rem;
    margin-bottom: 1rem;
    letter-spacing: 0.02em;
    line-height: 1.2;
  }

  :global(.article-body h3) {
    font-family: inherit;
    font-size: 1.5rem;
    font-weight: 700;
    text-transform: uppercase;
    color: #000000;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    letter-spacing: 0.02em;
    line-height: 1.25;
  }

  :global(.article-body h4) {
    font-family: inherit;
    font-size: 1.25rem;
    font-weight: 700;
    color: #000000;
    margin-top: 1.75rem;
    margin-bottom: 0.5rem;
    letter-spacing: 0.02em;
    line-height: 1.3;
  }

  :global(.article-body ul),
  :global(.article-body ol) {
    margin-top: 1rem;
    margin-bottom: 1.5rem;
    padding-left: 1.75rem;
  }

  :global(.article-body ul) {
    list-style-type: disc;
  }

  :global(.article-body ol) {
    list-style-type: decimal;
  }

  :global(.article-body li) {
    margin-bottom: 0.625rem;
    line-height: 1.75;
    color: #1e293b;
  }

  :global(.article-body strong) {
    font-weight: 700;
    color: #000000;
  }

  :global(.article-body blockquote) {
    border-left: 3px solid #000000;
    padding-left: 1.5rem;
    font-style: italic;
    color: #334155;
    margin-top: 1.75rem;
    margin-bottom: 1.75rem;
  }

  :global(.article-body a) {
    color: #000000;
    text-decoration: underline;
    text-underline-offset: 4px;
    font-weight: 600;
    transition: color 0.2s;
  }

  :global(.article-body a:hover) {
    color: #b3a100;
  }

  /* Responsive Table Container & Styling */
  :global(.article-body .article-table-container),
  :global(.article-body figure.table),
  :global(.article-body figure) {
    margin-top: 2rem;
    margin-bottom: 2rem;
    width: 100%;
  }

  :global(.article-body figure .article-table-container) {
    margin-top: 0;
    margin-bottom: 0;
  }

  :global(.article-body .article-table-container) {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
    border: none;
    border-radius: 0;
    background-color: transparent;
    box-shadow: none;
  }

  :global(.article-body table) {
    width: 100%;
    min-width: 520px;
    border-collapse: collapse;
    text-align: left;
    font-size: 0.9375rem;
    line-height: 1.6;
    margin: 0;
    border: none;
    border-radius: 0;
  }

  :global(.article-body thead) {
    background-color: #1e293b;
  }

  :global(.article-body th) {
    background-color: #1e293b;
    color: #ffffff;
    font-weight: 700;
    font-size: 0.8125rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    padding: 0.875rem 1.25rem;
    border: none;
    border-bottom: 1px solid #334155;
    vertical-align: middle;
  }

  :global(.article-body tbody tr) {
    border-bottom: 1px solid #e2e8f0;
    transition: background-color 0.15s ease;
    background-color: transparent;
  }

  :global(.article-body tbody tr:hover) {
    background-color: #f8fafc;
  }

  :global(.article-body td) {
    padding: 0.875rem 1.25rem;
    color: #334155;
    font-size: 0.9375rem;
    line-height: 1.6;
    vertical-align: top;
    border: none;
    border-bottom: 1px solid #e2e8f0;
  }

  :global(.article-body td:first-child) {
    font-weight: 600;
    color: #0f172a;
  }

  :global(.article-body td strong),
  :global(.article-body td b) {
    font-weight: 700;
    color: #0f172a;
  }

  :global(.article-body th p),
  :global(.article-body td p) {
    margin-bottom: 0 !important;
    line-height: inherit;
    color: inherit;
    font-size: inherit;
  }

  :global(.article-body figcaption) {
    text-align: center;
    font-size: 0.8125rem;
    color: #64748b;
    margin-top: 0.5rem;
    font-style: italic;
  }
</style>
