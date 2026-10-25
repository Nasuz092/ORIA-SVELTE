<script lang="ts">
  import type { FormattedProduct } from '$lib/types/product';
  import type { SpecGroup } from '$lib/utils/product-specs';

  let {
    product,
    detailedSpecs
  }: {
    product: FormattedProduct;
    detailedSpecs: { left: SpecGroup[]; right: SpecGroup[] };
  } = $props();
</script>

<!-- ========================================================================= -->
<!-- SECTION 3: SPEC (MESINPRINTINGJERSEY STYLE IN LOTUS/ORIA COLOR PALETTE)   -->
<!-- ========================================================================= -->
<section id="spec" class="w-full bg-black text-white py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 select-none">
  <div class="max-w-7xl mx-auto space-y-16 sm:space-y-20">
    <!-- Header: Consistent English Title -->
    <div class="text-center space-y-3 sm:space-y-4">
      <div class="font-mono text-xs uppercase tracking-[0.3em] text-[#FFE500]">
        PERFORMANCE &amp; CAPABILITIES
      </div>
      <h2 class="font-heading font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[0.16em] text-white">
        TECHNICAL SPECIFICATIONS
      </h2>
      <p class="font-sans text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
        Official technical parameters and operational specifications for <span class="text-white font-medium">{product.name}</span>.
      </p>
    </div>

    <!-- 2-Column Grid of Categorized Groups (mesinprintingjersey.id Style) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 lg:gap-y-16">
      <!-- Left Column -->
      <div class="space-y-12 sm:space-y-14">
        {#each detailedSpecs.left as group}
          <div>
            <h3 class="text-xs sm:text-sm font-bold font-heading tracking-widest text-[#FFE500] uppercase mb-4 pb-2.5 border-b border-[#FFE500]/30 flex items-center justify-between">
              <span>{group.title}</span>
              <span class="w-1.5 h-1.5 rounded-full bg-[#FFE500]/70"></span>
            </h3>
            <div>
              {#each group.items as item}
                <div class="grid grid-cols-12 py-3.5 border-b border-white/10 text-xs sm:text-sm items-baseline gap-2 sm:gap-4 transition-colors hover:bg-white/[0.03]">
                  <span class="col-span-5 text-neutral-400 font-medium leading-relaxed">
                    {item.label}
                  </span>
                  <span class="col-span-7 text-white font-semibold leading-relaxed">
                    {item.value}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <!-- Right Column -->
      <div class="space-y-12 sm:space-y-14">
        {#each detailedSpecs.right as group}
          <div>
            <h3 class="text-xs sm:text-sm font-bold font-heading tracking-widest text-[#FFE500] uppercase mb-4 pb-2.5 border-b border-[#FFE500]/30 flex items-center justify-between">
              <span>{group.title}</span>
              <span class="w-1.5 h-1.5 rounded-full bg-[#FFE500]/70"></span>
            </h3>
            <div>
              {#each group.items as item}
                <div class="grid grid-cols-12 py-3.5 border-b border-white/10 text-xs sm:text-sm items-baseline gap-2 sm:gap-4 transition-colors hover:bg-white/[0.03]">
                  <span class="col-span-5 text-neutral-400 font-medium leading-relaxed">
                    {item.label}
                  </span>
                  <span class="col-span-7 text-white font-semibold leading-relaxed">
                    {item.value}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Official Warranty & Service Cards (Dark Luxury Style) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <div class="border border-white/10 p-6 space-y-2 bg-neutral-950">
        <div class="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
          <svg class="w-5 h-5 text-[#FFE500] stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          1-Year Official Warranty
        </div>
        <p class="font-sans text-xs text-neutral-400 leading-relaxed">
          Jaminan perlindungan penuh untuk sparepart non-consumable dan servis berkala oleh teknisi resmi pabrikan ORIA.
        </p>
      </div>

      <div class="border border-white/10 p-6 space-y-2 bg-neutral-950">
        <div class="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
          <svg class="w-5 h-5 text-[#FFE500] stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          On-Site Installation &amp; Training
        </div>
        <p class="font-sans text-xs text-neutral-400 leading-relaxed">
          Tim teknisi kami hadir langsung di workshop Anda untuk setting mesin, kalibrasi warna, dan pelatihan operator hingga mahir.
        </p>
      </div>

      <div class="border border-white/10 p-6 space-y-2 bg-neutral-950">
        <div class="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
          <svg class="w-5 h-5 text-[#FFE500] stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Genuine Consumables &amp; Spare Parts
        </div>
        <p class="font-sans text-xs text-neutral-400 leading-relaxed">
          Ketersediaan consumable original terjamin berkesinambungan agar jadwal produksi bisnis Anda tidak pernah terhenti.
        </p>
      </div>
    </div>
  </div>
</section>
