<script lang="ts">
  import type { FormattedProduct } from '$lib/types/product';

  let {
    product,
    cleanModelName
  }: {
    product: FormattedProduct;
    cleanModelName: string;
  } = $props();
</script>

<!-- ========================================================================= -->
<!-- SECTION 4: CINEMATIC CTA BANNER (LOTUS ELETRE X STYLE)                   -->
<!-- ========================================================================= -->
<section class="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] bg-black text-white overflow-hidden flex items-center select-none">
  <!-- Background Machine Image -->
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <picture class="w-full h-full">
      {#if product.mainImageMobileUrl}
        <source media="(max-width: 640px)" srcset={product.mainImageMobileUrl} />
      {/if}
      <img
        src={product.mainImageDesktopUrl || product.imageUrl}
        alt="{product.name} Showcase"
        class="w-full h-full object-cover object-center lg:object-[center_right] select-none"
        loading="lazy"
      />
    </picture>
    <!-- Cinematic Dark Gradient (Left solid dark for text clarity, right reveals machine) -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/65 via-black/35 to-black/15 sm:from-black sm:via-black/85 lg:via-black/70 lg:to-black/30"></div>
  </div>

  <!-- Left-Aligned Content (Lotus Eletre X Style) -->
  <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-20 sm:py-28">
    <div class="max-w-7xl mx-auto w-full">
      <div class="max-w-xl lg:max-w-2xl space-y-8 sm:space-y-10">
        <h2 class="font-heading font-light tracking-[0.22em] sm:tracking-[0.32em] text-3xl sm:text-5xl lg:text-6xl uppercase text-white leading-[1.15]">
          ORIA {cleanModelName}
          <span class="block font-thin tracking-[0.2em] sm:tracking-[0.28em] text-neutral-300 text-2xl sm:text-4xl lg:text-5xl pt-2">
            EXPERIENCE
          </span>
        </h2>

        <div>
          <a
            href="https://wa.me/6281807090888?text={encodeURIComponent(`Halo ORIA, saya ingin konsultasi teknis dan demo mesin ${product.name}`)}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-transparent hover:bg-white hover:text-black text-white border border-white font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.28em] transition-all duration-300 group select-none cursor-pointer"
          >
            <span>EXPLORE NOW</span>
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
  </div>
</section>
