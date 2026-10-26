<script lang="ts">
  import type { PageData } from './$types';
  import ArtikelCategoryView from '$lib/sections/artikel/ArtikelCategoryView.svelte';
  import ArtikelDetailView from '$lib/sections/artikel/ArtikelDetailView.svelte';

  let { data }: { data: PageData } = $props();
</script>

{#if data.mode === 'category' && data.category}
  <ArtikelCategoryView category={data.category} articles={data.articles} />
{:else if data.mode === 'article' && data.article}
  <ArtikelDetailView article={data.article} relatedArticles={data.relatedArticles} />
{/if}
