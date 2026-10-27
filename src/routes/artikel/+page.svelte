<script lang="ts">
  import SEO from '$lib/components/seo/SEO.svelte';
  import ArtikelHero from '$lib/sections/artikel/ArtikelHero.svelte';
</script>

<SEO
  title="Editorial & Wawasan Percetakan Industri | ORIA Indonesia"
  description="Pusat informasi resmi dan editorial teknologi percetakan industri ORIA. Akses panduan cetak UV Flatbed, DTF Apparel, analisis ROI modal bisnis, dan tips teknisi ahli."
  keywords="artikel digital printing, panduan mesin dtf, cara merawat uv flatbed, estimasi modal usaha percetakan, oria editorial"
  canonical="/artikel"
  image="/images/oria-hero-banner.png"
  breadcrumbs={[
    { name: 'Beranda', url: '/' },
    { name: 'Editorial & Wawasan', url: '/artikel' }
  ]}
  customSchemas={[
    {
      '@context': 'https://schema.org',
      '@type': 'CollectionPage',
      '@id': 'https://oria.co.id/artikel#collection',
      url: 'https://oria.co.id/artikel',
      name: 'Editorial & Wawasan Percetakan Industri ORIA',
      description:
        'Pusat wawasan, panduan teknis cetak industri, dan simulasi ROI bisnis percetakan resmi dari ORIA Indonesia.'
    }
  ]}
/>

<div class="w-full bg-[#050508] text-white">
  <!-- 1. Hero Section (Lotus Press Style - Purple/Dark Cinematic Hero) -->
  <ArtikelHero />
</div>


