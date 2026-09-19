<script lang="ts">
  import { onMount } from 'svelte';

  const slides = [
    {
      headline: 'PRINTING BEYOND LIMITS',
      subheadline: 'Solusi Mesin Digital Printing Masa Depan',
      description: 'Dari Indoor Hingga Outdoor, ORIA Hadir untuk Mendukung Pertumbuhan Bisnis Anda.',
      image: '/images/hero/slide-1.webp',
      alt: 'Mesin Digital Printing Outdoor ORIA',
      // Pengaturan slide 1:
      // - Diperbesar sedikit: `lg:w-[80vw]`
      // - Offset 2/3 kanan keluar frame: `lg:translate-x-[66%]`
      containerClass: 'lg:w-[80vw] lg:min-w-[1250px] xl:min-w-[1600px] 2xl:min-w-[1900px] lg:translate-x-[66%]',
      imageClass: 'max-h-[70vh] lg:max-h-[80vh] xl:max-h-[85vh]'
    },
    {
      headline: 'PRECISION IN EVERY ROTATION',
      subheadline: 'Cetak Rotary Lebih Presisi, Tanpa Batas Kreasi',
      description: 'Hadirkan hasil cetak berkualitas tinggi pada tumbler dan berbagai produk silinder dengan teknologi UV Rotary ORIA.',
      image: '/images/hero/slide-2.webp',
      alt: 'Mesin UV Rotary ORIA',
      // Pengaturan slide 2:
      containerClass: 'lg:w-[52vw] lg:min-w-[900px] xl:min-w-[1150px] 2xl:min-w-[1350px] lg:translate-x-[35%]',
      imageClass: 'max-h-[62vh] lg:max-h-[72vh] xl:max-h-[78vh]'
    },
    {
      headline: 'COLOR THAT DRIVES BUSINESS',
      subheadline: 'Warna Lebih Hidup, Produksi Lebih Maksimal',
      description: 'Teknologi sublimasi ORIA menghadirkan warna tajam dan konsisten untuk kebutuhan produksi tekstil dan produk custom.',
      image: '/images/hero/slide-3.webp',
      alt: 'Mesin Textile Printing Sublimasi ORIA',
      // Pengaturan slide 3:
      containerClass: 'lg:w-[58vw] lg:min-w-[1000px] xl:min-w-[1250px] 2xl:min-w-[1450px] lg:translate-x-[44%]',
      imageClass: 'max-h-[64vh] lg:max-h-[74vh] xl:max-h-[80vh]'
    }
  ];

  let current = $state(0);
  let isHovered = $state(false);

  function nextSlide() {
    current = (current + 1) % slides.length;
  }

  function prevSlide() {
    current = (current - 1 + slides.length) % slides.length;
  }

  function goToSlide(index: number) {
    current = index;
  }

  onMount(() => {
    const timer = setInterval(() => {
      if (!isHovered) {
        nextSlide();
      }
    }, 6500);

    return () => clearInterval(timer);
  });
</script>

<section
  class="relative w-full bg-white text-black overflow-hidden h-[100svh] min-h-[100svh] flex flex-col justify-center pt-16 pb-6 lg:py-0"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  aria-roledescription="carousel"
  aria-label="Hero Slider Mesin ORIA"
