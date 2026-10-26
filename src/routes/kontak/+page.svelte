<script lang="ts">
  import { page } from '$app/state';

  let nama = $state('');
  let phone = $state('');
  let unitMesin = $state(page.url.searchParams.get('unit') || 'UV Flatbed');
  let showroom = $state('Surabaya');
  let pesan = $state('');
  let submitted = $state(false);

  const units = [
    'UV Flatbed & Roll-to-Roll',
    'Sublimasi Textile High-Speed',
    'Laser Cutting CO2 & Fiber',
    'CNC Router Heavy Fabrication',
    'DTF Apparel Solution',
    'Outdoor & Indoor Printing'
  ];

  function handleSubmit(e: Event) {
    e.preventDefault();
    submitted = true;
    const text = encodeURIComponent(
      `Halo ORIA, saya ingin berkonsultasi mengenai mesin industri.\n\n` +
      `Nama: ${nama}\n` +
      `No. WhatsApp/Telp: ${phone}\n` +
      `Unit yang Diminati: ${unitMesin}\n` +
      `Pilihan Lokasi Showroom: ${showroom}\n` +
      `Pesan/Kebutuhan Produksi: ${pesan || '-'}`
    );
    window.open(`https://wa.me/6281252086455?text=${text}`, '_blank');
  }

  function handleScheduleVisit(lokasi: string) {
    const text = encodeURIComponent(
      `Halo tim ORIA, saya ingin menjadwalkan kunjungan demo ke Showroom ${lokasi}. Mohon informasi jadwal ketersediaan teknisi demo.`
    );
    window.open(`https://wa.me/6281252086455?text=${text}`, '_blank');
  }
</script>

<svelte:head>
  <title>Contact Us & Showroom - ORIA Industrial Printing</title>
  <meta
    name="description"
    content="Hubungi tim penjualan dan engineering ORIA. Kunjungi Flagship Showroom Surabaya dan Jakarta untuk demo langsung mesin UV, DTF, Laser, dan CNC."
  />
</svelte:head>

