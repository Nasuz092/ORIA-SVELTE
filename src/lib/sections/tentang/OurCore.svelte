<script lang="ts">
  let containerEl: HTMLElement | null = $state(null);
  let isDispersed = $state(false);

  $effect(() => {
    if (!containerEl) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            isDispersed = true;
          } else if (entry.boundingClientRect.top > window.innerHeight) {
            // Reset when user scrolls back above the section so it replays smoothly
            isDispersed = false;
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -40px 0px'
      }
    );

    observer.observe(containerEl);

    return () => {
      observer.disconnect();
    };
  });

  const values = [
    {
      id: '01',
      tag: '01 / PRESISI',
      title: 'Rekayasa Presisi Mikron',
      desc: 'Rel pemandu THK linier dan sistem carriage presisi tinggi memastikan akurasi pergerakan tingkat mikron pada setiap siklus cetak.',
      image: '/images/core-precision.jpg',
      alt: 'Detail Linear Guide Rail THK Presisi Tinggi ORIA',
      stackedClass: 'lg:translate-x-[150%] sm:translate-x-[50%] sm:translate-y-[35%] -rotate-6 scale-[0.6] opacity-25 z-10',
      delay: 'delay-100'
    },
    {
      id: '02',
      tag: '02 / DURABILITAS',
      title: 'Daya Tahan Operasional 24/7',
      desc: 'Sasis baja masif anti-vibrasi dirancang khusus untuk menangani siklus kerja produksi industri terberat tanpa kompromi performa.',
      image: '/images/our-drive-workshop.png',
      alt: 'Fasilitas Fabrikasi Sasis Baja Mesin ORIA',
      stackedClass: 'lg:translate-x-[50%] sm:-translate-x-[50%] sm:translate-y-[35%] -rotate-2 scale-[0.63] opacity-35 z-20',
      delay: 'delay-200'
    },
    {
      id: '03',
      tag: '03 / TEKNOLOGI',
      title: 'Inovasi Digital Cerdas',
      desc: 'Sistem pengeringan UV LED mutakhir, integrasi software RIP canggih, dan kontrol digital yang memaksimalkan efisiensi produksi.',
      image: '/images/showcase-products.png',
      alt: 'Lini Mesin Percetakan Digital Berteknologi Modern ORIA',
      stackedClass: 'lg:-translate-x-[50%] sm:translate-x-[50%] sm:-translate-y-[35%] rotate-2 scale-[0.65] opacity-35 z-30',
      delay: 'delay-300'
    },
    {
      id: '04',
      tag: '04 / DUKUNGAN',
      title: 'Dukungan Ekosistem Total',
      desc: 'Ketersediaan suku cadang orisinal lengkap, teknisi bersertifikasi, dan layanan perawatan teknis berkala di seluruh Nusantara.',
      image: '/images/our-drive-showroom.png',
      alt: 'Showroom dan Pusat Layanan Teknis ORIA',
      stackedClass: 'lg:-translate-x-[150%] sm:-translate-x-[50%] sm:-translate-y-[35%] rotate-6 scale-[0.68] opacity-25 z-40',
      delay: 'delay-400'
    }
  ];
</script>

<!-- ======================================================================= -->
<!-- SECTION: Our Core (Lotus "OUR CORE" Style - 4 Value Dispersion Cards)   -->
<!-- ======================================================================= -->
<section
  id="our-core"
  bind:this={containerEl}
  class="w-full bg-white text-black py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-neutral-200 select-none overflow-hidden scroll-mt-14 sm:scroll-mt-16"
>
  <div class="max-w-7xl mx-auto">
    <!-- Center-Aligned Editorial Narrative (Lotus "OUR CORE" Style) -->
    <div class="max-w-3xl mx-auto text-center space-y-6 sm:space-y-7">
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.25em] sm:tracking-[0.3em] uppercase text-black">
        OUR CORE
      </h2>

      <div class="space-y-4 font-sans text-xs sm:text-sm md:text-base text-neutral-600 font-normal leading-relaxed">
        <p>
          Sejak awal mula berdiri, ORIA didorong oleh satu tekad: menghadirkan teknologi mesin percetakan digital dan fabrikasi presisi dengan standar manufaktur kelas dunia bagi industri Indonesia.
        </p>

        <p class="text-neutral-500">
          Kekuatan sejati sebuah mesin tidak hanya diukur dari kecepatan sesaat, melainkan keselarasan antara akurasi komponen, ketangguhan sasis baja, efisiensi konsumsi bahan, dan kepastian dukungan teknis tanpa jeda.
        </p>
      </div>
    </div>

    <!-- 4 Value Cards with Center Stacked to Dispersed Scroll Animation -->
    <div class="relative mt-16 sm:mt-24 min-h-[460px] sm:min-h-[500px]">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
        {#each values as value}
          <div
            class="transform-gpu will-change-transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] {value.delay} {isDispersed
              ? 'translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100 z-10'
              : value.stackedClass}"
          >
            <!-- Card Box -->
            <div
              class="h-full bg-neutral-50 border border-neutral-200 hover:border-black transition-all duration-300 shadow-sm hover:shadow-2xl flex flex-col justify-between p-5 sm:p-6 group"
            >
              <div>
                <!-- Image Wrapper -->
                <div class="w-full aspect-[4/3] overflow-hidden bg-neutral-200 border border-neutral-200 mb-5 relative">
                  <img
                    src={value.image}
                    alt={value.alt}
                    class="w-full h-full object-cover object-center scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
                    loading="lazy"
                  />
                  <div class="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
                </div>

                <!-- Tag & ID -->
                <span class="block text-[11px] font-mono tracking-widest uppercase text-neutral-400 font-semibold mb-2">
                  {value.tag}
                </span>

                <!-- Value Title -->
                <h3 class="font-heading font-medium text-base sm:text-lg text-black tracking-wide mb-2.5">
                  {value.title}
                </h3>

                <!-- Value Description -->
                <p class="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed">
                  {value.desc}
                </p>
              </div>

              <!-- Bottom Indicator Line -->
              <div class="mt-6 pt-4 border-t border-neutral-200 flex items-center justify-between text-[11px] text-neutral-400 uppercase tracking-wider font-mono">
                <span>ORIA STANDARD</span>
                <span class="w-2 h-2 rounded-full bg-[#FFE500] border border-black/20"></span>
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
