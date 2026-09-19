<script lang="ts">
  import { page } from '$app/state';

  const slug = $derived(page.params.slug);
</script>

<svelte:head>
  <title>Artikel Teknis - ORIA</title>
</svelte:head>

<article class="w-full bg-white text-black py-16 lg:py-24 px-6 lg:px-12">
  <div class="max-w-3xl mx-auto space-y-8">
    <a href="/artikel" class="font-sans font-bold text-xs uppercase tracking-widest text-black hover:underline flex items-center gap-2">
      <svg class="w-4 h-4 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7" />
      </svg>
      Kembali ke Daftar Artikel
    </a>

    <header class="space-y-4">
      <div class="font-sans text-xs font-semibold uppercase tracking-wider text-black">
        Panduan & Edukasi Industri
      </div>
      <h1 class="font-heading font-black text-3xl sm:text-5xl tracking-tight text-black leading-tight">
        Panduan Memilih Mesin DTG vs DTF untuk Bisnis Konveksi Modern
      </h1>
      <div class="font-sans text-xs text-black">
        Dipublikasikan pada 18 September 2026 • Tim Teknis ORIA
      </div>
    </header>

    <div class="font-sans text-base sm:text-lg text-black leading-relaxed space-y-6 pt-4">
      <p>
        Dalam industri apparel dan sablon digital, pemilihan antara teknologi Direct to Garment (DTG) dan Direct to Film (DTF) seringkali menjadi keputusan strategis yang menentukan efisiensi operasional dan kualitas hasil akhir.
      </p>

      <h2 class="font-heading font-bold text-2xl text-black pt-4">
        1. Karakteristik Cetak DTG (Direct to Garment)
      </h2>
      <p>
        Mesin DTG mencetak tinta pigmen khusus langsung ke serat kain katun. Keunggulan utamanya adalah handfeel yang sangat lembut (*breathable*) dan ketajaman gradasi raster foto yang menyatu sempurna dengan pori-pori kaos. Untuk kaos katun combed premium dan pesanan custom satuan bernilai jual tinggi, DTG tetap menjadi standar tertinggi.
      </p>

      <h2 class="font-heading font-bold text-2xl text-black pt-4">
        2. Karakteristik Cetak DTF (Direct to Film)
      </h2>
      <p>
        Sementara itu, teknologi DTF mencetak tinta di atas film PET yang kemudian ditaburi bubuk hotmelt adhesive dan dipanaskan sebelum dipress ke kain. Keunggulannya adalah fleksibilitas media: dapat diaplikasikan pada katun, poliester, kanvas, denim, nilon, hingga topi tanpa proses pre-treatment cair.
      </p>

      <h2 class="font-heading font-bold text-2xl text-black pt-4">
        3. Kesimpulan & Rekomendasi
      </h2>
      <p>
        Jika fokus bisnis Anda adalah brand clothing apparel katun premium dengan kenyamanan maksimal, lini Mesin DTG ORIA dengan dual head Epson i3200 adalah pilihan tepat. Sedangkan jika Anda memproduksi beragam produk seperti jaket, jersey, seragam kerja, dan merchandise berbahan sintetis, DTF memberikan fleksibilitas material yang lebih luas.
      </p>
    </div>

    <div class="pt-12 space-y-4">
      <h3 class="font-heading font-bold text-xl text-black">
        Konsultasikan Kebutuhan Mesin Anda
      </h3>
      <p class="font-sans text-sm text-black">
        Tim spesialis ORIA siap memberikan simulasi biaya produksi per cetakan dan demo langsung di showroom kami.
      </p>
      <div class="pt-2">
        <a
          href="/kontak"
          class="bg-black text-white px-6 py-3 text-xs font-semibold uppercase tracking-widest inline-block hover:opacity-85"
        >
          Hubungi Tim Penjualan
        </a>
      </div>
    </div>
  </div>
</article>
