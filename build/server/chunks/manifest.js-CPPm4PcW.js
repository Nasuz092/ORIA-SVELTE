const manifest = (() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["apple-touch-icon.png","favicon-16x16.png","favicon-192x192.png","favicon-32x32.png","favicon-48x48.png","favicon-512x512.png","favicon.ico","favicon.png","images/articles/article-business-guide.webp","images/articles/article-maintenance.webp","images/articles/article-uv-dtf.webp","images/articles/cetak_dtf_kulit_sintetis_5460c8fd7c.webp","images/articles/panduan_cetak_uv_3d_emboss_dan_braile_signage_60c1e562ff.webp","images/articles/photoprint_vs_onyx_vs_maintop_31ba2a848b.webp","images/categories/card-cnc.png","images/categories/card-cnc.webp","images/categories/card-dtf.png","images/categories/card-dtf.webp","images/categories/card-dtg.png","images/categories/card-dtg.webp","images/categories/card-indoor.png","images/categories/card-indoor.webp","images/categories/card-laser.png","images/categories/card-laser.webp","images/categories/card-outdoor.png","images/categories/card-outdoor.webp","images/categories/card-single-pass.png","images/categories/card-single-pass.webp","images/categories/card-sublimasi.png","images/categories/card-sublimasi.webp","images/categories/card-uv.png","images/categories/card-uv.webp","images/categories/cnc.png","images/categories/cnc.webp","images/categories/dtf.png","images/categories/dtf.webp","images/categories/dtg.png","images/categories/dtg.webp","images/categories/indoor.png","images/categories/indoor.webp","images/categories/laser.png","images/categories/laser.webp","images/categories/mobile/cnc.png","images/categories/mobile/cnc.webp","images/categories/mobile/dtf.png","images/categories/mobile/dtf.webp","images/categories/mobile/dtg.png","images/categories/mobile/dtg.webp","images/categories/mobile/indoor.png","images/categories/mobile/indoor.webp","images/categories/mobile/laser.png","images/categories/mobile/laser.webp","images/categories/mobile/outdoor.png","images/categories/mobile/outdoor.webp","images/categories/mobile/single-pass.png","images/categories/mobile/single-pass.webp","images/categories/mobile/sublimasi.png","images/categories/mobile/sublimasi.webp","images/categories/mobile/uv.png","images/categories/mobile/uv.webp","images/categories/outdoor.png","images/categories/outdoor.webp","images/categories/single-pass.png","images/categories/single-pass.webp","images/categories/sublimasi.png","images/categories/sublimasi.webp","images/categories/uv.png","images/categories/uv.webp","images/contact/hero-desktop.png","images/contact/hero-mobile.png","images/contact/how-can-we-do-better-clean.png","images/contact/how-can-we-do-better-clean.webp","images/contact/how-can-we-do-better-industrial.jpg","images/contact/how-can-we-do-better-industrial.webp","images/contact/how-can-we-do-better-original.png","images/core-precision.jpg","images/engineering-excellence.png","images/engineering-excellence.webp","images/hero/indoor-oria-mobile.png","images/hero/indoor-oria-mobile.webp","images/hero/indoor-oria.png","images/hero/indoor-oria.webp","images/hero/outdoor-oria-desktop.png","images/hero/outdoor-oria-desktop.webp","images/hero/outdoor-oria-mobile.png","images/hero/outdoor-oria-mobile.webp","images/hero/slide-1.webp","images/hero/slide-2.webp","images/hero/slide-3.webp","images/hero/slide-outdoor.webp","images/hero/slide-sublimasi.webp","images/hero/slide-uv-rotary.webp","images/hero/sublim-oria-desktop.png","images/hero/sublim-oria-desktop.webp","images/hero/sublim-oria-mobile.png","images/hero/sublim-oria-mobile.webp","images/indoor.webp","images/oria-contact-hero.jpg","images/oria-logo-hd.png","images/our-drive-showroom.png","images/our-drive-workshop.png","images/our-legacy.jpg","images/our-machines-detail.jpg","images/showcase-about.png","images/showcase-products.png","images/why-oria-bg.webp","llms-full.txt","llms.txt","robots.txt","sitemap.xsl"]),
	mimeTypes: {".png":"image/png",".webp":"image/webp",".jpg":"image/jpeg",".txt":"text/plain",".xsl":"application/xml"},
	_: {
		client: {start:"_app/immutable/entry/start.BE5sHnIX.js",app:"_app/immutable/entry/app.Q3GzWdq9.js",imports:["_app/immutable/entry/start.BE5sHnIX.js","_app/immutable/chunks/MUPYsY1h.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/entry/app.Q3GzWdq9.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/chunks/xihTtKlq.js"],stylesheets:[],fonts:[],uses_env_dynamic_public:false},
		nodes: [
			__memo(() => import('./0-CxjShb4F.js')),
			__memo(() => import('./1-I9lfeIaA.js')),
			__memo(() => import('./2-k7UhlG1L.js')),
			__memo(() => import('./3-De8DTLP7.js')),
			__memo(() => import('./4-DrUHaggQ.js')),
			__memo(() => import('./5-CNJe6bTq.js')),
			__memo(() => import('./6-RS3DIzWH.js')),
			__memo(() => import('./7-D1TPVPl7.js')),
			__memo(() => import('./8-B7A0G4cS.js')),
			__memo(() => import('./9-B686Xuje.js')),
			__memo(() => import('./10-VmsZTNM0.js')),
			__memo(() => import('./11-Dra1p7H5.js')),
			__memo(() => import('./12-iHSWMMFM.js')),
			__memo(() => import('./13-B337bBOD.js')),
			__memo(() => import('./14-Dk_TIlew.js'))
		],
		remotes: {
			
		},
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			},
			{
				id: "/api/articles",
				pattern: /^\/api\/articles\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-Du085T7x.js'))
			},
			{
				id: "/api/img",
				pattern: /^\/api\/img\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-CU0czLGy.js'))
			},
			{
				id: "/artikel",
				pattern: /^\/artikel\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 3 },
				endpoint: null
			},
			{
				id: "/artikel/[category]",
				pattern: /^\/artikel\/([^/]+?)\/?$/,
				params: [{"name":"category","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 4 },
				endpoint: null
			},
			{
				id: "/artikel/[category]/[slug]",
				pattern: /^\/artikel\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"category","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 5 },
				endpoint: null
			},
			{
				id: "/category-sitemap.xml",
				pattern: /^\/category-sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-rBVAU897.js'))
			},
			{
				id: "/cookie-statement",
				pattern: /^\/cookie-statement\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 6 },
				endpoint: null
			},
			{
				id: "/kontak",
				pattern: /^\/kontak\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 7 },
				endpoint: null
			},
			{
				id: "/landing-ads",
				pattern: /^\/landing-ads\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 8 },
				endpoint: null
			},
			{
				id: "/page-sitemap.xml",
				pattern: /^\/page-sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-CgHtUMKY.js'))
			},
			{
				id: "/post-sitemap.xml",
				pattern: /^\/post-sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-DpS4ttIr.js'))
			},
			{
				id: "/privacy",
				pattern: /^\/privacy\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 9 },
				endpoint: null
			},
			{
				id: "/product-sitemap.xml",
				pattern: /^\/product-sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-SA7oqGp2.js'))
			},
			{
				id: "/produk",
				pattern: /^\/produk\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 10 },
				endpoint: null
			},
			{
				id: "/produk/[kategori]",
				pattern: /^\/produk\/([^/]+?)\/?$/,
				params: [{"name":"kategori","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 11 },
				endpoint: null
			},
			{
				id: "/produk/[kategori]/[slug]",
				pattern: /^\/produk\/([^/]+?)\/([^/]+?)\/?$/,
				params: [{"name":"kategori","optional":false,"rest":false,"chained":false},{"name":"slug","optional":false,"rest":false,"chained":false}],
				page: { layouts: [0,], errors: [1,], leaf: 12 },
				endpoint: null
			},
			{
				id: "/sitemap.xml",
				pattern: /^\/sitemap\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-CnjrY9qz.js'))
			},
			{
				id: "/sitemap_index.xml",
				pattern: /^\/sitemap_index\.xml\/?$/,
				params: [],
				page: null,
				endpoint: __memo(() => import('./_server.ts-CzP3XLg1.js'))
			},
			{
				id: "/tentang",
				pattern: /^\/tentang\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 13 },
				endpoint: null
			},
			{
				id: "/terms-conditions",
				pattern: /^\/terms-conditions\/?$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 14 },
				endpoint: null
			},
			{
				id: "/uploads/[...file]",
				pattern: /^\/uploads(?:\/([^]*))?\/?$/,
				params: [{"name":"file","optional":false,"rest":true,"chained":true}],
				page: null,
				endpoint: __memo(() => import('./_server.ts-Bq2ijCD1.js'))
			}
		],
		prerendered_routes: new Set([]),
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})();

export { manifest as m };
//# sourceMappingURL=manifest.js-CPPm4PcW.js.map
