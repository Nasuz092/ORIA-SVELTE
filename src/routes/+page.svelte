<script lang="ts">
  import type { PageData } from './$types';
  import Hero from '$lib/sections/homepage/Hero.svelte';
  import BrandManifesto from '$lib/sections/homepage/BrandManifesto.svelte';
  import BrandVision from '$lib/sections/homepage/BrandVision.svelte';
  import DualShowcase from '$lib/sections/homepage/DualShowcase.svelte';
  import CategoryPreview from '$lib/sections/homepage/CategoryPreview.svelte';
  import EngineeringExcellence from '$lib/sections/homepage/EngineeringExcellence.svelte';
  import LatestArticles from '$lib/sections/homepage/LatestArticles.svelte';

  let { data }: { data: PageData } = $props();
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
<LatestArticles articles={data.articles} />

