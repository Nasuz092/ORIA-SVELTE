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
      // Parallax halus (maks ±20px) pada kolom teks kanan
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
<!-- SECTION: Our Legacy (Lotus Style Editorial Heritage - Black Section)    -->
<!-- ======================================================================= -->
<section bind:this={sectionEl} id="our-legacy" class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
    <!-- Left Column: Legacy Photograph -->
    <div class="lg:col-span-6 w-full overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl">
      <img
        src="/images/our-legacy.jpg"
        alt="Founder dan Tim Rekayasa Presisi ORIA di Fasilitas Manufaktur"
        class="w-full h-full aspect-[4/3] object-cover object-center scale-100 transition-transform duration-700 ease-out hover:scale-105"
        loading="lazy"
      />
    </div>

    <!-- Right Column: Editorial Narrative & Legacy Ethos (Subtle Parallax) -->
    <div
      class="lg:col-span-6 space-y-6 sm:space-y-7 max-w-xl transition-transform duration-150 ease-out will-change-transform"
      style="transform: translate3d(0, {parallaxY}px, 0);"
    >
      <!-- Section Tag / Accent Title -->
      <h2 class="font-heading font-light text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#FFE500]">
        OUR LEGACY
      </h2>

      <!-- Narrative Body Text (Concise) -->
      <div class="space-y-4 font-sans text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed">
        <p>
          ORIA lahir dari visi rekayasa presisi dan dedikasi terhadap kemandirian industri manufaktur Indonesia. Kami meyakini bahwa keunggulan sejati sebuah mesin bertumpu pada keselarasan antara stabilitas mikron sasis, daya tahan operasional jangka panjang, dan kemudahan perawatan teknis.
        </p>

        <!-- Signature Quote / Ethos -->
        <p class="text-white italic text-sm sm:text-base md:text-lg font-serif border-l-2 border-[#FFE500] pl-4 py-1 my-2 text-neutral-200">
          &lsquo;Presisi tanpa kompromi, efisiensi tanpa batas.&rsquo;
        </p>

        <p class="text-neutral-400">
          Sebuah etos kerja yang kami padukan bersama teknisi tersertifikasi untuk menghadirkan solusi percetakan digital andal bagi para pelaku industri di seluruh Nusantara.
        </p>
      </div>
    </div>
  </div>
</section>
