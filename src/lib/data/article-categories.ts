export interface ArticleCategoryMeta {
  id: string;
  label: string;
  spacedTitle: string;
  strapiName?: string;
  subtitle: string;
}

export const ARTICLE_CATEGORIES: ArticleCategoryMeta[] = [
  {
    id: 'digital-print',
    label: 'DIGITAL PRINT',
    spacedTitle: 'D I G I T A L &nbsp; P R I N T',
    strapiName: 'Digital Print',
    subtitle: 'INOVASI TEKNOLOGI CETAK UV FLATBED, DTF APPAREL, ROLL-TO-ROLL, DAN PRINTHEAD INDUSTRI.'
  },
  {
    id: 'business',
    label: 'BUSINESS',
    spacedTitle: 'B U S I N E S S',
    strapiName: 'Business',
    subtitle: 'STRATEGI USAHA PERCETAKAN DIGITAL, KALKULASI RETURN ON INVESTMENT, DAN MANAJEMEN WORKSHOP.'
  },
  {
    id: 'insight',
    label: 'INSIGHT',
    spacedTitle: 'I N S I G H T',
    strapiName: 'Insight',
    subtitle: 'TREN INDUSTRI ADVERTISING & SIGNAGE, ANALISIS PASAR CETAK, SERTA PERKEMBANGAN MATERIAL.'
  },
  {
    id: 'product',
    label: 'PRODUCT',
    spacedTitle: 'P R O D U C T',
    strapiName: 'Product',
    subtitle: 'BEDAH SPESIFIKASI REKAYASA, FITUR UNGGULAN, DAN PERFORMA PRODUKSI LINI MESIN ORIA.'
  },
  {
    id: 'trivia',
    label: 'TRIVIA',
    spacedTitle: 'T R I V I A',
    strapiName: 'Trivia',
    subtitle: 'FAKTA TEKNIS PENTING, PANDUAN PERAWATAN PRINTHEAD, DAN TIPS PRAKTIS DARI TEKNISI AHLI.'
  }
];

export function getArticleCategory(id: string): ArticleCategoryMeta | undefined {
  const norm = id.toLowerCase().trim();
  if (norm === 'all' || norm === 'semua') return ARTICLE_CATEGORIES[0];
  return ARTICLE_CATEGORIES.find(
    (c) => c.id === norm || (c.strapiName && c.strapiName.toLowerCase() === norm)
  );
}

export function isArticleCategorySlug(slug: string): boolean {
  return !!getArticleCategory(slug);
}
