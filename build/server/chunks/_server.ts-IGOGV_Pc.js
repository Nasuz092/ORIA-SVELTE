import { f as fetchArticles } from './articles-BtcZnSZ0.js';
import { j as json } from './index.js-B1uOJ2s1.js';
import './products-BYJ_l6FB.js';
import 'clsx';

//#region src/routes/api/articles/+server.ts
var GET = async ({ url, fetch }) => {
	const limitParam = url.searchParams.get("limit");
	const articles = await fetchArticles(limitParam ? parseInt(limitParam, 10) : 10, fetch);
	return json({ data: articles });
};

export { GET };
//# sourceMappingURL=_server.ts-IGOGV_Pc.js.map
