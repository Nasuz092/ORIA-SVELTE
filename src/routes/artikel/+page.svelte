<script lang="ts">
  import type { PageData } from './$types';
  import ArtikelHero from '$lib/sections/artikel/ArtikelHero.svelte';
  import ArtikelCategories from '$lib/sections/artikel/ArtikelCategories.svelte';
  import ArtikelGrid from '$lib/sections/artikel/ArtikelGrid.svelte';

  let { data }: { data: PageData } = $props();
  let articles = $derived(data.articles || []);
  let selectedCategory = $state('ALL');

  function handleSelectCategory(cat: string) {
    selectedCategory = cat;
  }
</script>

<svelte:head>
  <title>ORIA Press & Editorial - Wawasan & Teknologi Percetakan Industri</title>
  <meta
    name="description"
    content="Pusat informasi dan edukasi resmi ORIA. Temukan panduan teknologi cetak UV, DTF, kalkulasi bisnis percetakan, dan tips teknis dari para ahli."
  />
</svelte:head>

<div class="w-full bg-[#050508] text-white">
  <!-- 1. Hero Section (Lotus Press Style - Purple/Dark Cinematic Hero) -->
  <ArtikelHero />

  <!-- 2. Category Cards Section ("lalu bawahnya adalah menampilkan card2 category2nya") -->
  <ArtikelCategories
    {articles}
    {selectedCategory}
    onSelectCategory={handleSelectCategory}
  />

  <!-- 3. Article Grid & Filter Tabs -->
  <ArtikelGrid
    {articles}
    {selectedCategory}
    onSelectCategory={handleSelectCategory}
  />
</div>

