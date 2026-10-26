import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchArticles, fetchArticleBySlug } from '$lib/api/articles';
import { getArticleCategory } from '$lib/data/article-categories';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { category: rawParam } = params;
  const catMeta = getArticleCategory(rawParam);

  if (catMeta) {
    const allArticles = await fetchArticles(50, fetch);
    const articles =
      catMeta.id === 'semua'
        ? allArticles
        : allArticles.filter(
            (a) => a.category.toLowerCase().trim() === catMeta.strapiName?.toLowerCase().trim()
          );

    return {
      mode: 'category' as const,
      category: catMeta,
      articles,
      article: null,
      relatedArticles: []
    };
  }

  // Backwards compatibility: Check if param is an article slug
  const article = await fetchArticleBySlug(rawParam, fetch);
  if (article) {
    const allArticles = await fetchArticles(4, fetch);
    const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

    return {
      mode: 'article' as const,
      category: null,
      articles: [],
      article,
      relatedArticles
    };
  }

  throw error(404, {
    message: `Kategori atau publikasi '${rawParam}' tidak ditemukan.`
  });
};
