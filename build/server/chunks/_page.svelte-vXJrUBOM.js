import { f as derived, n as ensure_array_like, l as attr, o as stringify, m as escape_html, v as onDestroy, b as attr_class, c as bind_props } from './index.js-D901Yk9D.js';
import { C as CATEGORIES, m as matchesCategory, a as getProductCategoryId } from './categories-UhpfUncc.js';
import { S as SEO } from './SEO2-CJwevJc4.js';
import 'clsx';
import './seo-mvhyA8fT.js';

//#region src/lib/sections/produk/ProdukHero.svelte
function ProdukHero($$renderer) {
	$$renderer.push(`<section class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none flex flex-col justify-end"><div class="absolute inset-0 w-full h-full pointer-events-none"><img src="/images/showcase-products.png" alt="Lini Mesin Percetakan Format Besar dan Manufaktur Industri ORIA" class="w-full h-full object-cover object-center lg:object-[center_45%]" loading="eager"/> <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/90 sm:via-black/40 sm:to-transparent"></div></div> <div class="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-16 sm:pb-20 lg:pb-24"><div class="max-w-7xl mx-auto w-full"><div class="space-y-3 sm:space-y-4 max-w-3xl"><h1 class="font-heading font-medium text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.16em] sm:tracking-[0.2em] uppercase text-[#334c54] leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]"><span class="block">ORIA</span> <span class="block mt-1 sm:mt-1.5">MACHINERY</span></h1> <div class="font-heading font-medium text-xs sm:text-sm md:text-base tracking-[0.28em] text-white uppercase pt-1 sm:pt-2 drop-shadow-md">INDUSTRIAL MACHINERY</div></div></div></div></section>`);
}
//#endregion
//#region src/lib/sections/produk/ProdukOverview.svelte
function ProdukOverview($$renderer) {
	$$renderer.push(`<section class="w-full bg-white text-black py-24 border-b border-black/10 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 select-none"><div class="max-w-4xl mx-auto text-center space-y-8 sm:space-y-10"><h2 class="font-heading font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.25em] sm:tracking-[0.3em] uppercase text-black leading-tight">INDUSTRIAL PRECISION<br/>MACHINERY</h2> <div class="space-y-6 sm:space-y-7 font-sans text-neutral-700 text-xs sm:text-sm md:text-base lg:text-[1.05rem] leading-relaxed max-w-3xl mx-auto font-normal"><p>ORIA menghadirkan rangkaian mesin percetakan digital format besar dan fabrikasi industri yang dirancang untuk kebutuhan produksi berkesinambungan. Mengutamakan kestabilan mekanik, akurasi komponen kelas industri, dan efisiensi operasional harian yang dapat diandalkan oleh para pelaku usaha di Indonesia.</p> <p class="text-neutral-400">Berikut adalah lini kategori mesin resmi ORIA yang siap mendukung akselerasi bengkel produksi, studio periklanan, dan pabrik konveksi Anda.</p></div> <div class="pt-8 sm:pt-12"><div class="font-mono text-xs sm:text-sm tracking-[0.3em] uppercase text-neutral-400">ORIA MACHINE CATEGORIES</div></div></div></section>`);
}
//#endregion
//#region src/lib/sections/produk/ProdukCategories.svelte
function ProdukCategories($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { products = [] } = $$props;
		$$renderer.push(`<section id="categories" class="w-full bg-white text-black py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none"><div class="max-w-7xl mx-auto"><div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10 sm:gap-12 lg:gap-16"><!--[-->`);
		const each_array = ensure_array_like(CATEGORIES);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let cat = each_array[$$index];
			const unitCount = products.filter((p) => matchesCategory(p, cat.id)).length;
			$$renderer.push(`<a${attr("href", `/produk/${stringify(cat.id)}`)} class="group block flex flex-col focus:outline-none cursor-pointer"><div class="w-full aspect-[4/3] overflow-hidden bg-white flex items-center justify-center p-5 sm:p-6 lg:p-7 relative"><img${attr("src", cat.cardImage)}${attr("alt", cat.alt)} class="w-full h-full object-contain scale-100 group-hover:scale-105 transition-transform duration-500 ease-out pointer-events-none select-none" loading="lazy"/></div> <div class="mt-5 space-y-2.5"><h3 class="font-heading font-medium text-base sm:text-lg lg:text-xl text-black uppercase tracking-[0.16em] group-hover:text-[#334c54] transition-colors leading-snug"><span class="animated-underline inline">${escape_html(cat.name)}</span></h3> <div class="inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] text-neutral-700 group-hover:text-[#334c54] transition-colors"><span>EXPLORE ${escape_html(unitCount > 0 ? `(${unitCount})` : "MACHINES")}</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></div></div></a>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/produk/ProdukFlagship.svelte
function ProdukFlagship($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { products = [], activeIndex = 0 } = $$props;
		const defaultModels = [
			{
				id: "uv",
				name: "UV FLATBED",
				tagline: "ORIA UV Flatbed A3",
				desc: "Presisi cetak mikron pada media datar akrilik, kayu, kaca, dan silinder.",
				image: "/images/showcase-products.png",
				href: "/produk/uv/oria-uv-flatbed-a3"
			},
			{
				id: "sublimasi",
				name: "SUBLIMASI",
				tagline: "ORIA Sublim 1902",
				desc: "Produksi massal jersey dan tekstil berkecepatan tinggi dengan saturasi warna pekat.",
				image: "/images/hero/sublim-oria-desktop.webp",
				href: "/produk/sublimasi/oria-sublim-1902"
			},
			{
				id: "outdoor",
				name: "OUTDOOR",
				tagline: "ORIA Outdoor 3204 ST",
				desc: "Cetak billboard dan baliho tahan cuaca ekstrem dengan sasis baja anti-vibrasi.",
				image: "/images/hero/outdoor-oria-desktop.webp",
				href: "/produk/outdoor/oria-outdoor-3204-st"
			},
			{
				id: "laser",
				name: "FIBER LASER",
				tagline: "ORIA Fiber Laser 3015",
				desc: "Pemotongan plat logam dan fabrikasi industri berdaya tinggi dengan akurasi presisi.",
				image: "/images/core-precision.jpg",
				href: "/produk/laser/oria-fiber-laser-3015"
			}
		];
		const models = derived(() => {
			if (products.length === 0) return defaultModels;
			const uvProd = products.find((p) => p.slug === "oria-uv-flatbed-a3") || products.find((p) => p.slug.includes("uv"));
			const sublimProd = products.find((p) => p.slug === "oria-sublim-1902" || p.slug === "oria-sublim-1804") || products.find((p) => p.slug.includes("sublim"));
			const outdoorProd = products.find((p) => p.slug === "oria-outdoor-3204-st") || products.find((p) => p.slug.includes("outdoor"));
			const laserProd = products.find((p) => p.slug === "oria-fiber-laser-3015" || p.slug === "oria-laser-cutting-6040") || products.find((p) => p.slug.includes("laser") && !p.slug.includes("uv"));
			const list = [];
			if (uvProd) list.push({
				id: "uv",
				name: "UV FLATBED",
				tagline: uvProd.name,
				desc: "Presisi cetak mikron pada media datar akrilik, kayu, kaca, dan silinder.",
				image: uvProd.mainImageDesktopUrl || uvProd.imageUrl || "/images/showcase-products.png",
				href: `/produk/${getProductCategoryId(uvProd)}/${uvProd.slug}`
			});
			if (sublimProd) list.push({
				id: "sublimasi",
				name: "SUBLIMASI",
				tagline: sublimProd.name,
				desc: "Produksi massal jersey dan tekstil berkecepatan tinggi dengan saturasi warna pekat.",
				image: sublimProd.mainImageDesktopUrl || sublimProd.imageUrl || "/images/hero/sublim-oria-desktop.webp",
				href: `/produk/${getProductCategoryId(sublimProd)}/${sublimProd.slug}`
			});
			if (outdoorProd) list.push({
				id: "outdoor",
				name: "OUTDOOR",
				tagline: outdoorProd.name,
				desc: "Cetak billboard dan baliho tahan cuaca ekstrem dengan sasis baja anti-vibrasi.",
				image: outdoorProd.mainImageDesktopUrl || outdoorProd.imageUrl || "/images/hero/outdoor-oria-desktop.webp",
				href: `/produk/${getProductCategoryId(outdoorProd)}/${outdoorProd.slug}`
			});
			if (laserProd) list.push({
				id: "laser",
				name: "FIBER LASER",
				tagline: laserProd.name,
				desc: "Pemotongan plat logam dan fabrikasi industri berdaya tinggi dengan akurasi presisi.",
				image: laserProd.mainImageDesktopUrl || laserProd.imageUrl || "/images/core-precision.jpg",
				href: `/produk/${getProductCategoryId(laserProd)}/${laserProd.slug}`
			});
			return list.length >= 3 ? list : defaultModels;
		});
		onDestroy(() => {});
		$$renderer.push(`<section id="flagship" class="relative w-full h-[92svh] min-h-[620px] max-h-[920px] bg-black text-white flex flex-col justify-between overflow-hidden select-none" aria-label="Flagship Industrial Machinery Showcase"><div class="absolute inset-0 w-full h-full pointer-events-none"><!--[-->`);
		const each_array = ensure_array_like(models());
		for (let index = 0, $$length = each_array.length; index < $$length; index++) {
			let model = each_array[index];
			$$renderer.push(`<div${attr_class(`absolute inset-0 transition-opacity duration-700 ease-in-out ${index === activeIndex ? "opacity-100" : "opacity-0"}`)}><img${attr("src", model.image)}${attr("alt", model.tagline)} class="w-full h-full object-cover object-center lg:object-[center_right] transform scale-100 transition-transform duration-1000 ease-out"${attr("loading", index === 0 ? "eager" : "lazy")}/></div>`);
		}
		$$renderer.push(`<!--]--> <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/85 sm:via-black/40 sm:to-black/20"></div></div> <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pt-10 sm:pt-14 lg:pt-16"><div class="flex flex-col items-start space-y-2.5 sm:space-y-3.5"><!--[-->`);
		const each_array_1 = ensure_array_like(models());
		for (let index = 0, $$length = each_array_1.length; index < $$length; index++) {
			let model = each_array_1[index];
			$$renderer.push(`<button type="button"${attr_class(`group text-left font-heading text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[0.25em] sm:tracking-[0.3em] transition-all duration-300 focus:outline-none cursor-pointer ${index === activeIndex ? "text-white font-normal opacity-100" : "text-neutral-400 font-light opacity-35 hover:opacity-75 hover:text-white"}`)}${attr("aria-pressed", index === activeIndex)}><span${attr_class(`block transition-transform duration-300 ${index === activeIndex ? "translate-x-1 sm:translate-x-2" : "group-hover:translate-x-1"}`)}>${escape_html(model.name)}</span></button>`);
		}
		$$renderer.push(`<!--]--></div></div> <div class="relative z-20 w-full max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 pb-10 sm:pb-14 lg:pb-16"><div class="flex flex-col md:flex-row md:items-end justify-between gap-6 sm:gap-8"><div class="max-w-xl"><p class="font-sans text-xs sm:text-sm lg:text-base text-neutral-200 leading-relaxed drop-shadow-md transition-all duration-500">${escape_html(models()[activeIndex].desc)}</p></div> <div class="flex-shrink-0"><a${attr("href", models()[activeIndex].href)} class="group inline-flex items-center gap-3 border border-white/80 hover:border-white px-7 sm:px-9 py-3 sm:py-3.5 text-xs sm:text-sm font-semibold uppercase tracking-[0.22em] text-white hover:bg-white hover:text-black transition-all duration-300 shadow-xl"><span>EXPLORE ${escape_html(models()[activeIndex].name)}</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div></div></div></section>`);
		bind_props($$props, { activeIndex });
	});
}
//#endregion
//#region src/routes/produk/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const products = derived(() => (data.products || []).filter((p) => !matchesCategory(p, "consumables")));
		const productCatalogSchema = derived(() => ({
			"@context": "https://schema.org",
			"@type": "CollectionPage",
			"@id": "https://oria.co.id/produk#webpage",
			url: "https://oria.co.id/produk",
			name: "Katalog Mesin Digital Printing & Presisi Industri ORIA",
			description: "Portofolio mesin industri ORIA: UV Flatbed, Sublimasi Tekstil, Laser Cutting, CNC Router, DTF, dan Outdoor Solvent.",
			inLanguage: "id-ID"
		}));
		SEO($$renderer, {
			title: "Katalog Mesin Digital Printing Industrial Lengkap | ORIA Indonesia",
			description: "Jelajahi portofolio lengkap mesin industri ORIA: UV Flatbed, Sublimasi Tekstil, Laser Cutting, CNC Router, DTF Apparel, Outdoor Solvent, dan Single Pass Packaging bergaransi resmi.",
			keywords: "katalog mesin digital printing, jual mesin industri oria, harga mesin uv flatbed, mesin dtf apparel, printer sublimasi jersey, mesin laser cutting oria, cnc router indonesia",
			canonical: "/produk",
			breadcrumbs: [{
				name: "Beranda",
				url: "/"
			}, {
				name: "Katalog Mesin",
				url: "/produk"
			}],
			customSchemas: [productCatalogSchema()]
		});
		$$renderer.push(`<!---->  `);
		ProdukHero($$renderer);
		$$renderer.push(`<!---->  `);
		ProdukOverview($$renderer);
		$$renderer.push(`<!---->  `);
		ProdukCategories($$renderer, { products: products() });
		$$renderer.push(`<!---->  `);
		ProdukFlagship($$renderer, { products: products() });
		$$renderer.push(`<!---->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-vXJrUBOM.js.map
