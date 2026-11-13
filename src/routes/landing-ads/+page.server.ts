import type { PageServerLoad } from './$types';
import { fetchOriaProducts } from '$lib/api/products';
import type { FormattedProduct } from '$lib/types/product';

export interface AdCategoryConfig {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  heroImage: string;
  slugs: string[];
}

export interface AdCategoryGroup {
  id: string;
  name: string;
  subtitle: string;
  description: string;
  heroImage: string;
  products: FormattedProduct[];
}

export interface AdIntentConfig {
  key: string;
  label: string;
  categoryIds: string[];
  heroBadge: string;
  heroTitleMain: string;
  heroTitleHighlight: string;
  heroDescription: string;
  waContextMessage: string;
}

// 6 Kategori Mesin Printing Industrial (Tanpa CNC dan Laser Cutting)
const AD_CATEGORIES: AdCategoryConfig[] = [
  {
    id: 'outdoor',
    name: 'Outdoor Solvent',
    subtitle: 'HIGH-SPEED INDUSTRIAL BILLBOARD PRINTING',
    description: 'Mesin digital printing outdoor format 3.2 meter dengan sasis baja monokok untuk produksi spanduk dan baliho tahan cuaca ekstrem.',
    heroImage: '/images/categories/outdoor.webp',
    slugs: ['oria-outdoor-3204-st']
  },
  {
    id: 'indoor',
    name: 'Indoor Eco-Solvent',
    subtitle: 'HIGH RESOLUTION FINE-ART & DECAL PRINTING',
    description: 'Mesin digital printing indoor beresolusi fotografi untuk stiker decal kendaraan, wallpaper interior, dan poster pameran.',
    heroImage: '/images/categories/indoor.webp',
    slugs: [
      'oria-indoor-3202',
      'oria-indoor-1802'
    ]
  },
  {
    id: 'sublimasi',
    name: 'Sublimasi & Heat Press',
    subtitle: 'TEXTILE & APPAREL CONTINUOUS TRANSFER',
    description: 'Lini mesin cetak tekstil roll-to-roll dan heat press rotary untuk jersey olahraga, hijab, dan fashion garmen.',
    heroImage: '/images/categories/sublimasi.webp',
    slugs: [
      'oria-sublim-1902',
      'oria-sublim-1804',
      'oria-heat-press-1720',
      'oria-heat-press-1942'
    ]
  },
  {
    id: 'dtf-dtg',
    name: 'DTF & DTG Apparel',
    subtitle: 'DIRECT TO FILM & DIRECT TO GARMENT',
    description: 'Solusi sablon kaos distro digital dengan shaker powder otomatis dan printer direct-to-garment tanpa transfer paper.',
    heroImage: '/images/categories/dtf.webp',
    slugs: [
      'oria-dtf-6004',
      'oria-dtg-or-dtg02'
    ]
  },
  {
    id: 'uv',
    name: 'UV Flatbed & Cylinder',
    subtitle: 'DIRECT PRINTING ON FLAT & ROTARY MEDIA',
    description: 'Mesin cetak UV LED presisi tinggi untuk media datar akrilik, kaca, kayu, casing HP, serta tumbler silinder.',
    heroImage: '/images/categories/uv.webp',
    slugs: [
      'oria-uv-flatbed-a3',
      'oria-uv-dtf-a3',
      'oria-uv-cylinder-e3',
      'oria-uv-laser-marking-5w'
    ]
  },
  {
    id: 'single-pass',
    name: 'Single Pass Packaging',
    subtitle: 'CORRUGATED BOX & PAPER BAG PRINTING',
    description: 'Mesin cetak digital kemasan karton box dan paper bag berkecepatan tinggi tanpa plat cetak.',
    heroImage: '/images/categories/single-pass.webp',
    slugs: [
      'oria-one-pass-dc800sp'
    ]
  }
];

