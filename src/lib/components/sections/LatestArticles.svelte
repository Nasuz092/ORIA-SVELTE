<script lang="ts">
  const articles = [
    {
      date: '18 September 2026',
      title: 'Panduan Memilih Mesin DTG vs DTF untuk Bisnis Konveksi Modern',
      desc: 'Analisis perbandingan biaya modal, biaya tinta per meter, kecepatan cetak, dan karakteristik hasil sablon.',
      href: '/artikel'
    },
    {
      date: '14 September 2026',
      title: 'Perawatan Harian Printhead Epson i3200 Agar Tetap Bebas Clogging',
      desc: 'Prosedur pembersihan capping station, wiper blade, dan penggunaan cairan flushing yang tepat sesuai standar pabrikan.',
      href: '/artikel'
    },
    {
      date: '10 September 2026',
      title: 'Peluang Pasar Cetak UV Flatbed untuk Produk Souvenir & Tumbler Custom',
      desc: 'Bagaimana memanfaatkan mesin cetak rotary untuk meraup margin profit tinggi di industri merchandise promosi.',
      href: '/artikel'
    }
  ];
</script>

<section class="w-full bg-white text-black py-20 px-6 lg:px-12">
  <div class="max-w-5xl mx-auto space-y-12">
    <div class="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
      <div class="space-y-2">
        <div class="font-sans font-bold text-xs uppercase tracking-widest text-black">
          Wawasan Industri
        </div>
        <h2 class="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-black">
          Artikel & Panduan Teknis
        </h2>
      </div>
      <a href="/artikel" class="font-sans font-semibold text-xs uppercase tracking-widest hover:underline flex items-center gap-1">
        Baca Semua Artikel
        <svg class="w-4 h-4 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </a>
    </div>

    <div class="grid grid-cols-1 md:grid-cols-3 gap-10">
      {#each articles as a}
        <article class="space-y-3">
          <div class="font-sans text-xs font-semibold text-black uppercase tracking-wider">
            {a.date}
          </div>
          <h3 class="font-heading font-bold text-lg text-black leading-snug">
            <a href={a.href} class="hover:underline">{a.title}</a>
          </h3>
          <p class="font-sans text-sm text-black leading-relaxed">
            {a.desc}
          </p>
        </article>
      {/each}
    </div>
  </div>
</section>
