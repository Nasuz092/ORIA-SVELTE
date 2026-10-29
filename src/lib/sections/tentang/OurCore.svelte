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
      title: 'Presisi Tanpa Kompromi',
      desc: 'Menggunakan guide rail heavy-duty THK Jepang, sasis baja peredam getaran mikron, dan printhead piezoelektrik presisi tinggi untuk gradasi warna foto tajam.',
      image: '/images/core-precision.jpg',
      alt: 'Detail Linear Guide Rail THK Presisi Tinggi ORIA',
      stackedClass: 'translate-y-[100%] md:translate-y-0 md:translate-x-[100%] -rotate-6 scale-[0.6] opacity-30 z-10',
      delay: 'delay-100'
    },
    {
      title: 'Efisiensi Produksi Tinggi',
      desc: 'Optimalisasi software RIP cerdas dan profil warna ICC khusus yang mampu menghemat konsumsi tinta hingga 25% tanpa mengurangi kepadatan warna (density).',
      image: '/images/showcase-products.png',
      alt: 'Efisiensi Produksi Tinggi Mesin Percetakan ORIA',
      stackedClass: 'translate-y-0 md:translate-x-0 rotate-0 scale-[0.64] opacity-40 z-20',
      delay: 'delay-200'
    },
    {
      title: 'Dukungan Purna Jual Total',
      desc: 'Pelatihan operator bersertifikasi hingga siap mandiri, suku cadang orisinal ready-stock, serta respon teknisi tanggap darurat on-site di berbagai kota.',
      image: '/images/our-drive-showroom.png',
      alt: 'Pusat Layanan Purna Jual dan Showroom ORIA',
      stackedClass: 'translate-y-[-100%] md:translate-y-0 md:-translate-x-[100%] rotate-6 scale-[0.6] opacity-30 z-10',
      delay: 'delay-300'
    }
  ];
</script>

<!-- ======================================================================= -->
<!-- SECTION: Our Core (Lotus "OUR CORE" Style - 3 Value Dispersion Cards)   -->
<!-- ======================================================================= -->
<section
  id="our-core"
  bind:this={containerEl}
  class="w-full bg-white text-black py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none overflow-hidden scroll-mt-14 sm:scroll-mt-16"
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

    <!-- 3 Value Cards with Center Stacked to Dispersed Scroll Animation (Clean & Borderless) -->
    <div class="relative mt-16 sm:mt-24 min-h-[440px] sm:min-h-[480px]">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
        {#each values as value}
          <div
            class="transform-gpu will-change-transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] {value.delay} {isDispersed
              ? 'translate-x-0 translate-y-0 rotate-0 scale-100 opacity-100 z-10'
              : value.stackedClass}"
          >
            <!-- Card Box (Clean, Borderless, Editorial) -->
            <div class="flex flex-col group">
              <!-- Image Wrapper (No border) -->
              <div class="w-full aspect-[4/3] overflow-hidden bg-neutral-100 mb-5 relative">
                <img
                  src={value.image}
                  alt={value.alt}
                  class="w-full h-full object-cover object-center scale-100 transition-transform duration-700 ease-out group-hover:scale-105"
                  loading="lazy"
                />
              </div>

              <!-- Value Title -->
              <h3 class="font-heading font-medium text-lg sm:text-xl text-black tracking-wide mb-2.5">
                {value.title}
              </h3>

              <!-- Value Description -->
              <p class="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">
                {value.desc}
              </p>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>
