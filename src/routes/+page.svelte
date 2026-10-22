<script lang="ts">
  import Hero from '$lib/components/sections/Hero.svelte';
  import BrandManifesto from '$lib/components/sections/BrandManifesto.svelte';
  import BrandVision from '$lib/components/sections/BrandVision.svelte';
  import DualShowcase from '$lib/components/sections/DualShowcase.svelte';
  import CategoryPreview from '$lib/components/sections/CategoryPreview.svelte';
  import EngineeringExcellence from '$lib/components/sections/EngineeringExcellence.svelte';
  import FeaturedProducts from '$lib/components/sections/FeaturedProducts.svelte';
  import LatestArticles from '$lib/components/sections/LatestArticles.svelte';
  import CtaSection from '$lib/components/sections/CtaSection.svelte';
</script>

<svelte:head>
  <title>ORIA - Mesin Printing & Industrial Precision</title>
  <meta name="description" content="Distributor dan solusi mesin printing industrial ORIA: DTG, UV Flatbed, DTF, Laser Cutting, CNC Router dengan presisi tinggi dan layanan garansi resmi." />
</svelte:head>

<Hero />
<BrandManifesto />
<BrandVision />
<DualShowcase />
<CategoryPreview />
<EngineeringExcellence />
<FeaturedProducts />
<LatestArticles />
<CtaSection />

