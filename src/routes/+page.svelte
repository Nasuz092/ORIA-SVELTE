<script lang="ts">
  import type { PageData } from './$types';
  import Hero from '$lib/sections/homepage/Hero.svelte';
  import BrandManifesto from '$lib/sections/homepage/BrandManifesto.svelte';
  import BrandVision from '$lib/sections/homepage/BrandVision.svelte';
  import DualShowcase from '$lib/sections/homepage/DualShowcase.svelte';
  import CategoryPreview from '$lib/sections/homepage/CategoryPreview.svelte';
  import EngineeringExcellence from '$lib/sections/homepage/EngineeringExcellence.svelte';
  import LatestArticles from '$lib/sections/homepage/LatestArticles.svelte';
  import SEO from '$lib/components/seo/SEO.svelte';

  let { data }: { data: PageData } = $props();

  const featuredItemListSchema = $derived({
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Mesin Digital Printing Industrial Unggulan ORIA',
    description: 'Daftar produk mesin digital printing industrial unggulan dari ORIA Indonesia',
    numberOfItems: (data.products || []).length,
    itemListElement: (data.products || []).slice(0, 10).map((p, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      name: p.name,
      url: `https://oria.co.id/produk/${p.categorySlug || 'mesin'}/${p.slug}`
    }))
  });
</script>

<SEO
  title="ORIA Printing — Mesin Digital Printing Industrial Presisi & Solusi Cetak Modern"
  description="Pusat mesin digital printing terpercaya di Indonesia. Solusi terdepan mesin digital printing UV flatbed, DTF apparel, sublimasi tekstil, outdoor & indoor bergaransi resmi."
  keywords="mesin digital printing, jual mesin digital printing, harga mesin digital printing, mesin digital printing indonesia, mesin digital printing surabaya, oria printing, mesin digital printing oria, printer uv flatbed, mesin dtf, printer sublimasi, mesin ecosolvent"
  canonical="/"
  customSchemas={[featuredItemListSchema]}
/>

<Hero />
<BrandManifesto />
<BrandVision />
<DualShowcase />
<CategoryPreview products={data.products} />
<EngineeringExcellence />
<LatestArticles articles={data.articles} />

