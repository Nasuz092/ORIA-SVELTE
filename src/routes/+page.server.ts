import type { PageServerLoad } from './$types';
import { fetchArticles } from '$lib/api/articles';

export const load: PageServerLoad = async ({ fetch }) => {
  const articles = await fetchArticles(3, fetch);
  return {
    articles
  };
};
