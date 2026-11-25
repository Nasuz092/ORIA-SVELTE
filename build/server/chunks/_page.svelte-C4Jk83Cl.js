import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-BBKPMQvp.js';
import './index.js-BFUAE6mT.js';
import './seo-CemKI-RK.js';
import './article-categories-DqaHB1et.js';
import './SEO2-B4kv3Q-1.js';

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
//# sourceMappingURL=_page.svelte-C4Jk83Cl.js.map
