import type { FormattedProduct } from '$lib/types/product';

export interface SpecRow {
  label: string;
  value: string;
}

export interface SpecGroup {
  title: string;
  items: SpecRow[];
}

export interface ProductKeySpec {
  val: string;
  unit: string;
  desc: string;
}

// Extract concise model title for Lotus-style wide-tracked headings
export function getCleanModelTitle(fullName: string): string {
  let name = (fullName || '').replace(/^mesin\s+/i, '').replace(/\boria\b/gi, '').trim();
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

// 4 Primary Specs per product & category (Lotus Eletre X Style)
export function getProductSpecs(p: FormattedProduct): ProductKeySpec[] {
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
      { val: power, unit: 'Laser Power', desc: name.includes('fiber') ? 'Raycus Fiber' : 'CO2 Glass Tube' },
      { val: area, unit: 'Working Bed', desc: 'Area Efektif' },
      { val: speed, unit: 'Max Speed', desc: 'Kecepatan Proses' },
      { val: precision, unit: 'Akurasi', desc: 'Presisi Optik' }
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
      { val: width, unit: 'Lebar Cetak', desc: 'Roll Fleksibel' },
      { val: head, unit: 'Printhead', desc: 'Presisi Nozzle' },
      { val: speed, unit: 'Kecepatan', desc: 'Output Produksi' },
      { val: '2,400 DPI', unit: 'Resolusi', desc: 'Gradasi Lembut' }
    ];
  }

  // 3. OUTDOOR SOLVENT
  if (name.includes('outdoor') || cat.includes('outdoor')) {
    return [
      { val: '3.2 m', unit: 'Lebar Cetak', desc: 'Super Wide Roll' },
      { val: '4x KM512i', unit: 'Printhead', desc: 'Konica Minolta' },
      { val: '125 m²/h', unit: 'Kecepatan', desc: 'Produksi Billboard' },
      { val: '2+ Tahun', unit: 'Daya Tahan', desc: 'Solvent Tahan Cuaca' }
    ];
  }

  // 4. SUBLIMASI TEXTILE
  if (name.includes('sublim') || cat.includes('sublim')) {
    let head = '2x i3200';
    if (name.includes('1804') || desc.includes('4 head')) head = '4x i3200-A1';
    return [
      { val: '1.9 m', unit: 'Lebar Kain', desc: 'Roll Tekstil' },
      { val: head, unit: 'Printhead', desc: 'Micro-Piezo Precision' },
      { val: name.includes('1804') ? '140 m²/h' : '80 m²/h', unit: 'Kecepatan', desc: 'Output Maraton' },
      { val: '3,200 DPI', unit: 'Resolusi', desc: 'Saturasi Solid' }
    ];
  }

  // 5. DTF / DTG GARMENT
  if (name.includes('dtf') || name.includes('dtg') || cat.includes('dtf') || cat.includes('dtg')) {
    let head = '3x XP600';
    if (name.includes('6004')) head = '4x i3200';
    else if (name.includes('dtg02')) head = 'Dual i3200';
    else if (name.includes('dtg a3')) head = 'Industrial Head';

    return [
      { val: name.includes('6004') ? '60 cm' : (name.includes('a3') ? 'Format A3' : 'Format Roll'), unit: 'Format Bidang', desc: 'Film / Garmen' },
      { val: head, unit: 'Printhead', desc: 'CMYK + White + Glue' },
      { val: name.includes('6004') ? '22 m²/h' : 'Presisi Tinggi', unit: 'Kecepatan', desc: 'Shaker & Dryer' },
      { val: 'Anti-Crack', unit: 'Daya Rekat', desc: 'Lentur Tahan Cuci' }
    ];
  }

  // 6. CNC ROUTER & METAL MILLING
  if (name.includes('cnc') || cat.includes('cnc') || name.includes('plasma')) {
    let spindle = '5.5 kW';
    if (name.includes('6090')) spindle = '2.2 kW';
    else if (name.includes('plasma')) spindle = 'Plasma Arc 63A';

    let speed = '24,000 RPM';
    if (name.includes('plasma')) speed = 'Auto THC Control';

    return [
      { val: spindle, unit: 'Spindle Power', desc: name.includes('plasma') ? 'Torch Plasma' : 'HF Spindle' },
      { val: name.includes('6090') ? '60 x 90 cm' : '130 x 250 cm', unit: 'Working Bed', desc: 'Vakum T-Slot' },
      { val: speed, unit: 'Max RPM', desc: 'Ukir & Milling' },
      { val: '±0.02 mm', unit: 'Akurasi', desc: 'Helical Rack Pinion' }
    ];
  }

  // 7. UV FLATBED / CYLINDER
  if (name.includes('uv') || cat.includes('uv') || name.includes('cylinder')) {
    let bed = 'A3+ Format';
    if (name.includes('cylinder') || name.includes('tumbler')) bed = 'Silinder 360°';

    return [
      { val: bed, unit: 'Format Meja', desc: name.includes('cylinder') ? 'Silinder 360°' : 'Flat & Sheet' },
      { val: 'LED UV', unit: 'Sistem Kering', desc: 'Water-Cooled' },
      { val: 'CMYK+W+V', unit: 'Tinta UV', desc: 'Tekstur Emboss 3D' },
      { val: '15 cm', unit: 'Tebal Media', desc: 'Auto Height' }
    ];
  }

  // DEFAULT INDUSTRIAL SPECS
  return [
    { val: 'Industrial', unit: 'Grade Rangka', desc: 'Heavy-Duty Chassis' },
    { val: 'Presisi Tinggi', unit: 'Sistem Motor', desc: 'Hybrid Servo' },
    { val: '24/7', unit: 'Siklus Kerja', desc: 'Produksi Non-Stop' },
    { val: 'Garansi Resmi', unit: 'Proteksi ORIA', desc: 'Sparepart & Servis' }
  ];
}

