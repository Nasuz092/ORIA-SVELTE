import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';

//#region src/routes/landing-ads/+page.server.ts
var AD_CATEGORIES = [
	{
		id: "outdoor",
		name: "Outdoor Solvent",
		subtitle: "HIGH-SPEED INDUSTRIAL BILLBOARD PRINTING",
		description: "Mesin digital printing outdoor format 3.2 meter dengan sasis baja monokok untuk produksi spanduk dan baliho tahan cuaca ekstrem.",
		heroImage: "/images/categories/outdoor.webp",
		categorySlugs: ["mesin-outdoor"]
	},
	{
		id: "indoor",
		name: "Indoor Eco-Solvent",
		subtitle: "HIGH RESOLUTION FINE-ART & DECAL PRINTING",
		description: "Mesin digital printing indoor beresolusi fotografi untuk stiker decal kendaraan, wallpaper interior, dan poster pameran.",
		heroImage: "/images/categories/indoor.webp",
		categorySlugs: ["mesin-indoor"]
	},
	{
		id: "sublimasi",
		name: "Mesin Sublim",
		subtitle: "TEXTILE & APPAREL CONTINUOUS SUBLIMATION",
		description: "Lini mesin cetak tekstil roll-to-roll berkecepatan tinggi untuk jersey olahraga, hijab, gamis, dan fashion garmen.",
		heroImage: "/images/categories/sublimasi.webp",
		categorySlugs: ["mesin-sublim"]
	},
	{
		id: "heat-press",
		name: "Mesin Heat Press",
		subtitle: "ROTARY & FLATBED HEAT TRANSFER SYSTEM",
		description: "Mesin press transfer panas rotary dan flatbed presisi industri untuk hasil transfer warna tajam dan tahan cuci.",
		heroImage: "/images/categories/sublimasi.webp",
		categorySlugs: ["mesin-heat-press"]
	},
	{
		id: "dtf-dtg",
		name: "DTF & DTG Apparel",
		subtitle: "DIRECT TO FILM & DIRECT TO GARMENT",
		description: "Solusi sablon kaos distro digital dengan shaker powder otomatis dan printer direct-to-garment tanpa transfer paper.",
		heroImage: "/images/categories/dtf.webp",
		categorySlugs: ["mesin-dtf", "mesin-dtg"],
		slugs: ["oria-dtf-6004", "oria-dtg-or-dtg02"]
	},
	{
		id: "uv",
		name: "UV Flatbed & Cylinder",
		subtitle: "DIRECT PRINTING ON FLAT & ROTARY MEDIA",
		description: "Mesin cetak UV LED presisi tinggi untuk media datar akrilik, kaca, kayu, casing HP, serta tumbler silinder.",
		heroImage: "/images/categories/uv.webp",
		categorySlugs: [
			"mesin-uv-flatbed",
			"mesin-uv-dtf",
			"mesin-uv-cylinder"
		],
		slugs: [
			"oria-uv-flatbed-a3",
			"oria-uv-dtf-a3",
			"oria-uv-cylinder-e3",
			"oria-uv-laser-marking-5w"
		]
	}
];
var INTENT_CONFIGS = {
	"digital-printing": {
		key: "digital-printing",
		label: "Digital Printing (Outdoor & Indoor)",
		categoryIds: ["outdoor", "indoor"],
		heroBadge: "INDUSTRIAL OUTDOOR & INDOOR PRINTING SYSTEMS",
		heroTitleMain: "MESIN DIGITAL PRINTING",
		heroTitleHighlight: "OUTDOOR & INDOOR",
		heroDescription: "Solusi mesin cetak spanduk flexi & baliho raksasa hingga stiker decal dan wallpaper indoor resolusi fotografi dengan garansi resmi dan pendampingan teknisi langsung.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari mesin Digital Printing (Outdoor/Indoor) dari iklan Google oria.co.id. Mohon info pricelist & promo unit. Terima kasih."
	},
	"banner": {
		key: "digital-printing",
		label: "Mesin Cetak Banner & Spanduk",
		categoryIds: ["outdoor", "indoor"],
		heroBadge: "HIGH-SPEED INDUSTRIAL BANNER & SPANDUK PRINTING",
		heroTitleMain: "MESIN CETAK BANNER",
		heroTitleHighlight: "& SPANDUK OUTDOOR",
		heroDescription: "Investasi mesin cetak banner flexi, spanduk reklame, dan baliho tahan cuaca ekstrem format 3.2 meter dengan sasis kokoh monokok dan kecepatan produksi tinggi.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Cetak Banner & Spanduk dari iklan Google oria.co.id. Mohon info pricelist dan penawaran promo. Terima kasih."
	},
	"tekstil": {
		key: "tekstil",
		label: "Mesin Print Tekstil & Kain",
		categoryIds: ["sublimasi", "heat-press"],
		heroBadge: "INDUSTRIAL TEXTILE & FABRIC PRINTING",
		heroTitleMain: "MESIN PRINT TEKSTIL",
		heroTitleHighlight: "& SUBLIMASI KAIN",
		heroDescription: "Solusi industri cetak tekstil roll-to-roll dan rotary heat press untuk konveksi jersey olahraga, hijab printing, kain motif, dan apparel fashion dengan warna tajam & tahan cuci.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Print Tekstil & Kain dari iklan Google oria.co.id. Mohon info paket usaha & penawaran promo. Terima kasih."
	},
	"sublim": {
		key: "sublim",
		label: "Mesin Sublim",
		categoryIds: ["sublimasi"],
		heroBadge: "TEXTILE & APPAREL CONTINUOUS SUBLIMATION",
		heroTitleMain: "MESIN CETAK SUBLIM",
		heroTitleHighlight: "TEKSTIL & JERSEY",
		heroDescription: "Solusi industri jersey olahraga, hijab printing, apparel sportswear, dan fashion garmen dengan cetak roll-to-roll berkecepatan tinggi dan warna tajam.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Sublim dari iklan Google oria.co.id. Mohon info paket usaha & penawaran promo. Terima kasih."
	},
	"heat-press": {
		key: "heat-press",
		label: "Mesin Heat Press",
		categoryIds: ["heat-press"],
		heroBadge: "ROTARY & FLATBED HEAT TRANSFER SYSTEM",
		heroTitleMain: "MESIN HEAT PRESS",
		heroTitleHighlight: "ROTARY & TRANSFER",
		heroDescription: "Mesin press transfer panas rotary dan flatbed presisi industri untuk hasil transfer sublimasi yang merata, tajam, dan tahan luntur cuci.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Heat Press dari iklan Google oria.co.id. Mohon info spesifikasi & penawaran promo. Terima kasih."
	},
	"uv": {
		key: "uv",
		label: "Printer UV Flatbed & Cylinder",
		categoryIds: ["uv"],
		heroBadge: "PRECISION UV LED FLATBED & CYLINDER",
		heroTitleMain: "MESIN PRINTER UV",
		heroTitleHighlight: "FLATBED & CYLINDER",
		heroDescription: "Cetak langsung di segala media kaku & silinder: akrilik, kayu solid, kaca, plat metal, casing HP, tumbler, hingga merchandise souvenir presisi tinggi.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari mesin Printer UV Flatbed / Cylinder dari iklan Google oria.co.id. Mohon info spesifikasi & promo harga. Terima kasih."
	},
	"dtf": {
		key: "dtf",
		label: "DTF & DTG Apparel",
		categoryIds: ["dtf-dtg"],
		heroBadge: "DIRECT TO FILM & DIRECT TO GARMENT",
		heroTitleMain: "MESIN PRINTER DTF",
		heroTitleHighlight: "& SABLON KAOS DISTRO",
		heroDescription: "Inovasi sablon digital kaos distro katun, jersey, canvas bag, dan topi. Dilengkapi shaker powder otomatis dengan efisiensi tinta maksimal.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin DTF / DTG Sablon Kaos dari iklan Google oria.co.id. Mohon info penawaran promo & paket usaha. Terima kasih."
	},
	"outdoor": {
		key: "outdoor",
		label: "Outdoor Solvent",
		categoryIds: ["outdoor"],
		heroBadge: "HIGH-SPEED INDUSTRIAL BILLBOARD PRINTING",
		heroTitleMain: "MESIN CETAK OUTDOOR",
		heroTitleHighlight: "SOLVENT 3.2 METER",
		heroDescription: "Mesin cetak spanduk flexi dan baliho outdoor format 3.2 meter dengan sasis baja monokok untuk produksi tahan cuaca ekstrem.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Outdoor Solvent 3.2 Meter dari iklan Google oria.co.id. Mohon info promo & ketersediaan unit. Terima kasih."
	},
	"indoor": {
		key: "indoor",
		label: "Indoor Eco-Solvent",
		categoryIds: ["indoor"],
		heroBadge: "HIGH RESOLUTION FINE-ART & DECAL PRINTING",
		heroTitleMain: "MESIN CETAK INDOOR",
		heroTitleHighlight: "ECO-SOLVENT PRESISI",
		heroDescription: "Mesin cetak indoor beresolusi fotografi untuk stiker decal kendaraan, wallpaper interior, dan poster pameran tanpa bau menyengat.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Indoor Eco-Solvent dari iklan Google oria.co.id. Mohon info promo harga & paket usaha. Terima kasih."
	},
	"all": {
		key: "all",
		label: "Semua Mesin Printing",
		categoryIds: [
			"outdoor",
			"indoor",
			"sublimasi",
			"heat-press",
			"dtf-dtg",
			"uv"
		],
		heroBadge: "INDUSTRIAL DIGITAL PRINTING SYSTEMS",
		heroTitleMain: "SOLUSI MESIN DIGITAL PRINTING",
		heroTitleHighlight: "BERGARANSI RESMI",
		heroDescription: "Investasi mesin digital printing industri presisi tinggi dengan durabilitas komponen kelas dunia, jaminan ketersediaan suku cadang original, dan pendampingan teknisi resmi ke seluruh kota di Indonesia.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya tertarik konsultasi penawaran promo mesin digital printing dari iklan Google oria.co.id. Mohon info lebih detail & brosur harga. Terima kasih."
	}
};
/**
* Deteksi intent kata kunci Google Ads dari berbagai variasi pencarian pengguna
*/
function detectIntent(rawQuery) {
	if (!rawQuery) return INTENT_CONFIGS["all"];
	const q = rawQuery.toLowerCase().replace(/[+_-]/g, " ").trim();
	if (q.includes("banner") || q.includes("spanduk") || q.includes("baliho") || q.includes("reklame") || q.includes("flexi") || q.includes("billboard")) return INTENT_CONFIGS["banner"];
	if (q.includes("heatpress") || q.includes("heat press") || q.includes("rotary press")) return INTENT_CONFIGS["heat-press"];
	if (q.includes("sublim") || q.includes("sublimasi")) return INTENT_CONFIGS["sublim"];
	if (q.includes("tekstil") || q.includes("textile") || q.includes("kain") || q.includes("jersey") || q.includes("hijab") || q.includes("gamis") || q.includes("garmen") || q.includes("garment")) return INTENT_CONFIGS["tekstil"];
	if (q.includes("dtf") || q.includes("dtg") || q.includes("kaos") || q.includes("baju") || q.includes("sablon") || q.includes("tshirt") || q.includes("distro") || q.includes("direct to film") || q.includes("direct to garment")) return INTENT_CONFIGS["dtf"];
	if (q.includes("uv") || q.includes("flatbed") || q.includes("tumbler") || q.includes("botol") || q.includes("cylinder") || q.includes("silinder") || q.includes("casing") || q.includes("merchandise") || q.includes("souvenir") || q.includes("cetak") && (q.includes("akrilik") || q.includes("kaca") || q.includes("kayu"))) return INTENT_CONFIGS["uv"];
	if (q.includes("outdoor") || q.includes("solvent") || q.includes("3204")) return INTENT_CONFIGS["outdoor"];
	if (q.includes("indoor") || q.includes("eco solvent") || q.includes("ecosolvent") || q.includes("stiker") || q.includes("sticker") || q.includes("decal") || q.includes("wallpaper") || q.includes("3202") || q.includes("1802")) return INTENT_CONFIGS["indoor"];
	if (q.includes("digital printing") || q.includes("digital print") || q.includes("mesin cetak") || q.includes("mesin print") || q.includes("large format") || q.includes("wide format") || q === "digital" || q === "printing") return INTENT_CONFIGS["digital-printing"];
	return INTENT_CONFIGS["all"];
}
var load = async ({ fetch, url, setHeaders }) => {
	setHeaders({
		"Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
		"X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate"
	});
	const rawQuery = (url.searchParams.get("k") || url.searchParams.get("keyword") || url.searchParams.get("key") || url.searchParams.get("cat") || url.searchParams.get("q") || url.searchParams.get("utm_term") || "").trim();
	const activeIntent = detectIntent(rawQuery);
	const allProducts = await fetchOriaProducts(fetch);
	const allCategoryGroups = AD_CATEGORIES.map((cfg) => {
		const matchedProducts = [];
		const seenSlugs = /* @__PURE__ */ new Set();
		for (const p of allProducts) {
			const catSlug = p.categorySlug?.toLowerCase() || "";
			const prodSlug = p.slug?.toLowerCase() || "";
			const matchesCategory = cfg.categorySlugs.includes(catSlug);
			const matchesSlug = cfg.slugs ? cfg.slugs.some((s) => s.toLowerCase() === prodSlug) : false;
			if ((matchesCategory || matchesSlug) && !seenSlugs.has(prodSlug)) {
				seenSlugs.add(prodSlug);
				matchedProducts.push(p);
			}
		}
		return {
			id: cfg.id,
			name: cfg.name,
			subtitle: cfg.subtitle,
			description: cfg.description,
			heroImage: cfg.heroImage,
			products: matchedProducts
		};
	});
	return {
		rawQuery,
		activeIntent,
		categoryGroups: allCategoryGroups,
		initialCategoryGroups: activeIntent.key === "all" ? allCategoryGroups : allCategoryGroups.filter((g) => activeIntent.categoryIds.includes(g.id))
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-CNKa4rIo.js')).default;
const server_id = "src/routes/landing-ads/+page.server.ts";
const imports = ["_app/immutable/nodes/8.DJvwV7uR.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/chunks/xihTtKlq.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-BDt8ErfJ.js.map
