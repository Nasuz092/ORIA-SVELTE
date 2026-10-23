<script lang="ts">
  import { onMount } from 'svelte';

  const subNavItems = [
    { id: 'oria-story', label: 'ORIA STORY' },
    { id: 'about-oria', label: 'ABOUT ORIA' },
    { id: 'standar-rekayasa', label: 'STANDAR REKAYASA' },
    { id: 'kapasitas-layanan', label: 'KAPASITAS LAYANAN' },
    { id: 'visi-dedikasi', label: 'VISI & DEDIKASI' },
    { id: 'showroom', label: 'SHOWROOM & LAB' }
  ];

  let activeSection = $state('oria-story');

  function scrollToSection(id: string, e?: MouseEvent) {
    if (e) e.preventDefault();
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      activeSection = id;
    }
  }

  onMount(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            activeSection = entry.target.id;
          }
        }
      },
      { rootMargin: '-25% 0px -65% 0px' }
    );

    for (const item of subNavItems) {
      const el = document.getElementById(item.id);
      if (el) observer.observe(el);
    }

    return () => observer.disconnect();
  });
</script>

<svelte:head>
  <title>About Us - Rekayasa Presisi & Standar Industri ORIA</title>
  <meta
    name="description"
    content="Pelajari visi, filosofi rekayasa presisi, dan kapasitas layanan mesin printing industrial serta manufaktur ORIA di Indonesia."
  />
</svelte:head>

<!-- ======================================================================= -->
<!-- 1. HERO SECTION (Lotus Inspired Full Bleed with Subnav & Tracked Title) -->
<!-- ======================================================================= -->
<section class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none flex flex-col justify-between">
  <!-- Hero Background Image (Gambar Section Tentang dari Halaman Utama: showcase-about.png) -->
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <img
      src="/images/showcase-about.png"
      alt="Fasilitas Rekayasa Presisi dan Showroom Resmi ORIA"
      class="w-full h-full object-cover object-center scale-100 transition-transform duration-1000 ease-out"
      loading="eager"
    />
    <!-- Cinematic Gradients for Contrast & Legibility -->
    <div class="absolute inset-0 bg-gradient-to-t from-black via-black/45 to-black/75"></div>
    <div class="absolute inset-0 bg-gradient-to-r from-black/85 via-black/40 to-transparent"></div>
  </div>

  <!-- Top Area: Spacing under Navbar + Lotus-Style Subnav -->
  <div class="relative z-30 pt-20 sm:pt-24 lg:pt-28 w-full border-b border-white/10 backdrop-blur-xs bg-black/20">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
      <nav
        aria-label="Navigasi Halaman Tentang"
        class="flex items-center gap-6 sm:gap-8 lg:gap-12 overflow-x-auto no-scrollbar py-3"
      >
        {#each subNavItems as item}
          <a
            href="#{item.id}"
            onclick={(e) => scrollToSection(item.id, e)}
            class="text-[11px] sm:text-xs font-semibold tracking-[0.2em] whitespace-nowrap transition-all duration-300 pb-2 relative group {activeSection === item.id
              ? 'text-white'
              : 'text-white/60 hover:text-white'}"
          >
            <span>{item.label}</span>
            <!-- Active underline -->
            <span
              class="absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300 {activeSection === item.id
                ? 'bg-white opacity-100'
                : 'bg-transparent opacity-0 group-hover:bg-white/40 group-hover:opacity-100'}"
            ></span>
          </a>
        {/each}
      </nav>
    </div>
  </div>

  <!-- Bottom Left Area: Lotus-Style Hero Typography -->
  <div class="relative z-20 max-w-7xl mx-auto w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24">
    <div class="space-y-3 sm:space-y-4 max-w-3xl">
      <!-- Tag / Accent Category (Lotus: LOTUS STORY -> ORIA: ORIA STORY) -->
      <div class="font-heading font-black text-xs sm:text-sm md:text-base tracking-[0.28em] text-[#FFE500] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
        ORIA STORY
      </div>

      <!-- Main Headline (Lotus: ABOUT US with ultra-wide tracking) -->
      <h1 class="font-heading font-light sm:font-normal text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white leading-none drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">
        ABOUT US
      </h1>

      <!-- Short Lead -->
      <p class="font-sans text-xs sm:text-sm md:text-base text-neutral-300 font-normal max-w-xl leading-relaxed pt-1 drop-shadow-md">
        Membangun standar rekayasa mesin percetakan digital dan manufaktur berpresisi tinggi untuk menopang pertumbuhan kreator dan industri di Indonesia.
      </p>
    </div>
  </div>
