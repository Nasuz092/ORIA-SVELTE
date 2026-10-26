import type { StrapiProduct, FormattedProduct } from '$lib/types/product';

let envUrl = (typeof import.meta !== 'undefined' && import.meta.env?.PUBLIC_STRAPI_URL) || 'http://127.0.0.1:1338';
if (envUrl.includes('localhost:1338')) {
  envUrl = envUrl.replace('localhost:1338', '127.0.0.1:1338');
}
export const STRAPI_URL = envUrl;

export function getStrapiMediaUrl(path: string | null | undefined): string {
  if (!path) {
    return '/images/hero/slide-outdoor.webp';
  }
  if (path.startsWith('http://') || path.startsWith('https://')) {
    return path;
  }
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${STRAPI_URL}${cleanPath}`;
}

export function formatPrice(
  regularPrice: number | null | undefined,
  salePrice: number | null | undefined,
  priceLabel: string | null | undefined
): string {
  const price = salePrice || regularPrice;
  if (price && price > 0) {
    return `Rp ${price.toLocaleString('id-ID')}`;
  }
  if (priceLabel && priceLabel.trim() !== '') {
    return priceLabel;
  }
  return 'Hubungi Sales';
}

export function transformProduct(p: StrapiProduct): FormattedProduct {
  const categoryName = p.category?.name || 'Mesin Percetakan';
  const categorySlug = p.category?.slug || 'mesin';

  const galleryUrls: string[] = [];
  if (p.gallery_images && Array.isArray(p.gallery_images)) {
    for (const g of p.gallery_images) {
      if (g?.url) {
        galleryUrls.push(getStrapiMediaUrl(g.url));
      }
    }
  }

  // Extract raw media paths
  const desktopPath = p.main_image_desktop?.url || null;
  const mobilePath = p.main_image_mobile?.url || null;
  const cardPath = p.card_image?.url || null;
  const mainPath = p.main_image?.url || null;
  const firstGalleryPath = galleryUrls.length > 0 ? galleryUrls[0] : null;

  // General fallback if a specific field is not set
  const fallbackPath = desktopPath || mobilePath || cardPath || mainPath || firstGalleryPath || '/images/showcase-products.png';

  // Rule: kalau hanya ada salah satu, langsung gunakan salah satunya untuk desktop & mobile
  const effectiveDesktopPath = desktopPath || mobilePath || fallbackPath;
  const effectiveMobilePath = mobilePath || desktopPath || fallbackPath;

  const mainImageDesktopUrl = getStrapiMediaUrl(effectiveDesktopPath);
  const mainImageMobileUrl = getStrapiMediaUrl(effectiveMobilePath);
  const cardImageUrl = getStrapiMediaUrl(cardPath || fallbackPath);
  const imageUrl = mainImageDesktopUrl;

  return {
    id: p.id,
    documentId: p.documentId,
    name: p.name,
    slug: p.slug,
    sku: p.sku || `ORIA-${p.id}`,
    brand: p.brand || 'ORIA',
    categoryName,
    categorySlug,
    shortDescription: p.short_description || '',
    descriptionHtml: p.description || '',
    priceText: formatPrice(p.regular_price, p.sale_price, p.price_label),
    imageUrl,
    mainImageDesktopUrl,
    mainImageMobileUrl,
    cardImageUrl,
    galleryUrls,
    isFeatured: Boolean(p.is_featured),
    whatsappMessage: p.whatsapp_message || `Halo ORIA, saya ingin konsultasi mengenai unit: ${p.name}`,
    specificationsHtml: p.specifications || '',
    brochureUrl: p.brochure_url || null,
    youtubeUrl: p.youtube_url || null
  };
}

export async function fetchOriaProducts(fetchFn: typeof fetch = fetch): Promise<FormattedProduct[]> {
  try {
    // Fetch all published products from Strapi (all brands and categories registered in Strapi)
    const url = `${STRAPI_URL}/api/products?populate=*&pagination[pageSize]=100&sort=name:asc`;
    const res = await fetchFn(url);
    if (!res.ok) {
      console.warn(`[Strapi] Failed to fetch products: HTTP ${res.status}`);
      return [];
    }
    const json = await res.json();
    const items: StrapiProduct[] = json.data || [];
    return items.map(transformProduct);
  } catch (err) {
    console.error('[Strapi] Error fetching products:', err);
    return [];
  }
}

export async function fetchProductBySlug(slug: string, fetchFn: typeof fetch = fetch): Promise<FormattedProduct | null> {
  try {
    const url = `${STRAPI_URL}/api/products?filters[slug][$eq]=${encodeURIComponent(slug)}&populate=*`;
    const res = await fetchFn(url);
    if (!res.ok) {
      console.warn(`[Strapi] Failed to fetch product ${slug}: HTTP ${res.status}`);
      return null;
    }
    const json = await res.json();
    const items: StrapiProduct[] = json.data || [];
    console.log(`[Strapi] fetchProductBySlug(${slug}) -> items found:`, items.length);
    if (items.length === 0) {
      // Fallback: search within all ORIA products
      console.log(`[Strapi] Attempting fallback via fetchOriaProducts for slug: ${slug}`);
      const all = await fetchOriaProducts(fetchFn);
      const found = all.find(p => p.slug === slug || p.slug.toLowerCase() === slug.toLowerCase());
      return found || null;
    }
    return transformProduct(items[0]);
  } catch (err) {
    console.error(`[Strapi] Error fetching product by slug (${slug}):`, err);
    return null;
  }
}
