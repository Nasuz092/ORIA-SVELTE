import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-IxTb6IL7.js';
import './index.js-aSMWH6yT.js';
import './seo-CKjj2Tup.js';
import './article-categories-DqaHB1et.js';
import './SEO2-CM1Lk7pb.js';

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
//# sourceMappingURL=_page.svelte-BoVzTlBj.js.map