>
  <div class="max-w-7xl mx-auto px-6 lg:px-12 w-full relative z-10">
    <div class="max-w-xl lg:max-w-xl xl:max-w-2xl flex flex-col items-center lg:items-start text-center lg:text-left mx-auto lg:mx-0 space-y-4 sm:space-y-6">
      
      <!-- MAIN HEADLINE (ENLARGED & CENTERED ON MOBILE) -->
      <h1 class="font-heading font-black text-4xl sm:text-6xl lg:text-6xl xl:text-7xl 2xl:text-[4.75rem] tracking-tight leading-[0.98] text-black uppercase">
        {slides[current].headline}
      </h1>

      <!-- SUBHEADLINE -->
      <h2 class="font-heading font-bold text-lg sm:text-2xl lg:text-2xl tracking-tight text-black leading-snug">
        {slides[current].subheadline}
      </h2>

      <!-- DESCRIPTION -->
      <p class="font-sans text-sm sm:text-base text-black/80 leading-relaxed max-w-lg mx-auto lg:mx-0">
        {slides[current].description}
      </p>

      <!-- CTA BUTTONS: CENTERED ON MOBILE -->
      <div class="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-1 sm:pt-2 w-full sm:w-auto">
        <a
          href="/produk"
          class="w-full sm:w-auto text-center bg-black text-white px-8 py-3.5 text-xs font-semibold uppercase tracking-widest hover:bg-black/85 transition-colors whitespace-nowrap"
        >
          Jelajahi Mesin
        </a>
        <a
          href="/kontak"
          class="w-full sm:w-auto text-center text-black px-4 py-3.5 text-xs font-semibold uppercase tracking-widest hover:underline flex items-center justify-center lg:justify-start gap-2 whitespace-nowrap"
        >
          Konsultasi Teknis
          <svg class="w-4 h-4 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>

      <!-- SLIDER CONTROLS: CHEVRONS & BAR INDICATORS (CENTERED ON MOBILE) -->
      <div class="flex items-center justify-center lg:justify-start gap-6 pt-2">
        <!-- Prev / Next Chevrons -->
        <div class="flex items-center gap-2">
          <button
            type="button"
            onclick={prevSlide}
            class="w-9 h-9 flex items-center justify-center rounded-full text-black hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer focus:outline-none"
            aria-label="Slide Sebelumnya"
          >
            <svg class="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onclick={nextSlide}
            class="w-9 h-9 flex items-center justify-center rounded-full text-black hover:bg-black/5 active:bg-black/10 transition-colors cursor-pointer focus:outline-none"
            aria-label="Slide Selanjutnya"
          >
            <svg class="w-5 h-5 text-black" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>

        <!-- Slide Bar Indicators -->
        <div class="flex items-center gap-2">
          {#each slides as _, i}
            <button
              type="button"
              onclick={() => goToSlide(i)}
              class="py-2.5 px-0.5 focus:outline-none cursor-pointer group"
              aria-label="Menuju Slide {i + 1}"
            >
              <span
                class="block h-1 rounded-full transition-all duration-300 {current === i ? 'w-10 bg-black' : 'w-5 bg-black/25 group-hover:bg-black/60'}"
              ></span>
            </button>
          {/each}
        </div>
      </div>
    </div>
  </div>

  <!-- MACHINE IMAGE:
       MOBILE: HIDDEN for now as requested
       DESKTOP (lg:): Positioned absolute on the right edge with smooth right-to-left entrance
  -->
  <div
    class="hidden lg:flex pointer-events-none select-none z-0
      lg:mt-0 lg:px-0 lg:flex-initial lg:justify-end lg:absolute lg:top-1/2 lg:-translate-y-1/2 lg:right-0
      {slides[current].containerClass}"
  >
    {#key current}
      <div class="slide-enter-right w-full flex justify-center items-center lg:justify-end">
        <img
          src={slides[current].image}
          alt={slides[current].alt}
          class="w-full max-w-full h-auto object-contain
            lg:max-h-none lg:w-full lg:h-auto drop-shadow-none {slides[current].imageClass}"
          loading="eager"
        />
      </div>
    {/key}
  </div>
</section>

<style>
  @keyframes slideInFromRight {
    0% {
      opacity: 0;
      transform: translateX(120px);
    }
    100% {
      opacity: 1;
      transform: translateX(0);
    }
  }

  .slide-enter-right {
    animation: slideInFromRight 0.55s cubic-bezier(0.16, 1, 0.3, 1) both;
  }
</style>
