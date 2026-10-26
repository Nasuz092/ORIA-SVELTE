import { error } from '@sveltejs/kit';
import type { PageServerLoad } from './$types';
import { fetchArticleBySlug, fetchArticles } from '$lib/api/articles';

export const load: PageServerLoad = async ({ params, fetch }) => {
  const { slug } = params;
  const article = await fetchArticleBySlug(slug, fetch);

  if (!article) {
    throw error(404, {
      message: `Artikel dengan judul '${slug}' tidak ditemukan atau sedang diperbarui.`
    });
  }

  const allArticles = await fetchArticles(4, fetch);
  const relatedArticles = allArticles.filter((a) => a.slug !== article.slug).slice(0, 3);

  return {
    article,
    relatedArticles
  };
};
