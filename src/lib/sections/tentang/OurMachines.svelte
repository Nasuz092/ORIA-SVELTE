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
      // Parallax halus (maks ±20px) pada kolom teks kiri
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

<!-- ======================================================================= -->
<!-- SECTION: Our Machines (Lotus "OUR DRIVE" Style - Precision Macro Detail) -->
<!-- ======================================================================= -->
<section bind:this={sectionEl} id="our-machines" class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
    <!-- Left Column: Editorial Narrative & Specifications (Subtle Parallax) -->
    <div
      class="lg:col-span-5 space-y-6 sm:space-y-8 max-w-xl transition-transform duration-150 ease-out will-change-transform"
      style="transform: translate3d(0, {parallaxY}px, 0);"
    >
      <!-- Section Tag / Yellow Accent Title -->
      <h2 class="font-heading font-light text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#FFE500]">
        OUR MACHINES
      </h2>

      <div class="space-y-5 sm:space-y-6 font-sans text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed">
        <p>
          Dari mesin UV Flatbed berkecepatan tinggi, printer tekstil sublimasi, hingga CNC Router presisi industri — setiap mesin ORIA dirancang dengan standar toleransi mikron untuk performa tanpa kompromi.
        </p>

        <!-- Technical Attributes (Lotus Style) -->
        <p class="text-white font-medium tracking-wide text-xs sm:text-sm leading-relaxed text-neutral-200">
          Akurasi. Stabilitas. Material. Sasis. Kecepatan. Daya Tahan. Kalibrasi. Koneksi.
        </p>

        <p class="text-neutral-400">
          Dirancang seimbang, kokoh, dan presisi untuk menghadirkan keandalan operasional mutlak dalam siklus kerja berat 24/7. Menghasilkan ketajaman warna sempurna dan konsistensi cetak terbaik bagi setiap lini produksi bisnis Anda.
        </p>
      </div>
    </div>

    <!-- Right Column: Zoomed-in Macro Machine Detail Photo -->
    <div class="lg:col-span-7 w-full overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl relative group">
      <img
        src="/images/our-machines-detail.jpg"
        alt="Detail Presisi Komponen Linear Guide Rail dan Printhead Mesin ORIA"
        class="w-full h-full aspect-[4/3] object-cover object-center scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
        loading="lazy"
      />
      <!-- Subtle Gradient Overlay -->
      <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none"></div>
      
      <!-- Caption Badge -->
      <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[10px] sm:text-xs tracking-wider uppercase text-neutral-300">
        <span class="text-[#FFE500] font-semibold">Macro View</span> &mdash; Linear Guide Rail &amp; Dual Carriage
      </div>
    </div>
  </div>
</section>
