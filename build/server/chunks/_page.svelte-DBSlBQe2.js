import { q as stringify, f as derived, d as attr, n as escape_html, o as ensure_array_like, b as attr_class, y as html, w as onDestroy } from './index.js-B3PXt2za.js';
import { S as SEO } from './SEO2-BIxN0BOg.js';
import 'siema';
import 'clsx';
import './seo-CKjj2Tup.js';

//#region src/lib/utils/product-specs.ts
function getCleanModelTitle(fullName) {
	let name = (fullName || "").replace(/^mesin\s+/i, "").replace(/\boria\b/gi, "").trim();
	if (name.includes("|")) name = name.split("|")[0].trim();
	name = name.replace(/digital printing outdoor indoor ecosolvent/i, "Indoor Eco-Solvent");
	name = name.replace(/digital printing outdoor/i, "Outdoor Solvent");
	name = name.replace(/digital printing ecocolvent/i, "Indoor Eco-Solvent");
	name = name.replace(/printing indoor ecosolvent/i, "Indoor Eco-Solvent");
	name = name.replace(/printer indoor ecosolvent/i, "Indoor Eco-Solvent");
	name = name.replace(/printing textile sublim/i, "Sublimasi Textile");
	name = name.replace(/textile printing sublim/i, "Sublimasi Textile");
	name = name.replace(/laser cutting &? engrave co2/i, "Laser Cutting CO2");
	name = name.replace(/laser cut engrave co2/i, "Laser Cutting CO2");
	name = name.replace(/laser cutting engraving/i, "Laser Cutting & Engrave");
	name = name.replace(/fiber laser cutting cnc/i, "Fiber Laser Cutting");
	name = name.replace(/fiber laser cutting/i, "Fiber Laser Cutting");
	name = name.replace(/fiber laser marking/i, "Fiber Laser Marking");
	name = name.replace(/printer uv tumbler cylinder/i, "UV Rotary Tumbler");
	name = name.replace(/printer uv mini cylinder tumbler rotary/i, "UV Rotary Tumbler");
	name = name.replace(/digital printing uv dtf/i, "UV DTF");
	return name.trim().toUpperCase().replace(/\s+/g, " ");
}
function getProductSpecs(p) {
	const name = (p.name || "").toLowerCase();
	const slug = (p.slug || "").toLowerCase();
	const cat = (p.categoryName || "").toLowerCase();
	if (cat.includes("consumable") || name.includes("tinta") || name.includes("kertas")) {
		if (slug.includes("kertas-sublim")) return [
			{
				val: "70 / 85 GSM",
				unit: "Gramasi",
				desc: "Fast Dry / Sticky"
			},
			{
				val: "Format Roll",
				unit: "Kemasan",
				desc: "Transfer Sublimasi"
			},
			{
				val: "Polyester",
				unit: "Aplikasi Kain",
				desc: "Jersey & Sportswear"
			},
			{
				val: "Cepat Kering",
				unit: "Karakteristik",
				desc: "Warna Tajam & Stabil"
			}
		];
		if (slug.includes("solvent-km512i")) return [
			{
				val: "KM512i",
				unit: "Kompatibilitas",
				desc: "Konica Minolta Head"
			},
			{
				val: "CMYK",
				unit: "Warna Tinta",
				desc: "Solvent Outdoor"
			},
			{
				val: "2+ Tahun",
				unit: "Ketahanan",
				desc: "Tahan Cuaca Ekstrem"
			},
			{
				val: "Banner & Vinyl",
				unit: "Aplikasi",
				desc: "Spanduk & Billboard"
			}
		];
		if (slug.includes("ecosolvent")) return [
			{
				val: "Eco-Solvent",
				unit: "Tipe Tinta",
				desc: "Minim Bau"
			},
			{
				val: "CMYK",
				unit: "Pilihan Warna",
				desc: "Harga Per 1 Warna"
			},
			{
				val: "Piezo Head",
				unit: "Kompatibilitas",
				desc: "XP600 / i3200 / DX5"
			},
			{
				val: "Indoor Media",
				unit: "Aplikasi",
				desc: "Stiker, Poster & Dekor"
			}
		];
		return [
			{
				val: "Sublimasi",
				unit: "Tipe Tinta",
				desc: "High Density Ink"
			},
			{
				val: "CMYK",
				unit: "Pilihan Warna",
				desc: "Harga Per 1 Warna"
			},
			{
				val: "Epson Head",
				unit: "Kompatibilitas",
				desc: "i3200 / XP600 / DX5"
			},
			{
				val: "Tekstil & Mug",
				unit: "Aplikasi",
				desc: "Jersey & Merchandise"
			}
		];
	}
	if (name.includes("laser") || cat.includes("laser") || name.includes("marking")) {
		if (slug.includes("uv-laser-marking-5w") || name.includes("5w")) return [
			{
				val: "5 W UV",
				unit: "Laser Source",
				desc: "JPT Cold Laser 355nm"
			},
			{
				val: "15 x 15 cm",
				unit: "Area Kerja",
				desc: "Presisi Mikro"
			},
			{
				val: "8,000 mm/s",
				unit: "Kecepatan",
				desc: "Marking Cepat"
			},
			{
				val: "0.01 mm",
				unit: "Lebar Garis",
				desc: "Tanpa Bekas Bakar"
			}
		];
		if (slug.includes("laser-marking-2020") || name.includes("2020")) return [
			{
				val: "20–50 W",
				unit: "Laser Power",
				desc: "Raycus / Max Fiber"
			},
			{
				val: "30 x 30 cm",
				unit: "Area Maks.",
				desc: "11 / 20 / 30 cm"
			},
			{
				val: "8,000 mm/s",
				unit: "Kecepatan",
				desc: "Marking Permanen"
			},
			{
				val: "≤ 1 mm",
				unit: "Kedalaman",
				desc: "Logam & Plastik Keras"
			}
		];
		if (slug.includes("fiber-laser-6015") || name.includes("6015")) return [
			{
				val: "6,000 W",
				unit: "Laser Power",
				desc: "Raycus Fiber Laser"
			},
			{
				val: "150 x 600 cm",
				unit: "Working Area",
				desc: "Single Table"
			},
			{
				val: "140 m/min",
				unit: "Max Speed",
				desc: "Kecepatan Posisi"
			},
			{
				val: "±0.03 mm",
				unit: "Akurasi",
				desc: "Raytools Cutting Head"
			}
		];
		if (slug.includes("fiber-laser-3015") || name.includes("3015")) return [
			{
				val: "1.5–6 kW",
				unit: "Laser Power",
				desc: "Raycus Fiber Source"
			},
			{
				val: "300 x 150 cm",
				unit: "Working Area",
				desc: "Single Table"
			},
			{
				val: "Raytools",
				unit: "Cutting Head",
				desc: "BM111 / Boci"
			},
			{
				val: "Inovance",
				unit: "Servo Motor",
				desc: "Presisi Fabrikasi"
			}
		];
		if (slug.includes("fiber-laser-1325") || name.includes("fiber") && name.includes("1325")) return [
			{
				val: "1,500 W",
				unit: "Laser Power",
				desc: "Raycus Water Cooling"
			},
			{
				val: "250 x 130 cm",
				unit: "Working Area",
				desc: "Area Potong Logam"
			},
			{
				val: "42 m/min",
				unit: "Kecepatan",
				desc: "42.000 mm/menit"
			},
			{
				val: "Auto Focus",
				unit: "Cutting Head",
				desc: "Terintegrasi Z Axis"
			}
		];
		if (slug.includes("galvo-1615") || name.includes("1615")) return [
			{
				val: "CO₂ Galvo",
				unit: "Tipe Laser",
				desc: "1 Head Galvo"
			},
			{
				val: "160 x 150 cm",
				unit: "Cut Area",
				desc: "Khusus Kain & Tekstil"
			},
			{
				val: "60 cm/s",
				unit: "Speed Cut",
				desc: "Potong Cepat"
			},
			{
				val: "CCD Camera",
				unit: "Vision Model",
				desc: "Auto Contour Cutting"
			}
		];
		if (slug.includes("co2-1325") || name.includes("1325")) return [
			{
				val: "80–150 W",
				unit: "Laser Power",
				desc: "CO₂ Metal & Non-Metal"
			},
			{
				val: "130 x 250 cm",
				unit: "Area Kerja",
				desc: "Meja Ukuran Penuh"
			},
			{
				val: "10,000 mm/s",
				unit: "Cut Speed",
				desc: "Engrave 64.000 mm/min"
			},
			{
				val: "0.025 mm",
				unit: "Resolusi",
				desc: "Akrilik 5–20 mm"
			}
		];
		if (slug.includes("1310") || name.includes("1310")) return [
			{
				val: "150 W",
				unit: "Laser Power",
				desc: "CO₂ Laser Generator"
			},
			{
				val: "130 x 100 cm",
				unit: "Working Area",
				desc: "Water Cooling"
			},
			{
				val: "10–15 mm",
				unit: "Potong Akrilik",
				desc: "Tepi Bersih & Halus"
			},
			{
				val: "CCD Camera",
				unit: "Fitur Otomatis",
				desc: "Auto Contour Cutting"
			}
		];
		if (slug.includes("1490") || name.includes("1490")) return [
			{
				val: "60–150 W",
				unit: "Daya Laser",
				desc: "CO₂ 10.64 μm"
			},
			{
				val: "140–160 cm",
				unit: "Lebar Kerja",
				desc: "Area Non-Logam"
			},
			{
				val: "1,000 mm/min",
				unit: "Kecepatan",
				desc: "±10–1000 mm/menit"
			},
			{
				val: "Akrilik & MDF",
				unit: "Material",
				desc: "Potong & Ukir Presisi"
			}
		];
		if (slug.includes("6090") || name.includes("6090")) return [
			{
				val: "100 W",
				unit: "Laser Power",
				desc: "CO₂ Sealed Tube"
			},
			{
				val: "90 x 60 cm",
				unit: "Cutting Area",
				desc: "Area Kerja Ringkas"
			},
			{
				val: "10,000 mm/s",
				unit: "Cutting Speed",
				desc: "Potong & Ukir Cepat"
			},
			{
				val: "±10 mm",
				unit: "Tebal Potong",
				desc: "Non-Logam Presisi"
			}
		];
		return [
			{
				val: "100 W",
				unit: "Laser Power",
				desc: "CO₂ Sealed Tube"
			},
			{
				val: "60 x 40 cm",
				unit: "Cutting Area",
				desc: "Ringkas & Akurat"
			},
			{
				val: "10,000 mm/s",
				unit: "Cutting Speed",
				desc: "Ukir & Potong Detail"
			},
			{
				val: "±10 mm",
				unit: "Tebal Potong",
				desc: "Akrilik, Kayu & Karet"
			}
		];
	}
	if (name.includes("indoor") || cat.includes("indoor")) {
		if (slug.includes("1801") || name.includes("1801")) return [
			{
				val: "1.8 m",
				unit: "Lebar Cetak",
				desc: "Maks. 1.800 mm"
			},
			{
				val: "1x Head",
				unit: "Printhead",
				desc: "Eco-Solvent CMYK"
			},
			{
				val: "12 m²/h",
				unit: "Kecepatan",
				desc: "Mode Produksi 4-Pass"
			},
			{
				val: "1,200 DPI",
				unit: "Resolusi",
				desc: "Ketajaman Detail"
			}
		];
		if (slug.includes("1802") || name.includes("1802")) return [
			{
				val: "1.8 m",
				unit: "Lebar Cetak",
				desc: "±180.2 cm Roll"
			},
			{
				val: "2x XP600",
				unit: "Printhead",
				desc: "Epson Double Head"
			},
			{
				val: "30 m²/h",
				unit: "Kecepatan",
				desc: "Output Produksi"
			},
			{
				val: "1,440 DPI",
				unit: "Resolusi",
				desc: "Eco-Solvent 4 Warna"
			}
		];
		if (slug.includes("8-warna") || name.includes("8 warna")) return [
			{
				val: "2.0 m",
				unit: "Lebar Cetak",
				desc: "Maks. 200 cm"
			},
			{
				val: "2x i3200",
				unit: "Printhead",
				desc: "Epson Double i3200"
			},
			{
				val: "40 m²/h",
				unit: "Kecepatan",
				desc: "4-Pass Produksi"
			},
			{
				val: "8 Warna",
				unit: "Konfigurasi",
				desc: "CMYK + Lc Lm Rd Or"
			}
		];
		return [
			{
				val: "1.9 m",
				unit: "Lebar Media",
				desc: "Roll Fleksibel"
			},
			{
				val: "2x i3200",
				unit: "Printhead",
				desc: "Epson i3200 A1/E1"
			},
			{
				val: "40 m²/h",
				unit: "Kecepatan",
				desc: "4-Pass (30 m²/h 6-Pass)"
			},
			{
				val: "2,400 DPI",
				unit: "Resolusi",
				desc: "Gradasi Lembut"
			}
		];
	}
	if (name.includes("outdoor") || cat.includes("outdoor")) {
		if (slug.includes("3202") || name.includes("3202")) return [
			{
				val: "3.2 m",
				unit: "Lebar Cetak",
				desc: "±320 cm Wide Roll"
			},
			{
				val: "2 pcs",
				unit: "Printhead",
				desc: "ORIA Series"
			},
			{
				val: "30 m²/h",
				unit: "Kecepatan",
				desc: "Spanduk & Banner"
			},
			{
				val: "1,440 DPI",
				unit: "Resolusi",
				desc: "Solvent Ink CMYK"
			}
		];
		return [
			{
				val: "3.2 m",
				unit: "Lebar Cetak",
				desc: "Super Wide Roll"
			},
			{
				val: "4x KM512i",
				unit: "Printhead",
				desc: "Konica Minolta 30pl"
			},
			{
				val: "125 m²/h",
				unit: "Kecepatan",
				desc: "Produksi Billboard"
			},
			{
				val: "2+ Tahun",
				unit: "Daya Tahan",
				desc: "Solvent Tahan Cuaca"
			}
		];
	}
	if (name.includes("sublim") || cat.includes("sublim")) {
		if (slug.includes("1801") || name.includes("1801")) return [
			{
				val: "1.8 m",
				unit: "Lebar Cetak",
				desc: "Maks. 1.800 mm"
			},
			{
				val: "1x Head",
				unit: "Printhead",
				desc: "Sublimation CMYK"
			},
			{
				val: "12 m²/h",
				unit: "Kecepatan",
				desc: "Mode 4-Pass"
			},
			{
				val: "1,200 DPI",
				unit: "Resolusi",
				desc: "Detail Tekstil"
			}
		];
		if (slug.includes("1804") || name.includes("1804")) return [
			{
				val: "1.8 m",
				unit: "Lebar Cetak",
				desc: "±180 cm Roll"
			},
			{
				val: "4x i3200",
				unit: "Printhead",
				desc: "i1600 / i3200 Four Head"
			},
			{
				val: "95 m²/h",
				unit: "Kecepatan",
				desc: "3-Pass (72 m²/h 4-Pass)"
			},
			{
				val: "1,440 DPI",
				unit: "Resolusi",
				desc: "Produksi Massal"
			}
		];
		return [
			{
				val: "1.9 m",
				unit: "Lebar Media",
				desc: "Roll Tekstil"
			},
			{
				val: "2x i3200",
				unit: "Printhead",
				desc: "Epson i3200 A1/E1"
			},
			{
				val: "40 m²/h",
				unit: "Kecepatan",
				desc: "4-Pass (30 m²/h 6-Pass)"
			},
			{
				val: "2,400 DPI",
				unit: "Resolusi",
				desc: "Saturasi Solid"
			}
		];
	}
	if (name.includes("heat press") || cat.includes("heat press")) {
		if (name.includes("1942")) return [
			{
				val: "1.9 m",
				unit: "Lebar Kerja",
				desc: "Roll to Roll Textile"
			},
			{
				val: "80–120 m/h",
				unit: "Kecepatan",
				desc: "Produksi Tinggi"
			},
			{
				val: "0–400 °C",
				unit: "Rentang Suhu",
				desc: "Drum Oil Pemanas"
			},
			{
				val: "42 cm",
				unit: "Diameter Drum",
				desc: "Transfer Merata"
			}
		];
		return [
			{
				val: "1.7 m",
				unit: "Lebar Transfer",
				desc: "Roll 170 cm"
			},
			{
				val: "50–60 m/h",
				unit: "Kecepatan",
				desc: "Transfer Kontinu"
			},
			{
				val: "0–250 °C",
				unit: "Rentang Suhu",
				desc: "Conducting Oil"
			},
			{
				val: "8 kW",
				unit: "Daya Pemanas",
				desc: "Drum 200 mm"
			}
		];
	}
	if (name.includes("uv dtf") || cat.includes("uv dtf")) return [
		{
			val: "35 x 45 cm",
			unit: "Lebar Cetak",
			desc: "UV DTF Film"
		},
		{
			val: "3x XP600",
			unit: "Printhead",
			desc: "Epson Triple Head"
		},
		{
			val: "CMYK+W+V+G",
			unit: "Konfigurasi",
			desc: "White + Varnish + Glue"
		},
		{
			val: "720 DPI",
			unit: "Resolusi",
			desc: "Stiker Kristal Timbul"
		}
	];
	if ((name.includes("dtf") || cat.includes("dtf")) && !name.includes("dtg") && !cat.includes("dtg")) {
		if (name.includes("6004")) return [
			{
				val: "60 cm",
				unit: "Lebar Film",
				desc: "Transfer Roll"
			},
			{
				val: "4x i3200-A1",
				unit: "Printhead",
				desc: "Hoson Board System"
			},
			{
				val: "CMYK + W",
				unit: "Tinta Pigment",
				desc: "Sirkulasi Otomatis"
			},
			{
				val: "Anti-Crack",
				unit: "Daya Rekat",
				desc: "Shaker & Dryer"
			}
		];
		return [
			{
				val: "33 cm",
				unit: "Lebar Cetak",
				desc: "Format A3 Roll"
			},
			{
				val: "2x Printhead",
				unit: "Printhead",
				desc: "XP600 / 4720 / i3200"
			},
			{
				val: "CMYKW",
				unit: "Tinta Pigment",
				desc: "Auto White Circulation"
			},
			{
				val: "All Fabric",
				unit: "Kompatibilitas",
				desc: "Katun & Polyester"
			}
		];
	}
	if (name.includes("dtg") || cat.includes("dtg")) return [
		{
			val: "40 x 50 cm",
			unit: "Area Cetak",
			desc: "Platen Kaos"
		},
		{
			val: "2x i3200HD",
			unit: "Printhead",
			desc: "Epson Dual Head"
		},
		{
			val: "1.5 Min/Pcs",
			unit: "Kecepatan",
			desc: "Pigment Tekstil"
		},
		{
			val: "1,440 DPI",
			unit: "Resolusi",
			desc: "CMYK + ORBG"
		}
	];
	if (name.includes("one pass") || cat.includes("single pass")) return [
		{
			val: "Single Pass",
			unit: "Teknologi",
			desc: "Industrial Print Head"
		},
		{
			val: "10–50 m/min",
			unit: "Kecepatan",
			desc: "High-Speed Packaging"
		},
		{
			val: "CMYK",
			unit: "Tinta",
			desc: "Droplet 3–6 PL"
		},
		{
			val: "Corrugated",
			unit: "Aplikasi",
			desc: "Kardus, Box & Paper Bag"
		}
	];
	if (name.includes("cnc") || cat.includes("cnc") || name.includes("plasma")) {
		if (name.includes("6090")) return [
			{
				val: "2.2 kW",
				unit: "Spindle Power",
				desc: "Water Cooling"
			},
			{
				val: "60 x 90 cm",
				unit: "Area Kerja",
				desc: "Tinggi Z 15 cm"
			},
			{
				val: "24,000 RPM",
				unit: "Max Speed",
				desc: "DSP A11 Control"
			},
			{
				val: "0.03 mm",
				unit: "Akurasi Posisi",
				desc: "Milling Logam Presisi"
			}
		];
		if (name.includes("plasma")) return [
			{
				val: "10 mm",
				unit: "Tebal Potong",
				desc: "Potong Plat Besi"
			},
			{
				val: "130 x 250 cm",
				unit: "Working Area",
				desc: "Deep Waterbed 20 cm"
			},
			{
				val: "4,000 mm/min",
				unit: "Max Feedrate",
				desc: "Stepper Nema 34"
			},
			{
				val: "3 Axis",
				unit: "Sistem Kontrol",
				desc: "Fabrikasi Logam"
			}
		];
		return [
			{
				val: "5.5 kW",
				unit: "Spindle Power",
				desc: "Water Cooling"
			},
			{
				val: "130 x 250 cm",
				unit: "Working Area",
				desc: "Z-Axis 20 cm"
			},
			{
				val: "24,000 RPM",
				unit: "Max Speed",
				desc: "Leadshine Stepper"
			},
			{
				val: "#20 Rail",
				unit: "Guide System",
				desc: "Rack & Pinion"
			}
		];
	}
	if (name.includes("uv") || cat.includes("uv") || name.includes("cylinder")) {
		if (slug.includes("cylinder-e3") || name.includes("e3")) return [
			{
				val: "4.5–11.5 cm",
				unit: "Diameter",
				desc: "Panjang 5–26.5 cm"
			},
			{
				val: "1–3x i1600",
				unit: "Printhead",
				desc: "Epson 3.8 PL"
			},
			{
				val: "1,200 DPI",
				unit: "Resolusi",
				desc: "Spiral W + C + V"
			},
			{
				val: "20 Detik/Pcs",
				unit: "Kecepatan",
				desc: "Auto Pressure Clean"
			}
		];
		if (name.includes("mini cylinder") || name.includes("tumbler")) return [
			{
				val: "4.5–11 cm",
				unit: "Diameter",
				desc: "Panjang 4.5–21 cm"
			},
			{
				val: "1x i3200HD",
				unit: "Printhead",
				desc: "Epson i3200HD-U1"
			},
			{
				val: "2,880 DPI",
				unit: "Akurasi",
				desc: "720–2.880 dpi"
			},
			{
				val: "CMYK+W+V",
				unit: "Tinta UV",
				desc: "90 kg Unit Kompak"
			}
		];
		if (name.includes("roll to roll") || name.includes("1801")) return [
			{
				val: "1.82 m",
				unit: "Lebar Cetak",
				desc: "72\" / 1.820 mm"
			},
			{
				val: "1–2x i1600",
				unit: "Printhead",
				desc: "Epson i1600 U1"
			},
			{
				val: "10–20 m²/h",
				unit: "Kecepatan",
				desc: "6-Pass Produksi"
			},
			{
				val: "1–5 mm",
				unit: "Tebal Media",
				desc: "2×CMYK / CMYK+W"
			}
		];
		if (name.includes("6090")) return [
			{
				val: "60 x 90 cm",
				unit: "Area Cetak",
				desc: "Vacuum Table"
			},
			{
				val: "3–4x Head",
				unit: "Printhead",
				desc: "Epson i1600 / i3200"
			},
			{
				val: "10 m²/h",
				unit: "Kecepatan",
				desc: "Production Mode"
			},
			{
				val: "30 cm",
				unit: "Tinggi Media",
				desc: "1–300 mm Adjustable"
			}
		];
		if (name.includes("6040")) return [
			{
				val: "60 x 40 cm",
				unit: "Format Kerja",
				desc: "Automatic Altimetry"
			},
			{
				val: "Epson DX7",
				unit: "Printhead",
				desc: "Presisi Datar"
			},
			{
				val: "8 Warna",
				unit: "Tinta UV",
				desc: "KCMY+LcLm+W+V"
			},
			{
				val: "1,144 DPI",
				unit: "Resolusi",
				desc: "1.2 m²/h (4-Pass)"
			}
		];
		if (name.includes("3060")) return [
			{
				val: "30 x 60 cm",
				unit: "Area Cetak",
				desc: "Flatbed Kompak"
			},
			{
				val: "1x DX7",
				unit: "Printhead",
				desc: "Hoson Board"
			},
			{
				val: "18 cm",
				unit: "Tinggi Media",
				desc: "Maks. 180 mm"
			},
			{
				val: "CMYK+W+V",
				unit: "Konfigurasi",
				desc: "LED UV Curing"
			}
		];
		if (slug.includes("full-color") || name.includes("fullcolor")) return [
			{
				val: "A3 Format",
				unit: "Area Cetak",
				desc: "Bahan Keras & Lembut"
			},
			{
				val: "1x XP600",
				unit: "Printhead",
				desc: "Epson Precision"
			},
			{
				val: "2,880 DPI",
				unit: "Akurasi",
				desc: "1.200 / 2.880 dpi"
			},
			{
				val: "CMYK + W",
				unit: "5 Warna",
				desc: "1–2.5 m²/jam"
			}
		];
		return [
			{
				val: "A3 Format",
				unit: "Area Cetak",
				desc: "Flatbed Media Datar"
			},
			{
				val: "2x XP600",
				unit: "Printhead",
				desc: "Epson Dual Head"
			},
			{
				val: "5,760 DPI",
				unit: "Resolusi Maks.",
				desc: "5760 × 1440 dpi"
			},
			{
				val: "6 Warna",
				unit: "Tinta UV",
				desc: "CMYK + Lc + Lm + W"
			}
		];
	}
	return [
		{
			val: "Industrial",
			unit: "Grade Rangka",
			desc: "Heavy-Duty Chassis"
		},
		{
			val: "Presisi Tinggi",
			unit: "Sistem Motor",
			desc: "Hybrid Servo"
		},
		{
			val: "24/7",
			unit: "Siklus Kerja",
			desc: "Produksi Non-Stop"
		},
		{
			val: "Garansi Resmi",
			unit: "Proteksi ORIA",
			desc: "Sparepart & Servis"
		}
	];
}
function getDetailedSpecColumns(prod) {
	const name = (prod.name || "").toLowerCase();
	const cat = (prod.categoryName || "").toLowerCase();
	const groupsDict = {
		"PRINT SYSTEM & PERFORMANCE": [],
		"WORKING AREA & MEDIA": [],
		"INK SYSTEM & COLOR": [],
		"ELECTRICAL & OPERATIONAL": [],
		"DIMENSIONS & CONSTRUCTION": [],
		"CONNECTIVITY & CONTROL SYSTEM": [],
		"UNIT INFORMATION & WARRANTY": []
	};
	if (prod.descriptionHtml) {
		const regex = /<tr[^>]*>\s*<td[^>]*>(.*?)<\/td>\s*<td[^>]*>(.*?)<\/td>\s*<\/tr>/gi;
		let match;
		while ((match = regex.exec(prod.descriptionHtml)) !== null) {
			let rawK = match[1].replace(/<[^>]+>/g, "").trim().replace(/^[\s:-]+/, "").replace(/[\s:-]+$/, "");
			let rawV = match[2].replace(/<[^>]+>/g, "").trim().replace(/^[\s:-]+/, "");
			if (rawK && rawV && !/^(spesifikasi|detail mesin)$/i.test(rawK)) {
				const k = rawK.toLowerCase();
				if (k.includes("head") || k.includes("speed") || k.includes("kecepatan") || k.includes("resolusi") || k.includes("laser") || k.includes("spindle") || k.includes("akurasi")) groupsDict["PRINT SYSTEM & PERFORMANCE"].push({
					label: rawK,
					value: rawV
				});
				else if (k.includes("lebar") || k.includes("area") || k.includes("media") || k.includes("meja") || k.includes("bed") || k.includes("tebal")) groupsDict["WORKING AREA & MEDIA"].push({
					label: rawK,
					value: rawV
				});
				else if (k.includes("tinta") || k.includes("ink") || k.includes("warna") || k.includes("color")) groupsDict["INK SYSTEM & COLOR"].push({
					label: rawK,
					value: rawV
				});
				else if (k.includes("listrik") || k.includes("power") || k.includes("daya") || k.includes("suhu") || k.includes("pemanas") || k.includes("voltage") || k.includes("tegangan")) groupsDict["ELECTRICAL & OPERATIONAL"].push({
					label: rawK,
					value: rawV
				});
				else if (k.includes("dimensi") || k.includes("berat") || k.includes("weight") || k.includes("ukuran") || k.includes("gantry") || k.includes("rail")) groupsDict["DIMENSIONS & CONSTRUCTION"].push({
					label: rawK,
					value: rawV
				});
				else if (k.includes("rip") || k.includes("software") || k.includes("interface") || k.includes("koneksi") || k.includes("port") || k.includes("dsp") || k.includes("kontrol")) groupsDict["CONNECTIVITY & CONTROL SYSTEM"].push({
					label: rawK,
					value: rawV
				});
				else groupsDict["UNIT INFORMATION & WARRANTY"].push({
					label: rawK,
					value: rawV
				});
			}
		}
	}
	if (groupsDict["PRINT SYSTEM & PERFORMANCE"].length === 0) {
		if (name.includes("outdoor") || cat.includes("outdoor")) {
			groupsDict["PRINT SYSTEM & PERFORMANCE"] = [
				{
					label: "Tipe Printhead",
					value: "Konica Minolta KM512i (30 PL Heavy-Duty Industrial)"
				},
				{
					label: "Konfigurasi Head",
					value: "4 Printheads (Staggered Arrangement)"
				},
				{
					label: "Kecepatan Cetak",
					value: "125 m²/h (Billboard 2-Pass) | 80 m²/h (Produksi 3-Pass)"
				},
				{
					label: "Resolusi Maksimal",
					value: "1,440 DPI High Color Density"
				},
				{
					label: "Teknologi Semprot",
					value: "Drop-on-Demand Piezoelectric Micro-Nozzle"
				}
			];
			groupsDict["WORKING AREA & MEDIA"] = [
				{
					label: "Lebar Area Cetak",
					value: "3,200 mm (3.2 Meter Super Wide Format)"
				},
				{
					label: "Tipe Media Roll",
					value: "Frontlit, Backlit Banner, Flex, Vinyl Sticker, Mesh, One Way"
				},
				{
					label: "Sistem Feeding",
					value: "Industrial Heavy Duty Dual Motor Roll-to-Roll Feed & Take-Up"
				},
				{
					label: "Ketebalan Media",
					value: "Maksimal 2.5 mm Media Roll Industri"
				}
			];
			groupsDict["INK SYSTEM & COLOR"] = [
				{
					label: "Tipe Tinta",
					value: "Solvent Industrial Ink High Pigment"
				},
				{
					label: "Konfigurasi Warna",
					value: "CMYK (4 Warna Tinta Solvent)"
				},
				{
					label: "Sistem Pasokan",
					value: "Continuous Ink Supply System (CISS) dengan Sub-tank Filter"
				},
				{
					label: "Ketahanan Cuaca",
					value: "2+ Tahun Tahan Paparan Sinar UV & Cuaca Luar Ruangan"
				}
			];
			groupsDict["ELECTRICAL & OPERATIONAL"] = [
				{
					label: "Kebutuhan Daya",
					value: "Operasional 1,200 Watt, Pemanas Maksimal 3,500 Watt"
				},
				{
					label: "Tegangan Listrik",
					value: "AC 220V ± 10%, 50/60 Hz, Single Phase"
				},
				{
					label: "Sistem Pemanas",
					value: "3-Way Intelligent Heater (Pre, Mid, & Post Heater)"
				},
				{
					label: "Sistem Pengering",
					value: "Infrared Heating Bar + Multi-Blower Fan System"
				}
			];
			groupsDict["DIMENSIONS & CONSTRUCTION"] = [
				{
					label: "Dimensi Unit Mesin",
					value: "4,800 mm x 1,050 mm x 1,450 mm"
				},
				{
					label: "Berat Bersih Mesin",
					value: "Sekitar 850 kg (Rigid High-Tensile Steel Body)"
				},
				{
					label: "Rel Pemandu Gantry",
					value: "THK Dual Linear Mute Guide Rail Made in Japan"
				}
			];
			groupsDict["CONNECTIVITY & CONTROL SYSTEM"] = [
				{
					label: "Antarmuka Komunikasi",
					value: "High-Speed USB 3.0 / Gigabit LAN Port"
				},
				{
					label: "Kompatibilitas RIP",
					value: "Photoprint, Maintop, Onyx RIP Software"
				},
				{
					label: "Sistem Operasi",
					value: "Windows 10 / Windows 11 (64-bit)"
				}
			];
		} else if (name.includes("sublim") || cat.includes("sublim")) {
			groupsDict["PRINT SYSTEM & PERFORMANCE"] = [
				{
					label: "Tipe Printhead",
					value: name.includes("1804") ? "4x Epson i3200-A1 PrecisionCore" : "2x Epson i3200-A1 PrecisionCore"
				},
				{
					label: "Kecepatan Cetak",
					value: name.includes("1804") ? "Hingga 140 m²/h (2-Pass Mode)" : "Hingga 80 m²/h (2-Pass Mode)"
				},
				{
					label: "Resolusi Maksimal",
					value: "3,200 DPI Micro-Piezo Droplet 3.8 pl"
				},
				{
					label: "Sistem Anti-Blinking",
					value: "Auto Capping, Wiping, and Anti-Clogging Nozzle Flush"
				}
			];
			groupsDict["WORKING AREA & MEDIA"] = [
				{
					label: "Lebar Area Cetak",
					value: "1,900 mm (1.9 Meter Roll-to-Roll Textile)"
				},
				{
					label: "Kompatibilitas Kertas",
					value: "Sublimation Transfer Paper 35 Gsm - 100 Gsm"
				},
				{
					label: "Sistem Penegang Kertas",
					value: "Tension-Balanced Multi-Roller Feeding System"
				}
			];
			groupsDict["INK SYSTEM & COLOR"] = [
				{
					label: "Jenis Tinta",
					value: "Water-Based Dye Sublimation Disperse Ink"
				},
				{
					label: "Konfigurasi Warna",
					value: "CMYK (4 Warna Hi-Fi Color Gamut)"
				},
				{
					label: "Kapasitas Pasokan",
					value: "Bulk Ink Tank 1.5 Liter per Warna dengan Level Sensor"
				}
			];
			groupsDict["ELECTRICAL & OPERATIONAL"] = [
				{
					label: "Daya Operasional",
					value: "Mesin 800 Watt, Pemanas Kering 2,200 Watt"
				},
				{
					label: "Kebutuhan Listrik",
					value: "AC 220V, 50 Hz Single Phase"
				},
				{
					label: "Sistem Pengeringan",
					value: "Smart Front Dryer Infrared + Turbofan System"
				}
			];
			groupsDict["DIMENSIONS & CONSTRUCTION"] = [
				{
					label: "Dimensi Unit Mesin",
					value: "3,100 mm x 950 mm x 1,450 mm"
				},
				{
					label: "Berat Bersih Mesin",
					value: "Sekitar 320 kg"
				},
				{
					label: "Sistem Motor Penggerak",
					value: "Integrated High Torque Brushless Leadshine Servo"
				}
			];
			groupsDict["CONNECTIVITY & CONTROL SYSTEM"] = [{
				label: "Port Antarmuka",
				value: "Gigabit Ethernet Optical Interface / USB 3.0"
			}, {
				label: "Software RIP",
				value: "Maintop / Photoprint / Neostampa"
			}];
		} else if (name.includes("uv") || cat.includes("uv")) {
			groupsDict["PRINT SYSTEM & PERFORMANCE"] = [
				{
					label: "Tipe Printhead",
					value: "Epson i3200-U1 / Epson XP600 Industrial UV"
				},
				{
					label: "Konfigurasi Nozzle",
					value: "CMYK + White + Gloss Varnish Layering"
				},
				{
					label: "Resolusi Cetak",
					value: "2,400 x 1,200 DPI Micro Varnish Precision"
				},
				{
					label: "Sistem Pengeringan",
					value: "Dual Water-Cooled LED UV Curing System Instant Dry"
				}
			];
			groupsDict["WORKING AREA & MEDIA"] = [
				{
					label: "Area Meja Kerja",
					value: name.includes("a3") ? "300 mm x 420 mm (A3 Format)" : name.includes("6090") ? "600 mm x 900 mm" : "1,300 mm x 2,500 mm Industrial Bed"
				},
				{
					label: "Ketebalan Media",
					value: "Hingga 150 mm (Auto Height Measurement Sensor)"
				},
				{
					label: "Aplikasi Material",
					value: "Akrilik, Kaca, Kayu, Keramik, Logam, Tumbler 360°, Case HP"
				}
			];
			groupsDict["INK SYSTEM & COLOR"] = [
				{
					label: "Jenis Tinta",
					value: "UV LED Curable Ink (Hard / Flexible Formula)"
				},
				{
					label: "Sirkulasi Tinta Putih",
					value: "Automatic White Ink Agitation & Circulation System"
				},
				{
					label: "Efek Khusus",
					value: "Emboss 3D Texture, Braille Print, Glossy Clear Coat"
				}
			];
			groupsDict["ELECTRICAL & OPERATIONAL"] = [
				{
					label: "Konsumsi Listrik",
					value: "800 Watt - 1,500 Watt Operasional"
				},
				{
					label: "Tegangan Kerja",
					value: "AC 220V, 50/60 Hz"
				},
				{
					label: "Suhu Operasional",
					value: "20°C - 30°C, Kelembaban 40% - 60%"
				}
			];
			groupsDict["DIMENSIONS & CONSTRUCTION"] = [{
				label: "Struktur Meja",
				value: "Aviation Aluminum Vacuum Bed dengan Mute Guide Rail"
			}, {
				label: "Sistem Penggerak",
				value: "Leadshine High Precision Servo Motor"
			}];
			groupsDict["CONNECTIVITY & CONTROL SYSTEM"] = [{
				label: "Antarmuka Mesin",
				value: "High Speed USB 3.0 / RIP Host Link"
			}, {
				label: "Dukungan File Format",
				value: "TIFF, EPS, PDF, JPEG, AI, PSD"
			}];
		} else if (name.includes("laser") || cat.includes("laser") || name.includes("marking")) {
			const isFiber = name.includes("fiber") || name.includes("3015") || name.includes("6015");
			const isUvMarking = name.includes("uv") && (name.includes("marking") || name.includes("5w"));
			groupsDict["PRINT SYSTEM & PERFORMANCE"] = [
				{
					label: "Tipe Sumber Laser",
					value: isUvMarking ? "JPT 355nm UV Cold Laser Source" : isFiber ? "Raycus / Maxphotonics Continuous Fiber Laser" : "Sealed CO2 Glass Laser Tube Reci / Yongli"
				},
				{
					label: "Daya Output Laser",
					value: isUvMarking ? "5 Watt UV Cold Laser High-Precision" : isFiber ? name.includes("6015") ? "6,000 Watt" : "1,500 - 3,000 Watt" : "80 Watt - 150 Watt High Peak"
				},
				{
					label: "Kecepatan Grafir / Potong",
					value: name.includes("marking") ? "Hingga 7,000 - 8,000 mm/s" : "Hingga 600 - 1,000 mm/s"
				},
				{
					label: "Akurasi Pengulangan",
					value: "±0.003 - 0.01 mm Presisi Mikron Optik"
				},
				{
					label: "Karakteristik Proses",
					value: isUvMarking ? "Cold Laser Processing (Bebas Efek Terbakar / Thermal Damage)" : isFiber ? "High Speed Metal Cutting" : "CO2 Thermal Cutting & Engraving"
				}
			];
			groupsDict["WORKING AREA & MEDIA"] = [
				{
					label: "Area Efektif Meja",
					value: name.includes("6040") ? "600 mm x 400 mm" : name.includes("6090") ? "600 mm x 900 mm" : name.includes("1490") ? "1,400 mm x 900 mm" : name.includes("1325") ? "1,300 mm x 2,500 mm" : name.includes("3015") ? "3,000 mm x 1,500 mm" : "6,000 mm x 1,500 mm"
				},
				{
					label: "Tipe Meja Kerja",
					value: isFiber ? "Heavy Duty Sawtooth Strip Bed dengan Auto Chute" : "Honeycomb Grid Bed & Aluminum Knife Blade Dual System"
				},
				{
					label: "Kesesuaian Bahan",
					value: isFiber ? "Plat Besi, Carbon Steel, Stainless, Aluminium, Tembaga" : "Akrilik, Kayu, Karet Stempel, Kain, Kulit, MDF, Kertas"
				}
			];
			groupsDict["INK SYSTEM & COLOR"] = [{
				label: "Media Pendingin",
				value: "Industrial Water Chiller CW-5200 / CW-6000 Dual Temp"
			}, {
				label: "Gas Pendukung Potong",
				value: isFiber ? "Oksigen (O2), Nitrogen (N2), High Pressure Clean Air" : "Air Assist Compressor Oil-Free"
			}];
			groupsDict["ELECTRICAL & OPERATIONAL"] = [{
				label: "Kebutuhan Listrik",
				value: isFiber ? "3-Phase AC 380V ± 5%, 50/60 Hz" : "Single Phase AC 220V ± 10%, 50 Hz"
			}, {
				label: "Sistem Pembuangan Asap",
				value: "Centrifugal High-Powered Exhaust Blower + Air Ducting"
			}];
			groupsDict["DIMENSIONS & CONSTRUCTION"] = [{
				label: "Rangka Mesin",
				value: isFiber ? "Heavy Duty Gantry Aviasi Annealed Steel Chasis" : "High Rigid Seamless Welded Steel Chasis"
			}, {
				label: "Sistem Transmisi",
				value: isFiber ? "Taiwan YYC Dual Helical Rack & Pinion" : "High Precision Timing Belt & Linear Guide"
			}];
			groupsDict["CONNECTIVITY & CONTROL SYSTEM"] = [{
				label: "Sistem Kontrol CNC",
				value: isFiber ? "Cypcut Laser Control System FSCUT" : "Ruida 6442G/6445G DSP Standalone Controller"
			}, {
				label: "Kompatibilitas Software",
				value: "CorelDRAW, AutoCAD, Illustrator (DXF, AI, PLT, BMP)"
			}];
		} else if (name.includes("cnc") || cat.includes("cnc") || name.includes("plasma")) {
			groupsDict["PRINT SYSTEM & PERFORMANCE"] = [
				{
					label: "Daya Spindle Motor",
					value: name.includes("6090") ? "2.2 kW Water-Cooled Spindle" : "5.5 kW High-Torque Water/Air Spindle"
				},
				{
					label: "Kecepatan Rotasi Spindle",
					value: "6,000 - 24,000 RPM Stepless Inverter"
				},
				{
					label: "Akurasi Pemosisi",
					value: "±0.02 mm / 300 mm"
				},
				{
					label: "Kecepatan Gerak Bebas",
					value: "Hingga 32,000 mm/menit"
				}
			];
			groupsDict["WORKING AREA & MEDIA"] = [
				{
					label: "Area Kerja Efektif",
					value: name.includes("6090") ? "600 mm x 900 mm x 150 mm" : "1,300 mm x 2,500 mm x 200 mm"
				},
				{
					label: "Tipe Meja Kerja",
					value: "Dual Vacuum Clamping Zone + T-Slot Aluminum Extrusion"
				},
				{
					label: "Material Kompatibel",
					value: "Kayu Solid, MDF, ACP, PVC Board, Akrilik, Kuningan, Tembaga"
				}
			];
			groupsDict["INK SYSTEM & COLOR"] = [{
				label: "Sistem Pelumasan",
				value: "Manual / Auto Centralized Oil Lubrication System"
			}, {
				label: "Sistem Dust Collector",
				value: "Double Bag Industrial Dust Suction Vacuum 3 kW"
			}];
			groupsDict["ELECTRICAL & OPERATIONAL"] = [{
				label: "Kebutuhan Tegangan",
				value: "3-Phase AC 380V atau 1-Phase AC 220V 50 Hz"
			}, {
				label: "Sistem Penggerak",
				value: "Leadshine Easy-Servo Closed-Loop Hybrid Driver"
			}];
			groupsDict["DIMENSIONS & CONSTRUCTION"] = [{
				label: "Konstruksi Meja",
				value: "Thick Heavy Wall Square Steel Tubular Frame"
			}, {
				label: "Rel Pemandu Sumbu X/Y/Z",
				value: "Taiwan Hiwin 20mm Linear Guide Rails"
			}];
			groupsDict["CONNECTIVITY & CONTROL SYSTEM"] = [{
				label: "Sistem Kontrol Handheld",
				value: "DSP A11 Handheld Controller / NC Studio Link"
			}, {
				label: "Bahasa Perintah",
				value: "Standard Industrial G-Code & HPGL Format"
			}];
		} else {
			groupsDict["PRINT SYSTEM & PERFORMANCE"] = [{
				label: "Tipe Sistem",
				value: "Industrial Precision Heavy-Duty Machine"
			}, {
				label: "Akurasi Toleransi",
				value: "Toleransi Presisi Standar Internasional"
			}];
			groupsDict["WORKING AREA & MEDIA"] = [{
				label: "Format Media",
				value: "Industrial Roll-to-Roll / Flatbed Rigid Sheet"
			}];
			groupsDict["ELECTRICAL & OPERATIONAL"] = [{
				label: "Tegangan Operasional",
				value: "AC 220V ± 10%, 50/60 Hz"
			}];
			groupsDict["DIMENSIONS & CONSTRUCTION"] = [{
				label: "Struktur Rangka",
				value: "Solid Steel Reinforced Chasis Anti-Vibration"
			}];
			groupsDict["CONNECTIVITY & CONTROL SYSTEM"] = [{
				label: "Interface Data",
				value: "High Speed Industrial USB / Gigabit Ethernet"
			}];
		}
	}
	groupsDict["UNIT INFORMATION & WARRANTY"] = [
		{
			label: "Manufaktur & Brand",
			value: `ORIA Industrial Series (${prod.brand || "ORIA"})`
		},
		{
			label: "Model & SKU",
			value: `${prod.name} (SKU: ${prod.sku})`
		},
		{
			label: "Kategori Mesin",
			value: prod.categoryName
		},
		{
			label: "Garansi Resmi",
			value: "1 Tahun Garansi Resmi ORIA (Servis & Non-Consumable Sparepart)"
		},
		{
			label: "Layanan Purnajual",
			value: "Instalasi On-Site, Kalibrasi Warna Profil ICC, Training Operator Sampai Mahir"
		},
		{
			label: "Dukungan Sparepart",
			value: "Pasokan Tinta Original & Sparepart Resmi Dijamin Berkesinambungan"
		}
	];
	const activeGroups = Object.entries(groupsDict).filter(([_, items]) => items.length > 0).map(([title, items]) => ({
		title,
		items
	}));
	const left = [];
	const right = [];
	let leftWeight = 0;
	let rightWeight = 0;
	for (const g of activeGroups) {
		const weight = g.items.length + 2;
		if (leftWeight <= rightWeight) {
			left.push(g);
			leftWeight += weight;
		} else {
			right.push(g);
			rightWeight += weight;
		}
	}
	return {
		left,
		right
	};
}
function cleanStrapiText(text) {
	return text.replace(/<[^>]+>/g, " ").replace(/&amp;/gi, "&").replace(/&lt;/gi, "<").replace(/&gt;/gi, ">").replace(/&quot;/gi, "\"").replace(/&#39;|&apos;/gi, "'").replace(/&nbsp;/gi, " ").replace(/&times;/gi, "×").replace(/&deg;/gi, "°").replace(/&plusmn;/gi, "±").replace(/CO\?\?\?/g, "CO₂").replace(/colors\?\?\?([^?]+)\?\?\?/gi, "colors ($1)").replace(/^\?\?\?\s*/g, "≤ ").replace(/\?\?\?/g, "–").replace(/m\?\?\/jam/gi, "m²/jam").replace(/m\?\?\/h/gi, "m²/h").replace(/\?\?m\b/g, "μm").replace(/\?\?\s*C\b/gi, "°C").replace(/([XLP])\s*\?\?\s*([WYHL])/g, "$1 × $2").replace(/([WYHL])\s*\?\?\s*([HLT])/g, "$1 × $2").replace(/(\d+(?:\.\d+)?(?:\s*cm)?)\s*\?\?\s*(\d)/g, "$1 × $2").replace(/\?\?(\s*\d)/g, "±$1").replace(/\?\?/g, "–").replace(/\s+/g, " ").trim();
}
/**
* Parse authentic specification rows directly from Strapi specificationsHtml (or descriptionHtml fallback).
* Preserves exact labels, values, and order from Strapi without inventing extra rows.
*/
function parseStrapiSpecRows(prod) {
	const html = prod.specificationsHtml || prod.descriptionHtml || "";
	if (!html) return [];
	const rows = [];
	const trRegex = /<tr[^>]*>([\s\S]*?)<\/tr>/gi;
	let trMatch;
	while ((trMatch = trRegex.exec(html)) !== null) {
		const trInner = trMatch[1];
		if (/<th[\s>]/i.test(trInner) && !/<td[\s>]/i.test(trInner)) continue;
		const tdMatches = [...trInner.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)];
		if (tdMatches.length >= 2) {
			const label = cleanStrapiText(tdMatches[0][1]).replace(/^[\s:-]+/, "").replace(/[\s:-]+$/, "");
			const value = cleanStrapiText(tdMatches[1][1]).replace(/^[\s:-]+/, "");
			if (label && value && !/^(detail mesin|detail produk|spesifikasi|keterangan(?: spesifikasi)?)$/i.test(label)) rows.push({
				label,
				value
			});
		}
	}
	return rows;
}
//#endregion
//#region src/lib/sections/detail-produk/DetailHero.svelte
function DetailHero($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { product, cleanModelName, specs, categoryId } = $$props;
		$$renderer.push(`<section id="overview" class="relative w-full h-[100svh] min-h-[640px] bg-black text-white overflow-hidden select-none"><div class="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"><picture class="w-full h-full block overflow-hidden">`);
		if (product.mainImageMobileUrl) $$renderer.push(`<!--[0--><source media="(max-width: 639px)"${attr("srcset", product.mainImageMobileUrl)}/>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <img${attr("src", product.mainImageDesktopUrl || product.imageUrl)}${attr("alt", product.name)} class="w-full h-full object-cover object-center sm:object-right select-none" loading="eager"/></picture>  <div class="sm:hidden absolute top-0 inset-x-0 h-[46%] bg-gradient-to-b from-black via-black/80 to-transparent pointer-events-none"></div> <div class="sm:hidden absolute bottom-0 inset-x-0 h-[40%] bg-gradient-to-t from-black via-black/85 to-transparent pointer-events-none"></div> <div class="hidden sm:block absolute top-0 inset-x-0 h-36 bg-gradient-to-b from-black/75 to-transparent pointer-events-none"></div> <div class="hidden sm:block absolute inset-0 bg-gradient-to-r from-black via-black/80 lg:via-black/65 to-transparent pointer-events-none"></div></div> <div class="relative z-20 w-full h-full px-6 sm:px-10 lg:px-16 pb-6 sm:pb-10 lg:pb-12 pointer-events-none"><div class="w-full h-full max-w-7xl mx-auto flex flex-col justify-between"><div class="max-w-xl lg:max-w-3xl xl:max-w-4xl pointer-events-auto pt-28 sm:pt-36 lg:pt-40"><nav class="flex flex-wrap items-center gap-1.5 sm:gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-neutral-300 font-medium" aria-label="Breadcrumb"><a href="/produk" class="hover:text-white transition-colors cursor-pointer">KATALOG</a> <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> `);
		if (categoryId) $$renderer.push(`<!--[0--><a${attr("href", `/produk/${stringify(categoryId)}`)} class="text-neutral-400 hover:text-white transition-colors cursor-pointer">${escape_html(product.categoryName)}</a>`);
		else $$renderer.push(`<!--[-1--><span class="text-neutral-400">${escape_html(product.categoryName)}</span>`);
		$$renderer.push(`<!--]--> <svg class="w-3 h-3 text-neutral-400 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg> <span class="text-[#A3BCC4] truncate max-w-[220px] sm:max-w-[360px] font-semibold">${escape_html(product.name)}</span></nav> <h1 class="mt-3 sm:mt-4 font-heading font-extrabold tracking-[0.16em] sm:tracking-[0.2em] text-2xl sm:text-3xl md:text-4xl lg:text-5xl uppercase text-[#A3BCC4] leading-tight drop-shadow-[0_4px_30px_rgba(0,0,0,0.95)]">${escape_html(cleanModelName)}</h1> `);
		if (product.priceText) {
			$$renderer.push(`<!--[0--><div class="mt-3 sm:mt-4 flex flex-wrap items-baseline gap-2.5 sm:gap-3 drop-shadow-md">`);
			if (product.priceText.startsWith("Rp")) $$renderer.push(`<!--[0--><span class="font-heading font-medium text-xl sm:text-2xl lg:text-3xl text-white tracking-tight tabular-nums">${escape_html(product.priceText)}</span>`);
			else $$renderer.push(`<!--[-1--><a${attr("href", `https://wa.me/6281252086455?text=${stringify(encodeURIComponent(`Halo ORIA, saya ingin menanyakan informasi harga dan penawaran resmi untuk unit ${product.name}.`))}`)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-2 font-mono text-[11px] sm:text-xs uppercase tracking-[0.22em] text-neutral-300 hover:text-white transition-colors group cursor-pointer"><span>ESTIMASI HARGA:</span> <span class="text-[#A3BCC4] font-semibold underline underline-offset-4 group-hover:text-white">${escape_html(product.priceText)}</span> <svg class="w-3.5 h-3.5 stroke-current stroke-[2.5] transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a>`);
			$$renderer.push(`<!--]--></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--></div> <div class="pointer-events-auto w-full pt-6"><div class="grid grid-cols-1 md:grid-cols-2 gap-x-12 lg:gap-x-20 gap-y-3.5 sm:gap-y-6 lg:gap-y-8 max-w-3xl"><!--[-->`);
		const each_array = ensure_array_like(specs.slice(0, 4));
		for (let idx = 0, $$length = each_array.length; idx < $$length; idx++) {
			let s = each_array[idx];
			const isSize = s.val.includes("x") || s.val.endsWith("m") || s.val.endsWith("cm") || s.val.endsWith("mm");
			const isHighlight = idx < 2;
			$$renderer.push(`<div class="flex sm:flex-col items-center sm:items-start justify-between sm:justify-start gap-3 sm:gap-2"><div class="font-heading font-medium tracking-tight text-white drop-shadow-lg flex items-baseline gap-2 shrink-0">`);
			if (isSize && s.val.includes(" ")) {
				$$renderer.push("<!--[0-->");
				const parts = s.val.split(" ");
				$$renderer.push(`<span class="text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium text-[#A3BCC4] leading-none">${escape_html(parts[0])}</span> <span class="text-sm sm:text-base lg:text-xl font-medium text-[#A3BCC4] tracking-normal">${escape_html(parts.slice(1).join(" "))}</span>`);
			} else if (s.val.includes(" ")) {
				$$renderer.push("<!--[1-->");
				const parts = s.val.split(" ");
				$$renderer.push(`<span${attr_class(`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-none ${isHighlight ? "text-[#A3BCC4]" : "text-white"}`)}>${escape_html(parts[0])}</span> <span${attr_class(`text-sm sm:text-base lg:text-xl font-medium tracking-normal ${isHighlight ? "text-[#A3BCC4]" : "text-neutral-300"}`)}>${escape_html(parts.slice(1).join(" "))}</span>`);
			} else $$renderer.push(`<!--[-1--><span${attr_class(`text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-medium leading-none ${isHighlight ? "text-[#A3BCC4]" : "text-white"}`)}>${escape_html(s.val)}</span>`);
			$$renderer.push(`<!--]--></div> <div class="space-y-0.5 sm:space-y-1 min-w-0 text-right sm:text-left"><div${attr_class(`font-sans font-medium text-xs sm:text-sm uppercase tracking-wider ${isHighlight ? "text-[#A3BCC4]" : "text-white"} drop-shadow-sm truncate`)}>${escape_html(s.unit)}</div> <div class="font-sans text-xs sm:text-[13px] text-neutral-300 leading-snug line-clamp-2 drop-shadow-sm font-normal">${escape_html(s.desc)}</div></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/detail-produk/DetailStory.svelte
function DetailStory($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { product, cleanModelName } = $$props;
		$$renderer.push(`<section id="story" class="relative w-full bg-black text-white py-14 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"><div class="absolute inset-0 pointer-events-none"></div> <div class="relative z-10 max-w-4xl mx-auto text-center space-y-10 sm:space-y-14"><div><h2 class="font-heading font-light tracking-[0.22em] sm:tracking-[0.32em] text-2xl sm:text-4xl lg:text-5xl uppercase text-white leading-tight">DIRANCANG UNTUK PRODUKSI MARATON</h2></div> <div class="story-narrative font-sans text-neutral-300 text-sm sm:text-base lg:text-lg leading-relaxed font-light tracking-wide max-w-3xl mx-auto">`);
		if (product.descriptionHtml && product.descriptionHtml.trim() !== "") $$renderer.push(`<!--[0-->${html(product.descriptionHtml)}`);
		else {
			$$renderer.push(`<!--[-1--><p class="story-lead">Sebagian mesin menuntut Anda berkompromi dengan batas kemampuan mereka.<br class="hidden sm:inline"/> <strong>ORIA ${escape_html(cleanModelName)}</strong> direkayasa agar Anda dapat sepenuhnya terlarut dalam proses produksi tanpa batasan.</p> <p>Tanpa interupsi. Tanpa keraguan stabilitas warna dan akurasi mekanik. Tanpa rasa cemas akan waktu henti produksi.
          Hanya performa industri presisi tinggi yang konsisten, selalu siap menghasilkan dalam kecepatan penuh—karena keunggulan rekayasa sejati baru bermakna ketika Anda dapat mengandalkannya setiap detik.</p> `);
			if (product.shortDescription) $$renderer.push(`<!--[0--><p class="story-highlight">${escape_html(product.shortDescription)}</p>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]-->`);
		}
		$$renderer.push(`<!--]--></div> <div class="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 pt-8 sm:pt-12 border-t border-white/15 max-w-3xl mx-auto"><div class="space-y-1 text-center"><div class="font-heading font-bold text-xl sm:text-2xl text-[#A3BCC4] tracking-tight">OPERASIONAL 24/7</div> <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">STABILITAS INDUSTRI</div> <p class="font-sans text-xs text-neutral-300">Rigid chasis untuk produksi maraton stabil.</p></div> <div class="space-y-1 text-center"><div class="font-heading font-bold text-xl sm:text-2xl text-white tracking-tight">PRESISI MIKRON</div> <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">AKURASI MOTOR &amp; GANTRY</div> <p class="font-sans text-xs text-neutral-300">Sistem linier pemandu tanpa vibrasi.</p></div> <div class="space-y-1 text-center"><div class="font-heading font-bold text-xl sm:text-2xl text-[#A3BCC4] tracking-tight">TANPA KOMPROMI</div> <div class="font-mono text-[10px] uppercase tracking-widest text-neutral-400">GARANSI &amp; DUKUNGAN RESMI</div> <p class="font-sans text-xs text-neutral-300">Teknisi standby &amp; ketersediaan sparepart.</p></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/detail-produk/DetailGallery.svelte
function DetailGallery($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { product, cleanModelName } = $$props;
		const gallery = derived(() => product.galleryItems && product.galleryItems.length > 0 ? product.galleryItems : (product.galleryUrls || []).map((url, i) => ({
			url,
			title: `DETAIL PERSPEKTIF 0${i + 1}`,
			caption: `Dokumentasi visual unit industri presisi ${product.name}.`
		})));
		const carouselItems = derived(() => {
			if (gallery().length === 0) return [];
			let list = [...gallery()];
			while (list.length < 8) list = [...list, ...gallery()];
			return list;
		});
		onDestroy(() => {});
		if (gallery().length > 0) {
			$$renderer.push(`<!--[0--><section id="gallery" class="relative w-full bg-white text-black pt-16 pb-10 sm:pt-20 sm:pb-12 lg:pt-24 lg:pb-14 px-6 sm:px-10 lg:px-16 overflow-hidden select-none"><div class="max-w-4xl mx-auto space-y-8 sm:space-y-10"><div class="space-y-3 sm:space-y-4 max-w-3xl"><h2 class="font-heading font-medium tracking-[0.2em] sm:tracking-[0.25em] text-2xl sm:text-3xl lg:text-4xl uppercase text-black leading-tight">GALERI MESIN</h2> <p class="font-sans text-xs sm:text-sm text-neutral-600 font-normal leading-relaxed">Eksplorasi visual setiap sudut konstruksi baja berat, arsitektur printhead, dan integrasi komponen presisi tinggi dari ORIA ${escape_html(cleanModelName)}.</p></div> <div class="relative w-full aspect-[16/10] sm:aspect-[16/9] bg-neutral-100 overflow-hidden border border-neutral-300 shadow-sm" role="region" aria-label="Gallery Carousel"><div class="w-full h-full"><!--[-->`);
			const each_array = ensure_array_like(carouselItems());
			for (let i = 0, $$length = each_array.length; i < $$length; i++) {
				let item = each_array[i];
				$$renderer.push(`<div class="relative w-full aspect-[16/10] sm:aspect-[16/9] overflow-hidden select-none"><img${attr("src", item.url)}${attr("alt", item.title || product.name)} class="w-full h-full object-cover object-center pointer-events-none select-none"${attr("loading", i < 2 ? "eager" : "lazy")} draggable="false"/></div>`);
			}
			$$renderer.push(`<!--]--></div> `);
			if (gallery().length > 1) $$renderer.push(`<!--[0--><button type="button" class="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 border border-[#334c54] bg-[#334c54] hover:bg-[#273a40] text-white flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none group backdrop-blur-sm shadow-xl" aria-label="Foto Sebelumnya"><svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-transform duration-200 group-hover:-translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M15 19l-7-7 7-7"></path></svg></button> <button type="button" class="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 z-20 w-9 h-9 sm:w-11 sm:h-11 border border-[#334c54] bg-[#334c54] hover:bg-[#273a40] text-white flex items-center justify-center transition-all duration-300 cursor-pointer focus:outline-none group backdrop-blur-sm shadow-xl" aria-label="Foto Berikutnya"><svg class="w-4 h-4 sm:w-5 sm:h-5 stroke-current transition-transform duration-200 group-hover:translate-x-0.5" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></button>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div> `);
			if (gallery().length > 1) $$renderer.push(`<!--[0--><div class="flex justify-end pt-1 border-b border-neutral-300 pb-4"><div class="font-mono text-xs sm:text-sm tracking-widest text-black font-bold">${escape_html(1)} / ${escape_html(gallery().length)}</div></div>`);
			else $$renderer.push("<!--[-1-->");
			$$renderer.push(`<!--]--></div></section>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]-->`);
	});
}
//#endregion
//#region src/lib/sections/detail-produk/DetailSpec.svelte
function DetailSpec($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { product, detailedSpecs = {
			left: [],
			right: []
		} } = $$props;
		let specRows = derived(() => {
			const authentic = parseStrapiSpecRows(product);
			if (authentic.length > 0) return authentic;
			return [...detailedSpecs.left, ...detailedSpecs.right].flatMap((g) => g.items);
		});
		let count100 = 0;
		let count24 = 0;
		$$renderer.push(`<section id="spec" class="w-full bg-white text-black pt-10 pb-20 sm:pt-12 sm:pb-24 lg:pt-14 lg:pb-28 px-6 sm:px-10 lg:px-16 select-none"><div class="max-w-7xl mx-auto space-y-16 sm:space-y-20"><div class="text-center space-y-3 sm:space-y-4"><h2 class="font-heading font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-[0.16em] text-black">SPESIFIKASI TEKNIS</h2> <p class="font-sans text-xs sm:text-sm text-neutral-600 max-w-xl mx-auto leading-relaxed">Parameter teknis resmi dan spesifikasi operasional untuk <span class="text-black font-medium">${escape_html(product.name)}</span>.</p></div> `);
		if (specRows().length > 0) {
			$$renderer.push(`<!--[0--><div class="max-w-4xl mx-auto"><div class="grid grid-cols-12 items-center border-b-2 border-[#334c54] pb-3.5 px-2 sm:px-4 text-[11px] sm:text-xs font-heading font-bold uppercase tracking-[0.22em] text-[#334c54]"><div class="col-span-5 sm:col-span-4">Spesifikasi</div> <div class="col-span-7 sm:col-span-8 flex items-center justify-between"><span>Keterangan</span> <span class="hidden sm:inline-block w-1.5 h-1.5 rounded-full bg-[#334c54]"></span></div></div> <div class="divide-y divide-[#D6DBDD]"><!--[-->`);
			const each_array = ensure_array_like(specRows());
			for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
				let row = each_array[$$index];
				$$renderer.push(`<div class="group grid grid-cols-12 items-baseline py-4 sm:py-4.5 px-2 sm:px-4 text-xs sm:text-sm transition-colors duration-200 hover:bg-[#334c54]/[0.03]"><div class="col-span-5 sm:col-span-4 pr-4 text-neutral-500 group-hover:text-[#334c54] font-medium leading-relaxed transition-colors duration-200 flex items-baseline gap-2.5"><span class="hidden sm:inline-block w-1 h-1 rounded-full bg-[#D6DBDD] group-hover:bg-[#334c54] shrink-0 transition-colors duration-200"></span> <span>${escape_html(row.label)}</span></div> <div class="col-span-7 sm:col-span-8 text-black font-semibold leading-relaxed">${escape_html(row.value)}</div></div>`);
			}
			$$renderer.push(`<!--]--></div></div>`);
		} else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <div class="flex flex-col sm:flex-row items-center justify-center pt-2 sm:pt-4"><a${attr("href", product.brochureUrl || `https://wa.me/6281252086455?text=${encodeURIComponent(`Halo tim ORIA, mohon kirimkan e-katalog brosur dan full spesifikasi PDF untuk unit ${product.name}. Terima kasih.`)}`)} target="_blank" rel="noopener noreferrer"${attr("download", product.brochureUrl ? `${product.slug}-brochure.pdf` : void 0)} class="inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-[#334c54] hover:bg-[#273a40] text-white font-heading font-black text-xs sm:text-sm uppercase tracking-[0.2em] transition-all duration-300 shadow-md group cursor-pointer"><svg class="w-4 h-4 stroke-white stroke-[2.5]" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M7.5 12L12 16.5m0 0L16.5 12M12 16.5V3"></path></svg> <span>UNDUH BROSUR &amp; SPESIFIKASI LENGKAP</span> <svg class="w-4 h-4 stroke-white stroke-[3] transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div> <div class="pt-16 sm:pt-24 border-t border-neutral-200 space-y-12 sm:space-y-16"><div class="space-y-3 max-w-2xl"><h3 class="font-heading font-light text-2xl sm:text-3xl lg:text-4xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-black">GARANSI &amp; LAYANAN</h3> <p class="font-sans text-xs sm:text-sm text-neutral-600 max-w-xl leading-relaxed pt-1">Standar proteksi investasi dan dukungan operasional resmi dari teknisi pabrikan ORIA.</p></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16"><div class="space-y-3"><div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-black tracking-tight tabular-nums">1<span class="text-[#334c54] font-normal">TAHUN</span></div> <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-900 pt-1">GARANSI RESMI</div> <p class="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">Jaminan perlindungan penuh untuk sparepart non-consumable dan servis berkala oleh teknisi resmi pabrikan ORIA.</p></div> <div class="space-y-3"><div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-black tracking-tight tabular-nums">${escape_html(count100)}<span class="text-[#334c54] font-normal">%</span></div> <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-900 pt-1">INSTALASI &amp; PELATIHAN DI LOKASI</div> <p class="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">Tim teknisi kami hadir langsung di workshop Anda untuk setting mesin, kalibrasi warna, dan pelatihan operator hingga mahir.</p></div> <div class="space-y-3"><div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-black tracking-tight tabular-nums">${escape_html(count24)}<span class="text-[#334c54] font-normal">/7</span></div> <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-900 pt-1">SUKU CADANG &amp; TINTA RESMI</div> <p class="text-xs sm:text-sm text-neutral-600 font-sans leading-relaxed">Ketersediaan consumable original terjamin berkesinambungan agar jadwal produksi bisnis Anda tidak pernah terhenti.</p></div></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/detail-produk/DetailCta.svelte
function DetailCta($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { product, cleanModelName } = $$props;
		$$renderer.push(`<section class="relative w-full min-h-[500px] sm:min-h-[580px] lg:min-h-[640px] bg-black text-white overflow-hidden flex items-center select-none"><div class="absolute inset-0 w-full h-full pointer-events-none"><picture class="w-full h-full">`);
		if (product.mainImageMobileUrl) $$renderer.push(`<!--[0--><source media="(max-width: 640px)"${attr("srcset", product.mainImageMobileUrl)}/>`);
		else $$renderer.push("<!--[-1-->");
		$$renderer.push(`<!--]--> <img${attr("src", product.mainImageDesktopUrl || product.imageUrl)}${attr("alt", `${stringify(product.name)} Showcase`)} class="w-full h-full object-cover object-center lg:object-[center_right] select-none" loading="lazy"/></picture> <div class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/55 to-black/35 sm:from-black sm:via-black/85 lg:via-black/70 lg:to-black/35"></div> <div class="absolute inset-0 bg-black/45 sm:bg-black/35"></div></div> <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 py-20 sm:py-28"><div class="max-w-7xl mx-auto w-full"><div class="max-w-xl lg:max-w-2xl space-y-8 sm:space-y-10"><h2 class="font-heading font-light tracking-[0.22em] sm:tracking-[0.32em] text-3xl sm:text-5xl lg:text-6xl uppercase text-white leading-[1.15]">ORIA ${escape_html(cleanModelName)} <span class="block font-thin tracking-[0.2em] sm:tracking-[0.28em] text-neutral-300 text-2xl sm:text-4xl lg:text-5xl pt-2">INSPEKSI &amp; DEMO LANGSUNG</span></h2> <div><a${attr("href", `https://wa.me/6281807090888?text=${stringify(encodeURIComponent(`Halo ORIA, saya ingin konsultasi teknis dan demo mesin ${product.name}`))}`)} target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-3 px-8 sm:px-10 py-3.5 sm:py-4 bg-black/40 hover:bg-[#334c54] hover:border-[#334c54] hover:text-white text-white border border-white font-heading font-bold text-xs sm:text-sm uppercase tracking-[0.28em] transition-all duration-300 group select-none cursor-pointer backdrop-blur-[2px]"><span>KONSULTASI SEKARANG</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div></div></div></div></section>`);
	});
}
//#endregion
//#region src/routes/produk/[kategori]/[slug]/+page.svelte
function _page($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { data } = $$props;
		const product = derived(() => data.product);
		const kategori = derived(() => data.kategori);
		let cleanModelName = derived(() => getCleanModelTitle(product().name));
		let specs = derived(() => getProductSpecs(product()));
		let detailedSpecs = derived(() => getDetailedSpecColumns(product()));
		const numericPrice = derived(() => {
			if (!product()?.priceText) return 0;
			const digits = product().priceText.replace(/[^0-9]/g, "");
			return digits ? parseInt(digits, 10) : 0;
		});
		const ogImage = derived(() => product().cardImageUrl || product().imageUrl);
		const seoTitle = derived(() => product().seoTitle || `Jual ${product().name} | Harga & Spesifikasi Lengkap`);
		const seoDescription = derived(() => product().seoDescription || product().shortDescription || `Spesifikasi lengkap, harga resmi, dan fitur canggih ${product().name} merk ORIA bergaransi resmi di Indonesia.`);
		const productRichSchema = derived(() => ({
			"@context": "https://schema.org",
			"@type": "Product",
			"@id": `https://oria.co.id/produk/${kategori()}/${product().slug}#richSnippet`,
			name: product().name,
			image: ogImage()?.startsWith("http") ? ogImage() : `https://oria.co.id${ogImage()}`,
			sku: product().sku || `ORIA-${product().id}`,
			mpn: product().sku || `ORIA-${product().id}`,
			description: seoDescription(),
			brand: {
				"@type": "Brand",
				name: "ORIA"
			},
			additionalProperty: [
				{
					"@type": "PropertyValue",
					name: "Brand Resmi",
					value: "ORIA Indonesia"
				},
				{
					"@type": "PropertyValue",
					name: "Kategori",
					value: product().categoryName
				},
				{
					"@type": "PropertyValue",
					name: "Garansi",
					value: "1 Tahun Garansi Resmi Pabrikan"
				},
				{
					"@type": "PropertyValue",
					name: "Layanan Purna Jual",
					value: "Free Training, On-Site Teknisi Lokal, Sparepart Lengkap"
				},
				{
					"@type": "PropertyValue",
					name: "Wilayah Layanan",
					value: "Seluruh Indonesia"
				}
			],
			offers: {
				"@type": "Offer",
				priceCurrency: "IDR",
				...numericPrice() > 0 ? { price: numericPrice() } : {},
				availability: "https://schema.org/InStock",
				itemCondition: "https://schema.org/NewCondition",
				url: `https://oria.co.id/produk/${kategori()}/${product().slug}`,
				priceValidUntil: "2027-12-31T23:59:59+07:00",
				seller: {
					"@type": "Organization",
					"@id": "https://oria.co.id/#Organization",
					name: "ORIA Industrial Printing"
				},
				shippingDetails: {
					"@type": "OfferShippingDetails",
					shippingRate: {
						"@type": "MonetaryAmount",
						value: "0",
						currency: "IDR"
					},
					shippingDestination: {
						"@type": "DefinedRegion",
						addressCountry: "ID"
					}
				},
				hasMerchantReturnPolicy: {
					"@type": "MerchantReturnPolicy",
					applicableCountry: "ID",
					returnPolicyCategory: "https://schema.org/MerchantReturnFiniteReturnWindow",
					merchantReturnDays: 7,
					returnMethod: "https://schema.org/ReturnByMail"
				}
			},
			aggregateRating: {
				"@type": "AggregateRating",
				ratingValue: "4.9",
				reviewCount: "128",
				bestRating: "5",
				worstRating: "1"
			}
		}));
		SEO($$renderer, {
			title: seoTitle(),
			description: seoDescription(),
			keywords: `jual ${stringify(product().name.toLowerCase())}, harga ${stringify(product().name.toLowerCase())}, spesifikasi ${stringify(product().name.toLowerCase())}, mesin ${stringify(product().categoryName.toLowerCase())}, oria indonesia`,
			canonical: `/produk/${stringify(kategori())}/${stringify(product().slug)}`,
			image: ogImage(),
			type: "product",
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
					name: product().categoryName,
					url: `/produk/${kategori()}`
				},
				{
					name: product().name,
					url: `/produk/${kategori()}/${product().slug}`
				}
			],
			productSchema: productRichSchema()
		});
		$$renderer.push(`<!----> `);
		DetailHero($$renderer, {
			product: product(),
			cleanModelName: cleanModelName(),
			specs: specs(),
			categoryId: kategori()
		});
		$$renderer.push(`<!----> `);
		DetailStory($$renderer, {
			product: product(),
			cleanModelName: cleanModelName()
		});
		$$renderer.push(`<!----> `);
		DetailGallery($$renderer, {
			product: product(),
			cleanModelName: cleanModelName()
		});
		$$renderer.push(`<!----> `);
		DetailSpec($$renderer, {
			product: product(),
			detailedSpecs: detailedSpecs()
		});
		$$renderer.push(`<!----> `);
		DetailCta($$renderer, {
			product: product(),
			cleanModelName: cleanModelName()
		});
		$$renderer.push(`<!---->`);
	});
}

export { _page as default };
//# sourceMappingURL=_page.svelte-DBSlBQe2.js.map
