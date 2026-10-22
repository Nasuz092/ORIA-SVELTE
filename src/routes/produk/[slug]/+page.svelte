<script lang="ts">
  import type { PageData } from './$types';
  import type { FormattedProduct } from '$lib/types/product';

  let { data }: { data: PageData } = $props();

  const product = $derived(data.product);
  const relatedProducts = $derived(data.relatedProducts || []);

  let activeImage = $state('');

  $effect(() => {
    if (product) {
      activeImage = product.imageUrl;
    }
  });

  const allImages = $derived([
    product.imageUrl,
    ...(product.galleryUrls || []).filter((url) => url !== product.imageUrl)
  ]);

  // Ekstrak nama model ringkas untuk header besar bergaya Lotus
  function getCleanModelTitle(fullName: string): string {
    let name = fullName.replace(/^mesin\s+/i, '').replace(/\boria\b/gi, '').trim();
    if (name.includes('|')) name = name.split('|')[0].trim();
    name = name.replace(/digital printing outdoor indoor ecosolvent/i, 'Indoor Eco-Solvent');
    name = name.replace(/digital printing outdoor/i, 'Outdoor Solvent');
    name = name.replace(/digital printing ecocolvent/i, 'Indoor Eco-Solvent');
    name = name.replace(/printing indoor ecosolvent/i, 'Indoor Eco-Solvent');
    name = name.replace(/printer indoor ecosolvent/i, 'Indoor Eco-Solvent');
    name = name.replace(/printing textile sublim/i, 'Sublimasi Textile');
    name = name.replace(/textile printing sublim/i, 'Sublimasi Textile');
    name = name.replace(/laser cutting &? engrave co2/i, 'Laser Cutting CO2');
    name = name.replace(/laser cut engrave co2/i, 'Laser Cutting CO2');
    name = name.replace(/laser cutting engraving/i, 'Laser Cutting & Engrave');
    name = name.replace(/fiber laser cutting cnc/i, 'Fiber Laser Cutting');
    name = name.replace(/fiber laser cutting/i, 'Fiber Laser Cutting');
    name = name.replace(/fiber laser marking/i, 'Fiber Laser Marking');
    name = name.replace(/printer uv tumbler cylinder/i, 'UV Rotary Tumbler');
    name = name.replace(/printer uv mini cylinder tumbler rotary/i, 'UV Rotary Tumbler');
    name = name.replace(/digital printing uv dtf/i, 'UV DTF');
    return name.trim().toUpperCase().replace(/\s+/g, ' ');
  }

  // 4 Spesifikasi Utama per produk & per kategori (Gaya Lotus Eletre X)
  function getProductSpecs(p: FormattedProduct): Array<{ val: string; unit: string; desc: string }> {
    const name = (p.name || '').toLowerCase();
    const desc = ((p.shortDescription || '') + ' ' + (p.descriptionHtml || '')).toLowerCase();
    const cat = (p.categoryName || '').toLowerCase();

    // 1. LASER FIBER / CO2 CUTTING & ENGRAVING
    if (
      name.includes('laser') ||
      cat.includes('laser') ||
      name.includes('marking')
    ) {
      let power = '150 W';
      if (name.includes('6000w') || desc.includes('6000w')) power = '6,000 W';
      else if (name.includes('1500w') || desc.includes('1500w')) power = '1,500 W';
      else if (name.includes('30w') || desc.includes('30w')) power = '30 W';
      else if (name.includes('5w') || desc.includes('5w')) power = '5 W UV';
      else if (name.includes('150 w') || desc.includes('150w')) power = '150 W';
      else if (name.includes('6040')) power = '60-80 W';
      else if (name.includes('6090')) power = '90-100 W';
      else if (name.includes('1490')) power = '100-130 W';

      let area = '1300 x 2500 mm';
      if (name.includes('6040') || desc.includes('60x40') || desc.includes('600x400')) area = '600 x 400 mm';
      else if (name.includes('6090') || desc.includes('60x90') || desc.includes('600x900')) area = '600 x 900 mm';
      else if (name.includes('1490') || desc.includes('1400x900')) area = '1400 x 900 mm';
      else if (name.includes('1310') || desc.includes('1300x1000')) area = '1300 x 1000 mm';
      else if (name.includes('1325') || desc.includes('1300x2500')) area = '1300 x 2500 mm';
      else if (name.includes('3015') || desc.includes('3000x1500')) area = '3000 x 1500 mm';
      else if (name.includes('6015') || desc.includes('6000x1500') || desc.includes('1500 x 6000')) area = '6000 x 1500 mm';
      else if (name.includes('1615') || desc.includes('1600x1500')) area = '1600 x 1500 mm';
      else if (name.includes('2020') || desc.includes('200x200')) area = '200 x 200 mm';

      let speed = '600 mm/s';
      if (name.includes('marking') || desc.includes('7000mm/s') || desc.includes('8000 mm/s')) speed = '7,000 mm/s';
      else if (name.includes('6015') || desc.includes('140 m/min')) speed = '140 m/min';
      else if (name.includes('galvo') || desc.includes('60cm/s')) speed = '60 cm/s';

      let precision = '±0.01 mm';
      if (name.includes('fiber') || name.includes('3015') || name.includes('6015')) precision = '±0.02 mm';

      return [
        { val: power, unit: 'Laser Power', desc: name.includes('fiber') ? 'Raycus Fiber Source' : 'CO2 Glass Tube' },
        { val: area, unit: 'Working Bed', desc: 'Area Efektif Pemotongan' },
        { val: speed, unit: 'Max Speed', desc: 'Kecepatan Proses Cepat' },
        { val: precision, unit: 'Akurasi', desc: 'Presisi Posisi Optik' }
      ];
    }

    // 2. INDOOR ECO-SOLVENT
    if (
      name.includes('indoor') ||
      name.includes('ecosolvent') ||
      name.includes('ecocolvent') ||
      cat.includes('indoor')
    ) {
      let width = '1.8 m';
      if (name.includes('3202')) width = '3.2 m';
      else if (name.includes('1902')) width = '1.9 m';
      else if (name.includes('1802')) width = '1.8 m';

      let head = '2x i3200';
      if (name.includes('xp600')) head = '2x XP600';
      else if (name.includes('8 warna') || desc.includes('8 warna')) head = 'Dual i3200 (8W)';

      let speed = '40 m²/h';
      if (name.includes('1802') || name.includes('xp600')) speed = '30 m²/h';
      else if (name.includes('3202')) speed = '45 m²/h';

      return [
        { val: width, unit: 'Lebar Cetak', desc: 'Format Fleksibel Indoor' },
        { val: head, unit: 'Printhead', desc: 'Presisi Nozzle Tajam' },
        { val: speed, unit: 'Kecepatan', desc: 'Output Produksi Cepat' },
        { val: '2,400 DPI', unit: 'Resolusi', desc: 'Gradasi Lembut & Tajam' }
      ];
    }

    // 3. OUTDOOR SOLVENT
    if (name.includes('outdoor') || cat.includes('outdoor')) {
      return [
        { val: '3.2 m', unit: 'Lebar Cetak', desc: 'Super Wide Format Roll' },
        { val: '4x KM512i', unit: 'Printhead', desc: 'Konica Minolta 30 PL Heavy-Duty' },
        { val: '125 m²/h', unit: 'Kecepatan', desc: 'Produksi Massal Billboard' },
        { val: '2+ Tahun', unit: 'Daya Tahan', desc: 'Tinta Solvent Tahan Cuaca' }
      ];
    }

    // 4. SUBLIMASI TEXTILE
    if (name.includes('sublim') || cat.includes('sublim')) {
      let head = '2x i3200';
      if (name.includes('1804') || desc.includes('4 head')) head = '4x i3200-A1';
      return [
        { val: '1.9 m', unit: 'Lebar Kain', desc: 'Roll-to-Roll Tekstil' },
        { val: head, unit: 'Printhead', desc: 'Micro-Piezo Precision' },
        { val: '80 m²/h', unit: 'Kecepatan', desc: 'Produksi Jersey & Apparel' },
        { val: 'Fast Dry', unit: 'Media Paper', desc: '70-85 Gsm Sublim Paper' }
      ];
    }

    // 5. DTF / UV DTF
    if (name.includes('dtf') || cat.includes('dtf')) {
      let head = '4x i3200';
      if (name.includes('a3') || name.includes('xp600')) head = '3x XP600';
      let width = '60 cm';
      if (name.includes('a3')) width = 'A3 (30 cm)';
      return [
        { val: width, unit: 'Lebar Film', desc: 'Transfer Roll Otomatis' },
        { val: head, unit: 'Printhead', desc: 'CMYK + White + Varnish' },
        { val: '22 m²/h', unit: 'Kecepatan', desc: 'Shaker & Dryer Terintegrasi' },
        { val: 'Anti-Retak', unit: 'Durabilitas', desc: 'Elastisitas Sablon Tinggi' }
      ];
    }

    // 6. UV FLATBED & CYLINDER
    if (name.includes('uv') || cat.includes('uv')) {
      let area = '400 x 620 mm';
      if (name.includes('a3')) area = '300 x 420 mm';
      else if (name.includes('cylinder') || name.includes('tumbler')) area = '360° Rotary';
      return [
        { val: area, unit: 'Area Cetak', desc: 'Media Datar & Silinder' },
        { val: 'i3200 / XP600', unit: 'Printhead', desc: 'Drop-on-Demand UV' },
        { val: 'CMYK+W+V', unit: 'Konfigurasi', desc: 'Emboss 3D & Gloss Varnish' },
        { val: '2,400 DPI', unit: 'Resolusi', desc: 'Tajam & Tahan Gores' }
      ];
    }

    // 7. CNC ROUTER & PLASMA
    if (name.includes('cnc') || name.includes('router') || name.includes('plasma')) {
      let spindle = '3.1 kW';
      if (name.includes('5.5') || desc.includes('5.5 kw')) spindle = '5.5 kW';
      else if (name.includes('2.2') || desc.includes('2.2kw')) spindle = '2.2 kW';
      else if (name.includes('plasma')) spindle = 'Plasma Arc';
      return [
        { val: spindle, unit: 'Spindle Power', desc: name.includes('plasma') ? 'Potong Plat Besi' : 'High Frequency Spindle' },
        { val: '1300x2500 mm', unit: 'Meja Kerja', desc: 'Vacuum Table Bed + T-Slot' },
        { val: '24,000 RPM', unit: 'Putaran', desc: 'Milling Kayu & ACP Halus' },
        { val: '±0.03 mm', unit: 'Presisi Gantry', desc: 'DSP Controller System' }
      ];
    }

    // 8. DTG
    if (name.includes('dtg')) {
      return [
        { val: '400x500 mm', unit: 'Area Sablon', desc: 'Plat Kaos Flatbed' },
        { val: '2x i3200HD', unit: 'Printhead', desc: 'Dual Industrial Head' },
        { val: '1.5 min', unit: 'Speed/Pcs', desc: 'Kaos Gelap & Terang' },
        { val: '8 Warna', unit: 'Tinta Pigment', desc: 'CMYK + Special White' }
      ];
    }

    // Default Industrial Specs
    return [
      { val: 'Industrial', unit: 'Grade Standar', desc: 'Heavy-Duty Chasis' },
      { val: 'Garansi 1 Th', unit: 'Garansi Resmi', desc: 'Sparepart & Servis' },
      { val: 'On-Site', unit: 'Instalasi', desc: 'Training Operator Ahli' },
      { val: '24/7', unit: 'Dukungan', desc: 'Layanan Teknisi Standby' }
    ];
  }

  let cleanModelName = $derived(getCleanModelTitle(product.name));
  let specs = $derived(getProductSpecs(product));
