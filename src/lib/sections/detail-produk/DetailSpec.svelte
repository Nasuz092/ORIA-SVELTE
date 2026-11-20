<script lang="ts">
  import type { FormattedProduct } from '$lib/types/product';
  import { parseStrapiSpecRows, type SpecGroup } from '$lib/utils/product-specs';

  let {
    product,
    detailedSpecs = { left: [], right: [] }
  }: {
    product: FormattedProduct;
    detailedSpecs?: { left: SpecGroup[]; right: SpecGroup[] };
  } = $props();

  let specRows = $derived.by(() => {
    const authentic = parseStrapiSpecRows(product);
    if (authentic.length > 0) return authentic;
    return [...detailedSpecs.left, ...detailedSpecs.right].flatMap((g) => g.items);
  });

  let warrantySectionEl: HTMLElement | null = $state(null);
  let hasAnimated = $state(false);

  let count100 = $state(0);
  let count24 = $state(0);

  function animateCount(target: number, duration: number, callback: (v: number) => void) {
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      callback(Math.round(ease * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  $effect(() => {
    if (!warrantySectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCount(100, 1500, (v) => (count100 = v));
            animateCount(24, 1200, (v) => (count24 = v));
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(warrantySectionEl);

    return () => {
      observer.disconnect();
    };
  });
</script>

<!-- ========================================================================= -->
<!-- SECTION 3: SPEC (MESINPRINTINGJERSEY STYLE IN LOTUS/ORIA COLOR PALETTE)   -->
<!-- ========================================================================= -->
<section id="spec" class="w-full bg-white text-black pt-10 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 px-6 sm:px-10 lg:px-16 select-none">
  <div class="max-w-7xl mx-auto space-y-16 sm:space-y-20">
    <!-- Header: Consistent English Title -->
    <div class="text-center space-y-3 sm:space-y-4">
      <h2 class="font-heading font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[0.16em] text-black">
        SPESIFIKASI TEKNIS
      </h2>
      <p class="font-sans text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">
        Parameter teknis resmi dan spesifikasi operasional untuk <span class="text-black font-medium">{product.name}</span>.
      </p>
    </div>

    <!-- Editorial Luxury Specification Table: Borderless Outside, No Vertical Lines, Horizontal Dividers Only -->
    {#if specRows.length > 0}
      <div class="max-w-4xl mx-auto">
        <!-- Refined Header Row (No Solid Box, Crisp 2px Brand Teal Bottom Border) -->
        <div class="grid grid-cols-12 items-center border-b-2 border-[#334c54] pb-3.5 px-2 sm:px-4 text-[11px] sm:text-xs font-heading font-bold uppercase tracking-[0.22em] text-[#334c54]">
          <div class="col-span-5 sm:col-span-4">
            Spesifikasi
          </div>
          <div class="col-span-7 sm:col-span-8 flex items-center justify-between">
            <span>Keterangan</span>
            <span class="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#334c54]"></span>
          </div>
        </div>

        <!-- Horizontal-Only Rows -->
        <div class="divide-y divide-[#D6DBDD]">
          {#each specRows as row}
            <div class="group grid grid-cols-12 items-baseline py-4 sm:py-4.5 px-2 sm:px-4 text-xs sm:text-sm transition-colors duration-200 hover:bg-[#334c54]/[0.03]">
              <div class="col-span-5 sm:col-span-4 pr-4 text-neutral-500 group-hover:text-[#334c54] font-medium leading-relaxed transition-colors duration-200 flex items-baseline gap-2.5">
                <span class="hidden sm:inline-block w-1 h-1 rounded-full bg-[#D6DBDD] group-hover:bg-[#334c54] shrink-0 transition-colors duration-200"></span>
                <span>{row.label}</span>
              </div>
              <div class="col-span-7 sm:col-span-8 text-black font-semibold leading-relaxed">
                {row.value}
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Action Button: Download Full Spec & Brochure (Below Spec Tables) -->
    <div class="flex flex-col sm:flex-row items-center justify-center pt-2 sm:pt-4">
      <a
        href={product.brochureUrl || `https://wa.me/6281252086455?text=${encodeURIComponent(`Halo tim ORIA, mohon kirimkan e-katalog brosur dan full spesifikasi PDF untuk unit ${product.name}. Terima kasih.`)}`}
        target="_blank"
        rel="noopener noreferrer"
        download={product.brochureUrl ? `${product.slug}-brochure.pdf` : undefined}
        class="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-[#334c54] hover:bg-[#273a40] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-md group cursor-pointer"
      >
        <svg class="w-4 h-4 stroke-white stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3" />
        </svg>
        <span>UNDUH BROSUR &amp; SPESIFIKASI LENGKAP</span>
        <svg class="w-4 h-4 stroke-white stroke-[3] transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>

    <!-- Section Warranty & Services: Lotus "Our Capacity" Minimalist Style -->
    <div bind:this={warrantySectionEl} class="pt-16 sm:pt-24 border-t border-neutral-200 space-y-12 sm:space-y-16">
      <div class="space-y-3 max-w-2xl">
        <h3 class="font-heading font-light text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black">
          GARANSI &amp; LAYANAN
        </h3>
        <p class="font-sans text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed pt-1">
          Standar proteksi investasi dan dukungan operasional resmi dari teknisi pabrikan ORIA.
        </p>
      </div>

      <!-- 3 Clean Borderless Stats Columns with Animated Counters (Like Our Capacity) -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
        <!-- Stat 1: 1-Year Official Warranty -->
        <div class="space-y-3">
          <div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-black tracking-tight tabular-nums">
            1<span class="text-[#334c54] font-normal"> TAHUN</span>
          </div>
          <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-900 pt-1">
            GARANSI RESMI
          </div>
          <p class="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Jaminan perlindungan penuh untuk sparepart non-consumable dan servis berkala oleh teknisi resmi pabrikan ORIA.
          </p>
        </div>

        <!-- Stat 2: On-Site Training -->
        <div class="space-y-3">
          <div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-black tracking-tight tabular-nums">
            {count100}<span class="text-[#334c54] font-normal">%</span>
          </div>
          <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-900 pt-1">
            INSTALASI &amp; PELATIHAN DI LOKASI
          </div>
          <p class="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Tim teknisi kami hadir langsung di workshop Anda untuk setting mesin, kalibrasi warna, dan pelatihan operator hingga mahir.
          </p>
        </div>

        <!-- Stat 3: Genuine Spare Parts -->
        <div class="space-y-3">
          <div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-black tracking-tight tabular-nums">
            {count24}<span class="text-[#334c54] font-normal">/7</span>
          </div>
          <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-900 pt-1">
            SUKU CADANG &amp; TINTA RESMI
          </div>
          <p class="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">
            Ketersediaan consumable original terjamin berkesinambungan agar jadwal produksi bisnis Anda tidak pernah terhenti.
          </p>
        </div>
      </div>
    </div>
  </div>
</section>
