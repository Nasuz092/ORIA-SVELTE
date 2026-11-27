import 'clsx';
import { A as ArtikelDetailView } from './ArtikelDetailView-DIEVyLbZ.js';
import './index.js-DlI-SbMK.js';
import './seo-CKjj2Tup.js';
import './article-categories-DqaHB1et.js';
import './SEO2-BQU-2KnW.js';

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
//# sourceMappingURL=_page.svelte-TgOFO-HB.js.map
