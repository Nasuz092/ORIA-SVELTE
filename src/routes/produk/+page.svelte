<script lang="ts">
  import ProdukHero from '$lib/sections/produk/ProdukHero.svelte';
  import ProdukOverview from '$lib/sections/produk/ProdukOverview.svelte';
  import ProdukCategories from '$lib/sections/produk/ProdukCategories.svelte';
  import ProdukFlagship from '$lib/sections/produk/ProdukFlagship.svelte';
</script>

<svelte:head>
  <title>ORIA Heritage - Industrial Machinery &amp; Digital Printing Portfolio</title>
  <meta
    name="description"
    content="Jelajahi seluruh kategori mesin industri ORIA: UV Flatbed, Sublimasi, Laser Cutting, CNC Router, DTF, dan Outdoor Printing berstandar presisi manufaktur."
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
<ProdukCategories />

<!-- ======================================================================= -->
<!-- SECTION 4: Flagship Model Switcher (Lotus Eletre / Emira / Emeya Style)-->
<!-- ======================================================================= -->
<ProdukFlagship />