</section>

<!-- ======================================================================= -->
<!-- STICKY SUBNAV BAR (Floating when scrolling below Hero)                  -->
<!-- ======================================================================= -->
<div class="sticky top-16 sm:top-20 z-30 w-full bg-black/95 backdrop-blur-md border-b border-white/10 select-none shadow-md">
  <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
    <nav class="flex items-center gap-6 sm:gap-8 lg:gap-10 overflow-x-auto no-scrollbar py-3">
      {#each subNavItems as item}
        <a
          href="#{item.id}"
          onclick={(e) => scrollToSection(item.id, e)}
          class="text-[11px] sm:text-xs font-semibold tracking-[0.18em] whitespace-nowrap transition-all duration-300 pb-1.5 relative group {activeSection === item.id
            ? 'text-[#FFE500]'
            : 'text-neutral-400 hover:text-white'}"
        >
          <span>{item.label}</span>
          <span
            class="absolute bottom-0 left-0 w-full h-[2px] transition-all duration-300 {activeSection === item.id
              ? 'bg-[#FFE500]'
              : 'bg-transparent group-hover:bg-neutral-600'}"
          ></span>
        </a>
      {/each}
    </nav>
  </div>
</div>

<!-- ======================================================================= -->
<!-- SECTION 1: #oria-story (Profil Perusahaan & Filosofi Lotus Style)       -->
<!-- ======================================================================= -->
<section id="oria-story" class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-white/10 select-none scroll-mt-28">
  <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
    <!-- Left Column: Big Tracked Heading -->
    <div class="lg:col-span-5 space-y-3">
      <div class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFE500]">01 / FILOSOFI UTAMA</div>
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase leading-[1.15] text-white">
        STANDAR BARU<br />REKAYASA MESIN
      </h2>
    </div>

    <!-- Right Column: Rich Narrative Statements -->
    <div class="lg:col-span-7 space-y-6 sm:space-y-8 font-sans text-sm sm:text-base lg:text-[1.05rem] text-neutral-300 leading-relaxed font-normal max-w-2xl">
      <p class="text-white text-base sm:text-lg font-medium leading-relaxed">
        ORIA didirikan dari sebuah keyakinan bahwa mesin produksi industrial tidak boleh sekadar berfungsi — melainkan harus menjadi instrumen presisi yang memberikan kepastian hasil dan daya tahan tanpa henti.
      </p>

      <p>
        Di tengah pesatnya kebutuhan promosi visual, fashion apparel, dan fabrikasi arsitektural di Indonesia, kami menghadirkan mesin digital printing, laser cutting, dan CNC router dengan integrasi teknologi komponen kelas dunia.
      </p>

      <p class="text-neutral-400">
        Dari printhead orisinal berdaya tembak picoliter mikro hingga sistem pendingin dan pemanas cerdas terpadu, setiap milimeter rancang bangun ORIA dipersiapkan untuk beban operasional intensif 24/7.
      </p>
    </div>
  </div>
</section>

<!-- ======================================================================= -->
<!-- SECTION 2: #about-oria (3 Pilar Keunggulan ORIA)                         -->
<!-- ======================================================================= -->
<section id="about-oria" class="w-full bg-neutral-950 text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-white/10 select-none scroll-mt-28">
  <div class="max-w-7xl mx-auto space-y-16">
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-neutral-800 pb-8">
      <div class="space-y-2">
        <div class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFE500]">02 / NILAI KAMI</div>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] uppercase text-white">
          TIGA PILAR KEUNGGULAN
        </h2>
      </div>
      <p class="font-sans text-xs sm:text-sm text-neutral-400 max-w-md leading-relaxed">
        Fondasi yang membedakan lini mesin ORIA dalam menjaga kepuasan mitra industri di seluruh Indonesia.
      </p>
    </div>

    <!-- 3 Columns -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12">
      <!-- Card 1 -->
      <div class="space-y-4 p-8 bg-black/60 border border-neutral-800 hover:border-neutral-600 transition-colors">
        <div class="font-heading font-black text-2xl text-[#FFE500]">01</div>
        <h3 class="font-heading font-bold text-xl uppercase tracking-wider text-white">
          Presisi Tanpa Kompromi
        </h3>
        <p class="font-sans text-sm text-neutral-400 leading-relaxed font-normal">
          Menggunakan guide rail heavy-duty THK Jepang, sasis baja peredam getaran mikron, dan printhead piezoelektrik presisi tinggi untuk gradasi warna foto tajam.
        </p>
      </div>

      <!-- Card 2 -->
      <div class="space-y-4 p-8 bg-black/60 border border-neutral-800 hover:border-neutral-600 transition-colors">
        <div class="font-heading font-black text-2xl text-[#FFE500]">02</div>
        <h3 class="font-heading font-bold text-xl uppercase tracking-wider text-white">
          Efisiensi Produksi Tinggi
        </h3>
        <p class="font-sans text-sm text-neutral-400 leading-relaxed font-normal">
          Optimalisasi software RIP cerdas dan profil warna ICC khusus yang mampu menghemat konsumsi tinta hingga 25% tanpa mengurangi kepadatan warna (density).
        </p>
      </div>

      <!-- Card 3 -->
      <div class="space-y-4 p-8 bg-black/60 border border-neutral-800 hover:border-neutral-600 transition-colors">
        <div class="font-heading font-black text-2xl text-[#FFE500]">03</div>
        <h3 class="font-heading font-bold text-xl uppercase tracking-wider text-white">
          Dukungan Purna Jual Total
        </h3>
        <p class="font-sans text-sm text-neutral-400 leading-relaxed font-normal">
          Pelatihan operator bersertifikasi hingga siap mandiri, suku cadang orisinal ready-stock, serta respon teknisi tanggap darurat on-site di berbagai kota.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================================= -->
