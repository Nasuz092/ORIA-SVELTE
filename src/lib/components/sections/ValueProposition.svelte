<script lang="ts">
  const values = [
    {
      title: 'Standar Industri Berat',
      desc: 'Dikonstruksi dengan sasis solid bebas getaran untuk menjaga stabilitas titik cetak dan akurasi potong berkelanjutan.'
    },
    {
      title: 'Garansi & Servis Resmi',
      desc: 'Setiap mesin dilindungi garansi resmi dengan jaminan ketersediaan suku cadang dan printhead orisinal.'
    },
    {
      title: 'Teknisi Tersertifikasi',
      desc: 'Tim teknis berpengalaman siap melakukan instalasi unit, kalibrasi warna software RIP, dan pelatihan operator langsung.'
    },
    {
      title: 'Dukungan Konsultasi Bisnis',
      desc: 'Kami membantu Anda menghitung Return on Investment (ROI), estimasi biaya produksi per cetakan, hingga pemilihan bahan baku.'
    }
  ];
</script>

<section class="w-full bg-white text-black py-20 px-6 lg:px-12">
  <div class="max-w-5xl mx-auto space-y-12">
    <div class="space-y-2">
      <div class="font-sans font-bold text-xs uppercase tracking-widest text-black">
        Standar Kualitas
      </div>
      <h2 class="font-heading font-extrabold text-3xl sm:text-4xl tracking-tight text-black">
        Kenapa Memilih Mesin ORIA?
      </h2>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 gap-10">
      {#each values as v}
        <div class="space-y-3">
          <div class="flex items-center gap-2">
            <svg class="w-5 h-5 stroke-black flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke-width="2">
              <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            <h3 class="font-heading font-bold text-xl text-black">
              {v.title}
            </h3>
          </div>
          <p class="font-sans text-sm text-black leading-relaxed pl-7">
            {v.desc}
          </p>
        </div>
      {/each}
    </div>
  </div>
</section>
