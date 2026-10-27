<script lang="ts">
  import type { PageData } from './$types';
  import { getCleanModelTitle, getProductSpecs, getDetailedSpecColumns } from '$lib/utils/product-specs';
  import DetailHero from '$lib/sections/detail-produk/DetailHero.svelte';
  import DetailStory from '$lib/sections/detail-produk/DetailStory.svelte';
  import DetailGallery from '$lib/sections/detail-produk/DetailGallery.svelte';
  import DetailSpec from '$lib/sections/detail-produk/DetailSpec.svelte';
  import DetailCta from '$lib/sections/detail-produk/DetailCta.svelte';

  let { data }: { data: PageData } = $props();

  const product = $derived(data.product);
  const kategori = $derived(data.kategori);
  let cleanModelName = $derived(getCleanModelTitle(product.name));
  let specs = $derived(getProductSpecs(product));
  let detailedSpecs = $derived(getDetailedSpecColumns(product));
</script>

<svelte:head>
  <title>{product.name} - Spesifikasi &amp; Garansi Resmi ORIA</title>
  <meta
    name="description"
    content={product.shortDescription || `Spesifikasi lengkap, harga, dan fitur ${product.name} merk ORIA bergaransi resmi distributor.`}
  />
  <meta property="og:title" content="{product.name} - ORIA" />
  <meta property="og:description" content={product.shortDescription || product.name} />
  <meta property="og:image" content={product.imageUrl} />
</svelte:head>

<DetailHero {product} {cleanModelName} {specs} categoryId={kategori} />
<DetailStory {product} {cleanModelName} />
<DetailGallery {product} {cleanModelName} />
<DetailSpec {product} {detailedSpecs} />
<DetailCta {product} {cleanModelName} />
