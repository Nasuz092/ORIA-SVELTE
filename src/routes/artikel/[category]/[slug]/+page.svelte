<script lang="ts">
  import type { PageData } from './$types';
  import ArtikelDetailView from '$lib/sections/artikel/ArtikelDetailView.svelte';

  let { data }: { data: PageData } = $props();
</script>

<ArtikelDetailView article={data.article} relatedArticles={data.relatedArticles} />