<!-- SECTION 3: #standar-rekayasa (Engineering Excellence Showcase)           -->
<!-- ======================================================================= -->
<section id="standar-rekayasa" class="relative w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-white/10 select-none scroll-mt-28 overflow-hidden">
  <div class="max-w-7xl mx-auto space-y-12">
    <div class="max-w-2xl space-y-3">
      <div class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFE500]">03 / KETEKNIKAN</div>
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white leading-tight">
        ENGINEERING EXCELLENCE
      </h2>
      <p class="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed pt-2">
        Setiap komponen mesin ORIA dipilih secara ketat untuk menahan siklus cetak ribuan meter persegi setiap bulannya.
      </p>
    </div>

    <!-- Visual Engineering Box -->
    <div class="relative w-full aspect-[21/9] min-h-[300px] overflow-hidden bg-neutral-900 border border-neutral-800">
      <img
        src="/images/engineering-excellence.png"
        alt="Rekayasa Presisi Mesin Industri ORIA"
        class="w-full h-full object-cover object-center scale-100 transition-transform duration-700 ease-out hover:scale-105"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div>
      <div class="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 max-w-lg z-10">
        <div class="text-xs font-mono uppercase tracking-[0.2em] text-[#FFE500]">STANDAR KUALITAS</div>
        <div class="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wider text-white mt-1">
          Penyelarasan Mikron & Beban Kerja Berat
        </div>
      </div>
    </div>

    <!-- Detailed Bullet Highlights -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4">
      <div class="space-y-2 border-l-2 border-[#FFE500] pl-6">
        <h4 class="font-heading font-bold text-lg uppercase tracking-wider text-white">Sasis Baja Heavy Duty</h4>
        <p class="font-sans text-sm text-neutral-400 leading-relaxed font-normal">
          Konstruksi rangka padat yang dinormalisasi dengan perlakuan panas khusus untuk mencegah deformasi struktural jangka panjang akibat tegangan kerja.
        </p>
      </div>
      <div class="space-y-2 border-l-2 border-white pl-6">
        <h4 class="font-heading font-bold text-lg uppercase tracking-wider text-white">Sistem Kontrol Cerdas</h4>
        <p class="font-sans text-sm text-neutral-400 leading-relaxed font-normal">
          Monitoring tekanan negatif otomatis dan sensor ketinggian media otomatis melindungi printhead dari gesekan atau benturan material.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================================= -->
