<script lang="ts">
  import type { PageData } from './$types';
  import ProdukHero from '$lib/sections/produk/ProdukHero.svelte';
  import ProdukOverview from '$lib/sections/produk/ProdukOverview.svelte';
  import ProdukCategories from '$lib/sections/produk/ProdukCategories.svelte';
  import ProdukFlagship from '$lib/sections/produk/ProdukFlagship.svelte';
  import { matchesCategory } from '$lib/data/categories';
  import SEO from '$lib/components/seo/SEO.svelte';

  let { data }: { data: PageData } = $props();
  const products = $derived((data.products || []).filter(p => !matchesCategory(p, 'consumables')));

  const productCatalogSchema = $derived({
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    '@id': 'https://oria.co.id/produk#webpage',
    url: 'https://oria.co.id/produk',
    name: 'Katalog Mesin Digital Printing & Presisi Industri ORIA',
    description: 'Portofolio mesin industri ORIA: UV Flatbed, Sublimasi Tekstil, Laser Cutting, CNC Router, DTF, dan Outdoor Solvent.',
    inLanguage: 'id-ID'
  });
</script>

<SEO
  title="Katalog Mesin Digital Printing Industrial Lengkap | ORIA Indonesia"
  description="Jelajahi portofolio lengkap mesin industri ORIA: UV Flatbed, Sublimasi Tekstil, Laser Cutting, CNC Router, DTF Apparel, Outdoor Solvent, dan Single Pass Packaging bergaransi resmi."
  keywords="katalog mesin digital printing, jual mesin industri oria, harga mesin uv flatbed, mesin dtf apparel, printer sublimasi jersey, mesin laser cutting oria, cnc router indonesia"
  canonical="/produk"
  breadcrumbs={[
    { name: 'Beranda', url: '/' },
    { name: 'Katalog Mesin', url: '/produk' }
  ]}
  customSchemas={[productCatalogSchema]}
/>

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
