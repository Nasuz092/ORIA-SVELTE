<script lang="ts">
  import SEO from '$lib/components/seo/SEO.svelte';

  let selectedVersion = $state('v1.0');
  let isVersionOpen = $state(false);

  const versions = ['v1.0 (Terbaru)', 'v0.9 (Arsip)'];

  function toggleVersion() {
    isVersionOpen = !isVersionOpen;
  }

  function selectVersion(v: string) {
    selectedVersion = v.replace(' (Terbaru)', '').replace(' (Arsip)', '');
    isVersionOpen = false;
  }
</script>

<SEO
  title="Terms and Conditions - Syarat & Ketentuan Resmi ORIA Indonesia"
  description="Syarat dan ketentuan resmi penggunaan situs dan transaksi mesin industri di ORIA Indonesia (oria.co.id). Pahami hak, kewajiban, skema pemesanan, pengiriman kargo, dan garansi resmi."
  canonical="/terms-conditions"
  keywords="terms and conditions, syarat dan ketentuan, pembelian mesin printing, garansi mesin oria, ketentuan transaksi oria"
/>

<div class="w-full bg-white text-black min-h-screen pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-28 lg:pb-36 select-none">
  <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16">
    <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
      <!-- LEFT COLUMN: Sticky Lotus Title & Version Selector -->
      <div class="lg:col-span-5 lg:sticky lg:top-32 space-y-8">
        <div class="space-y-3">
          <div class="font-heading font-black text-xs uppercase tracking-[0.25em] text-neutral-500">
            LEGAL &amp; COMPLIANCE
          </div>
          <h1 class="font-heading font-normal text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black leading-tight">
            TERMS AND CONDITIONS
          </h1>
        </div>

        <!-- Lotus Version Selector Box (Strict Chevron Rule) -->
        <div class="relative max-w-xs">
          <button
            type="button"
            onclick={toggleVersion}
            class="w-full bg-neutral-100 hover:bg-neutral-200/80 text-black text-xs sm:text-sm font-heading font-medium tracking-wider px-4 py-3.5 flex items-center justify-between border-0 transition-colors cursor-pointer"
            aria-haspopup="listbox"
            aria-expanded={isVersionOpen}
          >
            <span>{selectedVersion}</span>
            <svg
              class="w-4 h-4 stroke-black stroke-[2.5] transition-transform duration-200 {isVersionOpen ? 'rotate-180' : ''}"
              fill="none"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path stroke-linecap="round" stroke-linejoin="round" d="M19 9l-7 7-7-7" />
            </svg>
          </button>

          {#if isVersionOpen}
            <div class="absolute top-full left-0 right-0 mt-1 z-30 bg-white shadow-2xl py-1 border border-neutral-200 animate-in fade-in slide-in-from-top-1 duration-150">
              {#each versions as v}
                <button
                  type="button"
                  onclick={() => selectVersion(v)}
                  class="w-full text-left px-4 py-2.5 text-xs sm:text-sm text-neutral-800 hover:bg-[#FFE500] hover:text-black hover:font-semibold transition-colors cursor-pointer"
                >
                  {v}
                </button>
              {/each}
            </div>
          {/if}
        </div>

        <div class="space-y-2 text-xs font-sans text-neutral-500 border-t border-neutral-200 pt-6">
          <p><strong class="text-neutral-700">Terakhir Diperbarui:</strong> 28 Oktober 2026</p>
          <p><strong class="text-neutral-700">Penyedia Layanan:</strong> ORIA Industrial Printing</p>
          <p><strong class="text-neutral-700">Pusat Operasional:</strong> Surabaya, Jawa Timur</p>
          <p><strong class="text-neutral-700">Domain Resmi:</strong> oria.co.id</p>
        </div>
      </div>

      <!-- RIGHT COLUMN: Detailed Legal & Technical Content -->
      <div class="lg:col-span-7 space-y-10 font-sans text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed">
        <section class="space-y-4">
          <p class="font-heading font-bold text-sm sm:text-base uppercase tracking-wider text-black">
            MOHON BACA SYARAT DAN KETENTUAN INI DENGAN SEKSAMA SEBELUM MENGGUNAKAN SITUS INI MAUPUN MELAKUKAN PEMESANAN MESIN.
          </p>
          <p>
            Syarat dan Ketentuan ini mengatur tata tertib kunjungan di situs web resmi <strong>oria.co.id</strong>, permohonan konsultasi teknis, serta prosedur resmi transaksi pembelian mesin cetak industri digital, mesin UV flatbed, mesin sublimasi, dan mesin finishing tekstil yang dikelola oleh <strong>ORIA Industrial Printing</strong>.
          </p>
        </section>

        <!-- 1. Penerimaan Ketentuan -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            1. PENERIMAAN KETENTUAN (ACCEPTANCE OF TERMS)
          </h2>
          <p>
            Dengan mengakses situs ini atau mengajukan penawaran harga (quotation), Anda menyatakan telah membaca, memahami, dan menyetujui untuk terikat oleh Syarat dan Ketentuan ini serta kebijakan terkait lainnya:
          </p>
          <ul class="list-disc pl-5 space-y-1.5 text-neutral-600">
            <li><a href="/privacy" class="underline hover:text-black">Privacy Notice (Kebijakan Privasi)</a></li>
            <li><a href="/cookie-statement" class="underline hover:text-black">Cookie Statement (Kebijakan Cookie)</a></li>
          </ul>
          <p>
            Jika Anda tidak menyetujui ketentuan ini, Anda disarankan untuk tidak melanjutkan akses ke situs atau dapat menghubungi tim legal kami untuk konsultasi perikatan khusus B2B.
          </p>
        </section>

        <!-- 2. Informasi Produk & Spesifikasi Mesin -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            2. SPESIFIKASI MESIN &amp; KETERSEDIAAN UNIT
          </h2>
          <p>
            ORIA berupaya memberikan informasi visual, dimensi teknis, tipe printhead (misalnya Epson i3200, Ricoh Gen5/Gen6, Konica Minolta), dan kecepatan cetak seakurat mungkin.
          </p>
          <p>
            Namun, peningkatan inovasi pabrikan dapat menghasilkan penyempurnaan desain casing, pembaruan firmware board (Hansen/Hoson), atau upgrade software RIP (Maintop, Photoprint, Onyx) sewaktu-waktu tanpa pemberitahuan sebelumnya. Konfirmasi spesifikasi final yang mengikat tertuang dalam Surat Penawaran Resmi (Quotation Sheet).
          </p>
        </section>

        <!-- 3. Ketentuan Penawaran Harga & Pemesanan -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            3. PENAWARAN HARGA (QUOTATION) &amp; SISTEM PEMBAYARAN
          </h2>
          <p>
            Setiap penawaran harga yang diterbitkan oleh tim sales engineer ORIA memiliki masa berlaku 14 (empat belas) hari kalender sejak tanggal penerbitan, kecuali dinyatakan lain secara tertulis:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-neutral-600">
            <li><strong>Mata Uang:</strong> Seluruh transaksi dilakukan dalam mata uang Rupiah (IDR). Penyesuaian kurs valuta asing dapat berlaku untuk unit impor khusus sebelum pembayaran uang muka (DP).</li>
            <li><strong>Skema Uang Muka (Down Payment):</strong> Pemesanan unit mesin menjadi sah dan terikat setelah pembeli melakukan pembayaran DP sebesar 30% hingga 50% dari total nilai kontrak.</li>
            <li><strong>Pelunasan:</strong> Sisa pelunasan wajib diselesaikan sebelum unit mesin diberangkatkan dari gudang logistik kami di Surabaya atau sebelum teknisi melakukan instalasi akhir di lokasi pembeli.</li>
          </ul>
        </section>

        <!-- 4. Pengiriman & Pengemasan Peti Kayu -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            4. PENGIRIMAN, ASURANSI &amp; LOGISTIK KARGO
          </h2>
          <p>
            Mesin printing industri ORIA dikemas menggunakan peti kayu lapis kokoh (wooden crate) kedap guncangan sesuai standar pengiriman maritim dan kargo darat:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-neutral-600">
            <li><strong>Asuransi Muatan:</strong> Pengiriman luar pulau atau antar provinsi wajib disertai asuransi muatan kargo penuh guna mengantisipasi kerusakan fisik dalam perjalanan.</li>
            <li><strong>Bongkar Muat di Lokasi:</strong> Pembeli bertanggung jawab menyediakan akses jalan, fasilitas forklift / hand pallet, serta tenaga kerja bongkar peti di workshop tujuan.</li>
            <li><strong>Pemeriksaan Fisik:</strong> Pembeli wajib mendokumentasikan foto dan video saat peti dibuka bersama perwakilan ekspedisi. Kerusakan akibat benturan ekspedisi harus dilaporkan dalam kurun waktu 1x24 jam.</li>
          </ul>
        </section>

        <!-- 5. Instalasi Onsite, Kalibrasi & Pelatihan Teknisi -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            5. INSTALASI ONSITE &amp; PELATIHAN OPERATOR
          </h2>
          <p>
            Setiap pembelian unit mesin baru dari ORIA disertai dengan fasilitas instalasi langsung oleh teknisi bersertifikasi:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-neutral-600">
            <li><strong>Kesiapan Workshop:</strong> Sebelum kedatangan teknisi, pembeli wajib memastikan kestabilan tegangan listrik (disarankan menggunakan stabilizer/UPS industri), grounding di bawah 2 Ohm, serta suhu ruangan workshop yang direkomendasikan (20°C - 28°C).</li>
            <li><strong>Training Operator:</strong> Teknisi ORIA akan memberikan pelatihan komprehensif kepada operator pembeli yang mencakup kalibrasi printhead, profil ICC warna, manajemen RIP software, perawatan harian, dan troubleshooting dasar.</li>
            <li><strong>Berita Acara Serah Terima (BAST):</strong> Setelah mesin terpasang dan mencetak sampel uji dengan standar hasil prima, pembeli dan teknisi menandatangani BAST resmi sebagai tanda mulainya periode garansi.</li>
          </ul>
        </section>

        <!-- 6. Garansi Resmi & Kebijakan Purna Jual -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            6. GARANSI RESMI &amp; LAYANAN PURNA JUAL (WARRANTY)
          </h2>
          <p>
            ORIA memberikan jaminan garansi servis dan suku cadang non-consumable selama 1 (satu) tahun sejak tanggal BAST:
          </p>
          <div class="space-y-3 bg-neutral-50 p-5 border border-neutral-200">
            <p><strong>Cakupan Garansi:</strong> Mainboard, headboard, motor servo, motor carriage, power supply, dan komponen mekanikal penggerak utama.</p>
            <p><strong>Pengecualian Garansi:</strong> Printhead (garansi start-up pasang pertama), damper, wiper, capping, selang tinta, dan kerusakan akibat tegangan listrik tidak stabil, tersambar petir, atau kelalaian pemakaian tinta non-rekomendasi ORIA.</p>
          </div>
        </section>

        <!-- 7. Hak Kekayaan Intelektual -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            7. HAK KEKAYAAN INTELEKTUAL (INTELLECTUAL PROPERTY)
          </h2>
          <p>
            Seluruh konten pada situs <strong>oria.co.id</strong>, mencakup logo ORIA, desain antarmuka, tipografi, foto produk, video demonstrasi, manual instalasi, dan teks deskripsi adalah hak milik intelektual eksklusif ORIA yang dilindungi oleh Undang-Undang Hak Cipta Republik Indonesia.
          </p>
          <p>
            Dilarang keras menyalin, mereproduksi, mendistribusikan, atau memanfaatkan materi grafis dan teknis ini untuk kepentingan komersial pihak ketiga tanpa persetujuan tertulis resmi.
          </p>
        </section>

        <!-- 8. Batasan Tanggung Jawab & Force Majeure -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            8. BATASAN TANGGUNG JAWAB &amp; KEADAAN KAHAR (FORCE MAJEURE)
          </h2>
          <p>
            ORIA tidak bertanggung jawab atas kerugian tidak langsung, kehilangan keuntungan bisnis, keterlambatan produksi pembeli, atau kerusakan material cetak pihak ketiga yang diakibatkan oleh downtime mesin, gangguan cuaca ekstrem, bencana alam, kerusuhan, atau kendala regulasi kepabeanan di luar kendali wajar kami (Force Majeure).
          </p>
        </section>

        <!-- 9. Hukum yang Berlaku & Yurisdiksi Sengketa -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            9. HUKUM YANG BERLAKU &amp; PENYELESAIAN SENGKETA
          </h2>
          <p>
            Syarat dan Ketentuan ini diatur dan ditafsirkan berdasarkan hukum Negara Kesatuan Republik Indonesia. Setiap perselisihan atau sengketa yang timbul dari penafsiran atau pelaksanaan ketentuan ini akan diselesaikan terlebih dahulu melalui musyawarah untuk mufakat.
          </p>
          <p>
            Apabila dalam waktu 30 (tiga puluh) hari musyawarah tidak mencapai mufakat, perselisihan akan diselesaikan melalui domisili hukum Pengadilan Negeri Surabaya di Jawa Timur.
          </p>
        </section>

        <!-- 10. Kontak Resmi -->
        <section class="border-t border-neutral-200 pt-8 space-y-4">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            10. LAYANAN KONSULTASI &amp; DUKUNGAN LEGAL
          </h2>
          <p>
            Untuk pertanyaan terkait perjanjian kerja sama, permohonan faktur pajak, atau klarifikasi isi Syarat dan Ketentuan ini, silakan hubungi kami:
          </p>
          <div class="bg-neutral-50 p-5 border border-neutral-200 space-y-2 text-xs sm:text-sm text-neutral-700">
            <p><strong>Entitas Penyedia:</strong> ORIA Industrial Printing</p>
            <p><strong>Showroom &amp; Technical Center:</strong> Ruko Royal Town Blok RB8, Gunung Anyar, Surabaya, Jawa Timur 60294</p>
            <p><strong>Hotline Sales &amp; Service:</strong> +62 812-5208-6455</p>
            <p><strong>Email:</strong> sales@oria.co.id / legal@oria.co.id</p>
            <p><strong>Website:</strong> oria.co.id</p>
          </div>
        </section>

        <!-- Back to Top / Navigation with strict Chevron Rule -->
        <div class="pt-8 border-t border-neutral-200 flex flex-wrap gap-4 items-center justify-between text-xs sm:text-sm">
          <a
            href="/"
            class="inline-flex items-center gap-2 font-heading font-bold uppercase tracking-wider text-black hover:text-neutral-600 transition-colors"
          >
            <svg class="w-4 h-4 stroke-black stroke-2" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
            <span>Kembali ke Beranda</span>
          </a>

          <a
            href="/privacy"
            class="inline-flex items-center gap-2 font-heading font-bold uppercase tracking-wider text-black hover:text-neutral-600 transition-colors"
          >
            <span>Privacy Notice</span>
            <svg class="w-4 h-4 stroke-black stroke-2" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
