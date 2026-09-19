<script lang="ts">
  let scrollContainer: HTMLElement | null = $state(null);

  const categories = [
    { title: 'Indoor Printing', desc: 'Sticker, Banner, Display', href: '/produk?cat=indoor', code: '01' },
    { title: 'Outdoor Printing', desc: 'Spanduk, Baliho, Billboard', href: '/produk?cat=outdoor', code: '02' },
    { title: 'Sublimasi', desc: 'Textile & Fashion', href: '/produk?cat=sublimasi', code: '03' },
    { title: 'DTF', desc: 'Custom Apparel', href: '/produk?cat=dtf', code: '04' },
    { title: 'UV Printing', desc: 'Flatbed & Cylinder', href: '/produk?cat=uv', code: '05' },
    { title: 'Laser Cutting', desc: 'Akrilik, Kayu, MDF, ACP', href: '/produk?cat=laser', code: '06' },
    { title: 'CNC Router', desc: 'Fabrikasi & Woodworking', href: '/produk?cat=cnc', code: '07' }
  ];

  function scrollLeft() {
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: -320, behavior: 'smooth' });
    }
  }

  function scrollRight() {
    if (scrollContainer) {
      scrollContainer.scrollBy({ left: 320, behavior: 'smooth' });
    }
  }
</script>

<section class="w-full bg-white text-black py-20 lg:py-28 px-6 lg:px-12 border-t border-black/5">
  <div class="max-w-7xl mx-auto space-y-10 lg:space-y-14">
    
    <!-- Section Header (2 Columns) -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div class="space-y-3 max-w-2xl">
        <span class="font-sans font-bold text-xs uppercase tracking-widest text-black/60">
          JELAJAHI KATEGORI
        </span>
        <h2 class="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-black leading-[1.08]">
          Temukan Mesin yang Sesuai untuk Bisnis Anda
        </h2>
      </div>

      <div class="flex flex-col sm:flex-row sm:items-center justify-between lg:justify-end gap-6 max-w-md">
        <p class="font-sans text-sm sm:text-base text-black/70 leading-relaxed">
          Berbagai pilihan mesin digital printing dengan teknologi terkini untuk memenuhi semua kebutuhan produksi Anda.
        </p>

        <!-- Navigation Chevrons for Horizontal Scroll -->
        <div class="hidden sm:flex items-center gap-2 flex-shrink-0">
          <button
            type="button"
            onclick={scrollLeft}
            class="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer focus:outline-none"
            aria-label="Gulir ke Kiri"
          >
            <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
              <polyline points="15 18 9 12 15 6" />
            </svg>
          </button>
          <button
            type="button"
            onclick={scrollRight}
            class="w-10 h-10 rounded-full border border-black/15 flex items-center justify-center text-black hover:bg-black hover:text-white transition-colors cursor-pointer focus:outline-none"
            aria-label="Gulir ke Kanan"
          >
            <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
              <polyline points="9 18 15 12 9 6" />
            </svg>
          </button>
        </div>
      </div>
    </div>

    <!-- Category Cards Horizontal Track (Monochrome, No Image Boxes, H3 Headings for Aurora Effect) -->
    <div
      bind:this={scrollContainer}
      class="flex overflow-x-auto snap-x snap-mandatory scroll-smooth no-scrollbar gap-5 pb-4 pt-1 -mx-6 px-6 lg:-mx-0 lg:px-0"
    >
      {#each categories as cat}
        <a
          href={cat.href}
          class="snap-start flex-shrink-0 w-[260px] sm:w-[280px] lg:w-[300px] h-[220px] bg-white border border-black/10 hover:border-black rounded-2xl p-6 flex flex-col justify-between group transition-all duration-300 hover:shadow-md cursor-pointer relative"
        >
          <!-- Top: Code & Title & Description -->
          <div class="space-y-3">
            <div class="flex items-center justify-between text-xs font-mono font-semibold text-black/40">
              <span>{cat.code}</span>
              <span class="text-[10px] tracking-widest uppercase text-black/30 group-hover:text-black transition-colors">Mesin ORIA</span>
            </div>

            <div class="space-y-1.5">
              <!-- H3 Heading: Mendukung CMYK aurora sphere saat kursor hover -->
              <h3 class="font-heading font-black text-xl sm:text-2xl text-black tracking-tight leading-tight">
                {cat.title}
              </h3>
              <p class="font-sans text-xs text-black/60 leading-relaxed line-clamp-2">
                {cat.desc}
              </p>
            </div>
          </div>

          <!-- Bottom: Action with Chevron (NO ARROWS, STRICT RULE) -->
          <div class="flex items-center justify-between pt-2 border-t border-black/5">
            <span class="text-[11px] font-sans font-bold uppercase tracking-wider text-black/40 group-hover:text-black transition-colors">
              Lihat Mesin
            </span>
            <div class="w-9 h-9 rounded-full bg-black/5 group-hover:bg-black text-black group-hover:text-white flex items-center justify-center transition-all duration-300">
              <svg class="w-4 h-4 stroke-current transform group-hover:translate-x-0.5 transition-transform" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </div>
          </div>
        </a>
      {/each}
    </div>

  </div>
</section>

<style>
  /* Hide scrollbar for clean horizontal track */
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
</style>
