<script lang="ts">
  import type { PageData } from './$types';
  import ProdukHero from '$lib/sections/produk/ProdukHero.svelte';
  import ProdukOverview from '$lib/sections/produk/ProdukOverview.svelte';
  import ProdukCategories from '$lib/sections/produk/ProdukCategories.svelte';
  import ProdukFlagship from '$lib/sections/produk/ProdukFlagship.svelte';
  import { matchesCategory } from '$lib/data/categories';

  let { data }: { data: PageData } = $props();
  const products = $derived((data.products || []).filter(p => !matchesCategory(p, 'consumables')));
</script>

<svelte:head>
  <title>ORIA Industrial Machinery - Seluruh Portofolio Mesin Digital Printing</title>
  <meta
    name="description"
    content="Jelajahi portofolio lengkap mesin industri ORIA: UV Flatbed, Sublimasi, Laser Cutting, CNC Router, DTF, Outdoor Solvent, dan Single Pass langsung dari distributor resmi."
  />
</svelte:head>

<!-- ======================================================================= -->
<!-- SECTION 1: Hero (Lotus Heritage Style - Full Bleed)                    -->
<!-- ======================================================================= -->
<ProdukHero />

<!-- ======================================================================= -->
<!-- SECTION 2: Overview Narrative (Lotus Iconic Heritage Style - Centered) -->
<!-- ======================================================================= -->
<ProdukOverview />

<!-- ======================================================================= -->
<!-- SECTION 3: Category Cards (Lotus Heritage Cars Style - Borderless 3-Col)-->
<!-- ======================================================================= -->
<ProdukCategories {products} />

<!-- ======================================================================= -->
<!-- SECTION 4: Flagship Model Switcher (Lotus Eletre / Emira / Emeya Style)-->
<!-- ======================================================================= -->
<ProdukFlagship {products} />
