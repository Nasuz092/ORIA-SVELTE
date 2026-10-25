<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Siema from 'siema';

  const slides = [
    {
      id: 'outdoor',
      line1: 'ORIA',
      line2: 'OUTDOOR 3204 ST',
      desc1: 'Standar Baru Digital Printing Outdoor Skala Industri.',
      desc2: 'Kecepatan Cetak Tinggi, Presisi, dan Tahan Cuaca Ekstrem.',
      ctaText: 'DISCOVER',
      ctaHref: '/produk/oria-outdoor-3204-st',
      desktopImage: '/images/hero/outdoor-oria-desktop.png',
      mobileImage: '/images/hero/outdoor-oria-mobile.png',
      alt: 'Mesin Digital Printing Outdoor ORIA 3204 ST'
    },
    {
      id: 'sublimasi',
      line1: 'ORIA',
      line2: 'SUBLIM 1902',
      desc1: 'Inovasi Percetakan Tekstil & Apparel Masa Depan.',
      desc2: 'Gradasi Warna Tajam, Efisiensi Tinta, dan Konsistensi Produksi Massal.',
      ctaText: 'DISCOVER',
      ctaHref: '/produk/oria-sublim-1902',
      desktopImage: '/images/hero/sublim-oria-desktop.png',
      mobileImage: '/images/hero/sublim-oria-mobile.png',
      alt: 'Mesin Textile Printing Sublimasi ORIA 1902'
    }
  ];

  // Pool slide yang cukup (minimal 8 items) agar Siema dapat melakukan infinite loop mulus dua arah
  const carouselSlides = $derived.by(() => {
    let list = [...slides];
    while (list.length < 8) {
      list = [...list, ...slides];
    }
    return list;
  });

  let siemaEl: HTMLDivElement | null = $state(null);
  let controller: Siema | null = null;
  let current = $state(0);
  let isHovered = $state(false);
  let autoplayTimer: ReturnType<typeof setInterval> | null = null;

  function updateCurrent() {
    if (!controller) return;
    const raw = controller.currentSlide;
    const n = slides.length;
    current = ((raw % n) + n) % n;
  }

  function startAutoplay() {
    stopAutoplay();
    autoplayTimer = setInterval(() => {
      if (!isHovered && controller) {
        controller.next();
      }
    }, 6500);
  }

  function stopAutoplay() {
    if (autoplayTimer) {
      clearInterval(autoplayTimer);
      autoplayTimer = null;
    }
  }

  function goToSlide(targetIndex: number) {
    if (!controller) return;
    const raw = controller.currentSlide;
    const n = slides.length;
    const currentNormalized = ((raw % n) + n) % n;
    let diff = targetIndex - currentNormalized;
    if (diff > n / 2) diff -= n;
    if (diff < -n / 2) diff += n;
    controller.goTo(raw + diff);
  }

  onMount(() => {
    if (!siemaEl) return;
    controller = new Siema({
      selector: siemaEl,
      perPage: 1,
      loop: true,
      duration: 650,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      draggable: true,
      multipleDrag: false,
      threshold: 20,
      onChange: () => {
        updateCurrent();
      }
    });

    startAutoplay();
  });

  onDestroy(() => {
    stopAutoplay();
    controller?.destroy(true);
  });
</script>

<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
<section
  class="relative w-full h-[100svh] min-h-[580px] bg-black text-white overflow-hidden select-none"
  onmouseenter={() => (isHovered = true)}
  onmouseleave={() => (isHovered = false)}
  aria-roledescription="carousel"
  aria-label="Hero Slider ORIA"
>
  <!-- Siema Carousel Sliding Track: Infinite loop dengan drag & swipe bawaan Siema -->
  <div bind:this={siemaEl} class="w-full h-full">
    {#each carouselSlides as slide, i (`${slide.id}-${i}`)}
      <div class="relative w-full h-[100svh] min-h-[580px] overflow-hidden select-none">
        <!-- Background Responsive Picture (draggable false agar tidak memicu drag-and-drop native gambar) -->
        <picture class="w-full h-full block pointer-events-none select-none">
          <source media="(max-width: 767px)" srcset={slide.mobileImage} />
          <img
            src={slide.desktopImage}
            alt={slide.alt}
            draggable="false"
            class="w-full h-full object-cover object-center pointer-events-none select-none"
            loading={i < 2 ? 'eager' : 'lazy'}
          />
        </picture>

        <!-- Layer Gradient Hitam ke Transparan (Dari kiri hitam ke kanan transparan) -->
        <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent pointer-events-none z-10"></div>

        <!-- Content Overlay: Menempel langsung di dalam slide, ikut meluncur bersama gambar -->
        <div class="absolute bottom-14 sm:bottom-16 lg:bottom-20 left-6 sm:left-12 lg:left-16 z-20 max-w-lg pointer-events-auto">
          <div class="space-y-3 sm:space-y-4">
            <!-- Headline: Ukuran font proporsional dengan shadow -->
            <div class="font-heading font-black text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] tracking-[0.18em] sm:tracking-[0.22em] leading-tight text-[#FFE500] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]">
              <div>{slide.line1}</div>
              <div class="mt-0.5 sm:mt-1">{slide.line2}</div>
            </div>

            <!-- Description: 2 lines in crisp white -->
            <div class="font-sans text-xs sm:text-sm text-white/95 leading-relaxed max-w-md font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]">
              <p>{slide.desc1}</p>
              <p>{slide.desc2}</p>
            </div>

            <!-- CTA Button (Yellow solid rectangle, Chevron rule respected) -->
            <div class="pt-1.5 sm:pt-2">
              <a
                href={slide.ctaHref}
                class="inline-flex items-center gap-2 bg-[#FFE500] hover:bg-[#ffe500]/90 text-black font-heading font-black text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-8 py-2.5 sm:py-3 transition-all shadow-xl cursor-pointer"
              >
                <span>{slide.ctaText}</span>
                <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Slide Indicators (Hanya bar/dot di tengah bawah tanpa tombol navigasi) -->
  <div class="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 pointer-events-auto">
    {#each slides as _, i}
      <button
        type="button"
        onclick={() => goToSlide(i)}
        class="py-2 px-1 focus:outline-none cursor-pointer group"
        aria-label="Menuju Slide {i + 1}"
      >
        <span
          class="block h-1.5 rounded-full transition-all duration-300 drop-shadow-md {current === i ? 'w-7 bg-[#FFE500]' : 'w-2 bg-white/70 group-hover:bg-white'}"
        ></span>
      </button>
    {/each}
  </div>
</section>
