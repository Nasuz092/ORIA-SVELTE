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
var load = async ({ fetch, setHeaders }) => {
	setHeaders({
		"Cache-Control": "private, no-cache, no-store, max-age=0, must-revalidate",
		"X-Robots-Tag": "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate"
	});
	const allProducts = await fetchOriaProducts(fetch);
	return { categoryGroups: AD_CATEGORIES.map((cfg) => {
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
	}) };
};

var _page_server_ts = /*#__PURE__*/Object.freeze({
	__proto__: null,
	load: load
});

const index = 8;
let component_cache;
const component = async () => component_cache ??= (await import('./_page.svelte-DgGPzLM_.js')).default;
const server_id = "src/routes/landing-ads/+page.server.ts";
const imports = ["_app/immutable/nodes/8.DhnRPytq.js","_app/immutable/chunks/CAkEPQGA.js","_app/immutable/chunks/xihTtKlq.js"];
const stylesheets = [];
const fonts = [];

export { component, fonts, imports, index, _page_server_ts as server, server_id, stylesheets };
//# sourceMappingURL=8-Bo4s1fVF.js.map