</script>

<svelte:head>
  <title>{product.name} - Spesifikasi & Garansi Resmi ORIA</title>
  <meta
    name="description"
    content={product.shortDescription || `Spesifikasi lengkap, harga, dan fitur ${product.name} merk ORIA bergaransi resmi distributor.`}
  />
  <meta property="og:title" content="{product.name} - ORIA" />
  <meta property="og:description" content={product.shortDescription || product.name} />
  <meta property="og:image" content={product.imageUrl} />
</svelte:head>

<!-- ========================================================================= -->
<!-- HERO SECTION GAYA LOTUS ELETRE X (Pure White Background, Teks Hitam, Tanpa Layer Hitam, Tanpa Desc/Harga/Tombol) -->
<!-- ========================================================================= -->
<section class="relative w-full h-[calc(100svh-4rem)] sm:h-[calc(100svh-5rem)] min-h-[580px] lg:min-h-[640px] bg-white text-black overflow-hidden flex flex-col justify-between select-none border-b border-neutral-200">
  <!-- GAMBAR MESIN: Hanya di kanan, terang dan jelas tanpa layer/gradient hitam -->
  <div class="absolute right-0 top-0 bottom-20 sm:bottom-24 lg:bottom-28 w-full lg:w-[56%] xl:w-[60%] h-full flex items-center justify-center lg:justify-end overflow-hidden z-0">
    <img
      src={activeImage || product.imageUrl}
      alt={product.name}
      class="h-[75%] sm:h-[82%] lg:h-[90%] w-auto max-w-[94%] lg:max-w-none object-contain lg:object-right-bottom drop-shadow-md transition-all duration-700 ease-out select-none"
    />
  </div>

  <!-- KONTEN TEKS KIRI: Breadcrumbs, ORIA & Nama Mesin Hitam (Tanpa Short Desc, Tanpa Harga, Tanpa Tombol) -->
  <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-8 sm:pt-12 lg:pt-16 flex-1 flex flex-col justify-center">
    <div class="max-w-xl lg:max-w-2xl space-y-4 sm:space-y-6">
      <!-- Breadcrumbs & Category Bar -->
      <nav class="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-neutral-500" aria-label="Breadcrumb">
        <a href="/produk" class="hover:text-black hover:underline">KATALOG</a>
        <span class="text-neutral-400">/</span>
        <a href="/produk?cat={product.categorySlug}" class="text-neutral-800 hover:text-black hover:underline">{product.categoryName}</a>
        <span class="text-neutral-400">/</span>
        <span class="text-neutral-500 font-sans">{product.sku}</span>
      </nav>

      <!-- Model Title (Gaya Lotus: ORIA Hitam, Nama Model Hitam) -->
      <div class="space-y-1 sm:space-y-2">
        <div class="font-heading font-extrabold text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[0.24em] text-black leading-none">
          ORIA
        </div>
        <h1 class="font-heading font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-[0.12em] text-black leading-[1.06]">
          {cleanModelName}
        </h1>
      </div>
    </div>
  </div>

  <!-- 4 SPESIFIKASI UTAMA (Membentang Horizontal di Bawah Layar Gaya Lotus, Angka & Teks Hitam) -->
  <div class="relative z-20 w-full border-t border-neutral-200 bg-white">
    <div class="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-6 sm:py-8">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
        {#each specs as s}
          <div class="flex items-baseline gap-3 sm:gap-4">
            <!-- Big Bold Metric Number (Hitam) -->
            <div class="font-heading font-light sm:font-normal text-3xl sm:text-4xl lg:text-5xl text-black tracking-tight shrink-0">
              {s.val}
            </div>
            <!-- Metric Unit & Subtitle -->
            <div class="space-y-0.5 min-w-0">
              <div class="font-sans font-bold text-xs uppercase tracking-wider text-black truncate">
                {s.unit}
              </div>
              <div class="font-sans text-[11px] sm:text-xs text-neutral-500 leading-tight line-clamp-2">
                {s.desc}
              </div>
            </div>
          </div>
        {/each}
      </div>
    </div>
  </div>
</section>

<!-- ========================================================================= -->
<!-- KONTEN LANJUTAN: Galeri, Dokumentasi Teknis, Garansi & Rekomendasi Mesin -->
<!-- ========================================================================= -->
<div id="spesifikasi-lengkap" class="w-full bg-white text-black py-16 lg:py-24 px-6 sm:px-10 lg:px-16 border-t border-neutral-200">
  <div class="max-w-7xl mx-auto space-y-16">
    <!-- Gallery Thumbnails (Jika ada lebih dari 1 gambar) -->
    {#if allImages.length > 1}
      <div class="space-y-4">
        <div class="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
          Galeri Sudut Pandang Mesin
        </div>
        <div class="flex items-center gap-4 overflow-x-auto pb-3">
          {#each allImages as img, idx}
            <button
              type="button"
              onclick={() => (activeImage = img)}
              class="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-neutral-50 border-2 transition-all p-2 flex items-center justify-center cursor-pointer {activeImage === img ? 'border-black ring-2 ring-black' : 'border-neutral-200 opacity-60 hover:opacity-100'}"
              aria-label="Tampilkan gambar ke-{idx + 1}"
            >
              <img src={img} alt="{product.name} view {idx + 1}" class="w-full h-full object-contain" />
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Komitmen Layanan & Garansi Mesin Industri ORIA -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <div class="border border-neutral-200 p-6 space-y-2 bg-neutral-50">
        <div class="font-heading font-bold text-base text-black flex items-center gap-2">
          <svg class="w-5 h-5 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Garansi Resmi 1 Tahun
        </div>
        <p class="font-sans text-xs text-neutral-600 leading-relaxed">
          Jaminan perlindungan penuh untuk sparepart non-consumable dan servis berkala oleh teknisi resmi pabrikan ORIA.
        </p>
      </div>

      <div class="border border-neutral-200 p-6 space-y-2 bg-neutral-50">
        <div class="font-heading font-bold text-base text-black flex items-center gap-2">
          <svg class="w-5 h-5 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Instalasi & Training On-Site
        </div>
        <p class="font-sans text-xs text-neutral-600 leading-relaxed">
          Tim teknisi kami hadir langsung di workshop Anda untuk setting mesin, kalibrasi warna, dan pelatihan operator hingga mahir.
        </p>
      </div>

      <div class="border border-neutral-200 p-6 space-y-2 bg-neutral-50">
        <div class="font-heading font-bold text-base text-black flex items-center gap-2">
          <svg class="w-5 h-5 stroke-black" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Pasokan Tinta & Sparepart Siap
        </div>
        <p class="font-sans text-xs text-neutral-600 leading-relaxed">
          Ketersediaan consumable original terjamin berkesinambungan agar jadwal produksi bisnis Anda tidak pernah terhenti.
        </p>
      </div>
    </div>

    <!-- Spesifikasi Teknis Mendalam & Dokumentasi HTML dari Strapi -->
    {#if product.descriptionHtml}
      <div class="border-t border-neutral-200 pt-12 space-y-6">
        <div class="space-y-2">
          <div class="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
            Dokumentasi Teknis
          </div>
          <h2 class="font-heading font-black text-2xl sm:text-3xl text-black tracking-tight">
            Deskripsi & Spesifikasi Lengkap Unit
          </h2>
        </div>

        <div class="oria-content text-black leading-relaxed">
          {@html product.descriptionHtml}
        </div>
      </div>
    {/if}

    <!-- Banner Uji Coba Sample Cetak / Kunjungan Showroom -->
    <div class="bg-black text-white p-8 sm:p-12 lg:p-14 space-y-6 select-none">
      <div class="space-y-2 max-w-2xl">
        <div class="font-sans text-xs uppercase tracking-widest text-[#FFE500] font-bold">
          Layanan Pelanggan & Uji Coba ORIA
        </div>
        <h3 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl text-white">
          Ingin Uji Coba Sample Cetak atau Demo Mesin Langsung?
        </h3>
        <p class="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed">
          Kirimkan file desain atau bahan produksi Anda untuk pengujian kualitas cetak dan presisi mesin langsung bersama tim teknis spesialis kami di showroom.
        </p>
      </div>

      <div class="flex flex-wrap gap-4 pt-2">
        <a
          href="/kontak?unit={encodeURIComponent(product.name)}"
          class="inline-flex items-center gap-2 bg-[#FFE500] text-black px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white transition-colors"
        >
          <span>Jadwalkan Kunjungan / Demo</span>
          <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
        <a
          href="https://wa.me/6281252086455?text={encodeURIComponent('Halo ORIA, saya ingin konsultasi teknis demo unit: ' + product.name)}"
          target="_blank"
          rel="noopener noreferrer"
          class="inline-flex items-center gap-2 border border-white text-white px-8 py-3.5 text-xs font-bold uppercase tracking-[0.2em] hover:bg-white hover:text-black transition-colors"
        >
          <span>Chat WhatsApp Langsung</span>
          <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
          </svg>
        </a>
      </div>
    </div>

    <!-- Rekomendasi Mesin Terkait -->
    {#if relatedProducts.length > 0}
      <div class="border-t border-neutral-200 pt-12 space-y-8">
        <div class="flex items-center justify-between">
          <div>
            <div class="font-sans font-bold text-xs uppercase tracking-widest text-neutral-500">
              Rekomendasi Terkait
            </div>
            <h2 class="font-heading font-bold text-2xl text-black">
              Pilihan Mesin Industri Lainnya
            </h2>
          </div>
          <a href="/produk" class="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-widest hover:underline text-black">
            <span>Lihat Semua Mesin</span>
            <svg class="w-3.5 h-3.5 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {#each relatedProducts as rel}
            <a
              href="/produk/{rel.slug}"
              class="group block bg-white border border-neutral-200 hover:border-black transition-colors p-4 space-y-3"
            >
              <div class="aspect-[4/3] bg-neutral-50 flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={rel.imageUrl}
                  alt={rel.name}
                  class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="space-y-1">
                <div class="text-[10px] font-mono uppercase text-neutral-500">{rel.sku}</div>
                <div class="font-heading font-bold text-sm text-black group-hover:underline line-clamp-2">
                  {rel.name}
                </div>
                <div class="text-xs font-extrabold text-black pt-1">{rel.priceText}</div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</div>

<style>
  :global(.oria-content) {
    font-family: var(--font-sans);
    font-size: 0.95rem;
    line-height: 1.75;
    color: #1a1a1a;
  }

  :global(.oria-content h2) {
    font-family: var(--font-heading);
    font-size: 1.5rem;
    font-weight: 800;
    letter-spacing: -0.025em;
    margin-top: 2rem;
    margin-bottom: 0.75rem;
    color: #000000;
  }

  :global(.oria-content h3) {
    font-family: var(--font-heading);
    font-size: 1.25rem;
    font-weight: 700;
    margin-top: 1.5rem;
    margin-bottom: 0.5rem;
    color: #000000;
  }

  :global(.oria-content p) {
    margin-bottom: 1rem;
  }

  :global(.oria-content ol),
  :global(.oria-content ul) {
    margin-left: 1.5rem;
    margin-bottom: 1.25rem;
    list-style-position: outside;
  }

  :global(.oria-content ol) {
    list-style-type: decimal;
  }

  :global(.oria-content ul) {
    list-style-type: disc;
  }

  :global(.oria-content li) {
    margin-bottom: 0.35rem;
  }

  :global(.oria-content table) {
    width: 100%;
    border-collapse: collapse;
    margin: 1.75rem 0;
    font-size: 0.875rem;
  }

  :global(.oria-content table th),
  :global(.oria-content table td) {
    padding: 0.75rem 1rem;
    border: 1px solid #e5e5e5;
    text-align: left;
  }

  :global(.oria-content table th) {
    background-color: #000000;
    color: #ffffff;
    font-weight: 700;
    text-transform: uppercase;
    font-size: 0.75rem;
    letter-spacing: 0.05em;
  }

  :global(.oria-content table tr:nth-child(even)) {
    background-color: #f9f9f9;
  }

  :global(.oria-content .video-wrapper) {
    position: relative;
    padding-bottom: 56.25%;
    height: 0;
    overflow: hidden;
    max-width: 100%;
    margin: 2rem 0;
    background: #000;
  }

  :global(.oria-content .video-wrapper iframe) {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: 0;
  }

  :global(.oria-content .btn-download-wrapper) {
    margin: 1.5rem 0;
  }

  :global(.oria-content .btn-download-wrapper button) {
    background-color: #000000 !important;
    color: #ffffff !important;
    border-radius: 0 !important;
    font-size: 0.75rem !important;
    text-transform: uppercase !important;
    letter-spacing: 0.1em !important;
    padding: 0.875rem 1.75rem !important;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  :global(.oria-content .btn-download-wrapper button:hover) {
    opacity: 0.85;
  }
</style>
