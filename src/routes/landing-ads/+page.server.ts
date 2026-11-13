import type { PageServerLoad } from './$types';
import { fetchOriaProducts } from '$lib/api/products';
import { CATEGORIES, matchesCategory } from '$lib/data/categories';
import type { FormattedProduct } from '$lib/types/product';
import type { CategoryInfo } from '$lib/data/categories';

export interface CategoryAdGroup {
  category: CategoryInfo;
  products: FormattedProduct[];
}

export const load: PageServerLoad = async ({ fetch, setHeaders }) => {
  // Prevent any browser or CDN from caching ads landing page
  setHeaders({
    'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate'
  });

  const allProducts = await fetchOriaProducts(fetch);

  // Ambil hanya 1-2 produk terbaik dari setiap kategori
  const categoryGroups: CategoryAdGroup[] = CATEGORIES.map((cat) => {
    const matched = allProducts.filter((p) => matchesCategory(p, cat.id));
    // Batasi ketat 1-2 produk per kategori sesuai instruksi
    const selectedProducts = matched.slice(0, 2);

    return {
      category: cat,
      products: selectedProducts
    };
  });

  return {
    categoryGroups,
    totalProducts: allProducts.length
  };
};

