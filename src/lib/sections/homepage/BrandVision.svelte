<script lang="ts">
  // Section Our Drive / Visi Misi ORIA (Lotus Inspired Panoramic Showroom)
  let sectionEl = $state<HTMLElement | null>(null);
  let parallaxY = $state(0);

  const values = [
    {
      title: 'Standar Kualitas',
      desc: 'Setiap unit melalui inspeksi ketat dan kalibrasi presisi sebelum pengiriman.',
      icon: '/images/values/standar-kualitas.webp'
    },
    {
      title: 'Garansi Pabrikan',
      desc: 'Perlindungan garansi resmi untuk menjaga keamanan investasi mesin Anda.',
      icon: '/images/values/garansi-pabrikan.webp'
    },
    {
      title: 'Komitmen Purna Jual',
      desc: 'Ketersediaan suku cadang asli dan tinta resmi untuk kelancaran produksi.',
      icon: '/images/values/komitmen-purna-jual.webp'
    },
    {
      title: 'Dukungan Teknisi Profesional',
      desc: 'Tim teknisi berpengalaman siap melayani instalasi, pelatihan, dan perawatan.',
      icon: '/images/values/dukungan-teknisi.webp'
    }
  ];

  $effect(() => {
    function updateParallax() {
      if (!sectionEl || typeof window === 'undefined') return;
      const rect = sectionEl.getBoundingClientRect();
      const vh = window.innerHeight || 800;
      const centerOffset = (rect.top + rect.height / 2 - vh / 2) / vh;
      const clamped = Math.max(-1, Math.min(1, centerOffset));
      // Parallax halus (maks ±22px) untuk blok teks DEDIKASI KAMI
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

<section bind:this={sectionEl} class="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[750px] flex items-center overflow-hidden bg-black select-none px-6 sm:px-10 lg:px-16">
  <!-- Panoramic Background Image -->
  <div class="absolute inset-0 w-full h-full">
    <img
      src="/images/our-drive-workshop.png"
      alt="Workshop Mesin Cetak Format Lebar Industrial ORIA"
      class="w-full h-full object-cover object-center lg:object-[center_40%]"
      loading="lazy"
    />
    <!-- Base Black 70% Overlay -->
    <div class="absolute inset-0 bg-black/70 pointer-events-none"></div>
    <!-- Subtle Gradient Overlay for Text Legibility (Gradasi hitam ke transparan) -->
    <div class="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:from-black/80 sm:via-black/30 sm:to-transparent"></div>
  </div>

  <!-- Content Container (Left: Dedikasi Kami + CTA, Right: 4 Core Values Grid) -->
  <div class="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-24">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
      <!-- Left Column: Title, Description, CTA -->
      <div
        class="lg:col-span-5 space-y-4 sm:space-y-6 transition-transform duration-150 ease-out will-change-transform"
        style="transform: translate3d(0, {parallaxY}px, 0);"
      >
        <!-- Title -->
        <h2 class="font-heading font-medium text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.25em] text-white leading-tight drop-shadow-md">
          DEDIKASI KAMI
        </h2>

        <!-- Description -->
        <p class="font-sans text-sm sm:text-base lg:text-[1.05rem] text-white/90 leading-relaxed font-normal max-w-lg drop-shadow-sm">
          Memasuki era baru teknologi percetakan industri, ORIA berkomitmen memperkuat standar kepeloporan dan presisi tinggi yang melandasi setiap inovasi mesin kami—di masa lalu, kini, dan masa depan.
        </p>

        <!-- CTA Button (Outline with Chevron) -->
        <div class="pt-2 sm:pt-4">
          <a
            href="/tentang"
            class="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 border border-white text-white hover:bg-white hover:text-black font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-xs group"
          >
            <span>VISI KAMI</span>
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

      <!-- Right Column: 4 Core Value Cards -->
      <div class="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
        {#each values as item}
          <div class="bg-white/10 hover:bg-white/15 backdrop-blur-md rounded-xl p-5 sm:p-6 transition-all duration-300 flex items-start gap-4">
            <div class="w-12 h-12 shrink-0 rounded-lg bg-white/10 backdrop-blur-sm p-2 flex items-center justify-center">
              <img
                src={item.icon}
                alt={item.title}
                class="w-full h-full object-contain select-none"
                loading="lazy"
              />
            </div>
            <div class="space-y-1.5 min-w-0">
              <h3 class="font-heading font-semibold text-sm sm:text-base uppercase tracking-[0.14em] text-white leading-snug">
                {item.title}
              </h3>
              <p class="font-sans text-xs sm:text-[13px] text-neutral-300 leading-relaxed">
                {item.desc}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