const INTENT_CONFIGS: Record<string, AdIntentConfig> = {
  'digital-printing': {
    key: 'digital-printing',
    label: 'Digital Printing (Outdoor & Indoor)',
    categoryIds: ['outdoor', 'indoor'],
    heroBadge: 'INDUSTRIAL OUTDOOR & INDOOR PRINTING SYSTEMS',
    heroTitleMain: 'MESIN DIGITAL PRINTING',
    heroTitleHighlight: 'OUTDOOR & INDOOR',
    heroDescription: 'Solusi mesin cetak spanduk flexi & baliho raksasa hingga stiker decal dan wallpaper indoor resolusi fotografi dengan garansi resmi dan pendampingan teknisi langsung.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya mencari mesin Digital Printing (Outdoor/Indoor) dari iklan Google oria.co.id. Mohon info pricelist & promo unit. Terima kasih.'
  },
  'banner': {
    key: 'digital-printing',
    label: 'Mesin Cetak Banner & Spanduk',
    categoryIds: ['outdoor', 'indoor'],
    heroBadge: 'HIGH-SPEED INDUSTRIAL BANNER & SPANDUK PRINTING',
    heroTitleMain: 'MESIN CETAK BANNER',
    heroTitleHighlight: '& SPANDUK OUTDOOR',
    heroDescription: 'Investasi mesin cetak banner flexi, spanduk reklame, dan baliho tahan cuaca ekstrem format 3.2 meter dengan sasis kokoh monokok dan kecepatan produksi tinggi.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Cetak Banner & Spanduk dari iklan Google oria.co.id. Mohon info pricelist dan penawaran promo. Terima kasih.'
  },
  'tekstil': {
    key: 'sublim',
    label: 'Mesin Print Tekstil & Kain',
    categoryIds: ['sublimasi'],
    heroBadge: 'INDUSTRIAL TEXTILE & FABRIC PRINTING',
    heroTitleMain: 'MESIN PRINT TEKSTIL',
    heroTitleHighlight: '& SUBLIMASI KAIN',
    heroDescription: 'Solusi industri cetak tekstil roll-to-roll dan rotary heat press untuk konveksi jersey olahraga, hijab printing, kain motif, dan apparel fashion dengan warna tajam & tahan cuci.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Print Tekstil & Kain dari iklan Google oria.co.id. Mohon info paket usaha & penawaran promo. Terima kasih.'
  },
  'sublim': {
    key: 'sublim',
    label: 'Sublimasi & Heat Press',
    categoryIds: ['sublimasi'],
    heroBadge: 'TEXTILE & APPAREL CONTINUOUS TRANSFER',
    heroTitleMain: 'MESIN CETAK SUBLIMASI',
    heroTitleHighlight: '& HEAT PRESS ROTARY',
    heroDescription: 'Solusi industri jersey olahraga, hijab printing, apparel sportswear, dan fashion garmen dengan transfer warna tajam, stabil, dan tahan luntur cuci.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Sublimasi & Heat Press dari iklan Google oria.co.id. Mohon info paket usaha & penawaran promo. Terima kasih.'
  },
  'uv': {
    key: 'uv',
    label: 'Printer UV Flatbed & Cylinder',
    categoryIds: ['uv'],
    heroBadge: 'PRECISION UV LED FLATBED & CYLINDER',
    heroTitleMain: 'MESIN PRINTER UV',
    heroTitleHighlight: 'FLATBED & CYLINDER',
    heroDescription: 'Cetak langsung di segala media kaku & silinder: akrilik, kayu solid, kaca, plat metal, casing HP, tumbler, hingga merchandise souvenir presisi tinggi.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya mencari mesin Printer UV Flatbed / Cylinder dari iklan Google oria.co.id. Mohon info spesifikasi & promo harga. Terima kasih.'
  },
  'dtf': {
    key: 'dtf',
    label: 'DTF & DTG Apparel',
    categoryIds: ['dtf-dtg'],
    heroBadge: 'DIRECT TO FILM & DIRECT TO GARMENT',
    heroTitleMain: 'MESIN PRINTER DTF',
    heroTitleHighlight: '& SABLON KAOS DISTRO',
    heroDescription: 'Inovasi sablon digital kaos distro katun, jersey, canvas bag, dan topi. Dilengkapi shaker powder otomatis dengan efisiensi tinta maksimal.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin DTF / DTG Sablon Kaos dari iklan Google oria.co.id. Mohon info penawaran promo & paket usaha. Terima kasih.'
  },
  'single-pass': {
    key: 'single-pass',
    label: 'Single Pass Packaging',
    categoryIds: ['single-pass'],
    heroBadge: 'CORRUGATED BOX & PAPER BAG PRINTING',
    heroTitleMain: 'MESIN CETAK KARDUS',
    heroTitleHighlight: '& SINGLE PASS PACKAGING',
    heroDescription: 'Cetak langsung di atas kardus corrugated box, box pizza, dan paper bag berkecepatan tinggi tanpa minimum order dan tanpa biaya plat film.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya tertarik dengan Mesin Single Pass Packaging dari iklan Google oria.co.id. Mohon info harga & kapasitas produksi. Terima kasih.'
  },
  'outdoor': {
    key: 'outdoor',
    label: 'Outdoor Solvent',
    categoryIds: ['outdoor'],
    heroBadge: 'HIGH-SPEED INDUSTRIAL BILLBOARD PRINTING',
    heroTitleMain: 'MESIN CETAK OUTDOOR',
    heroTitleHighlight: 'SOLVENT 3.2 METER',
    heroDescription: 'Mesin cetak spanduk flexi dan baliho outdoor format 3.2 meter dengan sasis baja monokok untuk produksi tahan cuaca ekstrem.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Outdoor Solvent 3.2 Meter dari iklan Google oria.co.id. Mohon info promo & ketersediaan unit. Terima kasih.'
  },
  'indoor': {
    key: 'indoor',
    label: 'Indoor Eco-Solvent',
    categoryIds: ['indoor'],
    heroBadge: 'HIGH RESOLUTION FINE-ART & DECAL PRINTING',
    heroTitleMain: 'MESIN CETAK INDOOR',
    heroTitleHighlight: 'ECO-SOLVENT PRESISI',
    heroDescription: 'Mesin cetak indoor beresolusi fotografi untuk stiker decal kendaraan, wallpaper interior, dan poster pameran tanpa bau menyengat.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Indoor Eco-Solvent dari iklan Google oria.co.id. Mohon info promo harga & paket usaha. Terima kasih.'
  },
  'all': {
    key: 'all',
    label: 'Semua Mesin Printing',
    categoryIds: ['outdoor', 'indoor', 'sublimasi', 'dtf-dtg', 'uv', 'single-pass'],
    heroBadge: 'INDUSTRIAL DIGITAL PRINTING SYSTEMS',
    heroTitleMain: 'SOLUSI MESIN DIGITAL PRINTING',
    heroTitleHighlight: 'BERGARANSI RESMI',
    heroDescription: 'Investasi mesin digital printing industri presisi tinggi dengan durabilitas komponen kelas dunia, jaminan ketersediaan suku cadang original, dan pendampingan teknisi resmi ke seluruh kota di Indonesia.',
    waContextMessage: 'Halo Anugrah Supply Mandiri (ORIA)! Saya tertarik konsultasi penawaran promo mesin digital printing dari iklan Google oria.co.id. Mohon info lebih detail & brosur harga. Terima kasih.'
  }
};

