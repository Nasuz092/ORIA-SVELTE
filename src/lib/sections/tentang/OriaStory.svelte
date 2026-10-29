<script lang="ts">
  let sectionEl = $state<HTMLElement | null>(null);
  let parallaxY = $state(0);

  $effect(() => {
    function updateParallax() {
      if (!sectionEl || typeof window === 'undefined') return;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, centerOffset));
      // Parallax halus (maks ±16px) pada judul utama
      parallaxY = clamped * 16;
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

<!-- SECTION 1: #oria-story (Industrial Precision Pure White Section) -->
<section bind:this={sectionEl} id="oria-story" class="w-full bg-white text-black py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden">
  <div class="max-w-4xl mx-auto text-center space-y-10 sm:space-y-12">
    <!-- Big Tracked Title with Subtle Parallax -->
    <h2
      class="font-heading font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.22em] sm:tracking-[0.26em] uppercase text-neutral-900 leading-tight transition-transform duration-150 ease-out will-change-transform"
      style="transform: translate3d(0, {parallaxY}px, 0);"
    >
      ENGINEERED FOR INDUSTRY
    </h2>

    <!-- Centered Editorial Narrative (Adapted to Printing Machine Industry) -->
    <div class="space-y-7 sm:space-y-8 font-sans text-neutral-600 text-sm sm:text-base md:text-[1.05rem] leading-relaxed max-w-2xl mx-auto">
      <p>
        ORIA berdiri teguh sebagai brand yang didedikasikan untuk keandalan dan presisi mesin produksi industrial. Inilah mengapa setiap unit mesin ORIA dirancang bangun dengan satu komitmen utama:
      </p>

      <p class="text-neutral-950 font-medium text-base sm:text-lg md:text-xl">
        Mewujudkan keselarasan sempurna antara presisi rekayasa, operator, dan produktivitas tanpa henti.
      </p>

      <p class="text-neutral-600">
        Sebuah standar performa industri, yang menjadi hasil akhir sekaligus titik awal dalam mengejar keunggulan manufaktur, seiring kami senantiasa didorong oleh inovasi masa depan. Prinsip panduan dalam setiap hal yang kami lakukan, untuk setiap mesin yang kami bangun — <span class="text-neutral-950 font-semibold tracking-wide">Engineered for Industry.</span>
      </p>
    </div>
  </div>
</section>
