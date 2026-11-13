import { f as fetchOriaProducts } from './products-BYJ_l6FB.js';

//#region src/routes/landing-ads/+page.server.ts
var AD_CATEGORIES = [
	{
		id: "outdoor",
		name: "Outdoor Solvent",
		subtitle: "HIGH-SPEED INDUSTRIAL BILLBOARD PRINTING",
		description: "Mesin digital printing outdoor format 3.2 meter dengan sasis baja monokok untuk produksi spanduk dan baliho tahan cuaca ekstrem.",
		heroImage: "/images/categories/outdoor.webp",
		slugs: ["oria-outdoor-3204-st"]
	},
	{
		id: "sublimasi",
		name: "Sublimasi & Heat Press",
		subtitle: "TEXTILE & APPAREL CONTINUOUS TRANSFER",
		description: "Lini mesin cetak tekstil roll-to-roll dan heat press rotary untuk jersey olahraga, hijab, dan fashion garmen.",
		heroImage: "/images/categories/sublimasi.webp",
		slugs: [
			"oria-sublim-1902",
			"oria-sublim-1804",
			"oria-heat-press-1720",
			"oria-heat-press-1942"
		]
	},
	{
		id: "laser",
		name: "Laser Cutting & Marking",
		subtitle: "PRECISION CO2 & FIBER LASER SYSTEMS",
		description: "Koleksi mesin laser presisi dari laser marking souvenir hingga fiber laser pemotong plat metal.",
		heroImage: "/images/categories/laser.webp",
		slugs: [
			"oria-laser-marking-2020",
			"oria-laser-cutting-6040",
			"oria-fiber-laser-1325"
		]
	},
	{
		id: "cnc",
		name: "CNC Router & Fabrication",
		subtitle: "HEAVY-DUTY ROUTER & PLASMA CUTTING",
		description: "Mesin CNC router dan plasma cutting berdaya tahan tinggi untuk pemotongan presisi plat besi, ACP, kayu solid, dan aluminium.",
		heroImage: "/images/categories/cnc.webp",
		slugs: [
			"oria-cnc-router-1325",
			"oria-cnc-metal-6090",
			"oria-cnc-plasma-1325"
		]
	},
	{
		id: "dtf-dtg",
		name: "DTF & DTG Apparel",
		subtitle: "DIRECT TO FILM & DIRECT TO GARMENT",
		description: "Solusi sablon kaos distro digital dengan shaker powder otomatis dan printer direct-to-garment tanpa transfer paper.",
		heroImage: "/images/categories/dtf.webp",
		slugs: ["oria-dtf-6004", "oria-dtg-or-dtg02"]
	},
	{
		id: "single-pass",
		name: "Single Pass Packaging",
		subtitle: "CORRUGATED BOX & PAPER BAG PRINTING",
		description: "Mesin cetak digital kemasan karton box dan paper bag berkecepatan tinggi tanpa plat cetak.",
		heroImage: "/images/categories/single-pass.webp",
		slugs: ["oria-one-pass-dc800sp"]
	},
	{
		id: "uv",
		name: "UV Flatbed & Cylinder",
		subtitle: "DIRECT PRINTING ON FLAT & ROTARY MEDIA",
		description: "Mesin cetak UV LED presisi tinggi untuk media datar akrilik, kaca, kayu, casing HP, serta tumbler silinder.",
		heroImage: "/images/categories/uv.webp",
		slugs: [
			"oria-uv-flatbed-a3",
			"oria-uv-dtf-a3",
			"oria-uv-cylinder-e3",
			"oria-uv-laser-marking-5w"
		]
	},
	{
		id: "indoor",
		name: "Indoor Eco-Solvent",
		subtitle: "HIGH RESOLUTION FINE-ART & DECAL PRINTING",
		description: "Mesin digital printing indoor beresolusi fotografi untuk stiker decal kendaraan, wallpaper interior, dan poster pameran.",
		heroImage: "/images/categories/indoor.webp",
		slugs: ["oria-indoor-3202", "oria-indoor-1802"]
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
	"sublim": {
		key: "sublim",
		label: "Sublimasi & Heat Press",
		categoryIds: ["sublimasi"],
		heroBadge: "TEXTILE & APPAREL CONTINUOUS TRANSFER",
		heroTitleMain: "MESIN CETAK SUBLIMASI",
		heroTitleHighlight: "& HEAT PRESS ROTARY",
		heroDescription: "Solusi industri jersey olahraga, hijab printing, apparel sportswear, dan fashion garmen dengan transfer warna tajam, stabil, dan tahan luntur cuci.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Sublimasi & Heat Press dari iklan Google oria.co.id. Mohon info paket usaha & penawaran promo. Terima kasih."
	},
	"laser": {
		key: "laser",
		label: "Laser Cutting & Marking",
		categoryIds: ["laser"],
		heroBadge: "PRECISION CO2 & FIBER LASER SYSTEMS",
		heroTitleMain: "MESIN LASER CUTTING",
		heroTitleHighlight: "& FIBER MARKING",
		heroDescription: "Pemotongan presisi tinggi akrilik, kayu, MDF, kulit, hingga fiber laser untuk pemotongan plat metal dan grafir barcode perhiasan & souvenir.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin Laser Cutting / Marking dari iklan Google oria.co.id. Mohon info promo harga & spesifikasi teknis. Terima kasih."
	},
	"cnc": {
		key: "cnc",
		label: "CNC Router & Plasma",
		categoryIds: ["cnc"],
		heroBadge: "HEAVY-DUTY CNC ROUTER & PLASMA CUTTING",
		heroTitleMain: "MESIN CNC ROUTER",
		heroTitleHighlight: "& PLASMA FABRIKASI",
		heroDescription: "Heavy-duty framing & spindle bertenaga tinggi untuk pemotongan lembaran ACP reklame, ukiran kayu 3D, pembuatan kitchen set, dan pemotongan plat besi tebal.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin CNC Router / Plasma dari iklan Google oria.co.id. Mohon info pricelist dan spesifikasi teknis. Terima kasih."
	},
	"dtf": {
		key: "dtf",
		label: "DTF & DTG Apparel",
		categoryIds: ["dtf-dtg"],
		heroBadge: "DIRECT TO FILM & DIRECT TO GARMENT",
		heroTitleMain: "MESIN PRINTER DTF",
		heroTitleHighlight: "& DIRECT TO GARMENT",
		heroDescription: "Inovasi sablon digital kaos distro katun, jersey, canvas bag, dan topi. Dilengkapi shaker powder otomatis dengan efisiensi tinta maksimal.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya mencari Mesin DTF / DTG Sablon Kaos dari iklan Google oria.co.id. Mohon info penawaran promo & paket usaha. Terima kasih."
	},
	"single-pass": {
		key: "single-pass",
		label: "Single Pass Packaging",
		categoryIds: ["single-pass"],
		heroBadge: "CORRUGATED BOX & PAPER BAG PRINTING",
		heroTitleMain: "MESIN CETAK PACKAGING",
		heroTitleHighlight: "SINGLE PASS SYSTEM",
		heroDescription: "Cetak langsung di atas kardus corrugated box, box pizza, dan paper bag berkecepatan tinggi tanpa minimum order dan tanpa biaya plat film.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya tertarik dengan Mesin Single Pass Packaging dari iklan Google oria.co.id. Mohon info harga & kapasitas produksi. Terima kasih."
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
		label: "Semua Kategori",
		categoryIds: [
			"outdoor",
			"sublimasi",
			"laser",
			"cnc",
			"dtf-dtg",
			"single-pass",
			"uv",
			"indoor"
		],
		heroBadge: "INDUSTRIAL PRINTING & FABRICATION SYSTEMS",
		heroTitleMain: "SOLUSI MESIN CETAK",
		heroTitleHighlight: "BERGARANSI RESMI",
		heroDescription: "Investasi mesin industri presisi tinggi dengan durabilitas komponen kelas dunia, jaminan ketersediaan suku cadang original, dan pendampingan teknisi resmi ke seluruh kota di Indonesia.",
		waContextMessage: "Halo Anugrah Supply Mandiri (ORIA)! Saya tertarik konsultasi penawaran promo mesin industri dari iklan Google oria.co.id. Mohon info lebih detail & brosur harga. Terima kasih."
	}
};
/**
* Deteksi intent kata kunci Google Ads dari berbagai query parameter
* Mendukung: ?k=, ?keyword=, ?key=, ?cat=, ?q=, ?utm_term=
*/
function detectIntent(rawQuery) {
	if (!rawQuery) return INTENT_CONFIGS["all"];
	const q = rawQuery.toLowerCase().replace(/[+_-]/g, " ").trim();
	if (q.includes("digital printing") || q.includes("digital print") || q.includes("outdoor indoor") || q.includes("indoor outdoor") || q.includes("cetak") && (q.includes("spanduk") || q.includes("baliho") || q.includes("banner")) || q === "digital" || q === "printing") return INTENT_CONFIGS["digital-printing"];
	if (q.includes("uv") || q.includes("flatbed") || q.includes("cylinder") || q.includes("tumbler") || q.includes("uv dtf")) return INTENT_CONFIGS["uv"];
	if (q.includes("sublim") || q.includes("heatpress") || q.includes("heat press") || q.includes("jersey") || q.includes("tekstil") || q.includes("textile") || q.includes("hijab")) return INTENT_CONFIGS["sublim"];
	if (q.includes("laser") || q.includes("fiber laser") || q.includes("marking") || q.includes("grafir")) return INTENT_CONFIGS["laser"];
	if (q.includes("cnc") || q.includes("router") || q.includes("plasma") || q.includes("milling") || q.includes("acp")) return INTENT_CONFIGS["cnc"];
	if (q.includes("dtf") || q.includes("dtg") || q.includes("kaos") || q.includes("sablon") || q.includes("tshirt") || q.includes("distro")) return INTENT_CONFIGS["dtf"];
	if (q.includes("single pass") || q.includes("one pass") || q.includes("packaging") || q.includes("kardus") || q.includes("kemasan") || q.includes("corrugated") || q.includes("box")) return INTENT_CONFIGS["single-pass"];
	if (q.includes("outdoor") || q.includes("solvent") || q.includes("3204")) return INTENT_CONFIGS["outdoor"];
	if (q.includes("indoor") || q.includes("eco solvent") || q.includes("ecosolvent") || q.includes("3202") || q.includes("1802")) return INTENT_CONFIGS["indoor"];
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
		for (const slug of cfg.slugs) {
			const p = allProducts.find((item) => item.slug === slug || item.slug.toLowerCase() === slug.toLowerCase());
			if (p) matchedProducts.push(p);
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
		initialCategoryGroups: activeIntent.key === "all" ? allCategoryGroups : allCategoryGroups.filter((g) => activeIntent.categoryIds.includes(g.id)),
		availableFilterTabs: [
			{
				key: "all",
				label: "Semua Mesin"
			},
			{
				key: "digital-printing",
				label: "Digital Printing"
			},
			{
				key: "uv",
				label: "Printer UV"
			},
			{
				key: "sublim",
				label: "Sublimasi"
			},
			{
				key: "laser",
				label: "Laser Cutting"
			},
			{
				key: "cnc",
				label: "CNC Router"
			},
			{
				key: "dtf",
				label: "DTF Apparel"
			},
			{
				key: "single-pass",
				label: "Single Pass"
			}
		]
	};
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-B_4jRKOL.js')).default;
const server_id = "src/routes/landing-ads/+page.server.ts";
const imports = ["_app/immutable/nodes/8.Cx7iZMeu.js","_app/immutable/chunks/rqULfUPf.js","_app/immutable/chunks/xihTtKlq.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-CONxyUZk.js.map
