<script lang="ts">
  let { id = 'kapasitas-layanan' }: { id?: string } = $props();

  let sectionEl: HTMLElement | null = $state(null);
  let hasAnimated = $state(false);

  let count500 = $state(0);
  let count100 = $state(0);
  let count24 = $state(0);

  function animateCount(target: number, duration: number, callback: (v: number) => void) {
    const start = performance.now();
    function step(now: number) {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Fluid easeOutExpo for ultra-smooth counting deceleration
      const ease = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      callback(Math.round(ease * target));
      if (progress < 1) {
        requestAnimationFrame(step);
      }
    }
    requestAnimationFrame(step);
  }

  $effect(() => {
    if (!sectionEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !hasAnimated) {
            hasAnimated = true;
            animateCount(500, 1800, (v) => (count500 = v));
            animateCount(100, 1500, (v) => (count100 = v));
            animateCount(24, 1200, (v) => (count24 = v));
          }
        });
      },
      { threshold: 0.2 }
    );

    observer.observe(sectionEl);

    return () => {
      observer.disconnect();
    };
  });
</script>

<!-- ======================================================================= -->
<!-- SECTION: Our Capacity (3 Statistics: 500+, 100%, 24/7 - Borderless)    -->
<!-- ======================================================================= -->
<section
  {id}
  bind:this={sectionEl}
  class="w-full bg-neutral-950 text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16"
>
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Header: Clean Title in English (Lotus Style) -->
    <div class="space-y-3 max-w-2xl">
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white">
        OUR CAPACITY
      </h2>
      <p class="font-sans text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed pt-1">
        Komitmen nyata dan integritas kemitraan jangka panjang yang telah dipercaya oleh ratusan pengusaha percetakan di Indonesia.
      </p>
    </div>

    <!-- 3 Clean Borderless Stats Columns with Animated Counters -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16">
      <!-- Stat 1: 500+ Installed Units -->
      <div class="space-y-3">
        <div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight tabular-nums">
          {count500}<span class="text-[#FFE500] font-normal">+</span>
        </div>
        <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">
          UNITS INSTALLED
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
          Beroperasi aktif di berbagai provinsi di Indonesia.
        </p>
      </div>

      <!-- Stat 2: 100% Official Warranty -->
      <div class="space-y-3">
        <div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight tabular-nums">
          {count100}<span class="text-[#FFE500] font-normal">%</span>
        </div>
        <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">
          OFFICIAL WARRANTY
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
          Jaminan keaslian komponen dan proteksi investasi unit.
        </p>
      </div>

      <!-- Stat 3: 24/7 Technical Support -->
      <div class="space-y-3">
        <div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight tabular-nums">
          {count24}<span class="text-[#FFE500] font-normal">/7</span>
        </div>
        <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">
          TECHNICAL SUPPORT
        </div>
        <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">
          Konsultasi cepat dan penanganan teknisi tersertifikasi.
        </p>
      </div>
    </div>
  </div>
</section>
