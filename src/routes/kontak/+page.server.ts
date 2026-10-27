import type { PageServerLoad } from './$types';
import { fetchOriaProducts } from '$lib/api/products';
import { CATEGORIES, matchesCategory } from '$lib/data/categories';

export const load: PageServerLoad = async ({ fetch }) => {
  const allProducts = await fetchOriaProducts(fetch);

  // Map products directly from Strapi categorized by ORIA categories
  const categoryData: Record<string, string[]> = {};

  for (const cat of CATEGORIES) {
    const matched = allProducts
      .filter(p => matchesCategory(p, cat.id))
      .map(p => p.name);

    categoryData[cat.name] = matched.sort((a, b) => a.localeCompare('id-ID'));
  }

  return {
    categoryData,
    categories: CATEGORIES.map(c => c.name)
  };
};
