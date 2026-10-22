import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { fetchArticles } from '$lib/api/articles';

export const GET: RequestHandler = async ({ url, fetch }) => {
  const limitParam = url.searchParams.get('limit');
  const limit = limitParam ? parseInt(limitParam, 10) : 10;
  const articles = await fetchArticles(limit, fetch);
  return json({ data: articles });
};
