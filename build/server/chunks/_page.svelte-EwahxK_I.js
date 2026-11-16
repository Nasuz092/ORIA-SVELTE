import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-BpqUHnO2.js';
import './index.js-BxVGomsO.js';
import './seo-CemKI-RK.js';
import './article-categories-DqaHB1et.js';
import './SEO2-B40tJZSq.js';

//#region src/routes/artikel/[category]/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		ArtikelDetailView($$renderer, {
			article: data.article,
			relatedArticles: data.relatedArticles
		});
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-EwahxK_I.js.map
