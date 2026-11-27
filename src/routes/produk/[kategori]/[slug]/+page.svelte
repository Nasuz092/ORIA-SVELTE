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

  const ogImage = $derived(product.cardImageUrl || product.imageUrl);

  const seoConfig = $derived.by(() => {
    const slugLower = product.slug.toLowerCase();
    const nameLower = product.name.toLowerCase();

    if (slugLower.includes('3202') || nameLower.includes('3202')) {
      return {
        title: `Mesin Digital Printing Harga Terjangkau — ${product.name}`,
        description:
          'Jual mesin digital printing ORIA 3202 harga terjangkau dengan lebar cetak 3.2 meter dan 2 pcs printhead ORIA Series. Solusi cetak spanduk, banner, dan stiker presisi.',
        keywords:
          'mesin digital printing, mesin digital printing harga terjangkau, jual mesin digital printing, harga mesin digital printing, mesin digital printing oria 3202, printer spanduk 3.2 meter'
      };
    }

    if (slugLower.includes('3204') || nameLower.includes('3204')) {
      return {
        title: `Mesin Cetak Banner & Spanduk Outdoor — ${product.name}`,
        description:
          'Mesin cetak banner, spanduk, dan baliho outdoor heavy-duty ORIA 3204 dengan 4x Konica Minolta KM512i berkecepatan hingga 125 m²/jam. Tahan cuaca ekstrem & bergaransi resmi.',
        keywords:
          'mesin cetak banner, mesin cetak spanduk outdoor, mesin cetak baliho billboard, printer outdoor konica 512i, oria outdoor 3204, jual mesin banner heavy duty'
      };
    }

    return {
      title: `Jual ${product.name} | Harga & Spesifikasi Lengkap`,
      description:
        product.shortDescription ||
        `Spesifikasi lengkap, harga resmi, dan fitur canggih ${product.name} merk ORIA bergaransi resmi di Indonesia.`,
      keywords: `jual ${nameLower}, harga ${nameLower}, spesifikasi ${nameLower}, mesin ${product.categoryName.toLowerCase()}, oria indonesia`
    };
  });

  const productRichSchema = $derived({
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `https://oria.co.id/produk/${kategori}/${product.slug}#richSnippet`,
    name: product.name,
    image: ogImage?.startsWith('http') ? ogImage : `https://oria.co.id${ogImage}`,
    sku: product.sku || `ORIA-${product.id}`,
    mpn: product.sku || `ORIA-${product.id}`,
    description: seoConfig.description,
    brand: {
      '@type': 'Brand',
      name: 'ORIA'
    },
    additionalProperty: [
      { '@type': 'PropertyValue', name: 'Brand Resmi', value: 'ORIA Indonesia' },
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
  title={seoConfig.title}
  description={seoConfig.description}
  keywords={seoConfig.keywords}
  canonical="/produk/{kategori}/{product.slug}"
  image={ogImage}
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
