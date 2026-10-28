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
  title="Cookie Statement - Kebijakan Cookie Resmi ORIA Indonesia"
  description="Pernyataan kebijakan penggunaan cookie di situs web resmi ORIA (oria.co.id). Pahami bagaimana kami menggunakan cookies untuk mengoptimalkan pengalaman browsing Anda."
  canonical="/cookie-statement"
  keywords="cookie statement, kebijakan cookie, oria indonesia, privasi browser, data browsing oria"
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
            COOKIE STATEMENT
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
          <p><strong class="text-neutral-700">Entitas Pengelola:</strong> ORIA Industrial Printing</p>
          <p><strong class="text-neutral-700">Domain Berlaku:</strong> oria.co.id</p>
        </div>
      </div>

      <!-- RIGHT COLUMN: Detailed Legal & Technical Content -->
      <div class="lg:col-span-7 space-y-10 font-sans text-xs sm:text-sm md:text-base text-neutral-700 leading-relaxed">
        <section class="space-y-4">
          <p class="text-sm sm:text-base font-medium text-neutral-900 leading-relaxed">
            Pernyataan ini berlaku untuk penggunaan dan kunjungan Anda pada situs web resmi kami, <strong>oria.co.id</strong> (disebut sebagai "Website").
          </p>
          <p>
            Di ORIA, kami berkomitmen menjaga transparansi penuh mengenai bagaimana teknologi pelacakan dan penyimpanan data sesi diterapkan pada platform kami guna memberikan kenyamanan maksimal dalam mencari solusi mesin industri presisi.
          </p>
        </section>

        <!-- 1. What are cookies -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            1. APA ITU COOKIES?
          </h2>
          <p>
            Cookie adalah file teks kecil berisi karakter huruf dan angka yang disimpan pada browser atau drive perangkat keras komputer/ponsel Anda saat Anda mengakses situs web. Cookies memungkinkan situs mengenali preferensi sesi Anda dan memuat halaman secara lebih responsif pada kunjungan berikutnya.
          </p>
          <p>
            Website kami menggunakan cookies dan teknologi serupa untuk membedakan Anda dari pengunjung lain di Website kami. Hal ini membantu kami memberikan pengalaman navigasi katalog mesin yang lancar serta memungkinkan kami terus meningkatkan performa situs.
          </p>
        </section>

        <!-- 2. Categories of Cookies -->
        <section class="border-t border-neutral-200 pt-8 space-y-4">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            2. KATEGORI COOKIES YANG KAMI GUNAKAN
          </h2>
          <div class="space-y-4">
            <div class="bg-neutral-50 p-5 space-y-1.5 border-l-2 border-black">
              <h3 class="font-heading font-bold text-sm uppercase tracking-wide text-black">
                A. Cookies Mutlak Diperlukan (Strictly Necessary Cookies)
              </h3>
              <p class="text-xs sm:text-sm text-neutral-600">
                Cookies ini esensial untuk pengoperasian dasar situs kami, seperti mengingat sesi navigasi antar-kategori mesin, fungsi keamanan, dan sistem preferensi bahasa pilihan Anda. Tanpa cookies ini, fungsi inti situs tidak dapat berjalan dengan baik.
              </p>
            </div>

            <div class="bg-neutral-50 p-5 space-y-1.5 border-l-2 border-[#FFE500]">
              <h3 class="font-heading font-bold text-sm uppercase tracking-wide text-black">
                B. Cookies Kinerja &amp; Analitik (Analytical / Performance Cookies)
              </h3>
              <p class="text-xs sm:text-sm text-neutral-600">
                Cookies ini mengumpulkan data agregat anonim mengenai bagaimana pengunjung berinteraksi dengan website, artikel teknologi cetak mana yang paling banyak dibaca, dan apakah terdapat pesan eror pada halaman tertentu. Kami menggunakannya semata-mata untuk mengoptimalkan kecepatan muat halaman.
              </p>
            </div>

            <div class="bg-neutral-50 p-5 space-y-1.5 border-l-2 border-black">
              <h3 class="font-heading font-bold text-sm uppercase tracking-wide text-black">
                C. Cookies Fungsionalitas (Functionality Cookies)
              </h3>
              <p class="text-xs sm:text-sm text-neutral-600">
                Digunakan untuk mengenali preferensi spesifik yang telah Anda pilih, seperti riwayat filter kategori mesin industri (UV Flatbed, Sublimasi, Laser Cutting, CNC Router) saat Anda menjelajahi katalog produk.
              </p>
            </div>
          </div>
        </section>

        <!-- 3. Third Party Cookies -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            3. COOKIES PIHAK KETIGA (THIRD-PARTY COOKIES)
          </h2>
          <p>
            Beberapa fitur di website kami melibatkan penyedia layanan eksternal terpercaya, seperti sistem peta Google Maps untuk memandu lokasi Flagship Showroom Surabaya, integrasi pemutar video demo mesin YouTube, serta analitik mesin pencari.
          </p>
          <p>
            Pihak ketiga tersebut dapat menempatkan cookies pada perangkat Anda untuk memantau performa fitur interaktif mereka sesuai dengan kebijakan privasi masing-masing entitas penyedia.
          </p>
        </section>

        <!-- 4. Managing Cookies -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            4. PENGELOLAAN &amp; PENONAKTIFAN COOKIES
          </h2>
          <p>
            Anda memiliki kebebasan penuh untuk menerima, menolak, atau menghapus cookies melalui setelan preferensi peramban (browser) yang Anda gunakan (seperti Google Chrome, Mozilla Firefox, Safari, atau Microsoft Edge).
          </p>
          <p>
            Harap diperhatikan bahwa jika Anda menonaktifkan seluruh cookies melalui pengaturan browser Anda, beberapa bagian interaktif dari situs kami mungkin tidak dapat diakses atau berfungsi sebagaimana mestinya.
          </p>
        </section>

        <!-- 5. Contact -->
        <section class="border-t border-neutral-200 pt-8 space-y-3">
          <h2 class="font-heading font-bold text-lg sm:text-xl text-black uppercase tracking-wider">
            5. HUBUNGI KAMI
          </h2>
          <p>
            Apabila Anda memiliki pertanyaan mengenai penggunaan cookies dan teknologi pelacakan di website ORIA, silakan hubungi tim kami:
          </p>
          <div class="bg-neutral-50 p-6 space-y-2 text-xs sm:text-sm text-neutral-800">
            <p><strong class="text-black">ORIA Industrial Printing</strong></p>
            <p>Alamat: Ruko Royal Town Blok RB8, Gunung Anyar, Surabaya, Jawa Timur 60294</p>
            <p>Hotline &amp; WhatsApp: +62 812-5208-6455</p>
            <p><strong class="text-black">Email:</strong> <a href="mailto:info@oria.co.id" class="text-black font-semibold hover:underline">info@oria.co.id</a></p>
          </div>
        </section>
      </div>
    </div>
  </div>
</div>
