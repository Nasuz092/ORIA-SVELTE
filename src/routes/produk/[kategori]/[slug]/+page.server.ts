import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchProductBySlug, fetchOriaProducts } from '$lib/api/products';
import { getCategoryById, matchesCategory } from '$lib/data/categories';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { kategori, slug } = params;
  console.log(`[produk/[kategori]/[slug]] Loading kategori: '${kategori}', slug: '${slug}'`);

  const product = await fetchProductBySlug(slug, fetch);

  if (!product) {
    console.warn(`[produk/[kategori]/[slug]] Product '${slug}' not found, throwing 404`);
    throw error(404, {
      message: `Mesin dengan model '${slug}' tidak ditemukan atau sedang diperbarui.`
    });
  }

  const category = getCategoryById(kategori);

  const allProducts = await fetchOriaProducts(fetch);
  const relatedProducts = allProducts
    .filter(p => p.slug !== product.slug && (!category || matchesCategory(p, category.id)))
    .slice(0, 3);

  return {
    kategori,
    category,
    product,
    relatedProducts
  };
};
