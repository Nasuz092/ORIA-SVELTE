<script lang="ts">
  // Section Manifesto Brand ORIA (Industrial Precision - Solid Black, Wide Tracking, 2 Columns)
  let sectionEl = $state<HTMLElement | null>(null);
  let parallaxY = $state(0);

  $effect(() => {
    function updateParallax() {
      if (!sectionEl || typeof window === 'undefined') return;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      // Hitung jarak relatif terhadap tengah layar (-1 s/d 1), dibatasi agar halus dan tidak berlebihan (maks ±18px)
      const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, centerOffset));
      parallaxY = clamped * 18;
    }

    if (typeof window !== 'undefined') {
      updateParallax();
      window.addEventListener('layout-scroll', updateParallax, { passive: true });
      window.addEventListener('scroll', updateParallax, { passive: true });
      window.addEventListener('resize', updateParallax, { passive: true });
      return () => {
        window.removeEventListener('layout-scroll', updateParallax);
        window.removeEventListener('scroll', updateParallax);
        window.removeEventListener('resize', updateParallax);
      };
    }
  });
</script>

<section bind:this={sectionEl} class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none overflow-hidden">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
    <!-- Left Column: Big elegant uppercase tracked heading (Subtle Parallax) -->
    <div
      class="lg:col-span-5 space-y-1 transition-transform duration-150 ease-out will-change-transform"
      style="transform: translate3d(0, {parallaxY}px, 0);"
    >
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.22em] sm:tracking-[0.26em] uppercase leading-[1.15] text-white">
        <span class="block">ENGINEERED</span>
        <span class="block mt-1 sm:mt-2">FOR INDUSTRY</span>
      </h2>
    </div>

    <!-- Right Column: 3 refined industrial statements -->
    <div class="lg:col-span-7 space-y-6 sm:space-y-8 font-sans text-sm sm:text-base lg:text-[1.05rem] text-white/90 leading-relaxed font-normal max-w-2xl">
      <p>
        ORIA menghadirkan ekosistem teknologi cetak digital dan fabrikasi berstandar industri untuk mendukung lini produksi modern yang menuntut keandalan tinggi.
      </p>

      <p class="font-medium text-white">
        Dirancang dengan arsitektur mekanis kelas berat, setiap unit menggabungkan akurasi mikron, kecepatan throughput tinggi, dan ketangguhan operasional nonstop 24/7.
      </p>

      <p class="text-white/80">
        Standar rekayasa presisi untuk meningkatkan efisiensi dan skala kapasitas bisnis Anda — <span class="text-white font-semibold tracking-wide">Engineered for Industry.</span>
      </p>
    </div>
  </div>
</section>
