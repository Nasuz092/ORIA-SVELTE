<script lang="ts">
  import { onMount, onDestroy } from 'svelte';
  import Siema from 'siema';
  import type { FormattedProduct } from '$lib/types/product';

  let {
    product,
    cleanModelName
  }: {
    product: FormattedProduct;
    cleanModelName: string;
  } = $props();

  const gallery = $derived(
    product.galleryItems && product.galleryItems.length > 0
      ? product.galleryItems
      : (product.galleryUrls || []).map((url, i) => ({
          url,
          title: `DETAIL PERSPEKTIF 0${i + 1}`,
          caption: `Dokumentasi visual unit industri presisi ${product.name}.`
        }))
  );

  // Pool slide yang cukup (minimal 8 items) agar Siema dapat melakukan infinite loop mulus dua arah
  const carouselItems = $derived.by(() => {
    if (gallery.length === 0) return [];
    let list = [...gallery];
    while (list.length < 8) {
      list = [...list, ...gallery];
    }
    return list;
  });

  let siemaEl: HTMLDivElement | null = $state(null);
  let controller: Siema | null = null;
  let currentIndex = $state(0);

  function updateCurrent() {
    if (!controller || gallery.length === 0) return;
    const raw = controller.currentSlide;
    const n = gallery.length;
    currentIndex = ((raw % n) + n) % n;
  }

  function prevSlide() {
    controller?.prev();
  }

  function nextSlide() {
    controller?.next();
  }

  onMount(() => {
    if (!siemaEl || gallery.length === 0) return;
    controller = new Siema({
      selector: siemaEl,
      perPage: 1,
      loop: true,
      duration: 500,
      easing: 'cubic-bezier(0.16, 1, 0.3, 1)',
      draggable: true,
      multipleDrag: false,
      threshold: 20,
      onChange: () => {
        updateCurrent();
      }
    });
  });

  onDestroy(() => {
    controller?.destroy(true);
  });
</script>

{#if gallery.length > 0}
  <!-- ========================================================================= -->
  <!-- SECTION 3: GALLERY (LOTUS GALERI MESIN STYLE - WHITE BACKGROUND)       -->
  <!-- ========================================================================= -->
  <section
    id="gallery"
    class="relative w-full bg-white text-black pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-14 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"
  >
    <div class="max-w-4xl mx-auto space-y-8 sm:space-y-10">
      <!-- Top Header (English Section Title & Brief Editorial Description) -->
      <div class="space-y-3 sm:space-y-4 max-w-3xl">
        <h2 class="font-heading font-medium tracking-[0.2em] sm:tracking-[0.25em] text-2xl sm:text-3xl lg:text-4xl uppercase text-black leading-tight">
          GALERI MESIN
        </h2>
        <p class="font-sans text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">
          Eksplorasi visual setiap sudut konstruksi baja berat, arsitektur printhead, dan integrasi komponen presisi tinggi dari ORIA {cleanModelName}.
        </p>
      </div>

      <!-- Main Showcase Carousel Box with Floating Chevron Nav -->
      <div
        class="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-neutral-100 overflow-hidden border border-neutral-300 shadow-sm"
        role="region"
        aria-label="Gallery Carousel"
      >
        <!-- Siema Track Container: Infinite loop dengan slide transition -->
        <div bind:this={siemaEl} class="w-full h-full">
          {#each carouselItems as item, i (`${item.url}-${i}`)}
            <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none">
              <img
                src={item.url}
                alt={item.title || product.name}
                class="w-full h-full object-cover object-center pointer-events-none select-none"
                loading={i < 2 ? 'eager' : 'lazy'}
                draggable="false"
              />
            </div>
          {/each}
        </div>

        <!-- Floating Chevron Buttons (Yellow Border Box & Chevron) -->
        {#if gallery.length > 1}
          <!-- Left Chevron -->
          <button
            type="button"
            onclick={prevSlide}
            class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 border border-[#334c54] bg-[#334c54] hover:bg-[#273a40] text-white flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none group backdrop-blur-sm shadow-xl"
            aria-label="Foto Sebelumnya"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-transform duration-200 group-hover:-translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <!-- Right Chevron -->
          <button
            type="button"
            onclick={nextSlide}
            class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 border border-[#334c54] bg-[#334c54] hover:bg-[#273a40] text-white flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none group backdrop-blur-sm shadow-xl"
            aria-label="Foto Berikutnya"
          >
            <svg
              class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-transform duration-200 group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        {/if}
      </div>

      <!-- Slide Index Only -->
      {#if gallery.length > 1}
        <div class="flex justify-end pt-1 border-b border-neutral-300 pb-4">
          <div class="font-mono text-xs sm:text-sm tracking-widest text-black font-bold">
            {currentIndex + 1} / {gallery.length}
          </div>
        </div>
      {/if}
    </div>
  </section>
{/if}
