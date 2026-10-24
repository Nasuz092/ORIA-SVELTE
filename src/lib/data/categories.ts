import type { FormattedProduct } from '$lib/types/product';

export interface CategoryInfo {
  id: string;
  name: string;
  heroLine1: string;
  heroLine2: string;
  heroSubtitle: string;
  heroImage: string;
  cardImage: string;
  alt: string;
  description: string;
}

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'uv',
    name: 'UV Flatbed & Cylinder',
    heroLine1: 'ORIA',
    heroLine2: 'UV FLATBED',
    heroSubtitle: 'FLATBED & ROTARY CYLINDER PRECISION',
    heroImage: '/images/showcase-products.png',
    cardImage: '/images/categories/uv.webp',
    alt: 'Mesin UV Flatbed & Rotary Printing ORIA',
    description: 'Jelajahi seluruh mesin UV Flatbed & Rotary Cylinder ORIA untuk percetakan resolusi tinggi pada media datar, akrilik, kayu, kaca, dan silinder.'
  },
  {
    id: 'sublimasi',
    name: 'Sublimasi Textile',
    heroLine1: 'ORIA',
    heroLine2: 'SUBLIMASI',
    heroSubtitle: 'HIGH-SPEED TEXTILE & APPAREL PRINTING',
    heroImage: '/images/hero/sublim-oria-desktop.png',
    cardImage: '/images/categories/sublimasi.webp',
    alt: 'Mesin Textile Sublimasi Printing ORIA',
    description: 'Inovasi mesin printing sublimasi textile dan heat press ORIA untuk produksi massal jersey olahraga, hijab, fashion, dan kain roll-to-roll.'
  },
  {
    id: 'laser',
    name: 'Laser Cutting & Engraving',
    heroLine1: 'ORIA',
    heroLine2: 'LASER CUTTING',
    heroSubtitle: 'CO2 & FIBER LASER PRECISION SYSTEMS',
    heroImage: '/images/core-precision.jpg',
    cardImage: '/images/categories/laser.webp',
    alt: 'Mesin Laser Cutting CO2 & Engraving ORIA',
    description: 'Koleksi mesin laser cutting CO2 dan fiber laser ORIA dengan presisi mikron untuk pemotongan dan grafir akrilik, kayu, MDF, kain, dan plat metal.'
  },
  {
    id: 'cnc',
    name: 'CNC Router & Fabrication',
    heroLine1: 'ORIA',
    heroLine2: 'CNC ROUTER',
    heroSubtitle: 'HEAVY FABRICATION & WOODWORKING',
    heroImage: '/images/engineering-excellence.png',
    cardImage: '/images/categories/cnc.webp',
    alt: 'Mesin CNC Router & Woodworking ORIA',
    description: 'Mesin CNC router dan plasma cutting berdaya tahan tinggi untuk pemotongan presisi plat besi, ACP, kayu solid, PVC foam board, dan aluminium.'
  },
  {
    id: 'dtf',
    name: 'DTF Apparel Printing',
    heroLine1: 'ORIA',
    heroLine2: 'DTF APPAREL',
    heroSubtitle: 'DIRECT TO FILM & GARMENT PRINTING',
    heroImage: '/images/our-machines-detail.jpg',
    cardImage: '/images/categories/dtf.webp',
    alt: 'Mesin DTF Digital Transfer Film ORIA',
    description: 'Sistem cetak DTF (Direct to Film) dan DTG industri ORIA beresolusi tajam untuk sablon kaos distro, apparel custom, topi, dan merchandise.'
  },
  {
    id: 'outdoor',
    name: 'Outdoor Solvent Printing',
    heroLine1: 'ORIA',
    heroLine2: 'OUTDOOR',
    heroSubtitle: 'HIGH-SPEED ALL-WEATHER SOLVENT PRINTING',
    heroImage: '/images/hero/outdoor-oria-desktop.png',
    cardImage: '/images/categories/outdoor.webp',
    alt: 'Mesin Digital Printing Outdoor Format Besar ORIA',
    description: 'Mesin digital printing outdoor format besar 3,2 meter ORIA dengan sasis baja anti-vibrasi untuk billboard, spanduk, dan baliho tahan cuaca ekstrem.'
  },
  {
    id: 'indoor',
    name: 'Indoor High Resolution',
    heroLine1: 'ORIA',
    heroLine2: 'INDOOR',
    heroSubtitle: 'ECO-SOLVENT HIGH-RESOLUTION SYSTEMS',
    heroImage: '/images/showcase-about.png',
    cardImage: '/images/categories/indoor.webp',
    alt: 'Mesin Printing Indoor Eco-Solvent ORIA',
    description: 'Mesin digital printing indoor eco-solvent ORIA dengan resolusi fotografi untuk stiker ritel, banner indoor, wallcovering estetis, dan pameran.'
  }
];

export function getCategoryById(id: string): CategoryInfo | undefined {
  const cleanId = id.trim().toLowerCase();
  return CATEGORIES.find(c => c.id === cleanId);
}

export function matchesCategory(p: FormattedProduct, catId: string): boolean {
  if (catId === 'all') return true;
  const slug = (p.slug || '').toLowerCase();
  const catSlug = (p.categorySlug || '').toLowerCase();
  const catName = (p.categoryName || '').toLowerCase();
  const pName = (p.name || '').toLowerCase();

  switch (catId) {
    case 'laser':
      return pName.includes('laser');
    case 'cnc':
      return (pName.includes('cnc') || pName.includes('router') || pName.includes('plasma')) && !pName.includes('laser');
    case 'indoor':
      return (
        (catSlug.includes('indoor') || pName.includes('indoor') || pName.includes('ecosolvent') || pName.includes('eco-solvent') || pName.includes('1802') || pName.includes('1902')) &&
        !pName.includes('outdoor') &&
        !pName.includes('sublim') &&
        !catSlug.includes('consumable') &&
        !pName.includes('tinta')
      );
    case 'outdoor':
      return (
        (catSlug.includes('outdoor') || pName.includes('outdoor') || pName.includes('3204') || pName.includes('3202')) &&
        !pName.includes('indoor') &&
        !pName.includes('laser') &&
        !catSlug.includes('consumable') &&
        !pName.includes('tinta')
      );
    case 'uv':
      return pName.includes('uv') || catSlug.includes('uv') || pName.includes('tumbler') || pName.includes('rotary') || pName.includes('flatbed');
    case 'sublimasi':
      return (
        (catSlug.includes('sublim') || pName.includes('sublim') || pName.includes('textile') || pName.includes('heat press') || pName.includes('heatpress')) &&
        !pName.includes('tinta') &&
        !pName.includes('kertas')
      );
    case 'dtf':
      return catSlug.includes('dtf') || pName.includes('dtf') || pName.includes('dtg');
    default:
      return catSlug.includes(catId) || catName.includes(catId) || pName.includes(catId);
  }
}
