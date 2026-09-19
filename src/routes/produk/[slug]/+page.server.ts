import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchProductBySlug, fetchOriaProducts } from '$lib/api/products';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { slug } = params;
  console.log(`[+page.server.ts] Loading slug: '${slug}'`);
  
  // Use Node global fetch on server
  const product = await fetchProductBySlug(slug, fetch);

  if (!product) {
    console.warn(`[+page.server.ts] Product '${slug}' not found, throwing 404`);
    throw error(404, {
      message: `Mesin dengan model '${slug}' tidak ditemukan atau sedang diperbarui.`
    });
  }

  // Fetch related products for recommendations
  const allProducts = await fetchOriaProducts(fetch);
  const relatedProducts = allProducts
    .filter(p => p.slug !== product.slug)
    .slice(0, 3);

  return {
    product,
    relatedProducts
  };
};
