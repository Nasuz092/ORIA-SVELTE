import { o as stringify, l as attr, m as escape_html, n as ensure_array_like, f as derived } from './index.js-DcD1V7ot.js';
import { S as SEO } from './SEO2-BPmvT2Pi.js';
import 'clsx';
import './seo-mvhyA8fT.js';

//#region src/routes/produk/[kategori]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const category = derived(() => data.category);
		const products = derived(() => data.products || []);
		const categoryItemListSchema = derived(() => ({
			"@context": "https://schema.org",
			"@type": "ItemList",
			name: `Lini Mesin ${category().name} ORIA`,
			description: category().description,
			numberOfItems: products().length,
			itemListElement: products().map((p, idx) => ({
				"@type": "ListItem",
				position: idx + 1,
				name: p.name,
				url: `https://oria.co.id/produk/${category().id}/${p.slug}`
			}))
		}));
		SEO($$renderer, {
			title: `Mesin ${stringify(category().name)} ORIA | Spesifikasi, Harga & Garansi Resmi`,
			description: category().description,
			keywords: `mesin ${stringify(category().name.toLowerCase())}, jual mesin ${stringify(category().heroLine2.toLowerCase())}, spesifikasi mesin ${stringify(category().name.toLowerCase())} oria, mesin percetakan industri oria`,
			canonical: `/produk/${stringify(category().id)}`,
			image: category().heroImage,
			breadcrumbs: [
				{
					name: "Beranda",
					url: "/"
				},
				{
					name: "Produk",
					url: "/produk"
				},
				{
					name: category().name,
					url: `/produk/${category().id}`
				}
			],
			customSchemas: [categoryItemListSchema()]
		});
		$$renderer.push(`<!---->  <section class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none flex flex-col justify-end"><div class="absolute inset-0 w-full h-full pointer-events-none"><picture>`);
		if (category().heroImageMobile) $$renderer.push(`<!--[0--><source media="(max-width: 768px)"${attr("srcset", category().heroImageMobile)}/>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <img${attr("src", category().heroImage)}${attr("alt", category().name)} class="w-full h-full object-cover object-center lg:object-[center_45%]" loading="eager"/></picture> <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/90 sm:via-black/40 sm:to-transparent"></div></div> <div class="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24"><div class="max-w-7xl mx-auto w-full"><div class="space-y-3 sm:space-y-4 max-w-3xl"><h1 class="font-heading font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#334c54] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"><span class="block">${escape_html(category().heroLine1)}</span> <span class="block mt-1 sm:mt-1.5">${escape_html(category().heroLine2)}</span></h1> <div class="font-heading font-medium text-xs sm:text-sm md:text-base tracking-[0.28em] text-white uppercase pt-1 sm:pt-2 drop-shadow-md">${escape_html(category().heroSubtitle)}</div></div></div></div></section>  <section id="products-grid" class="w-full bg-white text-black py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none"><div class="max-w-7xl mx-auto"><div class="mb-12 sm:mb-16"><a href="/produk" class="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.25em] text-neutral-600 hover:text-black transition-colors group"><svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg> <span>ALL CATEGORIES</span></a></div> `);
		if (products().length > 0) {
			$$renderer.push(`<!--[0--><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16"><!--[-->`);
			const each_array = ensure_array_like(products());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let product = each_array[$$index];
				$$renderer.push(`<a${attr("href", `/produk/${stringify(category().id)}/${stringify(product.slug)}`)} class="group block flex flex-col focus:outline-none cursor-pointer"><div class="w-full aspect-square overflow-hidden bg-neutral-100 relative border border-neutral-200 shadow-sm"><img${attr("src", product.cardImageUrl || product.mainImageDesktopUrl || product.imageUrl)}${attr("alt", product.name)} class="w-full h-full object-cover object-center scale-100 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none select-none" loading="lazy"/></div> <div class="mt-5 space-y-2.5"><h2 class="font-heading font-medium text-base sm:text-lg lg:text-xl text-black uppercase tracking-[0.16em] transition-colors leading-snug"><span class="animated-underline inline">${escape_html(product.name)}</span></h2> <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700 group-hover:text-black transition-colors"><span>VIEW SPECIFICATIONS</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></div></div></a>`);
			}
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push(`<!--[-1--><div class="text-center py-20 space-y-4"><p class="font-heading text-lg sm:text-xl uppercase tracking-wider text-neutral-600">Belum ada produk terdaftar di kategori ini.</p> <a href="/produk" class="inline-flex items-center gap-2 text-xs uppercase tracking-widest text-black animated-underline"><span>LIHAT KATEGORI LAINNYA</span> <svg class="w-4 h-4 stroke-current" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div>`);
		$$renderer.push(`<!--]--></div></section>`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-D_NFrbeJ.js.map
