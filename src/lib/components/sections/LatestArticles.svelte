<script lang="ts">
  import { onMount } from 'svelte';
  import { STRAPI_URL, getStrapiMediaUrl } from '$lib/api/products';
  import type { FormattedArticle } from '$lib/types/article';

  interface ArticleCard {
    title: string;
    desc: string;
    href: string;
    imageUrl: string;
    ctaText: string;
  }

  let { articles: initialArticles = [] }: { articles?: FormattedArticle[] } = $props();

  const defaultArticles: ArticleCard[] = [
    {
      title: 'Panduan Cetak DTF pada Kulit Sintetis (PU/PVC)',
      desc: 'Setting temperatur heat press, pemilihan powder elastis anti-retak, dan perhitungan HPP produksi skala industri.',
      href: '/artikel/panduan-cetak-dtf-kulit-sintetis-pu-pvc-oscar-setting-suhu-hpp',
      imageUrl: '/images/articles/cetak_dtf_kulit_sintetis_5460c8fd7c.webp',
      ctaText: 'PANDUAN DTF'
    },
    {
      title: 'Panduan Cetak UV 3D Emboss & Braille Signage',
      desc: 'Cara setting layering varnish, height sensor presisi tinggi, dan analisa margin keuntungan tinggi untuk produk custom signage.',
      href: '/artikel/panduan-cetak-uv-3d-emboss-braille-signage-layering-varnish-height-sensor-hpp',
      imageUrl: '/images/articles/panduan_cetak_uv_3d_emboss_dan_braile_signage_60c1e562ff.webp',
      ctaText: 'TEKNOLOGI UV'
    },
    {
      title: 'Perbandingan RIP Software Photoprint, Onyx & MainTop',
      desc: 'Optimasi profil warna tinta ICC profile untuk efisiensi biaya produksi (HPP) hingga 25% tanpa menurunkan ketajaman warna.',
      href: '/artikel/perbandingan-rip-software-photoprint-onyx-maintop-efisiensi-hpp',
      imageUrl: '/images/articles/photoprint_vs_onyx_vs_maintop_31ba2a848b.webp',
      ctaText: 'OPTIMASI RIP'
    }
  ];

  let clientArticles: ArticleCard[] = $state([]);

  let articles: ArticleCard[] = $derived.by(() => {
    if (initialArticles && initialArticles.length > 0) {
      return initialArticles.map(a => ({
        title: a.title,
        desc: a.excerpt,
        href: `/artikel/${a.slug}`,
        imageUrl: a.imageUrl,
        ctaText: a.ctaText
      }));
    }
    if (clientArticles && clientArticles.length > 0) {
      return clientArticles;
    }
    return defaultArticles;
  });

  onMount(async () => {
    if (initialArticles && initialArticles.length > 0) return;
    try {
      const res = await fetch(`${STRAPI_URL}/api/articles?populate=*&sort=createdAt:desc&pagination[pageSize]=3`);
      if (res.ok) {
        const json = await res.json();
        const items = json.data;
        if (items && items.length > 0) {
          const ctaLabels = ['BACA PANDUAN', 'EKSPLORASI TEKNIK', 'TIPS & WAWASAN'];
          clientArticles = items.map((a: any, idx: number) => {
            const rawImg = a.cover_image?.url || a.image?.url;
            const imageUrl = rawImg ? getStrapiMediaUrl(rawImg) : defaultArticles[idx % defaultArticles.length].imageUrl;
            return {
              title: a.title,
              desc: a.excerpt || a.seo_description || 'Pelajari wawasan teknis dan panduan operasional terkini dari tim ahli mesin industri ORIA.',
              href: `/artikel/${a.slug}`,
              imageUrl,
              ctaText: a.category ? `BACA ${a.category.toUpperCase()}` : ctaLabels[idx % ctaLabels.length]
            };
          });
        }
      }
    } catch (e) {
      // Keep curated defaults
    }
  });
</script>

<section class="w-full bg-black text-white pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 border-t border-neutral-900 select-none">
  <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
    <!-- Header Title (Lotus Style: MORE LOTUS -> MORE ORIA) -->
    <div class="mb-8 sm:mb-10 lg:mb-12">
      <h2 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.22em] text-white">
        MORE ORIA
      </h2>
    </div>

    <!-- 3-Column Lotus Grid -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
      {#each articles as a}
        <article class="group flex flex-col justify-between">
          <div>
            <!-- Media Box -->
            <a
              href={a.href}
              class="block aspect-[16/10] w-full overflow-hidden bg-neutral-900 border border-neutral-800 transition-colors duration-300 group-hover:border-neutral-600"
            >
              <img
                src={a.imageUrl}
                alt={a.title}
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </a>

            <!-- Text Content -->
            <div class="pt-6 space-y-3">
              <h3 class="font-heading font-bold text-lg sm:text-xl lg:text-2xl text-white group-hover:underline leading-snug line-clamp-2">
                <a href={a.href}>
                  {a.title}
                </a>
              </h3>
              <p class="font-sans text-sm sm:text-base text-neutral-400 font-normal leading-relaxed line-clamp-3">
                {a.desc}
              </p>
            </div>
          </div>

          <!-- CTA Link (STRICT RULE: Only Chevron, Never Arrows) -->
          <div class="pt-5 sm:pt-6">
            <a
              href={a.href}
              class="inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.22em] text-white hover:text-[#FFE500] transition-colors group/cta"
            >
              <span>{a.ctaText}</span>
              <svg
                class="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current transition-transform duration-300 group-hover/cta:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</section>
