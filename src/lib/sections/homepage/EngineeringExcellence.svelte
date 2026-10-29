<script lang="ts">
  // Section banner sinematik ala Lotus (LEADING THE WAY)
  let sectionEl = $state<HTMLElement | null>(null);
  let parallaxY = $state(0);

  $effect(() => {
    function updateParallax() {
      if (!sectionEl || typeof window === 'undefined') return;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, centerOffset));
      // Parallax halus (maks ±20px) untuk blok teks LEADING THE WAY
      parallaxY = clamped * 20;
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

<section bind:this={sectionEl} class="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center overflow-hidden bg-neutral-950 text-white select-none px-6 sm:px-10 lg:px-16">
  <!-- Background Image: Extreme Macro Machine Engineering -->
  <picture class="absolute inset-0 w-full h-full pointer-events-none">
    <source srcset="/images/engineering-excellence.webp" type="image/webp" />
    <img
      src="/images/engineering-excellence.png"
      alt="Standar Rekayasa Presisi Mesin Industri ORIA"
      class="w-full h-full object-cover object-center lg:object-[center_35%] scale-100 transition-transform duration-1000 ease-out hover:scale-105"
      loading="lazy"
    />
  </picture>

  <!-- Cinematic Contrast Gradient (Gradasi hitam ke transparan) -->
  <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/90 sm:via-black/55 sm:to-black/25 pointer-events-none"></div>

  <!-- Content Container (Lotus Layout: Left-aligned, generous padding, pristine typography + subtle parallax) -->
  <div class="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-20 lg:py-24">
    <div
      class="max-w-xl sm:max-w-2xl space-y-5 sm:space-y-6 transition-transform duration-150 ease-out will-change-transform"
      style="transform: translate3d(0, {parallaxY}px, 0);"
    >
      <!-- Section Title (Lotus Style) -->
      <h2 class="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.22em] text-white leading-[1.15]">
        LEADING THE WAY
      </h2>

      <!-- Subtitle Description -->
      <p class="font-sans text-sm sm:text-base lg:text-[17px] text-neutral-300 font-normal leading-relaxed max-w-lg">
        Standar rekayasa industri mutakhir pada setiap unit mesin ORIA memastikan stabilitas dan presisi mikron untuk lini produksi manufaktur tanpa henti.
      </p>

      <!-- CTA Button (Outline with Chevron, STRICT RULE: Chevrons Only, No Arrows) -->
      <div class="pt-2 sm:pt-4">
        <a
          href="/tentang"
          class="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 border border-white text-white hover:bg-white hover:text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-all duration-300 group bg-transparent focus:outline-none"
        >
          <span>LEARN MORE</span>
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
</section>
