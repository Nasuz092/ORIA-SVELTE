import { h as head, m as escape_html, l as attr, x as html, n as ensure_array_like, f as derived } from './index.js-C39kzjK5.js';
import { D as DEFAULT_SEO, C as COMPANY_SCHEMA, W as WEBSITE_SCHEMA, a as SITE_NAVIGATION_SCHEMA, S as SITE_URL } from './seo-mvhyA8fT.js';

//#region src/lib/components/seo/SEO.svelte
function SEO($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { title = DEFAULT_SEO.title, description = DEFAULT_SEO.description, keywords = DEFAULT_SEO.keywords, canonical = "", image = DEFAULT_SEO.defaultImage, type = "website", breadcrumbs = [], productSchema = null, articleSchema = null, customSchemas = [] } = $$props;
		const canonicalUrl = derived(() => canonical ? canonical.startsWith("http") ? canonical : `${SITE_URL}${canonical.startsWith("/") ? canonical : `/${canonical}`}` : SITE_URL);
		const fullImageUrl = derived(() => image ? image.startsWith("http") ? image : `${SITE_URL}${image.startsWith("/") ? image : `/${image}`}` : DEFAULT_SEO.defaultImage);
		const breadcrumbSchema = derived(() => breadcrumbs.length > 0 ? {
			"@context": "https://schema.org",
			"@type": "BreadcrumbList",
			"@id": `${canonicalUrl()}#breadcrumb`,
			itemListElement: breadcrumbs.map((b, idx) => ({
				"@type": "ListItem",
				position: idx + 1,
				name: b.name,
				item: b.url.startsWith("http") ? b.url : `${SITE_URL}${b.url.startsWith("/") ? b.url : `/${b.url}`}`
			}))
		} : null);
		head("4zaoqz", $$renderer, ($$renderer) => {
			$$renderer.title(($$renderer) => {
				$$renderer.push(`<title>${escape_html(title)}</title>`);
			});
			$$renderer.push(`<meta name="title"${attr("content", title)}/> <meta name="description"${attr("content", description)}/> <meta name="keywords"${attr("content", keywords)}/> <meta name="robots"${attr("content", DEFAULT_SEO.robots)}/> <meta name="googlebot"${attr("content", DEFAULT_SEO.robots)}/> <link rel="canonical"${attr("href", canonicalUrl())}/> <link rel="alternate" hreflang="id"${attr("href", canonicalUrl())}/> <link rel="alternate" hreflang="x-default"${attr("href", canonicalUrl())}/> <meta property="og:type"${attr("content", type)}/> <meta property="og:url"${attr("content", canonicalUrl())}/> <meta property="og:title"${attr("content", title)}/> <meta property="og:description"${attr("content", description)}/> <meta property="og:image"${attr("content", fullImageUrl())}/> <meta property="og:locale"${attr("content", DEFAULT_SEO.locale)}/> <meta property="og:site_name"${attr("content", DEFAULT_SEO.siteName)}/> <meta name="twitter:card" content="summary_large_image"/> <meta name="twitter:url"${attr("content", canonicalUrl())}/> <meta name="twitter:title"${attr("content", title)}/> <meta name="twitter:description"${attr("content", description)}/> <meta name="twitter:image"${attr("content", fullImageUrl())}/> ${html(`<script type="application/ld+json">${JSON.stringify(COMPANY_SCHEMA)}<\/script>`)} ${html(`<script type="application/ld+json">${JSON.stringify(WEBSITE_SCHEMA)}<\/script>`)} ${html(`<script type="application/ld+json">${JSON.stringify(SITE_NAVIGATION_SCHEMA)}<\/script>`)} `);
			if (breadcrumbSchema()) $$renderer.push(`<!--[0-->${html(`<script type="application/ld+json">${JSON.stringify(breadcrumbSchema())}<\/script>`)}`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (productSchema) $$renderer.push(`<!--[0-->${html(`<script type="application/ld+json">${JSON.stringify(productSchema)}<\/script>`)}`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> `);
			if (articleSchema) $$renderer.push(`<!--[0-->${html(`<script type="application/ld+json">${JSON.stringify(articleSchema)}<\/script>`)}`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--> <!--[-->`);
			const each_array = ensure_array_like(customSchemas);
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let s = each_array[$$index];
				$$renderer.push(`${html(`<script type="application/ld+json">${JSON.stringify(s)}<\/script>`)}`);
			}
			$$renderer.push(`<!--]-->`);
		});
	});
}

export { SEO as S };
//# sourceMappingURL=SEO2-BcBCJk-k.js.map
