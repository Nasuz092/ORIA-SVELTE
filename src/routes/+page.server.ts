import type { PageServerLoad } from './$types';
import { fetchArticles } from '$lib/api/articles';
import { fetchOriaProducts } from '$lib/api/products';

export const load: PageServerLoad = async ({ fetch }) => {
  const [articles, products] = await Promise.all([
    fetchArticles(3, fetch),
    fetchOriaProducts(fetch)
  ]);
  return {
    articles,
    products
  };
};
