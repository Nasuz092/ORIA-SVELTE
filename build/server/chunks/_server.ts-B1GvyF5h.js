import { f as fetchArticles } from './articles-BtcZnSZ0.js';
import { j as json } from './index.js-CI4d887i.js';
import './products-BYJ_l6FB.js';
import 'clsx';

//#region src/routes/api/articles/+server.ts
var GET = async ({ url, fetch }) => {
	const limitParam = url.searchParams.get("limit");
	const articles = await fetchArticles(limitParam ? parseInt(limitParam, 10) : 10, fetch);
	return json({ data: articles });
};

export { GET };
//# sourceMappingURL=_server.ts-B1GvyF5h.js.map
