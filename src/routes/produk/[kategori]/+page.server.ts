import { error, redirect } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchOriaProducts, fetchProductBySlug } from '$lib/api/products';
import { getCategoryById, matchesCategory, getProductCategoryId } from '$lib/data/categories';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { kategori } = params;
  const category = getCategoryById(kategori);

  if (!category) {
    // Smart Fallback: Check if 'kategori' is actually an old 1-level product slug (e.g. /produk/oria-sublim-1902)
    const legacyProduct = await fetchProductBySlug(kategori, fetch);
    if (legacyProduct) {
      const targetCatId = getProductCategoryId(legacyProduct);
      throw redirect(301, `/produk/${targetCatId}/${legacyProduct.slug}`);
    }

    throw error(404, {
      message: `Kategori mesin '${kategori}' tidak ditemukan.`
    });
  }

  const allProducts = await fetchOriaProducts(fetch);
  const products = allProducts.filter(p => matchesCategory(p, category.id));

  return {
    category,
    products
  };
};
