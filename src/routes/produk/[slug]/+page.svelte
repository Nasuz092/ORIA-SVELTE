<script lang="ts">
  import type { PageData } from './$types';
  import type { FormattedProduct } from '$lib/types/product';

  let { data }: { data: PageData } = $props();

  const product = $derived(data.product);
  const relatedProducts = $derived(data.relatedProducts || []);

  let activeImage = $state('');

  $effect(() => {
    if (product) {
      activeImage = product.mainImageDesktopUrl || product.imageUrl;
    }
  });

  const allImages = $derived([
    product.mainImageDesktopUrl || product.imageUrl,
    ...(product.mainImageMobileUrl && product.mainImageMobileUrl !== product.mainImageDesktopUrl ? [product.mainImageMobileUrl] : []),
    ...(product.galleryUrls || []).filter((url) => url !== product.mainImageDesktopUrl && url !== product.mainImageMobileUrl && url !== product.imageUrl)
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

      let area = '130 x 250 cm';
      if (name.includes('6040') || desc.includes('60x40') || desc.includes('600x400')) area = '60 x 40 cm';
      else if (name.includes('6090') || desc.includes('60x90') || desc.includes('600x900')) area = '60 x 90 cm';
      else if (name.includes('1490') || desc.includes('1400x900')) area = '140 x 90 cm';
      else if (name.includes('1310') || desc.includes('1300x1000')) area = '130 x 100 cm';
      else if (name.includes('1325') || desc.includes('1300x2500')) area = '130 x 250 cm';
      else if (name.includes('3015') || desc.includes('3000x1500')) area = '300 x 150 cm';
      else if (name.includes('6015') || desc.includes('6000x1500') || desc.includes('1500 x 6000')) area = '600 x 150 cm';
      else if (name.includes('1615') || desc.includes('1600x1500')) area = '160 x 150 cm';
      else if (name.includes('2020') || desc.includes('200x200')) area = '20 x 20 cm';

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
      let area = '40 x 62 cm';
      if (name.includes('a3')) area = '30 x 42 cm';
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
        { val: '130 x 250 cm', unit: 'Meja Kerja', desc: 'Vacuum Table Bed + T-Slot' },
        { val: '24,000 RPM', unit: 'Putaran', desc: 'Milling Kayu & ACP Halus' },
        { val: '±0.03 mm', unit: 'Presisi Gantry', desc: 'DSP Controller System' }
      ];
    }

    // 8. DTG
    if (name.includes('dtg')) {
      return [
        { val: '40 x 50 cm', unit: 'Area Sablon', desc: 'Plat Kaos Flatbed' },
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

  function parseSpecMetric(rawVal: string) {
    if (!rawVal) return { prefix: '', main: '', suffix: '' };
    let rest = rawVal.trim();
    let prefix = '';

    // Match prefix: 4x, 2x, 3x, Dual, Garansi, ±
    const prefixMatch = rest.match(/^(\d+x|dual|garansi|±)\s+(.+)$/i);
    if (prefixMatch) {
      prefix = prefixMatch[1].trim();
      rest = prefixMatch[2].trim();
    }

    // Match suffix: m²/h, m2/h, m/min, mm/s, cm/s, tahun, th, rpm, dpi, warna, min, kw, w, cm, mm, m
    let suffix = '';
    let main = rest;

    const suffixMatch = rest.match(/^(.*?)(?:\s+(m|w|cm|mm|kw|rpm|dpi|min|tahun|th|warna)|\s*(m²\/h|m2\/h|m\/min|mm\/s|cm\/s))$/i);
    if (suffixMatch && suffixMatch[1].trim() !== '') {
      main = suffixMatch[1].trim();
      suffix = (suffixMatch[2] || suffixMatch[3] || '').trim();
    }

    return { prefix, main, suffix };
  }

  function isSizeMetric(s: { val: string; unit: string; desc?: string }): boolean {
    const u = (s.unit || '').toLowerCase();
    const d = (s.desc || '').toLowerCase();
    const v = (s.val || '').toLowerCase();
    return (
      u.includes('lebar') ||
      u.includes('area') ||
      u.includes('meja') ||
      u.includes('bed') ||
      u.includes('ukuran') ||
      d.includes('lebar') ||
      d.includes('area') ||
      v.endsWith(' m') ||
      v.endsWith(' cm') ||
      v.endsWith(' mm') ||
      (v.includes('x') && (v.includes('cm') || v.includes('mm') || v.includes('m')))
    );
  }

  interface SpecRow {
    label: string;
    value: string;
  }

  interface SpecGroup {
    title: string;
    items: SpecRow[];
  }

  function getDetailedSpecColumns(prod: FormattedProduct): { left: SpecGroup[]; right: SpecGroup[] } {
    const name = (prod.name || '').toLowerCase();
    const cat = (prod.categoryName || '').toLowerCase();

    const groupsDict: Record<string, SpecRow[]> = {
      'Sistem Cetak & Performa': [],
      'Area & Media Kerja': [],
      'Sistem Tinta & Warna': [],
      'Kelistrikan & Operasional': [],
      'Dimensi & Konstruksi': [],
      'Konektivitas & Sistem Kontrol': [],
      'Informasi Unit & Garansi': []
    };

    // 1. Parse HTML table from Strapi if available
    if (prod.descriptionHtml) {
      const regex = /<tr[^>]*>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<\/tr>/gi;
      let match;
      while ((match = regex.exec(prod.descriptionHtml)) !== null) {
        let rawK = match[1].replace(/<[^>]+>/g, '').trim().replace(/^[\s:-]+/, '').replace(/[\s:-]+$/, '');
        let rawV = match[2].replace(/<[^>]+>/g, '').trim().replace(/^[\s:-]+/, '');
        if (rawK && rawV && !/^(spesifikasi|detail mesin)$/i.test(rawK)) {
          const k = rawK.toLowerCase();
          if (
            k.includes('head') ||
            k.includes('speed') ||
            k.includes('kecepatan') ||
            k.includes('resolusi') ||
            k.includes('laser') ||
            k.includes('spindle') ||
            k.includes('akurasi')
          ) {
            groupsDict['Sistem Cetak & Performa'].push({ label: rawK, value: rawV });
          } else if (
            k.includes('lebar') ||
            k.includes('area') ||
            k.includes('media') ||
            k.includes('meja') ||
            k.includes('bed') ||
            k.includes('tebal')
          ) {
            groupsDict['Area & Media Kerja'].push({ label: rawK, value: rawV });
          } else if (
            k.includes('tinta') ||
            k.includes('ink') ||
            k.includes('warna') ||
            k.includes('color')
          ) {
            groupsDict['Sistem Tinta & Warna'].push({ label: rawK, value: rawV });
          } else if (
            k.includes('listrik') ||
            k.includes('power') ||
            k.includes('daya') ||
            k.includes('suhu') ||
            k.includes('pemanas') ||
            k.includes('voltage') ||
            k.includes('tegangan')
          ) {
            groupsDict['Kelistrikan & Operasional'].push({ label: rawK, value: rawV });
          } else if (
            k.includes('dimensi') ||
            k.includes('berat') ||
            k.includes('weight') ||
            k.includes('ukuran') ||
            k.includes('gantry') ||
            k.includes('rail')
          ) {
            groupsDict['Dimensi & Konstruksi'].push({ label: rawK, value: rawV });
          } else if (
            k.includes('rip') ||
            k.includes('software') ||
            k.includes('interface') ||
            k.includes('koneksi') ||
            k.includes('port') ||
            k.includes('dsp') ||
            k.includes('kontrol')
          ) {
            groupsDict['Konektivitas & Sistem Kontrol'].push({ label: rawK, value: rawV });
          } else {
            groupsDict['Informasi Unit & Garansi'].push({ label: rawK, value: rawV });
          }
        }
      }
    }

    // 2. Fallback comprehensive data per machine category if empty
    if (groupsDict['Sistem Cetak & Performa'].length === 0) {
      if (name.includes('outdoor') || cat.includes('outdoor')) {
        groupsDict['Sistem Cetak & Performa'] = [
          { label: 'Tipe Printhead', value: 'Konica Minolta KM512i (30 PL Heavy-Duty Industrial)' },
          { label: 'Konfigurasi Head', value: '4 Printheads (Staggered Arrangement)' },
          { label: 'Kecepatan Cetak', value: '125 m²/h (Billboard 2-Pass) | 80 m²/h (Produksi 3-Pass)' },
          { label: 'Resolusi Maksimal', value: '1,440 DPI High Color Density' },
          { label: 'Teknologi Semprot', value: 'Drop-on-Demand Piezoelectric Micro-Nozzle' }
        ];
        groupsDict['Area & Media Kerja'] = [
          { label: 'Lebar Area Cetak', value: '3,200 mm (3.2 Meter Super Wide Format)' },
          { label: 'Tipe Media Roll', value: 'Frontlit, Backlit Banner, Flex, Vinyl Sticker, Mesh, One Way' },
          { label: 'Sistem Feeding', value: 'Industrial Heavy Duty Dual Motor Roll-to-Roll Feed & Take-Up' },
          { label: 'Ketebalan Media', value: 'Maksimal 2.5 mm Media Roll Industri' }
        ];
        groupsDict['Sistem Tinta & Warna'] = [
          { label: 'Tipe Tinta', value: 'Solvent Industrial Ink High Pigment' },
          { label: 'Konfigurasi Warna', value: 'CMYK (4 Warna Tinta Solvent)' },
          { label: 'Sistem Pasokan', value: 'Continuous Ink Supply System (CISS) dengan Sub-tank Filter' },
          { label: 'Ketahanan Cuaca', value: '2+ Tahun Tahan Paparan Sinar UV & Cuaca Luar Ruangan' }
        ];
        groupsDict['Kelistrikan & Operasional'] = [
          { label: 'Kebutuhan Daya', value: 'Operasional 1,200 Watt, Pemanas Maksimal 3,500 Watt' },
          { label: 'Tegangan Listrik', value: 'AC 220V ± 10%, 50/60 Hz, Single Phase' },
          { label: 'Sistem Pemanas', value: '3-Way Intelligent Heater (Pre, Mid, & Post Heater)' },
          { label: 'Sistem Pengering', value: 'Infrared Heating Bar + Multi-Blower Fan System' }
        ];
        groupsDict['Dimensi & Konstruksi'] = [
          { label: 'Dimensi Unit Mesin', value: '4,800 mm x 1,050 mm x 1,450 mm' },
          { label: 'Berat Bersih Mesin', value: 'Sekitar 850 kg (Rigid High-Tensile Steel Body)' },
          { label: 'Rel Pemandu Gantry', value: 'THK Dual Linear Mute Guide Rail Made in Japan' }
        ];
        groupsDict['Konektivitas & Sistem Kontrol'] = [
          { label: 'Antarmuka Komunikasi', value: 'High-Speed USB 3.0 / Gigabit LAN Port' },
          { label: 'Kompatibilitas RIP', value: 'Photoprint, Maintop, Onyx RIP Software' },
          { label: 'Sistem Operasi', value: 'Windows 10 / Windows 11 (64-bit)' }
        ];
      } else if (name.includes('sublim') || cat.includes('sublim')) {
        groupsDict['Sistem Cetak & Performa'] = [
          { label: 'Tipe Printhead', value: name.includes('1804') ? '4x Epson i3200-A1 PrecisionCore' : '2x Epson i3200-A1 PrecisionCore' },
          { label: 'Kecepatan Cetak', value: name.includes('1804') ? 'Hingga 140 m²/h (2-Pass Mode)' : 'Hingga 80 m²/h (2-Pass Mode)' },
          { label: 'Resolusi Maksimal', value: '3,200 DPI Micro-Piezo Droplet 3.8 pl' },
          { label: 'Sistem Anti-Blinking', value: 'Auto Capping, Wiping, and Anti-Clogging Nozzle Flush' }
        ];
        groupsDict['Area & Media Kerja'] = [
          { label: 'Lebar Area Cetak', value: '1,900 mm (1.9 Meter Roll-to-Roll Textile)' },
          { label: 'Kompatibilitas Kertas', value: 'Sublimation Transfer Paper 35 Gsm - 100 Gsm' },
          { label: 'Sistem Penegang Kertas', value: 'Tension-Balanced Multi-Roller Feeding System' }
        ];
        groupsDict['Sistem Tinta & Warna'] = [
          { label: 'Jenis Tinta', value: 'Water-Based Dye Sublimation Disperse Ink' },
          { label: 'Konfigurasi Warna', value: 'CMYK (4 Warna Hi-Fi Color Gamut)' },
          { label: 'Kapasitas Pasokan', value: 'Bulk Ink Tank 1.5 Liter per Warna dengan Level Sensor' }
        ];
        groupsDict['Kelistrikan & Operasional'] = [
          { label: 'Daya Operasional', value: 'Mesin 800 Watt, Pemanas Kering 2,200 Watt' },
          { label: 'Kebutuhan Listrik', value: 'AC 220V, 50 Hz Single Phase' },
          { label: 'Sistem Pengeringan', value: 'Smart Front Dryer Infrared + Turbofan System' }
        ];
        groupsDict['Dimensi & Konstruksi'] = [
          { label: 'Dimensi Unit Mesin', value: '3,100 mm x 950 mm x 1,450 mm' },
          { label: 'Berat Bersih Mesin', value: 'Sekitar 320 kg' },
          { label: 'Sistem Motor Penggerak', value: 'Integrated High Torque Brushless Leadshine Servo' }
        ];
        groupsDict['Konektivitas & Sistem Kontrol'] = [
          { label: 'Port Antarmuka', value: 'Gigabit Ethernet Optical Interface / USB 3.0' },
          { label: 'Software RIP', value: 'Maintop / Photoprint / Neostampa' }
        ];
      } else if (name.includes('uv') || cat.includes('uv')) {
        groupsDict['Sistem Cetak & Performa'] = [
          { label: 'Tipe Printhead', value: 'Epson i3200-U1 / Epson XP600 Industrial UV' },
          { label: 'Konfigurasi Nozzle', value: 'CMYK + White + Gloss Varnish Layering' },
          { label: 'Resolusi Cetak', value: '2,400 x 1,200 DPI Micro Varnish Precision' },
          { label: 'Sistem Pengeringan', value: 'Dual Water-Cooled LED UV Curing System Instant Dry' }
        ];
        groupsDict['Area & Media Kerja'] = [
          { label: 'Area Meja Kerja', value: name.includes('a3') ? '300 mm x 420 mm (A3 Format)' : (name.includes('6090') ? '600 mm x 900 mm' : '1,300 mm x 2,500 mm Industrial Bed') },
          { label: 'Ketebalan Media', value: 'Hingga 150 mm (Auto Height Measurement Sensor)' },
          { label: 'Aplikasi Material', value: 'Akrilik, Kaca, Kayu, Keramik, Logam, Tumbler 360°, Case HP' }
        ];
        groupsDict['Sistem Tinta & Warna'] = [
          { label: 'Jenis Tinta', value: 'UV LED Curable Ink (Hard / Flexible Formula)' },
          { label: 'Sirkulasi Tinta Putih', value: 'Automatic White Ink Agitation & Circulation System' },
          { label: 'Efek Khusus', value: 'Emboss 3D Texture, Braille Print, Glossy Clear Coat' }
        ];
        groupsDict['Kelistrikan & Operasional'] = [
          { label: 'Konsumsi Daya', value: '800W - 1,800W (Hemat Energi LED UV)' },
          { label: 'Kebutuhan Listrik', value: 'AC 220V, 50/60 Hz' }
        ];
        groupsDict['Dimensi & Konstruksi'] = [
          { label: 'Struktur Meja', value: 'Aviation Aluminum Vacuum Suction Bed' },
          { label: 'Sistem Sumbu', value: 'Dual Ball Screw Lead Z-Axis + Linear Rail' }
        ];
        groupsDict['Konektivitas & Sistem Kontrol'] = [
          { label: 'Interface Data', value: 'High Speed Network RJ45 / USB' },
          { label: 'Software Kontrol', value: 'PrintExp / UltraPrint / Photoprint DX' }
        ];
      } else if (name.includes('laser') || cat.includes('laser')) {
        const isFiber = name.includes('fiber') || name.includes('6000w') || name.includes('1500w');
        groupsDict['Sistem Cetak & Performa'] = [
          { label: 'Sumber Laser', value: isFiber ? 'Raycus / Maxphotonics Continuous Fiber Laser' : 'Sealed CO2 Glass Laser Tube Reinforced' },
          { label: 'Daya Output Laser', value: name.includes('6040') ? '60 - 80 Watt CO2' : (name.includes('1490') ? '100 - 130 Watt CO2' : '1,500W - 6,000W Fiber') },
          { label: 'Kecepatan Proses', value: 'Hingga 600 mm/s (Cutting) | 1,000 mm/s (Engraving)' },
          { label: 'Akurasi Reposisi', value: '±0.01 mm High Precision Optical Motion' }
        ];
        groupsDict['Area & Media Kerja'] = [
          { label: 'Area Efektif Kerja', value: name.includes('6040') ? '600 mm x 400 mm' : (name.includes('1490') ? '1,400 mm x 900 mm' : '1,300 mm x 2,500 mm') },
          { label: 'Tipe Meja Potong', value: 'Blade Table Strip + Honeycomb Bed Convertible' },
          { label: 'Kemampuan Potong', value: isFiber ? 'Plat Stainless, Carbon Steel, Kuningan, Tembaga' : 'Akrilik, MDF, Kayu, Kulit, Karet Stempel, Kain' }
        ];
        groupsDict['Kelistrikan & Operasional'] = [
          { label: 'Sistem Pendingin', value: 'Industrial Water Chiller CW-5200 Automatic Thermostat' },
          { label: 'Sistem Pembuangan', value: 'High Flow Air Exhaust Blower + Air Assist Compressor' },
          { label: 'Kebutuhan Listrik', value: 'AC 220V ± 10%, 50 Hz Single Phase' }
        ];
        groupsDict['Dimensi & Konstruksi'] = [
          { label: 'Konstruksi Chasis', value: 'Heavy Sheet Metal Chasis Laser Cut & Welded' },
          { label: 'Rel & Transmisi', value: 'Hiwin Square Linear Rails + Kevlar Timing Belt' }
        ];
        groupsDict['Konektivitas & Sistem Kontrol'] = [
          { label: 'Sistem Kontrol DSP', value: 'Ruida 6445G / 6442S Offline Color Screen Controller' },
          { label: 'Format File Didukung', value: 'AI, DXF, PLT, BMP, DST, DSB, EPS' }
        ];
      } else if (name.includes('dtf') || cat.includes('dtf')) {
        groupsDict['Sistem Cetak & Performa'] = [
          { label: 'Tipe Printhead', value: 'Epson i3200 / XP600 Direct-to-Film Industrial' },
          { label: 'Kecepatan Cetak', value: '22 m²/h (4-Pass High Speed Textile)' },
          { label: 'Resolusi Maksimal', value: '2,400 DPI Nozzle Density' }
        ];
        groupsDict['Area & Media Kerja'] = [
          { label: 'Lebar Media Film', value: name.includes('a3') ? 'A3 (300 mm) Roll' : '600 mm PET Transfer Film Roll' },
          { label: 'Sistem Pengering Shaker', value: 'Automatic Powder Shaker & Infrared Baking Tunnel' }
        ];
        groupsDict['Sistem Tinta & Warna'] = [
          { label: 'Jenis Tinta', value: 'DTF Textile Elastic Pigment Ink' },
          { label: 'Konfigurasi Warna', value: 'CMYK + Special White Ink' },
          { label: 'Sistem Sirkulasi', value: 'White Ink Circulation Pump & Magnetic Stirrer' }
        ];
        groupsDict['Kelistrikan & Operasional'] = [
          { label: 'Daya Total Sistem', value: 'Mesin 400W, Shaker Tunnel 2,500W' },
          { label: 'Tegangan', value: 'AC 220V, 50 Hz' }
        ];
        groupsDict['Dimensi & Konstruksi'] = [
          { label: 'Sistem Penarikan', value: 'Sync Automatic Auto Feeding & Rewinder Roll' }
        ];
        groupsDict['Konektivitas & Sistem Kontrol'] = [
          { label: 'Software RIP', value: 'Cadlink Digital Factory / Maintop DTF Edition' }
        ];
      } else if (name.includes('cnc') || cat.includes('cnc') || name.includes('router')) {
        groupsDict['Sistem Cetak & Performa'] = [
          { label: 'Motor Spindle', value: '3.1 kW / 5.5 kW Water Cooled High Speed Spindle' },
          { label: 'Kecepatan Putaran', value: 'Hingga 24,000 RPM Stepless Inverter Control' },
          { label: 'Presisi Reposisi', value: '±0.03 mm Dual Helical Rack & Pinion' }
        ];
        groupsDict['Area & Media Kerja'] = [
          { label: 'Area Kerja Efektif', value: '1,300 mm x 2,500 mm x 200 mm (Z-Axis Clearance)' },
          { label: 'Tipe Meja Kerja', value: 'Multi-Zone Vacuum Suction Table + T-Slot Clamping' }
        ];
        groupsDict['Kelistrikan & Operasional'] = [
          { label: 'Konsumsi Daya', value: 'Spindle 5.5 kW, Vacuum Blower 7.5 kW' },
          { label: 'Tegangan Operasional', value: '3-Phase AC 380V / Single-Phase AC 220V' }
        ];
        groupsDict['Dimensi & Konstruksi'] = [
          { label: 'Struktur Gantry', value: 'Heavy Duty Seamless Steel Tube Welded & Annealed' },
          { label: 'Rel Pemandu Sumbu', value: 'Hiwin 25 mm Square Linear Rails All Axes' }
        ];
        groupsDict['Konektivitas & Sistem Kontrol'] = [
          { label: 'Sistem Kontrol', value: 'DSP A11 Handheld Controller / NC Studio USB' },
          { label: 'Kompatibilitas CAD/CAM', value: 'ArtCAM, Aspire, Vectric, Fusion 360 (G-Code)' }
        ];
      } else {
        groupsDict['Sistem Cetak & Performa'] = [
          { label: 'Grade Konstruksi', value: 'Industrial Heavy Duty Production Standard' },
          { label: 'Akurasi Operasional', value: 'High Precision Linear Motion System' }
        ];
        groupsDict['Area & Media Kerja'] = [
          { label: 'Format Media', value: 'Industrial Roll-to-Roll / Flatbed Rigid Sheet' }
        ];
        groupsDict['Kelistrikan & Operasional'] = [
          { label: 'Tegangan Operasional', value: 'AC 220V ± 10%, 50/60 Hz' }
        ];
        groupsDict['Dimensi & Konstruksi'] = [
          { label: 'Struktur Rangka', value: 'Solid Steel Reinforced Chasis Anti-Vibration' }
        ];
        groupsDict['Konektivitas & Sistem Kontrol'] = [
          { label: 'Interface Data', value: 'High Speed Industrial USB / Gigabit Ethernet' }
        ];
      }
    }

    // Official Warranty Information
    groupsDict['Informasi Unit & Garansi'] = [
      { label: 'Manufaktur & Brand', value: `ORIA Industrial Series (${prod.brand || 'ORIA'})` },
      { label: 'Model & SKU', value: `${prod.name} (SKU: ${prod.sku})` },
      { label: 'Kategori Mesin', value: prod.categoryName },
      { label: 'Garansi Resmi', value: '1 Tahun Garansi Resmi ORIA (Servis & Non-Consumable Sparepart)' },
      { label: 'Layanan Purnajual', value: 'Instalasi On-Site, Kalibrasi Warna Profil ICC, Training Operator Sampai Mahir' },
      { label: 'Dukungan Sparepart', value: 'Pasokan Tinta Original & Sparepart Resmi Dijamin Berkesinambungan' }
    ];

    const activeGroups: SpecGroup[] = Object.entries(groupsDict)
      .filter(([_, items]) => items.length > 0)
      .map(([title, items]) => ({ title, items }));

    const left: SpecGroup[] = [];
    const right: SpecGroup[] = [];
    let leftWeight = 0;
    let rightWeight = 0;

    for (const g of activeGroups) {
      const weight = g.items.length + 2;
      if (leftWeight <= rightWeight) {
        left.push(g);
        leftWeight += weight;
      } else {
        right.push(g);
        rightWeight += weight;
      }
    }

    return { left, right };
  }

  let cleanModelName = $derived(getCleanModelTitle(product.name));
  let specs = $derived(getProductSpecs(product));
  let detailedSpecs = $derived(getDetailedSpecColumns(product));
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
<!-- HERO SECTION: FULL WIDTH, 100VH, GRADIENT HITAM DARI KIRI KE KANAN, TEKS PUTIH -->
<!-- ========================================================================= -->
<section id="overview" class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none">
  <!-- GAMBAR MESIN: Full width & 100vh (Desktop / Mobile dari Strapi) -->
  <div class="absolute inset-0 w-full h-full pointer-events-none">
    <picture class="w-full h-full">
      {#if !activeImage || activeImage === product.mainImageDesktopUrl}
        <source media="(max-width: 640px)" srcset={product.mainImageMobileUrl} />
      {/if}
      <img
        src={activeImage || product.mainImageDesktopUrl || product.imageUrl}
        alt={product.name}
        class="w-full h-full object-cover object-center lg:object-[center_right] select-none"
        loading="eager"
      />
    </picture>
    <!-- Layer gradient hitam dari kiri ke kanan transparan -->
    <div class="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-transparent"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/60"></div>
  </div>

  <!-- KONTEN TEKS KIRI: Breadcrumbs & Judul (Agak Diturunkan), dan 4 Spesifikasi (Mepet ke Bawah) -->
  <div class="relative z-20 w-full h-full px-6 sm:px-10 lg:px-16 xl:px-20 pt-28 sm:pt-32 lg:pt-36 pb-12 sm:pb-14 lg:pb-16 flex flex-col justify-between pointer-events-none">
    <!-- ATAS: Breadcrumbs & Model Title (Agak Diturunkan) -->
    <div class="max-w-xl lg:max-w-2xl xl:max-w-3xl pointer-events-auto">
      <!-- Breadcrumbs & Category Bar (Menggunakan Chevron, Bukan '/') -->
      <nav class="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-neutral-300" aria-label="Breadcrumb">
        <a href="/produk" class="hover:text-[#FFE500] transition-colors">KATALOG</a>
        <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-white font-semibold">{product.categoryName}</span>
        <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
          <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
        </svg>
        <span class="text-neutral-300 font-sans">{product.sku}</span>
      </nav>

      <!-- Model Title (Diperbesar di Mobile, ORIA Putih, Nama Tipe Kuning Lotus) -->
      <div class="mt-3 sm:mt-4 space-y-1 sm:space-y-1.5">
        <div class="font-heading font-extrabold text-lg sm:text-2xl lg:text-3xl uppercase tracking-[0.24em] text-white leading-none drop-shadow-md">
          ORIA
        </div>
        <h1 class="font-heading font-black text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase tracking-[0.08em] sm:tracking-[0.1em] text-[#FFE500] leading-[1.08] drop-shadow-lg">
          {cleanModelName}
        </h1>
      </div>
    </div>

    <!-- BAWAH: 4 SPESIFIKASI UTAMA (LEBIH MEPET KE BAWAH, 1 BARIS KE BAWAH DI MOBILE, 2 KOLOM DI DESKTOP) -->
    <div class="max-w-xl lg:max-w-2xl xl:max-w-3xl pointer-events-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-x-6 sm:gap-x-10 gap-y-3 sm:gap-y-4">
        {#each specs.slice(0, 4) as s}
          {@const parsed = parseSpecMetric(s.val)}
          {@const isSize = isSizeMetric(s)}
          <div class="flex items-baseline gap-2.5 sm:gap-3">
            <!-- Metric Value (Ukuran: Kuning #FFE500; Lainnya: Putih. Prefix & Unit/Suffix: Lebih Kecil) -->
            <div class="font-heading font-medium tracking-tight shrink-0 drop-shadow-md flex items-baseline gap-1 {isSize ? 'text-[#FFE500]' : 'text-white'}">
              {#if parsed.prefix}
                <span class="text-xs sm:text-sm font-normal {isSize ? 'text-[#FFE500]/80' : 'text-white/80'}">{parsed.prefix}</span>
              {/if}
              <span class="text-xl sm:text-2xl lg:text-3xl {isSize ? 'text-[#FFE500]' : 'text-white'}">{parsed.main}</span>
              {#if parsed.suffix}
                <span class="text-xs sm:text-sm font-normal {isSize ? 'text-[#FFE500]/80' : 'text-white/80'} ml-0.5">{parsed.suffix}</span>
              {/if}
            </div>
            <!-- Metric Unit & Subtitle -->
            <div class="space-y-0.5 min-w-0">
              <div class="font-sans font-bold text-[10px] sm:text-xs uppercase tracking-wider {isSize ? 'text-[#FFE500]' : 'text-white'} drop-shadow-sm truncate">
                {s.unit}
              </div>
              <div class="font-sans text-[10px] sm:text-[11px] text-neutral-300 leading-tight line-clamp-2 drop-shadow-sm">
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
<!-- SECTION 2: STORY (LOTUS "FREEDOM TO DRIVE" STYLE)                         -->
<!-- ========================================================================= -->
<section id="story" class="relative w-full bg-black text-white py-28 sm:py-36 lg:py-48 px-6 sm:px-10 lg:px-16 overflow-hidden select-none">
  <!-- Ambient radial backdrop glow -->
  <div class="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_rgba(255,229,0,0.06)_0%,_transparent_70%)] pointer-events-none"></div>

  <div class="relative z-10 max-w-4xl mx-auto text-center space-y-10 sm:space-y-14">
    <!-- Header: Wide letter spacing (Lotus Freedom style) -->
    <div class="space-y-3 sm:space-y-4">
      <div class="font-mono text-[10px] sm:text-xs uppercase tracking-[0.35em] text-[#FFE500]">
        THE ENGINEERING PHILOSOPHY
      </div>
      <h2 class="font-heading font-light tracking-[0.22em] sm:tracking-[0.32em] text-2xl sm:text-4xl lg:text-5xl uppercase text-white leading-tight">
        FREEDOM TO CREATE
      </h2>
    </div>

    <!-- Main Narrative Paragraphs (Direct from Database with Lotus Aesthetic) -->
    <div class="story-narrative font-sans text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide max-w-3xl mx-auto">
      {#if product.descriptionHtml && product.descriptionHtml.trim() !== ''}
        {@html product.descriptionHtml}
      {:else}
        <p class="story-lead">
          Sebagian mesin menuntut Anda berkompromi dengan batas kemampuan mereka.<br class="hidden sm:inline" />
          <strong>ORIA {cleanModelName}</strong> direkayasa agar Anda dapat sepenuhnya terlarut dalam proses produksi tanpa batasan.
        </p>

        <p>
          Tanpa interupsi. Tanpa keraguan stabilitas warna dan akurasi mekanik. Tanpa rasa cemas akan waktu henti produksi.
          Hanya performa industri presisi tinggi yang konsisten, selalu siap menghasilkan dalam kecepatan penuh—karena keunggulan rekayasa sejati baru bermakna ketika Anda dapat mengandalkannya setiap detik.
        </p>

        {#if product.shortDescription}
          <p class="story-highlight">
            {product.shortDescription}
          </p>
        {/if}
      {/if}
    </div>

    <!-- 3 Pillars of Precision (Minimalist Grid) -->
    <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 border-t border-white/10 max-w-3xl mx-auto">
      <div class="space-y-1 text-center">
        <div class="font-heading font-bold text-xl sm:text-2xl text-[#FFE500] tracking-tight">24/7 HEAVY DUTY</div>
        <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">STABILITAS INDUSTRI</div>
        <p class="font-sans text-xs text-neutral-500">Rigid chasis untuk produksi maraton stabil.</p>
      </div>
      <div class="space-y-1 text-center">
        <div class="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">MICRON PRECISION</div>
        <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">AKURASI MOTOR & GANTRY</div>
        <p class="font-sans text-xs text-neutral-500">Sistem linier pemandu tanpa vibrasi.</p>
      </div>
      <div class="space-y-1 text-center">
        <div class="font-heading font-bold text-xl sm:text-2xl text-[#FFE500] tracking-tight">ZERO COMPROMISE</div>
        <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">GARANSI & DUKUNGAN RESMI</div>
        <p class="font-sans text-xs text-neutral-500">Teknisi standby & ketersediaan sparepart.</p>
      </div>
    </div>
  </div>
</section>

<!-- ========================================================================= -->
<!-- SECTION 3: SPEC (MESINPRINTINGJERSEY STYLE IN LOTUS/ORIA COLOR PALETTE)   -->
<!-- ========================================================================= -->
<section id="spec" class="w-full bg-black text-white py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 select-none">
  <div class="max-w-7xl mx-auto space-y-16 sm:space-y-20">
    <!-- Header -->
    <div class="text-center space-y-3 sm:space-y-4">
      <div class="font-mono text-xs uppercase tracking-[0.3em] text-[#FFE500]">
        TECHNICAL SPECIFICATIONS
      </div>
      <h2 class="font-heading font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[0.16em] text-white">
        SPESIFIKASI LENGKAP UNIT
      </h2>
      <p class="font-sans text-xs sm:text-sm text-neutral-400 max-w-xl mx-auto leading-relaxed">
        Parameter teknis resmi dan spesifikasi operasional untuk unit <span class="text-white font-medium">{product.name}</span>.
      </p>
    </div>

    <!-- Gallery Thumbnails (Jika ada lebih dari 1 gambar) -->
    {#if allImages.length > 1}
      <div class="space-y-3 p-6 bg-neutral-950 border border-white/10">
        <div class="font-mono text-[11px] uppercase tracking-widest text-neutral-400">
          SUDUT PANDANG MESIN & DETAIL FISIK
        </div>
        <div class="flex items-center gap-4 overflow-x-auto pb-2">
          {#each allImages as img, idx}
            <button
              type="button"
              onclick={() => (activeImage = img)}
              class="relative w-24 h-24 sm:w-28 sm:h-28 shrink-0 bg-black border-2 transition-all p-2 flex items-center justify-center cursor-pointer {activeImage === img ? 'border-[#FFE500] ring-1 ring-[#FFE500]' : 'border-white/20 opacity-60 hover:opacity-100'}"
              aria-label="Tampilkan gambar ke-{idx + 1}"
            >
              <img src={img} alt="{product.name} view {idx + 1}" class="w-full h-full object-contain" />
            </button>
          {/each}
        </div>
      </div>
    {/if}

    <!-- 2-Column Grid of Categorized Groups (mesinprintingjersey.id Style) -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-x-12 lg:gap-x-16 gap-y-12 lg:gap-y-16">
      <!-- Left Column -->
      <div class="space-y-12 sm:space-y-14">
        {#each detailedSpecs.left as group}
          <div>
            <h3 class="text-xs sm:text-sm font-bold font-heading tracking-widest text-[#FFE500] uppercase mb-4 pb-2.5 border-b border-[#FFE500]/30 flex items-center justify-between">
              <span>{group.title}</span>
              <span class="w-1.5 h-1.5 rounded-full bg-[#FFE500]/70"></span>
            </h3>
            <div>
              {#each group.items as item}
                <div class="grid grid-cols-12 py-3.5 border-b border-white/10 text-xs sm:text-sm items-baseline gap-2 sm:gap-4 transition-colors hover:bg-white/[0.03]">
                  <span class="col-span-5 text-neutral-400 font-medium leading-relaxed">
                    {item.label}
                  </span>
                  <span class="col-span-7 text-white font-semibold leading-relaxed">
                    {item.value}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>

      <!-- Right Column -->
      <div class="space-y-12 sm:space-y-14">
        {#each detailedSpecs.right as group}
          <div>
            <h3 class="text-xs sm:text-sm font-bold font-heading tracking-widest text-[#FFE500] uppercase mb-4 pb-2.5 border-b border-[#FFE500]/30 flex items-center justify-between">
              <span>{group.title}</span>
              <span class="w-1.5 h-1.5 rounded-full bg-[#FFE500]/70"></span>
            </h3>
            <div>
              {#each group.items as item}
                <div class="grid grid-cols-12 py-3.5 border-b border-white/10 text-xs sm:text-sm items-baseline gap-2 sm:gap-4 transition-colors hover:bg-white/[0.03]">
                  <span class="col-span-5 text-neutral-400 font-medium leading-relaxed">
                    {item.label}
                  </span>
                  <span class="col-span-7 text-white font-semibold leading-relaxed">
                    {item.value}
                  </span>
                </div>
              {/each}
            </div>
          </div>
        {/each}
      </div>
    </div>

    <!-- Official Warranty & Service Cards (Dark Luxury Style) -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
      <div class="border border-white/10 p-6 space-y-2 bg-neutral-950">
        <div class="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
          <svg class="w-5 h-5 text-[#FFE500] stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Garansi Resmi 1 Tahun
        </div>
        <p class="font-sans text-xs text-neutral-400 leading-relaxed">
          Jaminan perlindungan penuh untuk sparepart non-consumable dan servis berkala oleh teknisi resmi pabrikan ORIA.
        </p>
      </div>

      <div class="border border-white/10 p-6 space-y-2 bg-neutral-950">
        <div class="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
          <svg class="w-5 h-5 text-[#FFE500] stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Instalasi & Training On-Site
        </div>
        <p class="font-sans text-xs text-neutral-400 leading-relaxed">
          Tim teknisi kami hadir langsung di workshop Anda untuk setting mesin, kalibrasi warna, dan pelatihan operator hingga mahir.
        </p>
      </div>

      <div class="border border-white/10 p-6 space-y-2 bg-neutral-950">
        <div class="font-heading font-bold text-sm sm:text-base text-white flex items-center gap-2">
          <svg class="w-5 h-5 text-[#FFE500] stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
            <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
          Pasokan Tinta & Sparepart Siap
        </div>
        <p class="font-sans text-xs text-neutral-400 leading-relaxed">
          Ketersediaan consumable original terjamin berkesinambungan agar jadwal produksi bisnis Anda tidak pernah terhenti.
        </p>
      </div>
    </div>

    <!-- CTA Box at the bottom with Chevron (Strict: Chevron only) -->
    <div class="p-8 sm:p-12 lg:p-14 bg-neutral-950 border border-white/10 relative overflow-hidden">
      <div class="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,229,0,0.08)_0%,_transparent_60%)] pointer-events-none"></div>

      <div class="relative z-10 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 sm:gap-8">
        <div class="space-y-2 max-w-2xl">
          <div class="font-mono text-xs uppercase tracking-[0.25em] text-[#FFE500] font-bold">
            LAYANAN SPESIALIS ORIA
          </div>
          <h3 class="font-heading font-black text-xl sm:text-3xl text-white">
            Ingin Uji Coba Sample Cetak atau Demo Unit Ini?
          </h3>
          <p class="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed">
            Konsultasikan kebutuhan produksi Anda dengan spesialis teknis kami. Kami menyediakan layanan demo mesin dan pengujian sampel cetak langsung di showroom ORIA.
          </p>
        </div>

        <div class="flex flex-col sm:flex-row gap-3 w-full md:w-auto shrink-0">
          <a
            href="https://wa.me/6281807090888?text={encodeURIComponent(`Halo ORIA, saya ingin konsultasi teknis dan demo mesin ${product.name}`)}"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#FFE500] hover:bg-[#fff04d] text-black font-heading font-bold text-xs uppercase tracking-[0.22em] transition-all duration-300 group shadow-lg"
          >
            <span>KONSULTASI TEKNIS</span>
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

          <a
            href="/kontak?unit={encodeURIComponent(product.name)}"
            class="inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-white/5 hover:bg-white/10 text-white border border-white/20 hover:border-white/40 font-heading font-medium text-xs uppercase tracking-[0.22em] transition-all duration-300 group"
          >
            <span>SHOWROOM & DEMO</span>
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

    <!-- Rekomendasi Mesin Terkait (Dark Luxury Grid) -->
    {#if relatedProducts.length > 0}
      <div class="pt-8 space-y-8">
        <div class="flex items-center justify-between">
          <div class="space-y-1">
            <div class="font-mono text-xs uppercase tracking-widest text-[#FFE500]">
              REKOMENDASI TERKAIT
            </div>
            <h3 class="font-heading font-bold text-xl sm:text-2xl text-white">
              PILIHAN MESIN INDUSTRI LAINNYA
            </h3>
          </div>
          <a href="/produk" class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest hover:text-[#FFE500] text-neutral-300 transition-colors group">
            <span>SEMUA MESIN</span>
            <svg class="w-3.5 h-3.5 stroke-current transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5">
              <path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 sm:gap-8">
          {#each relatedProducts as rel}
            <a
              href="/produk/{rel.slug}"
              class="group block bg-neutral-950 border border-white/10 hover:border-[#FFE500]/60 transition-colors p-5 space-y-4"
            >
              <div class="aspect-[4/3] bg-black flex items-center justify-center p-3 overflow-hidden">
                <img
                  src={rel.imageUrl}
                  alt={rel.name}
                  class="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                  loading="lazy"
                />
              </div>
              <div class="space-y-1.5">
                <div class="text-[10px] font-mono uppercase text-neutral-400">{rel.sku}</div>
                <div class="font-heading font-bold text-sm sm:text-base text-white group-hover:text-[#FFE500] transition-colors line-clamp-2">
                  {rel.name}
                </div>
                <div class="text-xs font-semibold text-[#FFE500] pt-1">{rel.priceText}</div>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}
  </div>
</section>

<style>
  :global(.story-narrative) {
    display: flex;
    flex-direction: column;
    gap: 1.75rem;
  }

  :global(.story-narrative p) {
    margin: 0;
    line-height: 1.85;
    color: #a3a3a3; /* neutral-400 */
    max-width: 44rem;
    margin-left: auto;
    margin-right: auto;
  }

  :global(.story-narrative .story-lead) {
    font-size: 1.15rem;
    line-height: 1.65;
    color: #ffffff;
    font-weight: 300;
    max-width: 48rem;
  }

  @media (min-width: 640px) {
    :global(.story-narrative .story-lead) {
      font-size: 1.35rem;
    }
  }

  @media (min-width: 1024px) {
    :global(.story-narrative .story-lead) {
      font-size: 1.5rem;
    }
  }

  :global(.story-narrative .story-lead strong) {
    color: #FFE500;
    font-weight: 600;
    font-family: var(--font-heading);
    letter-spacing: 0.02em;
  }

  :global(.story-narrative .story-highlight) {
    color: #e5e5e5;
    font-size: 0.925rem;
    padding-top: 1.25rem;
    border-top: 1px solid rgba(255, 255, 255, 0.12);
    font-style: italic;
    max-width: 42rem;
    margin-left: auto;
    margin-right: auto;
    line-height: 1.75;
  }

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