// Grouped detailed technical specifications (mesinprintingjersey.id 2-column style)
export function getDetailedSpecColumns(prod: FormattedProduct): { left: SpecGroup[]; right: SpecGroup[] } {
  const name = (prod.name || '').toLowerCase();
  const cat = (prod.categoryName || '').toLowerCase();

  const groupsDict: Record<string, SpecRow[]> = {
    'PRINT SYSTEM & PERFORMANCE': [],
    'WORKING AREA & MEDIA': [],
    'INK SYSTEM & COLOR': [],
    'ELECTRICAL & OPERATIONAL': [],
    'DIMENSIONS & CONSTRUCTION': [],
    'CONNECTIVITY & CONTROL SYSTEM': [],
    'UNIT INFORMATION & WARRANTY': []
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
          groupsDict['PRINT SYSTEM & PERFORMANCE'].push({ label: rawK, value: rawV });
        } else if (
          k.includes('lebar') ||
          k.includes('area') ||
          k.includes('media') ||
          k.includes('meja') ||
          k.includes('bed') ||
          k.includes('tebal')
        ) {
          groupsDict['WORKING AREA & MEDIA'].push({ label: rawK, value: rawV });
        } else if (
          k.includes('tinta') ||
          k.includes('ink') ||
          k.includes('warna') ||
          k.includes('color')
        ) {
          groupsDict['INK SYSTEM & COLOR'].push({ label: rawK, value: rawV });
        } else if (
          k.includes('listrik') ||
          k.includes('power') ||
          k.includes('daya') ||
          k.includes('suhu') ||
          k.includes('pemanas') ||
          k.includes('voltage') ||
          k.includes('tegangan')
        ) {
          groupsDict['ELECTRICAL & OPERATIONAL'].push({ label: rawK, value: rawV });
        } else if (
          k.includes('dimensi') ||
          k.includes('berat') ||
          k.includes('weight') ||
          k.includes('ukuran') ||
          k.includes('gantry') ||
          k.includes('rail')
        ) {
          groupsDict['DIMENSIONS & CONSTRUCTION'].push({ label: rawK, value: rawV });
        } else if (
          k.includes('rip') ||
          k.includes('software') ||
          k.includes('interface') ||
          k.includes('koneksi') ||
          k.includes('port') ||
          k.includes('dsp') ||
          k.includes('kontrol')
        ) {
          groupsDict['CONNECTIVITY & CONTROL SYSTEM'].push({ label: rawK, value: rawV });
        } else {
          groupsDict['UNIT INFORMATION & WARRANTY'].push({ label: rawK, value: rawV });
        }
      }
    }
  }

  // 2. Fallback comprehensive data per machine category if empty
  if (groupsDict['PRINT SYSTEM & PERFORMANCE'].length === 0) {
    if (name.includes('outdoor') || cat.includes('outdoor')) {
      groupsDict['PRINT SYSTEM & PERFORMANCE'] = [
        { label: 'Tipe Printhead', value: 'Konica Minolta KM512i (30 PL Heavy-Duty Industrial)' },
        { label: 'Konfigurasi Head', value: '4 Printheads (Staggered Arrangement)' },
        { label: 'Kecepatan Cetak', value: '125 m²/h (Billboard 2-Pass) | 80 m²/h (Produksi 3-Pass)' },
        { label: 'Resolusi Maksimal', value: '1,440 DPI High Color Density' },
        { label: 'Teknologi Semprot', value: 'Drop-on-Demand Piezoelectric Micro-Nozzle' }
      ];
      groupsDict['WORKING AREA & MEDIA'] = [
        { label: 'Lebar Area Cetak', value: '3,200 mm (3.2 Meter Super Wide Format)' },
        { label: 'Tipe Media Roll', value: 'Frontlit, Backlit Banner, Flex, Vinyl Sticker, Mesh, One Way' },
        { label: 'Sistem Feeding', value: 'Industrial Heavy Duty Dual Motor Roll-to-Roll Feed & Take-Up' },
        { label: 'Ketebalan Media', value: 'Maksimal 2.5 mm Media Roll Industri' }
      ];
      groupsDict['INK SYSTEM & COLOR'] = [
        { label: 'Tipe Tinta', value: 'Solvent Industrial Ink High Pigment' },
        { label: 'Konfigurasi Warna', value: 'CMYK (4 Warna Tinta Solvent)' },
        { label: 'Sistem Pasokan', value: 'Continuous Ink Supply System (CISS) dengan Sub-tank Filter' },
        { label: 'Ketahanan Cuaca', value: '2+ Tahun Tahan Paparan Sinar UV & Cuaca Luar Ruangan' }
      ];
      groupsDict['ELECTRICAL & OPERATIONAL'] = [
        { label: 'Kebutuhan Daya', value: 'Operasional 1,200 Watt, Pemanas Maksimal 3,500 Watt' },
        { label: 'Tegangan Listrik', value: 'AC 220V ± 10%, 50/60 Hz, Single Phase' },
        { label: 'Sistem Pemanas', value: '3-Way Intelligent Heater (Pre, Mid, & Post Heater)' },
        { label: 'Sistem Pengering', value: 'Infrared Heating Bar + Multi-Blower Fan System' }
      ];
      groupsDict['DIMENSIONS & CONSTRUCTION'] = [
        { label: 'Dimensi Unit Mesin', value: '4,800 mm x 1,050 mm x 1,450 mm' },
        { label: 'Berat Bersih Mesin', value: 'Sekitar 850 kg (Rigid High-Tensile Steel Body)' },
        { label: 'Rel Pemandu Gantry', value: 'THK Dual Linear Mute Guide Rail Made in Japan' }
      ];
      groupsDict['CONNECTIVITY & CONTROL SYSTEM'] = [
        { label: 'Antarmuka Komunikasi', value: 'High-Speed USB 3.0 / Gigabit LAN Port' },
        { label: 'Kompatibilitas RIP', value: 'Photoprint, Maintop, Onyx RIP Software' },
        { label: 'Sistem Operasi', value: 'Windows 10 / Windows 11 (64-bit)' }
      ];
    } else if (name.includes('sublim') || cat.includes('sublim')) {
      groupsDict['PRINT SYSTEM & PERFORMANCE'] = [
        { label: 'Tipe Printhead', value: name.includes('1804') ? '4x Epson i3200-A1 PrecisionCore' : '2x Epson i3200-A1 PrecisionCore' },
        { label: 'Kecepatan Cetak', value: name.includes('1804') ? 'Hingga 140 m²/h (2-Pass Mode)' : 'Hingga 80 m²/h (2-Pass Mode)' },
        { label: 'Resolusi Maksimal', value: '3,200 DPI Micro-Piezo Droplet 3.8 pl' },
        { label: 'Sistem Anti-Blinking', value: 'Auto Capping, Wiping, and Anti-Clogging Nozzle Flush' }
      ];
      groupsDict['WORKING AREA & MEDIA'] = [
        { label: 'Lebar Area Cetak', value: '1,900 mm (1.9 Meter Roll-to-Roll Textile)' },
        { label: 'Kompatibilitas Kertas', value: 'Sublimation Transfer Paper 35 Gsm - 100 Gsm' },
        { label: 'Sistem Penegang Kertas', value: 'Tension-Balanced Multi-Roller Feeding System' }
      ];
      groupsDict['INK SYSTEM & COLOR'] = [
        { label: 'Jenis Tinta', value: 'Water-Based Dye Sublimation Disperse Ink' },
        { label: 'Konfigurasi Warna', value: 'CMYK (4 Warna Hi-Fi Color Gamut)' },
        { label: 'Kapasitas Pasokan', value: 'Bulk Ink Tank 1.5 Liter per Warna dengan Level Sensor' }
      ];
      groupsDict['ELECTRICAL & OPERATIONAL'] = [
        { label: 'Daya Operasional', value: 'Mesin 800 Watt, Pemanas Kering 2,200 Watt' },
        { label: 'Kebutuhan Listrik', value: 'AC 220V, 50 Hz Single Phase' },
        { label: 'Sistem Pengeringan', value: 'Smart Front Dryer Infrared + Turbofan System' }
      ];
      groupsDict['DIMENSIONS & CONSTRUCTION'] = [
        { label: 'Dimensi Unit Mesin', value: '3,100 mm x 950 mm x 1,450 mm' },
        { label: 'Berat Bersih Mesin', value: 'Sekitar 320 kg' },
        { label: 'Sistem Motor Penggerak', value: 'Integrated High Torque Brushless Leadshine Servo' }
      ];
      groupsDict['CONNECTIVITY & CONTROL SYSTEM'] = [
        { label: 'Port Antarmuka', value: 'Gigabit Ethernet Optical Interface / USB 3.0' },
        { label: 'Software RIP', value: 'Maintop / Photoprint / Neostampa' }
      ];
    } else if (name.includes('uv') || cat.includes('uv')) {
      groupsDict['PRINT SYSTEM & PERFORMANCE'] = [
        { label: 'Tipe Printhead', value: 'Epson i3200-U1 / Epson XP600 Industrial UV' },
        { label: 'Konfigurasi Nozzle', value: 'CMYK + White + Gloss Varnish Layering' },
        { label: 'Resolusi Cetak', value: '2,400 x 1,200 DPI Micro Varnish Precision' },
        { label: 'Sistem Pengeringan', value: 'Dual Water-Cooled LED UV Curing System Instant Dry' }
      ];
      groupsDict['WORKING AREA & MEDIA'] = [
        { label: 'Area Meja Kerja', value: name.includes('a3') ? '300 mm x 420 mm (A3 Format)' : (name.includes('6090') ? '600 mm x 900 mm' : '1,300 mm x 2,500 mm Industrial Bed') },
        { label: 'Ketebalan Media', value: 'Hingga 150 mm (Auto Height Measurement Sensor)' },
        { label: 'Aplikasi Material', value: 'Akrilik, Kaca, Kayu, Keramik, Logam, Tumbler 360°, Case HP' }
      ];
      groupsDict['INK SYSTEM & COLOR'] = [
        { label: 'Jenis Tinta', value: 'UV LED Curable Ink (Hard / Flexible Formula)' },
        { label: 'Sirkulasi Tinta Putih', value: 'Automatic White Ink Agitation & Circulation System' },
        { label: 'Efek Khusus', value: 'Emboss 3D Texture, Braille Print, Glossy Clear Coat' }
      ];
      groupsDict['ELECTRICAL & OPERATIONAL'] = [
        { label: 'Konsumsi Listrik', value: '800 Watt - 1,500 Watt Operasional' },
        { label: 'Tegangan Kerja', value: 'AC 220V, 50/60 Hz' },
        { label: 'Suhu Operasional', value: '20°C - 30°C, Kelembaban 40% - 60%' }
      ];
      groupsDict['DIMENSIONS & CONSTRUCTION'] = [
        { label: 'Struktur Meja', value: 'Aviation Aluminum Vacuum Bed dengan Mute Guide Rail' },
        { label: 'Sistem Penggerak', value: 'Leadshine High Precision Servo Motor' }
      ];
      groupsDict['CONNECTIVITY & CONTROL SYSTEM'] = [
        { label: 'Antarmuka Mesin', value: 'High Speed USB 3.0 / RIP Host Link' },
        { label: 'Dukungan File Format', value: 'TIFF, EPS, PDF, JPEG, AI, PSD' }
      ];
    } else if (name.includes('laser') || cat.includes('laser') || name.includes('marking')) {
      const isFiber = name.includes('fiber') || name.includes('3015') || name.includes('6015');
      groupsDict['PRINT SYSTEM & PERFORMANCE'] = [
        { label: 'Tipe Sumber Laser', value: isFiber ? 'Raycus / Maxphotonics Continuous Fiber Laser' : 'Sealed CO2 Glass Laser Tube Reci / Yongli' },
        { label: 'Daya Output Laser', value: isFiber ? (name.includes('6015') ? '6,000 Watt' : '1,500 - 3,000 Watt') : '80 Watt - 150 Watt High Peak' },
        { label: 'Kecepatan Grafir / Potong', value: name.includes('marking') ? 'Hingga 7,000 - 8,000 mm/s' : 'Hingga 600 - 1,000 mm/s' },
        { label: 'Akurasi Pengulangan', value: '±0.01 mm Presisi Mikron Optik' },
        { label: 'Ketebalan Potong Maksimal', value: isFiber ? 'Mild Steel s/d 20 mm, Stainless s/d 10 mm' : 'Akrilik s/d 20 mm, Kayu s/d 15 mm' }
      ];
      groupsDict['WORKING AREA & MEDIA'] = [
        { label: 'Area Efektif Meja', value: name.includes('6040') ? '600 mm x 400 mm' : (name.includes('6090') ? '600 mm x 900 mm' : (name.includes('1490') ? '1,400 mm x 900 mm' : (name.includes('1325') ? '1,300 mm x 2,500 mm' : (name.includes('3015') ? '3,000 mm x 1,500 mm' : '6,000 mm x 1,500 mm')))) },
        { label: 'Tipe Meja Kerja', value: isFiber ? 'Heavy Duty Sawtooth Strip Bed dengan Auto Chute' : 'Honeycomb Grid Bed & Aluminum Knife Blade Dual System' },
        { label: 'Kesesuaian Bahan', value: isFiber ? 'Plat Besi, Carbon Steel, Stainless, Aluminium, Tembaga' : 'Akrilik, Kayu, Karet Stempel, Kain, Kulit, MDF, Kertas' }
      ];
      groupsDict['INK SYSTEM & COLOR'] = [
        { label: 'Media Pendingin', value: 'Industrial Water Chiller CW-5200 / CW-6000 Dual Temp' },
        { label: 'Gas Pendukung Potong', value: isFiber ? 'Oksigen (O2), Nitrogen (N2), High Pressure Clean Air' : 'Air Assist Compressor Oil-Free' }
      ];
      groupsDict['ELECTRICAL & OPERATIONAL'] = [
        { label: 'Kebutuhan Listrik', value: isFiber ? '3-Phase AC 380V ± 5%, 50/60 Hz' : 'Single Phase AC 220V ± 10%, 50 Hz' },
        { label: 'Sistem Pembuangan Asap', value: 'Centrifugal High-Powered Exhaust Blower + Air Ducting' }
      ];
      groupsDict['DIMENSIONS & CONSTRUCTION'] = [
        { label: 'Rangka Mesin', value: isFiber ? 'Heavy Duty Gantry Aviasi Annealed Steel Chasis' : 'High Rigid Seamless Welded Steel Chasis' },
        { label: 'Sistem Transmisi', value: isFiber ? 'Taiwan YYC Dual Helical Rack & Pinion' : 'High Precision Timing Belt & Linear Guide' }
      ];
      groupsDict['CONNECTIVITY & CONTROL SYSTEM'] = [
        { label: 'Sistem Kontrol CNC', value: isFiber ? 'Cypcut Laser Control System FSCUT' : 'Ruida 6442G/6445G DSP Standalone Controller' },
        { label: 'Kompatibilitas Software', value: 'CorelDRAW, AutoCAD, Illustrator (DXF, AI, PLT, BMP)' }
      ];
    } else if (name.includes('cnc') || cat.includes('cnc') || name.includes('plasma')) {
      groupsDict['PRINT SYSTEM & PERFORMANCE'] = [
        { label: 'Daya Spindle Motor', value: name.includes('6090') ? '2.2 kW Water-Cooled Spindle' : '5.5 kW High-Torque Water/Air Spindle' },
        { label: 'Kecepatan Rotasi Spindle', value: '6,000 - 24,000 RPM Stepless Inverter' },
        { label: 'Akurasi Pemosisi', value: '±0.02 mm / 300 mm' },
        { label: 'Kecepatan Gerak Bebas', value: 'Hingga 32,000 mm/menit' }
      ];
      groupsDict['WORKING AREA & MEDIA'] = [
        { label: 'Area Kerja Efektif', value: name.includes('6090') ? '600 mm x 900 mm x 150 mm' : '1,300 mm x 2,500 mm x 200 mm' },
        { label: 'Tipe Meja Kerja', value: 'Dual Vacuum Clamping Zone + T-Slot Aluminum Extrusion' },
        { label: 'Material Kompatibel', value: 'Kayu Solid, MDF, ACP, PVC Board, Akrilik, Kuningan, Tembaga' }
      ];
      groupsDict['INK SYSTEM & COLOR'] = [
        { label: 'Sistem Pelumasan', value: 'Manual / Auto Centralized Oil Lubrication System' },
        { label: 'Sistem Dust Collector', value: 'Double Bag Industrial Dust Suction Vacuum 3 kW' }
      ];
      groupsDict['ELECTRICAL & OPERATIONAL'] = [
        { label: 'Kebutuhan Tegangan', value: '3-Phase AC 380V atau 1-Phase AC 220V 50 Hz' },
        { label: 'Sistem Penggerak', value: 'Leadshine Easy-Servo Closed-Loop Hybrid Driver' }
      ];
      groupsDict['DIMENSIONS & CONSTRUCTION'] = [
        { label: 'Konstruksi Meja', value: 'Thick Heavy Wall Square Steel Tubular Frame' },
        { label: 'Rel Pemandu Sumbu X/Y/Z', value: 'Taiwan Hiwin 20mm Linear Guide Rails' }
      ];
      groupsDict['CONNECTIVITY & CONTROL SYSTEM'] = [
        { label: 'Sistem Kontrol Handheld', value: 'DSP A11 Handheld Controller / NC Studio Link' },
        { label: 'Bahasa Perintah', value: 'Standard Industrial G-Code & HPGL Format' }
      ];
    } else {
      // General industrial default
      groupsDict['PRINT SYSTEM & PERFORMANCE'] = [
        { label: 'Tipe Sistem', value: 'Industrial Precision Heavy-Duty Machine' },
        { label: 'Akurasi Toleransi', value: 'Toleransi Presisi Standar Internasional' }
      ];
      groupsDict['WORKING AREA & MEDIA'] = [
        { label: 'Format Media', value: 'Industrial Roll-to-Roll / Flatbed Rigid Sheet' }
      ];
      groupsDict['ELECTRICAL & OPERATIONAL'] = [
        { label: 'Tegangan Operasional', value: 'AC 220V ± 10%, 50/60 Hz' }
      ];
      groupsDict['DIMENSIONS & CONSTRUCTION'] = [
        { label: 'Struktur Rangka', value: 'Solid Steel Reinforced Chasis Anti-Vibration' }
      ];
      groupsDict['CONNECTIVITY & CONTROL SYSTEM'] = [
        { label: 'Interface Data', value: 'High Speed Industrial USB / Gigabit Ethernet' }
      ];
    }
  }

  // Official Warranty Information
  groupsDict['UNIT INFORMATION & WARRANTY'] = [
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