/**
 * Deteksi intent kata kunci Google Ads dari berbagai variasi pencarian pengguna
 */
function detectIntent(rawQuery: string): AdIntentConfig {
  if (!rawQuery) return INTENT_CONFIGS['all'];

  const q = rawQuery.toLowerCase().replace(/[+_-]/g, ' ').trim();

  // 1. Variasi Banner, Spanduk, Baliho -> Digital Printing (Outdoor & Indoor)
  if (
    q.includes('banner') ||
    q.includes('spanduk') ||
    q.includes('baliho') ||
    q.includes('reklame') ||
    q.includes('flexi') ||
    q.includes('billboard')
  ) {
    return INTENT_CONFIGS['banner'];
  }

  // 2. Variasi Tekstil, Kain, Jersey, Hijab, Garmen -> Sublimasi & Heat Press
  if (
    q.includes('tekstil') ||
    q.includes('textile') ||
    q.includes('kain') ||
    q.includes('jersey') ||
    q.includes('hijab') ||
    q.includes('gamis') ||
    q.includes('garmen') ||
    q.includes('garment') ||
    q.includes('sublim') ||
    q.includes('sublimasi') ||
    q.includes('heatpress') ||
    q.includes('heat press') ||
    q.includes('rotary press')
  ) {
    return INTENT_CONFIGS['tekstil'];
  }

  // 3. Variasi Kaos, Sablon Baju, Distro -> DTF & DTG Apparel
  if (
    q.includes('dtf') ||
    q.includes('dtg') ||
    q.includes('kaos') ||
    q.includes('baju') ||
    q.includes('sablon') ||
    q.includes('tshirt') ||
    q.includes('distro') ||
    q.includes('direct to film') ||
    q.includes('direct to garment')
  ) {
    return INTENT_CONFIGS['dtf'];
  }

  // 4. Variasi Kardus, Box, Kemasan, Corrugated -> Single Pass Packaging
  if (
    q.includes('kardus') ||
    q.includes('kemasan') ||
    q.includes('corrugated') ||
    q.includes('box') ||
    q.includes('karton') ||
    q.includes('paper bag') ||
    q.includes('single pass') ||
    q.includes('singlepass') ||
    q.includes('one pass') ||
    q.includes('onepass') ||
    q.includes('packaging')
  ) {
    return INTENT_CONFIGS['single-pass'];
  }

  // 5. Variasi UV, Tumbler, Akrilik Cetak, Casing HP, Merchandise -> UV
  if (
    q.includes('uv') ||
    q.includes('flatbed') ||
    q.includes('tumbler') ||
    q.includes('botol') ||
    q.includes('cylinder') ||
    q.includes('silinder') ||
    q.includes('casing') ||
    q.includes('merchandise') ||
    q.includes('souvenir') ||
    (q.includes('cetak') && (q.includes('akrilik') || q.includes('kaca') || q.includes('kayu')))
  ) {
    return INTENT_CONFIGS['uv'];
  }

  // 6. Spesifik Outdoor
  if (q.includes('outdoor') || q.includes('solvent') || q.includes('3204')) {
    return INTENT_CONFIGS['outdoor'];
  }

  // 7. Spesifik Indoor
  if (
    q.includes('indoor') ||
    q.includes('eco solvent') ||
    q.includes('ecosolvent') ||
    q.includes('stiker') ||
    q.includes('sticker') ||
    q.includes('decal') ||
    q.includes('wallpaper') ||
    q.includes('3202') ||
    q.includes('1802')
  ) {
    return INTENT_CONFIGS['indoor'];
  }

  // 8. Digital Printing Umum
  if (
    q.includes('digital printing') ||
    q.includes('digital print') ||
    q.includes('mesin cetak') ||
    q.includes('mesin print') ||
    q.includes('large format') ||
    q.includes('wide format') ||
    q === 'digital' ||
    q === 'printing'
  ) {
    return INTENT_CONFIGS['digital-printing'];
  }

  return INTENT_CONFIGS['all'];
}

