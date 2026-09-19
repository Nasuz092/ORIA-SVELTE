<script lang="ts">
  const articles = [
    {
      id: 1,
      slug: 'panduan-memilih-mesin-dtg-vs-dtf',
      title: 'Panduan Memilih Mesin DTG vs DTF untuk Bisnis Konveksi Modern',
      date: '18 September 2026',
      readTime: '5 Menit Baca',
      excerpt: 'Pelajari perbedaan mendalam antara proses Direct to Garment dan Direct to Film, mulai dari cost of production, tekstur hasil sablon, hingga fleksibilitas bahan kain.'
    },
    {
      id: 2,
      slug: 'perawatan-harian-printhead-epson-i3200',
      title: 'Perawatan Harian Printhead Epson i3200 Agar Tetap Bebas Clogging',
      date: '14 September 2026',
      readTime: '4 Menit Baca',
      excerpt: 'Tips pemeliharaan penting yang harus dilakukan setiap operator sebelum dan sesudah produksi agar nozzle printhead selalu terbuka optimal dan tahan lama.'
    },
    {
      id: 3,
      slug: 'peluang-pasar-cetak-uv-flatbed',
      title: 'Peluang Pasar Cetak UV Flatbed untuk Produk Souvenir & Tumbler Custom',
      date: '10 September 2026',
      readTime: '6 Menit Baca',
      excerpt: 'Cara mengeksplorasi pasar korporat dan merchandise personal dengan mesin UV Rotary beresolusi tinggi yang mampu mencetak langsung pada botol, termos, dan casing HP.'
    },
    {
      id: 4,
      slug: 'tips-memilih-mesin-cnc-router-kayu-acp',
      title: 'Tips Memilih Mesin CNC Router untuk Potong Kayu, Akrilik, dan ACP Reklame',
      date: '04 September 2026',
      readTime: '5 Menit Baca',
      excerpt: 'Faktor krusial yang menentukan kekuatan potong CNC router: kapasitas daya spindle, sistem vacuum table, dan kestabilan sasis gantry.'
    },
    {
      id: 5,
      slug: 'pengaruh-profil-warna-icc-terhadap-hasil-cetak',
      title: 'Pentingnya Profil Warna ICC pada Software RIP untuk Konsistensi Cetak',
      date: '28 Agustus 2026',
      readTime: '7 Menit Baca',
      excerpt: 'Mengapa warna di layar monitor seringkali berbeda dengan hasil cetak kain, dan bagaimana kalibrasi ICC profile mengatasi permasalahan tersebut.'
    }
  ];
</script>

<svelte:head>
  <title>Artikel & Edukasi Mesin Percetakan - ORIA</title>
  <meta name="description" content="Kumpulan artikel teknis, tips perawatan mesin cetak, dan panduan bisnis percetakan digital." />
</svelte:head>

<div class="w-full bg-white text-black py-16 lg:py-24 px-6 lg:px-12">
  <div class="max-w-4xl mx-auto space-y-12">
    <!-- Header -->
    <div class="space-y-4">
      <div class="font-sans font-bold text-xs uppercase tracking-widest text-black">
        Edukasi & Berita
      </div>
      <h1 class="font-heading font-black text-4xl sm:text-5xl tracking-tighter text-black">
        Wawasan Bisnis & Keteknikan Percetakan
      </h1>
      <p class="font-sans text-base sm:text-lg text-black max-w-2xl leading-relaxed">
        Artikel panduan praktis, analisis teknologi, dan tips pemeliharaan langsung dari teknisi berpengalaman ORIA.
      </p>
    </div>

    <!-- Article List -->
    <div class="space-y-12 pt-4">
      {#each articles as a}
        <article class="space-y-3 pb-8">
          <div class="font-sans text-xs font-semibold uppercase tracking-wider text-black flex items-center gap-3">
            <span>{a.date}</span>
            <span>•</span>
            <span>{a.readTime}</span>
          </div>
          <h2 class="font-heading font-bold text-2xl sm:text-3xl text-black leading-snug">
            <a href="/artikel/{a.slug}" class="hover:underline">
              {a.title}
            </a>
          </h2>
          <p class="font-sans text-base text-black leading-relaxed">
            {a.excerpt}
          </p>
          <div class="pt-1">
            <a
              href="/artikel/{a.slug}"
              class="font-sans font-bold text-xs uppercase tracking-widest hover:underline inline-flex items-center gap-1"
            >
              Baca Selengkapnya
              <svg class="w-4 h-4 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
                <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </article>
      {/each}
    </div>
  </div>
</div>
