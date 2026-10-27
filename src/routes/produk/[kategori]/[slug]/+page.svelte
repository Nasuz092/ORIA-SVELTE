<script lang="ts">
  import type { PageData } from './$types';
  import { getCleanModelTitle, getProductSpecs, getDetailedSpecColumns } from '$lib/utils/product-specs';
  import DetailHero from '$lib/sections/detail-produk/DetailHero.svelte';
  import DetailStory from '$lib/sections/detail-produk/DetailStory.svelte';
  import DetailGallery from '$lib/sections/detail-produk/DetailGallery.svelte';
  import DetailSpec from '$lib/sections/detail-produk/DetailSpec.svelte';
  import DetailCta from '$lib/sections/detail-produk/DetailCta.svelte';
  import SEO from '$lib/components/seo/SEO.svelte';

  let { data }: { data: PageData } = $props();

  const product = $derived(data.product);
  const kategori = $derived(data.kategori);
  let cleanModelName = $derived(getCleanModelTitle(product.name));
  let specs = $derived(getProductSpecs(product));
  let detailedSpecs = $derived(getDetailedSpecColumns(product));

  const numericPrice = $derived.by(() => {
    if (!product?.priceText) return 0;
    const digits = product.priceText.replace(/[^0-9]/g, '');
    return digits ? parseInt(digits, 10) : 0;
  });

  const productRichSchema = $derived({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://oria.co.id/produk/${kategori}/${product.slug}#richSnippet`,
    name: product.name,
    image: product.imageUrl?.startsWith('http') ? product.imageUrl : `https://oria.co.id${product.imageUrl}`,
    sku: product.sku || `ORIA-${product.id}`,
    mpn: product.sku || `ORIA-${product.id}`,
    description: product.shortDescription || `Spesifikasi lengkap, harga resmi distributor, dan fitur ${product.name} merk ORIA.`,
    brand: {
      '@type': 'Brand',
      name: 'ORIA'
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Distributor Resmi', value: 'ORIA Indonesia — CV. Anugrah Supply Mandiri' },
      { '@type': 'PropertyValue', name: 'Kategori', value: product.categoryName },
      { '@type': 'PropertyValue', name: 'Garansi', value: '1 Tahun Garansi Resmi Pabrikan' },
      { '@type': 'PropertyValue', name: 'Layanan Purna Jual', value: 'Free Training, On-Site Teknisi Lokal, Sparepart Lengkap' },
      { '@type': 'PropertyValue', name: 'Wilayah Layanan', value: 'Seluruh Indonesia' }
    ],
    offers: {
      '@type': 'Offer',
      priceCurrency: 'IDR',
      ...(numericPrice > 0 ? { price: numericPrice } : {}),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: `https://oria.co.id/produk/${kategori}/${product.slug}`,
      priceValidUntil: '2027-12-31T23:59:59+07:00',
      seller: {
        '@type': 'Organization',
        '@id': 'https://oria.co.id/#Organization',
        name: 'ORIA Industrial Printing'
      },
      shippingDetails: {
        '@type': 'OfferShippingDetails',
        shippingRate: { '@type': 'MonetaryAmount', value: '0', currency: 'IDR' },
        shippingDestination: { '@type': 'DefinedRegion', addressCountry: 'ID' }
      },
      hasMerchantReturnPolicy: {
        '@type': 'MerchantReturnPolicy',
        applicableCountry: 'ID',
        returnPolicyCategory: 'https://schema.org/MerchantReturnFiniteReturnWindow',
        merchantReturnDays: 7,
        returnMethod: 'https://schema.org/ReturnByMail'
      }
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: '128',
      bestRating: '5',
      worstRating: '1'
    }
  });
</script>

<SEO
  title="Jual {product.name} Resmi ORIA | Harga &amp; Spesifikasi Lengkap"
  description={product.shortDescription || `Spesifikasi lengkap, harga resmi, dan fitur canggih ${product.name} merk ORIA bergaransi resmi distributor di Indonesia.`}
  keywords="jual {product.name.toLowerCase()}, harga {product.name.toLowerCase()}, spesifikasi {product.name.toLowerCase()}, mesin {product.categoryName.toLowerCase()}, oria indonesia"
  canonical="/produk/{kategori}/{product.slug}"
  image={product.imageUrl}
  type="product"
  breadcrumbs={[
    { name: 'Beranda', url: '/' },
    { name: 'Produk', url: '/produk' },
    { name: product.categoryName, url: `/produk/${kategori}` },
    { name: product.name, url: `/produk/${kategori}/${product.slug}` }
  ]}
  productSchema={productRichSchema}
/>

<DetailHero {product} {cleanModelName} {specs} categoryId={kategori} />
<DetailStory {product} {cleanModelName} />
<DetailGallery {product} {cleanModelName} />
<DetailSpec {product} {detailedSpecs} />
<DetailCta {product} {cleanModelName} />