<div class="w-full bg-[#050508] text-white select-none">
  <!-- ======================================================================= -->
  <!-- 1. HERO SECTION: Lotus Cars Style (Dusk Showroom + Massive Yellow Title) -->
  <!-- ======================================================================= -->
  <section class="relative w-full min-h-[92svh] lg:min-h-[98svh] overflow-hidden flex flex-col justify-end pb-16 sm:pb-20 lg:pb-28 pt-32 sm:pt-40">
    <!-- Dusk Showroom Storefront Background Visual -->
    <div class="absolute inset-0 w-full h-full pointer-events-none">
      <img
        src="/images/oria-contact-hero.jpg"
        alt="ORIA Flagship Showroom Storefront"
        class="w-full h-full object-cover object-center lg:object-[center_bottom] scale-100 opacity-60"
        loading="eager"
      />
      <!-- Cinematic Vignette & Deep Gradients -->
      <div class="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-black/70"></div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#050508] via-[#050508]/80 to-transparent"></div>
      <div class="absolute -top-32 -left-32 w-96 h-96 bg-[#FFE500]/10 rounded-full blur-3xl"></div>
    </div>

    <!-- Hero Content (Lotus Giant Yellow Typography) -->
    <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16">
      <div class="max-w-7xl mx-auto w-full space-y-6 sm:space-y-8">
        <!-- Brand Kicker -->
        <div class="font-heading font-black text-xs sm:text-sm uppercase tracking-[0.3em] text-[#FFE500]">
          ORIA SUPPORT &middot; CENTRES &amp; CONSULTATION
        </div>

        <!-- Giant Stacked Yellow Headline (Lotus Cars Exact Reference) -->
        <h1 class="font-heading font-black text-6xl sm:text-7xl md:text-8xl lg:text-9xl tracking-tight text-[#FFE500] uppercase leading-[0.88]">
          CONTACT<br />
          <span class="text-white">US</span>
        </h1>

        <!-- Editorial Description & Quick Direct Info -->
        <div class="max-w-2xl space-y-4 pt-2">
          <p class="font-sans text-xs sm:text-sm md:text-base text-neutral-300 uppercase tracking-widest leading-relaxed">
            Hubungi kami untuk segala kebutuhan percetakan industri, konsultasi spesifikasi rekayasa mesin, atau jadwal demo privat di showroom ORIA.
          </p>
          <p class="font-sans text-xs sm:text-sm text-neutral-400 tracking-wider">
            Tim konsultan teknik kami akan merespons pertanyaan Anda secepat mungkin.
          </p>

          <!-- Direct Links Pill Bar -->
          <div class="flex flex-wrap items-center gap-4 sm:gap-6 pt-3 text-xs sm:text-sm font-sans tracking-wider">
            <a
              href="mailto:sales@oria.co.id"
              class="inline-flex items-center gap-2 text-white hover:text-[#FFE500] transition-colors border-b border-white/20 pb-0.5"
            >
              <span class="text-neutral-400">Email:</span>
              <span class="font-bold">sales@oria.co.id</span>
            </a>
            <span class="text-white/20 hidden sm:inline">&bull;</span>
            <a
              href="https://wa.me/6281252086455"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 text-white hover:text-[#FFE500] transition-colors border-b border-white/20 pb-0.5"
            >
              <span class="text-neutral-400">WhatsApp:</span>
              <span class="font-bold text-[#FFE500]">+62 812-5208-6455</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 2. LOTUS EDITORIAL DISCLAIMER BANNER: How Can We Do Better?              -->
  <!-- ======================================================================= -->
  <section class="w-full bg-[#090910] border-y border-white/10 py-12 sm:py-16 px-6 sm:px-10 lg:px-16">
    <div class="max-w-7xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
      <div class="space-y-2 max-w-xl">
        <div class="font-heading font-black text-xs uppercase tracking-[0.25em] text-[#FFE500]">
          KOMITMEN LAYANAN INDUSTRIAL
        </div>
        <h2 class="font-heading font-bold text-2xl sm:text-3xl text-white uppercase tracking-wide">
          BAGAIMANA KAMI DAPAT MEMBANTU USAHA ANDA?
        </h2>
      </div>
      <p class="font-sans text-xs sm:text-sm text-neutral-400 max-w-xl leading-relaxed">
        Di ORIA, kami berkomitmen menghadirkan pengalaman kepemilikan mesin industri tanpa kompromi. Mulai dari instalasi presisi, pelatihan operator, ketersediaan spare parts original, hingga pendampingan kalkulasi ROI workshop percetakan Anda.
      </p>
    </div>
  </section>

  <!-- ======================================================================= -->
  <!-- 3. SHOWROOM CENTRES & CONSULTATION FORM (2-Column Grid)                  -->
  <!-- ======================================================================= -->
  <section class="w-full py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16">
    <div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <!-- LEFT COLUMN: Consultation Form (7 Cols) -->
      <div class="lg:col-span-7 bg-[#0c0c12] border border-white/10 p-6 sm:p-10 lg:p-12 space-y-8">
        <div class="space-y-3 border-b border-white/10 pb-6">
          <div class="font-heading font-black text-xs uppercase tracking-[0.25em] text-[#FFE500]">
            FORMULIR KONSULTASI
          </div>
          <h2 class="font-heading font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
            PERMINTAAN PENAWARAN &amp; SPESIFIKASI
          </h2>
          <p class="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Isi rincian kebutuhan usaha Anda di bawah ini untuk terhubung langsung dengan konsultan teknis ORIA.
          </p>
        </div>

        {#if submitted}
          <div class="p-8 bg-[#13131c] border border-[#FFE500]/30 space-y-4 text-center">
            <div class="w-12 h-12 mx-auto rounded-full bg-[#FFE500]/10 flex items-center justify-center text-[#FFE500]">
              <svg class="w-6 h-6 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 class="font-heading font-bold text-xl text-white uppercase tracking-wide">
              Pesan Berhasil Diteruskan
            </h3>
            <p class="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed max-w-md mx-auto">
              Percakapan WhatsApp telah dibuka. Tim sales &amp; engineering ORIA siap melayani konsultasi spesifikasi mesin Anda.
            </p>
            <button
              type="button"
              onclick={() => (submitted = false)}
              class="inline-flex items-center gap-2 text-xs font-heading font-bold uppercase tracking-widest text-[#FFE500] hover:underline pt-2 cursor-pointer"
            >
              <span>Kirim Formulir Lain</span>
              <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        {:else}
          <form onsubmit={handleSubmit} class="space-y-6">
            <!-- Nama / Perusahaan -->
            <div class="space-y-2">
              <label for="nama" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-300 block">
                Nama Lengkap / Nama Workshop *
              </label>
              <input
                id="nama"
                type="text"
                required
                bind:value={nama}
                placeholder="Contoh: Hendra Pratama / CV Berkah Advertising"
                class="w-full bg-[#13131c] text-white text-sm px-4 py-3.5 border border-white/10 focus:border-[#FFE500] focus:outline-none transition-colors placeholder:text-neutral-500"
              />
            </div>

            <!-- WhatsApp Number -->
            <div class="space-y-2">
              <label for="phone" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-300 block">
                Nomor WhatsApp Aktif *
              </label>
              <input
                id="phone"
                type="tel"
                required
                bind:value={phone}
                placeholder="Contoh: 0812-5208-6455"
                class="w-full bg-[#13131c] text-white text-sm px-4 py-3.5 border border-white/10 focus:border-[#FFE500] focus:outline-none transition-colors placeholder:text-neutral-500"
              />
            </div>

            <!-- Unit Mesin Interest Dropdown -->
            <div class="space-y-2">
              <label for="unit" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-300 block">
                Lini Mesin yang Diminati
              </label>
              <select
                id="unit"
                bind:value={unitMesin}
                class="w-full bg-[#13131c] text-white text-sm px-4 py-3.5 border border-white/10 focus:border-[#FFE500] focus:outline-none transition-colors cursor-pointer"
              >
                {#each units as u}
                  <option value={u} class="bg-[#0c0c12] text-white">{u}</option>
                {/each}
              </select>
            </div>

            <!-- Pilihan Lokasi Showroom -->
            <div class="space-y-2">
              <label for="showroom-select" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-300 block">
                Rencana Kunjungan Showroom
              </label>
              <div class="grid grid-cols-2 gap-4">
                <button
                  type="button"
                  onclick={() => (showroom = 'Surabaya')}
                  class="py-3 px-4 text-xs font-heading font-bold uppercase tracking-wider border transition-all text-center cursor-pointer {showroom === 'Surabaya'
                    ? 'border-[#FFE500] bg-[#FFE500]/10 text-[#FFE500]'
                    : 'border-white/10 text-neutral-400 hover:border-white/30'}"
                >
                  Showroom Surabaya
                </button>
                <button
                  type="button"
                  onclick={() => (showroom = 'Jakarta')}
                  class="py-3 px-4 text-xs font-heading font-bold uppercase tracking-wider border transition-all text-center cursor-pointer {showroom === 'Jakarta'
                    ? 'border-[#FFE500] bg-[#FFE500]/10 text-[#FFE500]'
                    : 'border-white/10 text-neutral-400 hover:border-white/30'}"
                >
                  Branch Jakarta
                </button>
              </div>
            </div>

            <!-- Pesan / Kebutuhan Usaha -->
            <div class="space-y-2">
              <label for="pesan" class="font-heading font-bold text-xs uppercase tracking-[0.2em] text-neutral-300 block">
                Pesan / Kebutuhan Produksi
              </label>
              <textarea
                id="pesan"
                rows="4"
                bind:value={pesan}
                placeholder="Jelaskan kebutuhan cetak, estimasi volume harian, atau pertanyaan teknis yang ingin Anda diskusikan..."
                class="w-full bg-[#13131c] text-white text-sm px-4 py-3.5 border border-white/10 focus:border-[#FFE500] focus:outline-none transition-colors placeholder:text-neutral-500"
              ></textarea>
            </div>

            <!-- Submit Button with Chevron (Strict rule: Chevron only, no arrows) -->
            <div class="pt-3">
              <button
                type="submit"
                class="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-[#FFE500] hover:bg-[#fff04d] text-black font-heading font-black text-xs sm:text-sm uppercase tracking-[0.25em] transition-all duration-300 shadow-xl group cursor-pointer"
              >
                <span>KIRIM VIA WHATSAPP RESMI</span>
                <svg
                  class="w-4 h-4 stroke-black stroke-[3] transition-transform duration-300 group-hover:translate-x-1"
                  fill="none"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </form>
        {/if}
      </div>

      <!-- RIGHT COLUMN: ORIA CENTRES (Showroom Surabaya & Jakarta) (5 Cols) -->
      <div class="lg:col-span-5 space-y-8">
        <div class="space-y-3">
          <div class="font-heading font-black text-xs uppercase tracking-[0.25em] text-[#FFE500]">
            ORIA CENTRES
          </div>
          <h2 class="font-heading font-bold text-2xl sm:text-3xl text-white uppercase tracking-tight">
            LOKASI FLAGSHIP SHOWROOM
          </h2>
          <p class="font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed">
            Saksikan langsung demo operasional, uji cetak bahan Anda sendiri, dan diskusikan kalkulasi HPP bersama insinyur aplikasi ORIA.
          </p>
        </div>

        <!-- Centre Card 1: Surabaya -->
        <div class="bg-[#0c0c12] border border-white/10 p-6 sm:p-7 space-y-5 hover:border-white/20 transition-colors">
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span class="inline-block bg-[#FFE500] text-black font-heading font-black text-[10px] tracking-widest uppercase px-2 py-0.5 mb-1.5">
                HEADQUARTERS
              </span>
              <h3 class="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-wide">
                Showroom Utama Surabaya
              </h3>
            </div>
            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#FFE500]">
              <svg class="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <div class="space-y-3 font-sans text-xs text-neutral-300 leading-relaxed">
            <p>
              <strong class="text-white block font-heading uppercase tracking-wider text-[11px] mb-0.5">Alamat:</strong>
              Jl. Raya Rungkut Industri No. 45, Kawasan Industri SIER, Surabaya, Jawa Timur 60293
            </p>
            <p>
              <strong class="text-white block font-heading uppercase tracking-wider text-[11px] mb-0.5">Fasilitas Demo:</strong>
              UV Flatbed 2513 &amp; 3220, DTF Apparel 60cm, Fiber &amp; CO2 Laser, Heavy CNC 1325
            </p>
            <p>
              <strong class="text-white block font-heading uppercase tracking-wider text-[11px] mb-0.5">Jam Operasional:</strong>
              Senin – Jumat: 08.30 – 17.00 WIB<br />
              Sabtu: 08.30 – 15.00 WIB (Minggu: By Appointment)
            </p>
          </div>

          <!-- Actions with Chevron (Strict rule: Chevron only) -->
          <div class="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onclick={() => handleScheduleVisit('Surabaya')}
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFE500] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#fff04d] transition-colors cursor-pointer"
            >
              <span>Jadwalkan Kunjungan</span>
              <svg class="w-3.5 h-3.5 stroke-black stroke-[3]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="https://maps.google.com/?q=Kawasan+Industri+SIER+Surabaya"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 border border-white/20 text-neutral-300 hover:text-white hover:border-white font-heading font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Google Maps</span>
              <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <!-- Centre Card 2: Jakarta -->
        <div class="bg-[#0c0c12] border border-white/10 p-6 sm:p-7 space-y-5 hover:border-white/20 transition-colors">
          <div class="flex items-center justify-between border-b border-white/10 pb-4">
            <div>
              <span class="inline-block bg-white/15 text-neutral-200 font-heading font-black text-[10px] tracking-widest uppercase px-2 py-0.5 mb-1.5">
                BRANCH &amp; DEMO
              </span>
              <h3 class="font-heading font-black text-lg sm:text-xl text-white uppercase tracking-wide">
                Branch &amp; Demo Center Jakarta
              </h3>
            </div>
            <div class="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center text-[#FFE500]">
              <svg class="w-4 h-4 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                <path stroke-linecap="round" stroke-linejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
          </div>

          <div class="space-y-3 font-sans text-xs text-neutral-300 leading-relaxed">
            <p>
              <strong class="text-white block font-heading uppercase tracking-wider text-[11px] mb-0.5">Alamat:</strong>
              Sentra Bisnis Daan Mogot KM 11, Cengkareng, Jakarta Barat, DKI Jakarta 11510
            </p>
            <p>
              <strong class="text-white block font-heading uppercase tracking-wider text-[11px] mb-0.5">Fasilitas Demo:</strong>
              Konsultasi Komersial, Printhead Diagnosis Depo, Uji Bahan Sample Cetak, Spare Parts Ready Stock
            </p>
            <p>
              <strong class="text-white block font-heading uppercase tracking-wider text-[11px] mb-0.5">Jam Operasional:</strong>
              Senin – Jumat: 08.30 – 17.00 WIB<br />
              Sabtu: 08.30 – 15.00 WIB
            </p>
          </div>

          <!-- Actions with Chevron (Strict rule: Chevron only) -->
          <div class="pt-2 flex flex-wrap items-center gap-3">
            <button
              type="button"
              onclick={() => handleScheduleVisit('Jakarta')}
              class="inline-flex items-center gap-2 px-4 py-2.5 bg-[#FFE500] text-black font-heading font-bold text-xs uppercase tracking-wider hover:bg-[#fff04d] transition-colors cursor-pointer"
            >
              <span>Jadwalkan Kunjungan</span>
              <svg class="w-3.5 h-3.5 stroke-black stroke-[3]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </button>
            <a
              href="https://maps.google.com/?q=Daan+Mogot+Jakarta+Barat"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 px-4 py-2.5 border border-white/20 text-neutral-300 hover:text-white hover:border-white font-heading font-bold text-xs uppercase tracking-wider transition-colors"
            >
              <span>Google Maps</span>
              <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</div>
