<script lang="ts">
  import SEO from '$lib/components/seo/SEO.svelte';

  let selectedVersion = $state('v1.0');
  let isVersionOpen = $state(false);

  const versions = ['v1.0'];

  function toggleVersion() {
    isVersionOpen = !isVersionOpen;
  }

  function selectVersion(v: string) {
    selectedVersion = v;
    isVersionOpen = false;
  }
</script>

<SEO
  title="Privacy Notice - Kebijakan Privasi Resmi ORIA Indonesia"
  description="Pemberitahuan privasi resmi ORIA Indonesia (oria.co.id). Pelajari bagaimana kami mengumpulkan, melindungi, dan memproses data pribadi dan bisnis Anda secara aman."
  canonical="/privacy"
  keywords="privacy notice, kebijakan privasi, perlindungan data, oria indonesia, privasi pelanggan oria"
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
            PRIVACY NOTICE
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
          <p><strong class="text-neutral-700">Entitas Pengendali Data:</strong> ORIA Industrial Printing</p>
          <p><strong class="text-neutral-700">Wilayah Yurisdiksi:</strong> Republik Indonesia</p>
          <p><strong class="text-neutral-700">Domain Resmi:</strong> oria.co.id</p>
        </div>
      </div>

      <!-- RIGHT COLUMN: Detailed Legal & Technical Content -->
      <div class="lg:col-span-7 space-y-10 font-sans text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed">
        <!-- 1. Introduction -->
        <section class="space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            1. PENDAHULUAN (INTRODUCTION)
          </h2>
          <p>
            ORIA Industrial Printing (selanjutnya disebut sebagai <strong>"ORIA"</strong>, <strong>"kami"</strong>, atau <strong>"pengendali data"</strong>) adalah penyedia solusi mesin cetak industri digital, mesin UV, solvent, sublimasi, dan mesin finishing tekstil dengan alamat operasional di Surabaya, Jawa Timur, Indonesia. Kami mengoperasikan situs web resmi <strong>oria.co.id</strong>.
          </p>
          <p>
            Pemberitahuan Privasi ini menjelaskan bagaimana kami mengumpulkan, menggunakan, memelihara, dan melindungi data pribadi maupun informasi profil perusahaan yang Anda serahkan kepada kami saat menggunakan situs kami, meminta penawaran harga (quotation), mengajukan sampel cetak, maupun memesan unit mesin industri.
          </p>
        </section>

        <!-- 2. Penerapan Pemberitahuan Privasi -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            2. CAKUPAN &amp; PENERAPAN (APPLICATION OF THIS PRIVACY NOTICE)
          </h2>
          <p>
            Pemberitahuan Privasi ini berlaku untuk setiap individu, perwakilan bisnis, pemilik usaha percetakan, dan mitra industri yang:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-neutral-600">
            <li>Mengakses dan menjelajahi situs web <strong>oria.co.id</strong>.</li>
            <li>Mengisi formulir konsultasi, permohonan katalog mesin, atau kalkulasi biaya produksi.</li>
            <li>Menghubungi konsultan teknis kami melalui saluran resmi WhatsApp, telepon, atau email.</li>
            <li>Melakukan registrasi garansi unit mesin dan pemesanan suku cadang (sparepart) resmi ORIA.</li>
            <li>Mengunjungi showroom atau pusat pelatihan operasional ORIA di Surabaya.</li>
          </ul>
        </section>

        <!-- 3. Data Pribadi yang Kami Kumpulkan -->
        <section class="border-t border-neutral-200 pt-8 space-y-4">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            3. DATA APA YANG KAMI KUMPULKAN? (DATA WE COLLECT)
          </h2>
          <p>
            Kategori data pribadi dan profesional yang kami proses bergantung pada interaksi Anda dengan sistem kami:
          </p>
          <div class="space-y-3 bg-neutral-50 p-5 border border-neutral-200">
            <div>
              <h3 class="font-heading font-semibold text-black text-sm uppercase">a. Data Identitas &amp; Kontak Bisnis</h3>
              <p class="text-xs sm:text-sm text-neutral-600">
                Nama lengkap, nomor telepon genggam / WhatsApp aktif, alamat email kerja, nama badan usaha/PT/CV, serta kota domisili fasilitas produksi Anda.
              </p>
            </div>
            <div>
              <h3 class="font-heading font-semibold text-black text-sm uppercase">b. Kebutuhan Teknis &amp; Spesifikasi Investasi</h3>
              <p class="text-xs sm:text-sm text-neutral-600">
                Kategori mesin yang diminati (UV Flatbed, Roll-to-Roll, Sublimasi Tekstil, DTF), target kapasitas cetak bulanan, material cetak khusus, dan catatan spesifikasi kustom.
              </p>
            </div>
            <div>
              <h3 class="font-heading font-semibold text-black text-sm uppercase">c. Data Logistik &amp; Instalasi</h3>
              <p class="text-xs sm:text-sm text-neutral-600">
                Alamat pengiriman mesin untuk bongkar muat peti kayu kargo, layout daya listrik workshop, serta identitas teknisi penanggung jawab di lokasi pemesan.
              </p>
            </div>
            <div>
              <h3 class="font-heading font-semibold text-black text-sm uppercase">d. Informasi Teknis Perangkat &amp; Log Situs</h3>
              <p class="text-xs sm:text-sm text-neutral-600">
                Alamat IP, tipe browser, resolusi layar, halaman mesin yang dikunjungi, dan referensi tautan kampanye pemasaran via cookie analitik.
              </p>
            </div>
          </div>
        </section>

        <!-- 4. Tujuan & Dasar Hukum Pemrosesan -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            4. TUJUAN PEMROSESAN DATA (PURPOSE &amp; LEGAL BASIS)
          </h2>
          <p>
            Kami memproses informasi Anda berdasarkan landasan kebutuhan kontraktual, kepatuhan regulasi perlindungan data yang berlaku di Indonesia (UU Perlindungan Data Pribadi / PDP), dan kepentingan bisnis yang sah:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-neutral-600">
            <li><strong>Penyusunan Penawaran Resmi:</strong> Menghitung simulasi investasi mesin, spesifikasi head cetak, dan skema pembayaran resmi.</li>
            <li><strong>Layanan Demo &amp; Uji Cetak:</strong> Mempersiapkan sample cetak file artwork pelanggan sebelum keputusan pembelian.</li>
            <li><strong>Pelaksanaan Kontrak &amp; Logistik:</strong> Mengkoordinasikan ekspedisi kargo khusus alat berat, asuransi perjalanan muatan, dan teknisi onsite instalasi.</li>
            <li><strong>Jaminan Purna Jual &amp; Kalibrasi:</strong> Melacak masa berlaku garansi 1 tahun, jadwal servis preventif, serta supply tinta dan sparepart orisinal.</li>
            <li><strong>Pencegahan Fraud &amp; Keamanan Transaksi:</strong> Memverifikasi keabsahan pembayaran uang muka (DP) dan pelunasan unit mesin.</li>
          </ul>
        </section>

        <!-- 5. Berbagi Data dengan Pihak Ketiga -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            5. PENGUNGKAPAN TERBATAS KEPADA PIHAK KETIGA (DATA SHARING)
          </h2>
          <p>
            ORIA tidak pernah menjual, menyewakan, atau memperdagangkan data pribadi Anda kepada pihak mana pun untuk keperluan periklanan luar. Pengungkapan data hanya dilakukan secara terbatas untuk kebutuhan operasional:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-neutral-600">
            <li><strong>Vendor Logistik Kargo &amp; Forklift:</strong> Nama penerima, nomor kontak penanggung jawab workshop, dan alamat bongkar muatan guna pengantaran peti kayu mesin.</li>
            <li><strong>Penyedia Asuransi Kargo Mesin:</strong> Nilai invoice dan data identitas pemesan guna perlindungan transit pengiriman luar pulau.</li>
            <li><strong>Lembaga Penegak Hukum &amp; Otoritas Regulasi:</strong> Apabila diwajibkan secara tegas oleh putusan pengadilan atau perundang-undangan Republik Indonesia.</li>
          </ul>
        </section>

        <!-- 6. Keamanan & Retensi Data -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            6. KEAMANAN &amp; RETENSI DATA (DATA SECURITY &amp; STORAGE)
          </h2>
          <p>
            Kami menerapkan protokol keamanan teknis dan organisasional berstandar tinggi:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-neutral-600">
            <li>Seluruh pertukaran data pada <strong>oria.co.id</strong> dilindungi enkripsi SSL 256-bit berstandar internasional.</li>
            <li>Akses basis data pelanggan dibatasi hanya kepada staf teknis dan legal resmi yang terikat perjanjian kerahasiaan ketat.</li>
            <li>Data transaksi dan riwayat unit mesin disimpan selama masa operasional mesin aktif dan garansi berlaku guna menjamin kontinuitas pasokan suku cadang mesin Anda.</li>
          </ul>
        </section>

        <!-- 7. Hak Pemilik Data -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            7. HAK ANDA SEBAGAI PEMILIK DATA (YOUR RIGHTS)
          </h2>
          <p>
            Sesuai perundang-undangan perlindungan data pribadi, Anda memiliki hak penuh untuk:
          </p>
          <ul class="list-disc pl-5 space-y-2 text-neutral-600">
            <li>Meminta konfirmasi apakah data Anda sedang diproses oleh ORIA.</li>
            <li>Memperbarui atau mengoreksi data kontak dan alamat pengiriman yang keliru.</li>
            <li>Menarik persetujuan komunikasi promosi atau katalog berkala kapan saja.</li>
            <li>Meminta penghapusan data kontak apabila kewajiban purna jual dan garansi mesin telah terselesaikan.</li>
          </ul>
        </section>

        <!-- 8. Kontak Resmi Pengendali Data -->
        <section class="border-t border-neutral-200 pt-8 space-y-4">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            8. HUBUNGI KAMI (CONTACT US)
          </h2>
          <p>
            Jika Anda memiliki pertanyaan seputar Kebijakan Privasi ini atau ingin mengajukan permohonan hak data Anda, silakan hubungi tim legal dan privasi ORIA:
          </p>
          <div class="bg-neutral-50 p-5 border border-neutral-200 space-y-2 text-xs sm:text-sm text-neutral-700">
            <p><strong>Entitas:</strong> ORIA Industrial Printing</p>
            <p><strong>Alamat Showroom &amp; Operasional:</strong> Ruko Royal Town Blok RB8, Gunung Anyar, Surabaya, Jawa Timur 60294</p>
            <p><strong>WhatsApp / Hotline:</strong> +62 812-5208-6455</p>
            <p><strong>Email:</strong> <a href="mailto:info@oria.co.id" class="text-black font-semibold hover:underline">info@oria.co.id</a></p>
            <p><strong>Website Resmi:</strong> oria.co.id</p>
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
            href="/terms-conditions"
            class="inline-flex items-center gap-2 font-heading font-bold uppercase tracking-wider text-black hover:text-neutral-600 transition-colors"
          >
            <span>Syarat &amp; Ketentuan</span>
            <svg class="w-4 h-4 stroke-black stroke-2" fill="none" viewBox="0 0 24 24" aria-hidden="true">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </div>
</div>