export const load: PageServerLoad = async ({ fetch, url, setHeaders }) => {
  setHeaders({
    'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate'
  });

  const rawQuery = (
    url.searchParams.get('k') ||
    url.searchParams.get('keyword') ||
    url.searchParams.get('key') ||
    url.searchParams.get('cat') ||
    url.searchParams.get('q') ||
    url.searchParams.get('utm_term') ||
    ''
  ).trim();

  const activeIntent = detectIntent(rawQuery);

  const allProducts = await fetchOriaProducts(fetch);

  // Map ke 6 grup kategori printing industrial
  const allCategoryGroups: AdCategoryGroup[] = AD_CATEGORIES.map((cfg) => {
    const matchedProducts: FormattedProduct[] = [];
    for (const slug of cfg.slugs) {
      const p = allProducts.find((item) => item.slug === slug || item.slug.toLowerCase() === slug.toLowerCase());
      if (p) {
        matchedProducts.push(p);
      }
    }

    return {
      id: cfg.id,
      name: cfg.name,
      subtitle: cfg.subtitle,
      description: cfg.description,
      heroImage: cfg.heroImage,
      products: matchedProducts
    };
  });

  // Filter kategori berdasarkan intent kata kunci
  const filteredCategoryGroups = activeIntent.key === 'all'
    ? allCategoryGroups
    : allCategoryGroups.filter((g) => activeIntent.categoryIds.includes(g.id));

  return {
    rawQuery,
    activeIntent,
    categoryGroups: allCategoryGroups,
    initialCategoryGroups: filteredCategoryGroups
  };
};
