import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchOriaProducts } from '$lib/api/products';
import { getCategoryById, matchesCategory } from '$lib/data/categories';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { kategori } = params;
  const category = getCategoryById(kategori);

  if (!category) {
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
