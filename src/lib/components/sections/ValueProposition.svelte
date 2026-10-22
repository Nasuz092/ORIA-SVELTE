<script lang="ts">
  const items = [
    {
      title: 'Produk Berkualitas',
      desc: 'Mesin dengan teknologi terbaru dan performa tinggi',
      icon: 'quality'
    },
    {
      title: 'Harga Kompetitif',
      desc: 'Investasi terbaik untuk pertumbuhan bisnis',
      icon: 'price'
    },
    {
      title: 'Dukungan Profesional',
      desc: 'Tim ahli siap membantu sebelum dan sesudah pembelian',
      icon: 'support'
    },
    {
      title: 'After Sales Terpercaya',
      desc: 'Sparepart, service, dan konsultasi jangka panjang',
      icon: 'warranty'
    }
  ];
</script>

<section class="relative w-full text-white py-16 sm:py-24 px-6 sm:px-8 overflow-hidden bg-neutral-950 border-t border-black/10">
  <!-- Elegant Background Image -->
  <img
    src="/images/why-oria-bg.webp"
    alt="Fasilitas Mesin Percetakan Presisi ORIA"
    class="absolute inset-0 w-full h-full object-cover object-center pointer-events-none select-none z-0"
    loading="lazy"
  />

  <!-- Layer Hitam dengan Opacity 50% (Sesuai Permintaan) -->
  <div class="absolute inset-0 bg-black/50 z-0"></div>

  <!-- Content Container (Konsisten px-6 sm:px-8 dan sejajar lurus) -->
  <div class="relative z-10 w-full space-y-10 sm:space-y-12">
    <!-- Top Header (2 Columns) -->
    <div class="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
      <div class="space-y-2.5 max-w-2xl">
        <span class="font-sans font-bold text-xs uppercase tracking-widest text-sky-400">
          KENAPA ORIA?
        </span>
        <h2 class="font-heading font-black text-3xl sm:text-4xl lg:text-5xl tracking-tight text-white leading-[1.1]">
          Lebih dari <span class="text-sky-400">Sekadar Mesin</span>
        </h2>
      </div>

      <p class="font-sans text-sm sm:text-base text-white/80 leading-relaxed max-w-md">
        Kami tidak hanya menyediakan mesin, tetapi juga solusi lengkap untuk memastikan bisnis Anda terus berkembang.
      </p>
    </div>

    <!-- Divider Bar -->
    <div class="w-full h-px bg-white/15"></div>

    <!-- 4 Value Pillars -->
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      {#each items as item}
        <div class="flex items-start gap-4 group">
          <!-- Circular Glowing Blue Icon -->
          <div class="w-12 h-12 rounded-full bg-sky-500/20 border border-sky-400/40 text-sky-400 flex items-center justify-center flex-shrink-0 shadow-[0_0_20px_rgba(56,189,248,0.2)] group-hover:scale-110 group-hover:bg-sky-500/30 group-hover:border-sky-300 transition-all duration-300">
            {#if item.icon === 'quality'}
              <!-- Quality / Precision Badge Icon -->
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
              </svg>
            {:else if item.icon === 'price'}
              <!-- Competitive Value Icon -->
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            {:else if item.icon === 'support'}
              <!-- Professional Support Hub Icon -->
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M18.364 5.636l-3.536 3.536m0 5.656l3.536 3.536M9.172 9.172L5.636 5.636m3.536 9.192l-3.536 3.536M21 12a9 9 0 11-18 0 9 9 0 0118 0zm-5 0a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            {:else}
              <!-- After Sales & Warranty Shield Icon -->
              <svg class="w-5 h-5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            {/if}
          </div>

          <!-- Text Information -->
          <div class="space-y-1">
            <h3 class="font-heading font-bold text-base text-white tracking-tight leading-snug">
              {item.title}
            </h3>
            <p class="font-sans text-xs sm:text-sm text-white/70 leading-relaxed">
              {item.desc}
            </p>
          </div>
        </div>
      {/each}
    </div>
  </div>
</section>
