<script lang="ts">
  import { page } from '$app/state';
</script>

<svelte:head>
  <title>{page.status || 404} - Halaman Tidak Ditemukan | ORIA Indonesia</title>
  <meta name="description" content="Halaman yang Anda tuju tidak ditemukan pada sistem ORIA Indonesia." />
</svelte:head>

<!-- ========================================================================= -->
<!-- ERROR PAGE: ANGKA ERROR KUNING (#FFE500) TEPAT DI TENGAH SCREEN (LOTUS DARK STYLE) -->
<!-- ========================================================================= -->
<section class="min-h-[100svh] w-full bg-black text-white flex flex-col items-center justify-center text-center px-6 py-20 relative overflow-hidden select-none">
  <!-- Subtle ambient radial glow behind yellow number -->
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,229,0,0.12)_0%,_transparent_65%)] pointer-events-none"></div>

  <!-- Decorative technical lines -->
  <div class="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
  <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>

  <div class="relative z-10 flex flex-col items-center justify-center max-w-xl mx-auto space-y-5 sm:space-y-6">
    <!-- System Badge -->
    <div class="inline-flex items-center gap-2 px-3 py-1 bg-white/5 border border-white/10 font-mono text-[10px] sm:text-xs uppercase tracking-[0.25em] text-neutral-400">
      <span class="w-1.5 h-1.5 rounded-full bg-[#FFE500] animate-pulse"></span>
      <span>STATUS LAPORAN SISTEM</span>
    </div>

    <!-- Error Number: Kuning (#FFE500) di Tengah Layar -->
    <div class="relative flex items-center justify-center my-1 sm:my-2">
      <span class="font-heading font-black text-8xl sm:text-9xl md:text-[12rem] lg:text-[13rem] leading-none tracking-tight text-[#FFE500] drop-shadow-[0_0_50px_rgba(255,229,0,0.3)]">
        {page.status || 404}
      </span>
    </div>

    <!-- Heading & Message -->
    <div class="space-y-2">
      <h1 class="font-heading font-bold text-lg sm:text-2xl md:text-3xl uppercase tracking-[0.18em] text-white">
        {page.status === 404
          ? 'Halaman Tidak Ditemukan'
          : page.status && page.status >= 500
            ? 'Terjadi Kesalahan Server'
            : 'Terjadi Gangguan Sistem'}
      </h1>
      <p class="font-sans text-xs sm:text-sm text-neutral-400 max-w-md mx-auto leading-relaxed">
        {page.error?.message && page.error.message !== 'Not Found'
          ? page.error.message
          : 'Halaman yang Anda tuju tidak tersedia atau URL telah diperbarui. Silakan kembali ke beranda atau telusuri katalog mesin kami.'}
      </p>
    </div>

    <!-- Tombol & CTA Navigasi (STRICT RULE: Hanya Chevron, Tidak Pernah Panah Bertangkai) -->
    <div class="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 pt-3 w-full sm:w-auto">
      <!-- Tombol Kembali ke Beranda (Chevron Kiri) -->
      <a
        href="/"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-[#FFE500] hover:bg-[#fff04d] text-black font-heading font-bold text-xs uppercase tracking-[0.22em] transition-all duration-300 shadow-lg hover:shadow-[#FFE500]/25 group"
      >
        <svg
          class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:-translate-x-1"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="2.5"
          aria-hidden="true"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        <span>KEMBALI KE BERANDA</span>
      </a>

      <!-- Tombol Katalog Mesin (Chevron Kanan) -->
      <a
        href="/produk"
        class="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3 bg-neutral-900 hover:bg-neutral-800 text-white border border-white/20 hover:border-[#FFE500]/60 font-heading font-medium text-xs uppercase tracking-[0.22em] transition-all duration-300 group"
      >
        <span>KATALOG MESIN</span>
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

    <!-- Technical Support Link dengan Chevron -->
    <div class="pt-6 border-t border-white/10 w-full max-w-sm">
      <a
        href="https://wa.me/6281807090888?text=Halo%20ORIA,%20saya%20mengalami%20kendala%20di%20website"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-flex items-center gap-2 text-[11px] sm:text-xs font-mono uppercase tracking-[0.2em] text-neutral-400 hover:text-[#FFE500] transition-colors group"
      >
        <span>KONSULTASI TIM TEKNIS & SHOWROOM</span>
        <svg
          class="w-3.5 h-3.5 stroke-current transition-transform duration-300 group-hover:translate-x-1"
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
</section>
