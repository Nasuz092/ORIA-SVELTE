import type { PageServerLoad } from './$types';
import { fetchOriaProducts } from '$lib/api/products';

export const load: PageServerLoad = async ({ fetch }) => {
  const products = await fetchOriaProducts(fetch);
  return {
    products
  };
};
