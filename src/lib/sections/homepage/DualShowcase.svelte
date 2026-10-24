<script lang="ts">
  // Section Dual Showcase (Lotus Inspired 2-Column Grid: Produk & Tentang ORIA)
</script>

<section class="w-full bg-black text-white py-16 sm:py-24 lg:py-32 px-6 sm:px-12 lg:px-20 border-t border-white/10 select-none">
  <div class="max-w-7xl mx-auto">
    <!-- Section Top Header Title (Lotus-style tracked uppercase) -->
    <div class="mb-8 sm:mb-12 lg:mb-16">
      <h2 class="font-heading font-light text-xs sm:text-sm lg:text-base tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/90">
        THE FUTURE OF INDUSTRIAL PRECISION
      </h2>
    </div>

    <!-- 2-Column Showcase Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14">
      <!-- Card 1: Mengarahkan ke Halaman Produk -->
      <a
        href="/produk"
        class="group block flex flex-col focus:outline-none"
      >
        <!-- Card Image Container -->
        <div class="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/10">
          <img
            src="/images/showcase-products.png"
            alt="ORIA UV Flatbed Printer Workshop"
            class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>

        <!-- Card Info -->
        <div class="mt-6 flex flex-col flex-1 justify-between">
          <div>
            <h3 class="font-heading font-medium text-xl sm:text-2xl text-white group-hover:text-[#FFE500] transition-colors">
              Industrial Machine Lineup
            </h3>
            <p class="mt-2.5 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg">
              Eksplorasi jajaran mesin digital printing berkecepatan tinggi, UV Flatbed presisi, DTF modern, dan Laser Cutting untuk skala industri.
            </p>
          </div>

          <!-- CTA Link with Chevron -->
          <div class="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white group-hover:text-[#FFE500] transition-colors">
            <span>EXPLORE PRODUCTS</span>
            <svg
              class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>

      <!-- Card 2: Mengarahkan ke Halaman Tentang -->
      <a
        href="/tentang"
        class="group block flex flex-col focus:outline-none"
      >
        <!-- Card Image Container -->
        <div class="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/10">
          <img
            src="/images/showcase-about.png"
            alt="Industrial ORIA Wall Signage - Fasilitas Resmi ORIA"
            class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
            loading="lazy"
          />
          <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div>
        </div>

        <!-- Card Info -->
        <div class="mt-6 flex flex-col flex-1 justify-between">
          <div>
            <h3 class="font-heading font-medium text-xl sm:text-2xl text-white flex items-center gap-2 sm:gap-2.5">
              <span class="group-hover:text-[#FFE500] transition-colors duration-300">About</span>
              <span
                class="inline-block h-5 sm:h-6 aspect-[2101/666] bg-white group-hover:bg-[#FFE500] transition-colors duration-300"
                style="-webkit-mask-image: url('/images/oria-logo-hd.png'); mask-image: url('/images/oria-logo-hd.png'); -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center;"
                role="img"
                aria-label="ORIA"
              ></span>
            </h3>
            <p class="mt-2.5 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg">
              Komitmen rekayasa mesin berdurabilitas tinggi, ketersediaan suku cadang resmi, serta layanan teknisi ahli di seluruh wilayah Indonesia.
            </p>
          </div>

          <!-- CTA Link with Chevron -->
          <div class="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white group-hover:text-[#FFE500] transition-colors">
            <span>DISCOVER ORIA</span>
            <svg
              class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="2.5"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </a>
    </div>
  </div>
</section>
