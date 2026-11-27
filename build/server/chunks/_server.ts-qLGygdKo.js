import { f as fetchArticles } from './articles-DdMagt7z.js';
import { j as json } from './index.js-8yrHmazW.js';
import './products-fUw-zUZ0.js';
import 'clsx';

//#region src/routes/api/articles/+server.ts
var GET = async ({ url, fetch }) => {
	const limitParam = url.searchParams.get("limit");
	const articles = await fetchArticles(limitParam ? parseInt(limitParam, 10) : 10, fetch);
	return json({ data: articles });
};

export { GET };
//# sourceMappingURL=_server.ts-qLGygdKo.js.map
