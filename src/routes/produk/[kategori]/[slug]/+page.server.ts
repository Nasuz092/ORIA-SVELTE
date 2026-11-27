import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchProductBySlug, fetchOriaProducts } from '$lib/api/products';
import { getCategoryById, getProductCategoryId, matchesCategory } from '$lib/data/categories';
import type { FormattedProduct } from '$lib/types/product';

function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
}

const GENERIC_TOKENS = new Set([
  'mesin',
  'printing',
  'digital',
  'flatbed',
  'oria',
  'sublim',
  'sublimasi',
  'indoor',
  'outdoor'
]);

function findBestRedirectTarget(requestedSlug: string, requestedKategori: string, products: FormattedProduct[]): FormattedProduct | null {
  const reqTokens = tokenize(requestedSlug);
  if (reqTokens.length === 0) return null;

  const reqSpecific = reqTokens.filter((t) => !GENERIC_TOKENS.has(t));
  const reqSet = new Set(reqTokens);

  let bestProduct: FormattedProduct | null = null;
  let bestScore = -Infinity;

  for (const p of products) {
    const pTokens = tokenize(`${p.slug} ${p.name}`);
    const pSet = new Set(pTokens);
    const pSlugTokens = tokenize(p.slug);
    const pSpecific = pSlugTokens.filter((t) => !GENERIC_TOKENS.has(t));

    // Count matching specific tokens (model numbers, dimensions, series names)
    let matchedSpecific = 0;
    for (const t of reqSpecific) {
      if (pSet.has(t)) matchedSpecific++;
    }

    if (reqSpecific.length > 0 && matchedSpecific === 0) continue;

    // Penalize missing specific tokens from request and extra specific tokens on target slug
    const missingFromTarget = reqSpecific.length - matchedSpecific;
    const extraOnTarget = pSpecific.filter((t) => !reqSet.has(t)).length;

    let score = matchedSpecific * 10 - missingFromTarget * 12 - extraOnTarget * 4;
    if (getProductCategoryId(p) === requestedKategori) score += 2;
    if (pSet.has('indoor') && reqSet.has('indoor')) score += 2;
    if (pSet.has('outdoor') && reqSet.has('outdoor')) score += 2;
    if (pSet.has('uv') === reqSet.has('uv')) score += 2;
    if (pSet.has('dtf') === reqSet.has('dtf')) score += 2;

    if (score > bestScore && matchedSpecific >= Math.max(1, reqSpecific.length - 1)) {
      bestScore = score;
      bestProduct = p;
    }
  }

  return bestScore > 0 ? bestProduct : null;
}

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { kategori, slug } = params;

  const [product, allProducts] = await Promise.all([
    fetchProductBySlug(slug, fetch),
    fetchOriaProducts(fetch)
  ]);

  if (!product) {
    const matched = findBestRedirectTarget(slug, kategori, allProducts);
    if (matched) {
      const targetKategori = getProductCategoryId(matched);
      throw redirect(301, `/produk/${targetKategori}/${matched.slug}`);
    }

    console.warn(`[produk/[kategori]/[slug]] Product '${slug}' not found, throwing 404`);
    throw error(404, {
      message: `Mesin dengan model '${slug}' tidak ditemukan atau sedang diperbarui.`
    });
  }

  const canonicalKategori = getProductCategoryId(product);
  if (kategori !== canonicalKategori && !matchesCategory(product, kategori)) {
    throw redirect(301, `/produk/${canonicalKategori}/${product.slug}`);
  }

  const category = getCategoryById(kategori);

  const relatedProducts = allProducts
    .filter((p) => p.slug !== product.slug && (!category || matchesCategory(p, category.id)))
    .slice(0, 3);

  return {
    kategori,
    category,
    product,
    relatedProducts
  };
};
