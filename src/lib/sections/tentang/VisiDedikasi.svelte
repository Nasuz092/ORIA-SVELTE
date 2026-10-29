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
      // Parallax halus (maks ±22px) pada konten kartu OUR DEDICATION
      parallaxY = clamped * 22;
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

<!-- SECTION 5: #visi-dedikasi (Visi & Dedikasi Kami - Panoramic Card) -->
<section bind:this={sectionEl} id="visi-dedikasi" class="relative w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden">
  <div class="max-w-7xl mx-auto space-y-10">
    <div class="space-y-2">
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white">
        OUR DEDICATION
      </h2>
    </div>

    <!-- Panoramic Image Card -->
    <div class="relative w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] flex items-center overflow-hidden bg-neutral-900 border border-neutral-800">
      <img
        src="/images/our-drive-showroom.png"
        alt="Showroom Fasilitas Mesin ORIA"
        class="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:from-black/90 sm:via-black/55 sm:to-transparent"></div>

      <div
        class="relative z-10 max-w-xl p-8 sm:p-12 lg:p-16 space-y-5 transition-transform duration-150 ease-out will-change-transform"
        style="transform: translate3d(0, {parallaxY}px, 0);"
      >
        <div class="font-heading font-bold text-xs uppercase tracking-[0.28em] text-[#FFE500]">
          ENGINEERED FOR INDUSTRY
        </div>
        <h3 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-white leading-tight">
          Mendukung Kemandirian Industri Kreatif Indonesia
        </h3>
        <p class="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
          Kami mendampingi para kreator, pelaku UMKM, hingga manufaktur besar bertransformasi mengadopsi teknologi cetak digital dan laser terbaru yang efisien, hemat biaya produksi, dan ramah lingkungan.
        </p>
      </div>
    </div>
  </div>
</section>
