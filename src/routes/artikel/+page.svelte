<script lang="ts">
  import type { PageData } from './$types';

  let { data }: { data: PageData } = $props();
  let articles = $derived(data.articles || []);
</script>

<svelte:head>
  <title>Artikel & Edukasi Mesin Percetakan - ORIA</title>
  <meta name="description" content="Kumpulan artikel teknis, tips perawatan mesin cetak, dan panduan bisnis percetakan digital dari pakar ORIA." />
</svelte:head>

<div class="w-full bg-white text-black py-16 lg:py-24 px-6 sm:px-8">
  <div class="max-w-6xl mx-auto space-y-12">
    <!-- Header -->
    <div class="space-y-4">
      <div class="font-sans font-bold text-xs uppercase tracking-widest text-black">
        Edukasi & Berita
      </div>
      <h1 class="font-heading font-black text-4xl sm:text-5xl tracking-tighter text-black">
        Wawasan Bisnis & Keteknikan Percetakan
      </h1>
      <p class="font-sans text-base sm:text-lg text-neutral-600 max-w-2xl leading-relaxed">
        Artikel panduan praktis, analisis teknologi, dan tips pemeliharaan langsung dari teknisi berpengalaman ORIA.
      </p>
    </div>

    <!-- Article List -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 sm:gap-10 pt-4">
      {#each articles as a}
        <article class="group flex flex-col justify-between border-b border-neutral-200 pb-8">
          <div>
            <!-- Media Box -->
            <a
              href="/artikel/{a.slug}"
              class="block aspect-[16/10] w-full overflow-hidden bg-neutral-100 border border-neutral-200 transition-colors duration-300 group-hover:border-neutral-400"
            >
              <img
                src={a.imageUrl}
                alt={a.title}
                class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
            </a>

            <!-- Content -->
            <div class="pt-5 space-y-2.5">
              <div class="font-sans text-xs font-semibold uppercase tracking-wider text-neutral-500 flex items-center gap-2">
                <span>{a.publishedDate}</span>
                <span>•</span>
                <span>{a.readingTime}</span>
              </div>
              <h2 class="font-heading font-bold text-xl text-black leading-snug group-hover:underline line-clamp-2">
                <a href="/artikel/{a.slug}">
                  {a.title}
                </a>
              </h2>
              <p class="font-sans text-sm text-neutral-600 leading-relaxed line-clamp-3">
                {a.excerpt}
              </p>
            </div>
          </div>

          <!-- CTA Chevron -->
          <div class="pt-4">
            <a
              href="/artikel/{a.slug}"
              class="font-sans font-bold text-xs uppercase tracking-widest text-black group-hover:text-black inline-flex items-center gap-1.5 transition-colors"
            >
              <span>{a.ctaText || 'BACA ARTIKEL'}</span>
              <svg class="w-3.5 h-3.5 stroke-black transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>