<!-- SECTION 4: #kapasitas-layanan (4 Statistics & Kapasitas Layanan)         -->
<!-- ======================================================================= -->
<section id="kapasitas-layanan" class="w-full bg-neutral-950 text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-white/10 select-none scroll-mt-28">
  <div class="max-w-7xl mx-auto space-y-16">
    <div class="space-y-2">
      <div class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFE500]">04 / KREDIBILITAS</div>
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white">
        KAPASITAS LAYANAN
      </h2>
      <p class="font-sans text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed pt-2">
        Komitmen nyata dan integritas kemitraan jangka panjang yang telah dipercaya oleh ratusan pengusaha percetakan di Indonesia.
      </p>
    </div>

    <!-- 4 Stats Boxes (Lotus Minimalist Grid) -->
    <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
      <div class="p-8 bg-black border border-neutral-800 space-y-2">
        <div class="font-heading font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">500<span class="text-[#FFE500] font-normal">+</span></div>
        <div class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-neutral-300 pt-2">Unit Terpasang</div>
        <p class="text-xs text-neutral-500 font-sans leading-relaxed">Beroperasi aktif di berbagai provinsi di Indonesia.</p>
      </div>

      <div class="p-8 bg-black border border-neutral-800 space-y-2">
        <div class="font-heading font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">100<span class="text-[#FFE500] font-normal">%</span></div>
        <div class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-neutral-300 pt-2">Garansi Resmi</div>
        <p class="text-xs text-neutral-500 font-sans leading-relaxed">Jaminan keaslian komponen dan proteksi investasi unit.</p>
      </div>

      <div class="p-8 bg-black border border-neutral-800 space-y-2">
        <div class="font-heading font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">24<span class="text-[#FFE500] font-normal">/7</span></div>
        <div class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-neutral-300 pt-2">Dukungan Teknis</div>
        <p class="text-xs text-neutral-500 font-sans leading-relaxed">Konsultasi cepat dan penanganan teknisi tersertifikasi.</p>
      </div>

      <div class="p-8 bg-black border border-neutral-800 space-y-2">
        <div class="font-heading font-light text-4xl sm:text-5xl lg:text-6xl text-white tracking-tight">2 <span class="text-[#FFE500] text-2xl sm:text-3xl font-bold">KOTA</span></div>
        <div class="text-xs font-heading font-bold uppercase tracking-[0.2em] text-neutral-300 pt-2">Showroom & Lab</div>
        <p class="text-xs text-neutral-500 font-sans leading-relaxed">Fasilitas demonstrasi lengkap di Jakarta & Surabaya.</p>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================================= -->
<!-- SECTION 5: #visi-dedikasi (Visi & Dedikasi Kami - Panoramic Card)        -->
<!-- ======================================================================= -->
<section id="visi-dedikasi" class="relative w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 border-b border-white/10 select-none scroll-mt-28 overflow-hidden">
  <div class="max-w-7xl mx-auto space-y-10">
    <div class="space-y-2">
      <div class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFE500]">05 / VISI MASA DEPAN</div>
      <h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white">
        DEDIKASI KAMI
      </h2>
    </div>

    <!-- Panoramic Image Card -->
    <div class="relative w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] flex items-center overflow-hidden bg-neutral-900 border border-neutral-800">
      <img
        src="/images/our-drive-showroom.png"
        alt="Showroom Fasilitas Mesin ORIA"
        class="absolute inset-0 w-full h-full object-cover object-center"
        loading="lazy"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-black/90 via-black/55 to-transparent"></div>

      <div class="relative z-10 max-w-xl p-8 sm:p-12 lg:p-16 space-y-5">
        <div class="font-heading font-bold text-xs uppercase tracking-[0.28em] text-[#FFE500]">
          FOR THE CREATORS
        </div>
        <h3 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-white leading-tight">
          Mendukung Kemandirian Industri Kreatif Indonesia
        </h3>
        <p class="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
          Kami mendampingi para kreator, pelaku UMKM, hingga manufaktur besar bertransformasi mengadopsi teknologi cetak digital dan laser terbaru yang efisien, hemat biaya produksi, dan ramah lingkungan.
        </p>
      </div>
    </div>
  </div>
</section>

<!-- ======================================================================= -->
<!-- SECTION 6: #showroom (Showroom, Demo Live & Kontak Konsultasi)           -->
<!-- ======================================================================= -->
<section id="showroom" class="w-full bg-neutral-950 text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-28">
  <div class="max-w-7xl mx-auto space-y-12">
    <div class="p-8 sm:p-12 lg:p-16 bg-black border border-neutral-800 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-10">
      <div class="space-y-4 max-w-2xl">
        <div class="text-[11px] font-mono uppercase tracking-[0.25em] text-[#FFE500]">06 / KONSULTASI & DEMO</div>
        <h2 class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-white leading-tight">
          KUNJUNGI SHOWROOM KAMI
        </h2>
        <p class="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">
          Rasakan langsung kecepatan cetak, detail presisi, dan kestabilan sasis mesin industri ORIA. Anda dapat membawa sample material sendiri untuk uji coba cetak langsung bersama tim engineering kami.
        </p>
      </div>

      <!-- CTA Button (Strict Rule from AGENTS.md: Chevron only, never arrow) -->
      <div class="w-full lg:w-auto shrink-0">
        <a
          href="/kontak"
          class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-[#FFE500] hover:bg-white text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.22em] transition-colors duration-300 group"
        >
          <span>JADWALKAN KUNJUNGAN</span>
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
  </div>
</section>
