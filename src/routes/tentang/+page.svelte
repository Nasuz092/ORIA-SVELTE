<script lang="ts">
  import TentangHero from '$lib/sections/tentang/TentangHero.svelte';
  import OriaStory from '$lib/sections/tentang/OriaStory.svelte';
  import OurLegacy from '$lib/sections/tentang/OurLegacy.svelte';
  import OurMachines from '$lib/sections/tentang/OurMachines.svelte';
  import OurCore from '$lib/sections/tentang/OurCore.svelte';
  import StandarRekayasa from '$lib/sections/tentang/StandarRekayasa.svelte';
  import KapasitasLayanan from '$lib/sections/tentang/KapasitasLayanan.svelte';
  import VisiDedikasi from '$lib/sections/tentang/VisiDedikasi.svelte';
  import ShowroomCta from '$lib/sections/tentang/ShowroomCta.svelte';
  import SEO from '$lib/components/seo/SEO.svelte';

  const aboutSchema = {
    '@context': 'https://schema.org',
    '@type': 'AboutPage',
    '@id': 'https://oria.co.id/tentang#webpage',
    url: 'https://oria.co.id/tentang',
    name: 'Tentang ORIA — Dedikasi Rekayasa Presisi & Standar Industri',
    description: 'Pelajari visi, filosofi rekayasa presisi, dan kapasitas layanan mesin printing industrial serta manufaktur ORIA di Indonesia.',
    inLanguage: 'id-ID'
  };
</script>

<SEO
  title="Tentang ORIA | Dedikasi Rekayasa Presisi & Standar Mesin Industri Indonesia"
  description="Pelajari visi, filosofi rekayasa presisi, dan kapasitas layanan mesin printing industrial serta manufaktur ORIA di Indonesia sejak 2001."
  keywords="tentang oria, profil oria indonesia, rekayasa mesin printing, kapasitas layanan oria, inovasi mesin cetak industri"
  canonical="/tentang"
  breadcrumbs={[
    { name: 'Beranda', url: '/' },
    { name: 'Tentang Kami', url: '/tentang' }
  ]}
  customSchemas={[aboutSchema]}
/>

<TentangHero />
<OriaStory />
<OurLegacy />
<OurMachines />
<OurCore />
<StandarRekayasa />
<KapasitasLayanan />
<VisiDedikasi />
<ShowroomCta />

