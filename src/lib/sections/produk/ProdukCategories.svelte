<script lang="ts">
  import type { FormattedProduct } from '$lib/types/product';
  import { CATEGORIES, matchesCategory } from '$lib/data/categories';

  let { products = [] }: { products?: FormattedProduct[] } = $props();
</script>

<!-- ======================================================================= -->
<!-- SECTION: Produk Categories (Lotus Heritage Cars Style - Borderless 3-Col)-->
<!-- ======================================================================= -->
<section id="categories" class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none">
  <div class="max-w-7xl mx-auto">
    <!-- 3-Column Borderless Grid (Lotus Heritage Style) -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16">
      {#each CATEGORIES as cat}
        {@const unitCount = products.filter(p => matchesCategory(p, cat.id)).length}
        <a
          href="/produk/{cat.id}"
          class="group block flex flex-col focus:outline-none cursor-pointer"
        >
          <!-- Category Machine Image Box (Uniform pure white studio box across all cards) -->
          <div class="w-full aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-5 sm:p-6 lg:p-7 relative">
            <img
              src={cat.cardImage}
              alt={cat.alt}
              class="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none select-none"
              loading="lazy"
            />
          </div>

          <!-- Category Name and Button Below (No border, clean Lotus editorial) -->
          <div class="mt-5 space-y-2.5">
            <!-- Category Title -->
            <h3 class="font-heading font-medium text-base sm:text-lg lg:text-xl text-white uppercase tracking-[0.16em] group-hover:text-[#FFE500] transition-colors leading-snug">
              {cat.name}
            </h3>

            <!-- Button with Chevron (Strict Rule from AGENTS.md: Chevron only, no arrows) -->
            <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-white/80 group-hover:text-[#FFE500] transition-colors">
              <span>EXPLORE {unitCount > 0 ? `(${unitCount})` : 'MACHINES'}</span>
              <svg
                class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="2.5"
                aria-hidden="true"
              >
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </a>
      {/each}
    </div>
  </div>
</section>
