import { f as derived, v as onDestroy, n as ensure_array_like, l as attr, m as escape_html, o as stringify, b as attr_class, w as attr_style } from './index.js-BXmXndgO.js';
import './products-BYJ_l6FB.js';
import { m as matchesCategory, a as getProductCategoryId } from './categories-UhpfUncc.js';
import { S as SEO } from './SEO2-Cftxb85s.js';
import 'siema';
import 'clsx';
import './seo-mvhyA8fT.js';

//#region src/lib/sections/homepage/Hero.svelte
function Hero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const slides = [
			{
				id: "outdoor",
				line1: "ORIA",
				line2: "OUTDOOR 3204 ST",
				desc1: "Standar Baru Digital Printing Outdoor Skala Industri.",
				desc2: "Kecepatan Cetak Tinggi, Presisi, dan Tahan Cuaca Ekstrem.",
				ctaText: "DISCOVER",
				ctaHref: "/produk/outdoor/oria-outdoor-3204-st",
				desktopImage: "/images/hero/outdoor-oria-desktop.webp",
				mobileImage: "/images/hero/outdoor-oria-mobile.webp",
				alt: "Mesin Digital Printing Outdoor ORIA 3204 ST"
			},
			{
				id: "indoor",
				line1: "ORIA",
				line2: "INDOOR 3202",
				desc1: "Mesin Cetak Indoor Resolusi Tinggi & Detail Tajam.",
				desc2: "Kualitas Cetak Halus, Warna Akurat, dan Efisiensi Maksimal.",
				ctaText: "DISCOVER",
				ctaHref: "/produk/indoor/oria-indoor-3202",
				desktopImage: "/images/hero/indoor-oria.webp",
				mobileImage: "/images/hero/indoor-oria-mobile.webp",
				alt: "Mesin Digital Printing Indoor ORIA 3202"
			},
			{
				id: "sublimasi",
				line1: "ORIA",
				line2: "SUBLIM 1902",
				desc1: "Inovasi Percetakan Tekstil & Apparel Masa Depan.",
				desc2: "Gradasi Warna Tajam, Efisiensi Tinta, dan Konsistensi Produksi Massal.",
				ctaText: "DISCOVER",
				ctaHref: "/produk/sublimasi/oria-sublim-1902",
				desktopImage: "/images/hero/sublim-oria-desktop.webp",
				mobileImage: "/images/hero/sublim-oria-mobile.webp",
				alt: "Mesin Textile Printing Sublimasi ORIA 1902"
			}
		];
		const carouselSlides = derived(() => {
			let list = [...slides];
			while (list.length < 8) list = [...list, ...slides];
			return list;
		});
		let current = 0;
		onDestroy(() => {
		});
		$$renderer.push(`<section class="relative w-full h-[100svh] min-h-[580px] bg-black text-white overflow-hidden select-none" aria-roledescription="carousel" aria-label="Hero Slider ORIA"><div class="w-full h-full"><!--[-->`);
		const each_array = ensure_array_like(carouselSlides());
		for (let i = 0, $$length = each_array.length; i < $$length; i++) {
			let slide = each_array[i];
			$$renderer.push(`<div class="relative w-full h-[100svh] min-h-[580px] overflow-hidden select-none"><picture class="w-full h-full block pointer-events-none select-none"><source media="(max-width: 767px)"${attr("srcset", slide.mobileImage)}/> <img${attr("src", slide.desktopImage)}${attr("alt", slide.alt)} draggable="false" class="w-full h-full object-cover object-center pointer-events-none select-none"${attr("loading", i < 2 ? "eager" : "lazy")}/></picture> <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/85 sm:via-black/40 sm:to-transparent pointer-events-none z-10"></div> <div class="absolute inset-0 z-20 pointer-events-none px-6 sm:px-10 lg:px-16"><div class="w-full h-full max-w-7xl mx-auto flex flex-col justify-end pb-14 sm:pb-16 lg:pb-20"><div class="max-w-lg pointer-events-auto space-y-3 sm:space-y-4"><div class="font-heading font-black text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] tracking-[0.18em] sm:tracking-[0.22em] leading-tight text-[#FFE500] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)]"><div>${escape_html(slide.line1)}</div> <div class="mt-0.5 sm:mt-1">${escape_html(slide.line2)}</div></div> <div class="font-sans text-xs sm:text-sm text-white/95 leading-relaxed max-w-md font-medium drop-shadow-[0_1px_6px_rgba(0,0,0,0.95)]"><p>${escape_html(slide.desc1)}</p> <p>${escape_html(slide.desc2)}</p></div> <div class="pt-1.5 sm:pt-2"><a${attr("href", slide.ctaHref)} class="inline-flex items-center gap-2 bg-[#FFE500] hover:bg-[#ffe500]/90 text-black font-heading font-black text-[11px] sm:text-xs uppercase tracking-widest px-6 sm:px-8 py-2.5 sm:py-3 transition-all shadow-xl cursor-pointer"><span>${escape_html(slide.ctaText)}</span> <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5]" fill="none" viewBox="0 0 24 24"><polyline points="9 18 15 12 9 6"></polyline></svg></a></div></div></div></div></div>`);
		}
		$$renderer.push(`<!--]--></div> <div class="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2.5 pointer-events-auto"><!--[-->`);
		const each_array_1 = ensure_array_like(slides);
		for (let i = 0, $$length = each_array_1.length; i < $$length; i++) {
			each_array_1[i];
			$$renderer.push(`<button type="button" class="py-2 px-1 focus:outline-none cursor-pointer group"${attr("aria-label", `Menuju Slide ${stringify(i + 1)}`)}><span${attr_class(`block h-1.5 rounded-full transition-all duration-300 drop-shadow-md ${current === i ? "w-7 bg-[#FFE500]" : "w-2 bg-white/70 group-hover:bg-white"}`)}></span></button>`);
		}
		$$renderer.push(`<!--]--></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/homepage/BrandManifesto.svelte
function BrandManifesto($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none overflow-hidden"><div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start"><div class="lg:col-span-5 space-y-1 transition-transform duration-150 ease-out will-change-transform"${attr_style(`transform: translate3d(0, ${stringify(0)}px, 0);`)}><h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.22em] sm:tracking-[0.26em] uppercase leading-[1.15] text-white"><span class="block">ENGINEERED</span> <span class="block mt-1 sm:mt-2">FOR INDUSTRY</span></h2></div> <div class="lg:col-span-7 space-y-6 sm:space-y-8 font-sans text-sm sm:text-base lg:text-[1.05rem] text-white/90 leading-relaxed font-normal max-w-2xl"><p>ORIA menghadirkan ekosistem teknologi cetak digital dan fabrikasi berstandar industri untuk mendukung lini produksi modern yang menuntut keandalan tinggi.</p> <p class="font-medium text-white">Dirancang dengan arsitektur mekanis kelas berat, setiap unit menggabungkan akurasi mikron, kecepatan throughput tinggi, dan ketangguhan operasional nonstop 24/7.</p> <p class="text-white/80">Standar rekayasa presisi untuk meningkatkan efisiensi dan skala kapasitas bisnis Anda — <span class="text-white font-semibold tracking-wide">Engineered for Industry.</span></p></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/homepage/BrandVision.svelte
function BrandVision($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="relative w-full min-h-[580px] sm:min-h-[640px] lg:min-h-[750px] flex items-center overflow-hidden bg-black select-none px-6 sm:px-10 lg:px-16"><div class="absolute inset-0 w-full h-full"><img src="/images/our-drive-workshop.png" alt="Workshop Mesin Cetak Format Lebar Industrial ORIA" class="w-full h-full object-cover object-center lg:object-[center_40%]" loading="lazy"/> <div class="absolute inset-0 bg-gradient-to-r from-black/55 via-black/25 to-transparent sm:from-black/80 sm:via-black/30 sm:to-transparent"></div></div> <div class="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-24"><div class="max-w-xl sm:max-w-2xl space-y-4 sm:space-y-6 transition-transform duration-150 ease-out will-change-transform"${attr_style(`transform: translate3d(0, ${stringify(0)}px, 0);`)}><h2 class="font-heading font-medium text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.25em] text-white leading-tight drop-shadow-md">OUR DEDICATION</h2> <p class="font-sans text-sm sm:text-base lg:text-[1.05rem] text-white/90 leading-relaxed font-normal max-w-lg drop-shadow-sm">Memasuki era baru teknologi percetakan industri, ORIA berkomitmen memperkuat standar kepeloporan dan presisi tinggi yang melandasi setiap inovasi mesin kami—di masa lalu, kini, dan masa depan.</p> <div class="pt-2 sm:pt-4"><a href="/tentang" class="inline-flex items-center gap-3 px-7 sm:px-8 py-3.5 sm:py-4 border border-white text-white hover:bg-white hover:text-black font-sans text-xs sm:text-sm font-semibold uppercase tracking-[0.2em] transition-all duration-300 backdrop-blur-xs group"><span>OUR VISION</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/homepage/DualShowcase.svelte
function DualShowcase($$renderer) {
	$$renderer.push(`<section class="w-full bg-black text-white py-16 sm:py-24 lg:py-32 px-6 sm:px-10 lg:px-16 select-none"><div class="max-w-7xl mx-auto"><div class="mb-8 sm:mb-12 lg:mb-16"><h2 class="font-heading font-light text-xs sm:text-sm lg:text-base tracking-[0.25em] sm:tracking-[0.3em] uppercase text-white/90">THE FUTURE OF INDUSTRIAL PRECISION</h2></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14"><a href="/produk" class="group block flex flex-col focus:outline-none"><div class="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/10"><img src="/images/showcase-products.png" alt="ORIA UV Flatbed Printer Workshop" class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy"/> <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div></div> <div class="mt-6 flex flex-col flex-1 justify-between"><div><h3 class="font-heading font-medium text-xl sm:text-2xl text-white group-hover:text-[#FFE500] transition-colors">Industrial Machine Lineup</h3> <p class="mt-2.5 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg">Eksplorasi jajaran mesin digital printing berkecepatan tinggi, UV Flatbed presisi, DTF modern, dan Laser Cutting untuk skala industri.</p></div> <div class="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white group-hover:text-[#FFE500] transition-colors"><span>EXPLORE PRODUCTS</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></div></div></a> <a href="/tentang" class="group block flex flex-col focus:outline-none"><div class="relative w-full aspect-[16/10] overflow-hidden bg-neutral-900 border border-white/10"><img src="/images/showcase-about.png" alt="Industrial ORIA Wall Signage - Fasilitas Resmi ORIA" class="w-full h-full object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy"/> <div class="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors duration-500"></div></div> <div class="mt-6 flex flex-col flex-1 justify-between"><div><h3 class="font-heading font-medium text-xl sm:text-2xl text-white flex items-center gap-2 sm:gap-2.5"><span class="group-hover:text-[#FFE500] transition-colors duration-300">About</span> <span class="inline-block h-5 sm:h-6 aspect-[2101/666] bg-white group-hover:bg-[#FFE500] transition-colors duration-300" style="-webkit-mask-image: url('/images/oria-logo-hd.png'); mask-image: url('/images/oria-logo-hd.png'); -webkit-mask-size: contain; mask-size: contain; -webkit-mask-repeat: no-repeat; mask-repeat: no-repeat; -webkit-mask-position: center; mask-position: center;" role="img" aria-label="ORIA"></span></h3> <p class="mt-2.5 font-sans text-xs sm:text-sm text-neutral-400 leading-relaxed max-w-lg">Komitmen rekayasa mesin berdurabilitas tinggi, ketersediaan suku cadang resmi, serta layanan teknisi ahli di seluruh wilayah Indonesia.</p></div> <div class="mt-5 inline-flex items-center gap-2 text-xs sm:text-sm font-semibold uppercase tracking-[0.18em] text-white group-hover:text-[#FFE500] transition-colors"><span>DISCOVER ORIA</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></div></div></a></div></div></section>`);
}
//#endregion
//#region src/lib/sections/homepage/CategoryPreview.svelte
function CategoryPreview($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { products = [] } = $$props;
		const baseCategories = [
			{
				id: "outdoor",
				title: "Outdoor Printing",
				defaultTagline: "ORIA OUTDOOR 3204 ST",
				defaultDesc: "Mesin cetak spanduk flexi, baliho, dan billboard heavy-duty tahan cuaca ekstrem.",
				defaultHref: "/produk/outdoor/oria-outdoor-3204-st",
				image: "/images/categories/outdoor.webp",
				imgClass: "max-h-[160px] sm:max-h-[200px] md:max-h-[235px] lg:max-h-[255px] max-w-[98%]",
				ctaText: "DISCOVER"
			},
			{
				id: "uv",
				title: "UV Printing",
				defaultTagline: "ORIA UV FLATBED A3",
				defaultDesc: "Presisi cetak tinggi untuk media datar akrilik, kayu, kaca, dan merchandise.",
				defaultHref: "/produk/uv/oria-uv-flatbed-a3",
				image: "/images/categories/uv.webp",
				imgClass: "max-h-[175px] sm:max-h-[220px] md:max-h-[255px] lg:max-h-[275px] max-w-[85%]",
				ctaText: "DISCOVER"
			},
			{
				id: "sublimasi",
				title: "Sublimasi Textile",
				defaultTagline: "ORIA SUBLIM 1902",
				defaultDesc: "Inovasi cetak tekstil berkecepatan tinggi untuk apparel, jersey, dan fashion.",
				defaultHref: "/produk/sublimasi/oria-sublim-1902",
				image: "/images/categories/sublimasi.webp",
				imgClass: "max-h-[170px] sm:max-h-[215px] md:max-h-[250px] lg:max-h-[270px] max-w-[95%]",
				ctaText: "DISCOVER"
			},
			{
				id: "laser",
				title: "Laser Cutting",
				defaultTagline: "ORIA LASER CUTTING 6040",
				defaultDesc: "Potong dan grafir akrilik, kayu, MDF, dan souvenir dengan presisi tabung CO2 stabil.",
				defaultHref: "/produk/laser/oria-laser-cutting-6040",
				image: "/images/categories/laser.webp",
				imgClass: "max-h-[170px] sm:max-h-[215px] md:max-h-[250px] lg:max-h-[270px] max-w-[85%]",
				ctaText: "DISCOVER"
			},
			{
				id: "dtf",
				title: "DTF Printing",
				defaultTagline: "ORIA DTF 6004",
				defaultDesc: "Solusi transfer film otomatis untuk custom apparel dan sablon kaos massal.",
				defaultHref: "/produk/dtf/oria-dtf-6004",
				image: "/images/categories/dtf.webp",
				imgClass: "max-h-[175px] sm:max-h-[220px] md:max-h-[255px] lg:max-h-[275px] max-w-[85%]",
				ctaText: "DISCOVER"
			},
			{
				id: "dtg",
				title: "DTG Garment",
				defaultTagline: "ORIA DTG OR-DTG02",
				defaultDesc: "Cetak langsung ke kaos katun dan garmen tanpa transfer paper dengan tinta pigment tekstil.",
				defaultHref: "/produk/dtg/oria-dtg-or-dtg02",
				image: "/images/categories/dtg.webp",
				imgClass: "max-h-[175px] sm:max-h-[220px] md:max-h-[255px] lg:max-h-[275px] max-w-[85%]",
				ctaText: "DISCOVER"
			},
			{
				id: "indoor",
				title: "Indoor Printing",
				defaultTagline: "ORIA INDOOR 3202",
				defaultDesc: "Hasil cetak foto, poster, sticker, dan POSM display beresolusi tajam hingga lebar 3,2 meter.",
				defaultHref: "/produk/indoor/oria-indoor-3202",
				image: "/images/categories/indoor.webp",
				imgClass: "max-h-[170px] sm:max-h-[215px] md:max-h-[250px] lg:max-h-[270px] max-w-[95%]",
				ctaText: "DISCOVER"
			},
			{
				id: "cnc",
				title: "CNC Router",
				defaultTagline: "ORIA CNC 6090",
				defaultDesc: "Fabrikasi presisi logam, akrilik, reklame huruf timbul, dan panel dengan area kerja 60x90cm.",
				defaultHref: "/produk/cnc/oria-cnc-metal-6090",
				image: "/images/categories/cnc.webp",
				imgClass: "max-h-[175px] sm:max-h-[220px] md:max-h-[255px] lg:max-h-[275px] max-w-[75%]",
				ctaText: "DISCOVER"
			}
		];
		const categories = derived(() => {
			return baseCategories.map((cat) => {
				const targetSlug = cat.defaultHref.split("/").pop()?.toLowerCase();
				const match = products.find((p) => p.slug.toLowerCase() === targetSlug) || products.find((p) => p.name.toLowerCase() === cat.defaultTagline.toLowerCase()) || products.find((p) => matchesCategory(p, cat.id) && (cat.id !== "uv" || p.name.toLowerCase().includes("flatbed"))) || products.find((p) => matchesCategory(p, cat.id));
				const count = products.filter((p) => matchesCategory(p, cat.id)).length;
				return {
					id: cat.id,
					title: cat.title,
					tagline: match ? match.name : cat.defaultTagline,
					desc: cat.defaultDesc,
					href: match ? `/produk/${getProductCategoryId(match)}/${match.slug}` : cat.defaultHref,
					image: cat.image,
					imgClass: cat.imgClass,
					ctaText: "DISCOVER",
					count
				};
			});
		});
		const carouselSlides = derived(() => [
			...categories(),
			...categories(),
			...categories()
		]);
		let activeIndex = 0;
		let currentCategoryIndex = 0;
		onDestroy(() => {});
		let activeCategory = derived(() => categories()[currentCategoryIndex]);
		$$renderer.push(`<section class="relative w-full bg-white text-black pt-10 pb-14 sm:pt-12 sm:pb-16 lg:pt-14 lg:pb-20 overflow-hidden select-none"><div class="text-center mb-6 sm:mb-8"><h2 class="font-heading font-bold text-base sm:text-lg lg:text-xl uppercase tracking-[0.3em] text-neutral-800">OUR MODELS</h2></div> <div class="relative w-full max-w-7xl mx-auto h-[210px] sm:h-[260px] md:h-[290px] lg:h-[320px] px-2 sm:px-6 flex items-center justify-center"><div class="siema-carousel w-[82vw] sm:w-[70vw] md:w-[60vw] lg:w-[54vw] max-w-3xl h-full mx-auto cursor-grab active:cursor-grabbing"><!--[-->`);
		const each_array = ensure_array_like(carouselSlides());
		for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
			let cat = each_array[idx];
			$$renderer.push(`<div${attr_class(`w-full h-full flex-shrink-0 px-2 sm:px-4 md:px-6 transition-all duration-500 ${idx === activeIndex ? "opacity-100 scale-100" : "opacity-35 sm:opacity-45 scale-[0.88]"}`)}><div class="relative w-full h-full flex items-center justify-center"><img${attr("src", cat.image)}${attr("alt", cat.title)}${attr_class(`w-auto object-contain select-none pointer-events-none transition-transform duration-500 ${stringify(cat.imgClass)}`)} draggable="false" loading="lazy"/></div></div>`);
		}
		$$renderer.push(`<!--]--></div>  <button type="button" class="absolute left-2 sm:left-4 lg:left-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 border-2 border-neutral-300 hover:border-[#FFE500] bg-transparent text-neutral-800 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none group" aria-label="Model Sebelumnya"><svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg></button> <button type="button" class="absolute right-2 sm:right-4 lg:right-8 top-1/2 -translate-y-1/2 z-20 w-10 h-10 sm:w-12 sm:h-12 border-2 border-neutral-300 hover:border-[#FFE500] bg-transparent text-neutral-800 hover:text-[#FFE500] flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none group" aria-label="Model Berikutnya"><svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke-width="2.5"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></button></div> `);
		if (activeCategory()) $$renderer.push(`<!--[0--><div class="mt-6 sm:mt-8 text-center flex flex-col items-center px-6"><h3 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.16em] text-neutral-900 transition-all duration-300">${escape_html(activeCategory().tagline)}</h3> <p class="mt-2 font-sans text-sm sm:text-base lg:text-[17px] text-neutral-600 font-normal max-w-xl mx-auto leading-relaxed transition-all duration-300">${escape_html(activeCategory().desc)}</p> <div class="mt-5 sm:mt-6"><a${attr("href", activeCategory().href)} class="inline-flex items-center gap-2.5 px-10 sm:px-12 py-3.5 sm:py-4 border border-black text-black hover:bg-black hover:text-white font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-all duration-300 group bg-transparent"><span>${escape_html(activeCategory().ctaText)}</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div></div>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></section>`);
	});
}
//#endregion
//#region src/lib/sections/homepage/EngineeringExcellence.svelte
function EngineeringExcellence($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section class="relative w-full min-h-[480px] sm:min-h-[540px] lg:min-h-[620px] flex items-center overflow-hidden bg-neutral-950 text-white select-none px-6 sm:px-10 lg:px-16"><picture class="absolute inset-0 w-full h-full pointer-events-none"><source srcset="/images/engineering-excellence.webp" type="image/webp"/> <img src="/images/engineering-excellence.png" alt="Standar Rekayasa Presisi Mesin Industri ORIA" class="w-full h-full object-cover object-center lg:object-[center_35%] scale-100 transition-transform duration-1000 ease-out hover:scale-105" loading="lazy"/></picture> <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/90 sm:via-black/55 sm:to-black/25 pointer-events-none"></div> <div class="relative z-10 w-full max-w-7xl mx-auto py-16 sm:py-20 lg:py-24"><div class="max-w-xl sm:max-w-2xl space-y-5 sm:space-y-6 transition-transform duration-150 ease-out will-change-transform"${attr_style(`transform: translate3d(0, ${stringify(0)}px, 0);`)}><h2 class="font-heading font-bold text-3xl sm:text-4xl lg:text-5xl uppercase tracking-[0.22em] text-white leading-[1.15]">LEADING THE WAY</h2> <p class="font-sans text-sm sm:text-base lg:text-[17px] text-neutral-300 font-normal leading-relaxed max-w-lg">Standar rekayasa industri mutakhir pada setiap unit mesin ORIA memastikan stabilitas dan presisi mikron untuk lini produksi manufaktur tanpa henti.</p> <div class="pt-2 sm:pt-4"><a href="/tentang" class="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 border border-white text-white hover:bg-white hover:text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.25em] transition-all duration-300 group bg-transparent focus:outline-none"><span>LEARN MORE</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/homepage/LatestArticles.svelte
function LatestArticles($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { articles: initialArticles = [] } = $$props;
		const defaultArticles = [
			{
				title: "Panduan Cetak DTF pada Kulit Sintetis (PU/PVC)",
				desc: "Setting temperatur heat press, pemilihan powder elastis anti-retak, dan perhitungan HPP produksi skala industri.",
				href: "/artikel/panduan-cetak-dtf-kulit-sintetis-pu-pvc-oscar-setting-suhu-hpp",
				imageUrl: "/images/articles/cetak_dtf_kulit_sintetis_5460c8fd7c.webp",
				ctaText: "PANDUAN DTF"
			},
			{
				title: "Panduan Cetak UV 3D Emboss & Braille Signage",
				desc: "Cara setting layering varnish, height sensor presisi tinggi, dan analisa margin keuntungan tinggi untuk produk custom signage.",
				href: "/artikel/panduan-cetak-uv-3d-emboss-braille-signage-layering-varnish-height-sensor-hpp",
				imageUrl: "/images/articles/panduan_cetak_uv_3d_emboss_dan_braile_signage_60c1e562ff.webp",
				ctaText: "TEKNOLOGI UV"
			},
			{
				title: "Perbandingan RIP Software Photoprint, Onyx & MainTop",
				desc: "Optimasi profil warna tinta ICC profile untuk efisiensi biaya produksi (HPP) hingga 25% tanpa menurunkan ketajaman warna.",
				href: "/artikel/perbandingan-rip-software-photoprint-onyx-maintop-efisiensi-hpp",
				imageUrl: "/images/articles/photoprint_vs_onyx_vs_maintop_31ba2a848b.webp",
				ctaText: "OPTIMASI RIP"
			}
		];
		let clientArticles = [];
		let articles = derived(() => {
			if (initialArticles && initialArticles.length > 0) return initialArticles.map((a) => ({
				title: a.title,
				desc: a.excerpt,
				href: `/artikel/${a.slug}`,
				imageUrl: a.imageUrl,
				ctaText: a.ctaText
			}));
			if (clientArticles && clientArticles.length > 0) return clientArticles;
			return defaultArticles;
		});
		$$renderer.push(`<section class="w-full bg-white text-black pt-14 pb-20 sm:pt-16 sm:pb-24 lg:pt-20 lg:pb-28 select-none px-6 sm:px-10 lg:px-16"><div class="max-w-7xl mx-auto"><div class="mb-8 sm:mb-10 lg:mb-12"><h2 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-[0.22em] text-black">MORE ORIA</h2></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-12"><!--[-->`);
		const each_array = ensure_array_like(articles());
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let a = each_array[$$index];
			$$renderer.push(`<article class="group flex flex-col justify-between"><div><a${attr("href", a.href)} class="block aspect-[16/10] w-full overflow-hidden bg-neutral-100 border border-neutral-200 transition-colors duration-300 group-hover:border-neutral-400 shadow-sm"><img${attr("src", a.imageUrl)}${attr("alt", a.title)} class="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy"/></a> <div class="pt-6 space-y-3"><h3 class="font-heading font-bold text-lg sm:text-xl lg:text-2xl text-black leading-snug line-clamp-2"><a${attr("href", a.href)} class="animated-underline inline">${escape_html(a.title)}</a></h3> <p class="font-sans text-sm sm:text-base text-neutral-600 font-normal leading-relaxed line-clamp-3">${escape_html(a.desc)}</p></div></div> <div class="pt-5 sm:pt-6"><a${attr("href", a.href)} class="inline-flex items-center gap-2 font-sans font-bold text-xs sm:text-sm uppercase tracking-[0.22em] text-black hover:opacity-75 transition-opacity group/cta"><span>${escape_html(a.ctaText)}</span> <svg class="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-current transition-transform duration-300 group-hover/cta:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div></article>`);
		}
		$$renderer.push(`<!--]--></div></div></section>`);
	});
}
//#endregion
//#region src/routes/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const featuredItemListSchema = derived(() => ({
			"@context": "https://schema.org",
			"@type": "ItemList",
			name: "Mesin Digital Printing Industrial Unggulan ORIA",
			description: "Daftar produk mesin digital printing industrial unggulan dari ORIA Indonesia",
			numberOfItems: (data.products || []).length,
			itemListElement: (data.products || []).slice(0, 10).map((p, idx) => ({
				"@type": "ListItem",
				position: idx + 1,
				name: p.name,
				url: `https://oria.co.id/produk/${p.categorySlug || "mesin"}/${p.slug}`
			}))
		}));
		SEO($$renderer, {
			title: "ORIA Indonesia — Mesin Digital Printing Industrial Presisi & Solusi Cetak Modern",
			description: "Pusat teknologi dan rekayasa mesin digital printing industrial di Indonesia. Solusi terdepan printer UV flatbed, DTF apparel, laser cutting, CNC router, dan sublimasi tekstil bergaransi resmi.",
			keywords: "mesin digital printing, jual mesin digital printing, mesin digital printing oria, UV flatbed, DTF apparel, printer sublim, laser cutting, CNC router, ecosolvent, oria indonesia, mesin printing surabaya",
			canonical: "/",
			customSchemas: [featuredItemListSchema()]
		});
		$$renderer.push(`<!----> `);
		Hero($$renderer);
		$$renderer.push(`<!----> `);
		BrandManifesto($$renderer);
		$$renderer.push(`<!----> `);
		BrandVision($$renderer);
		$$renderer.push(`<!----> `);
		DualShowcase($$renderer);
		$$renderer.push(`<!----> `);
		CategoryPreview($$renderer, { products: data.products });
		$$renderer.push(`<!----> `);
		EngineeringExcellence($$renderer);
		$$renderer.push(`<!----> `);
		LatestArticles($$renderer, { articles: data.articles });
		$$renderer.push(`<!---->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-jJoVlyv8.js.map
