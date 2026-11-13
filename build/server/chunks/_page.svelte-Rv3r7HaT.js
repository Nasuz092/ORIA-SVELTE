import { w as attr_style, n as ensure_array_like, b as attr_class, o as stringify, l as attr, m as escape_html } from './index.js-BseoGyqO.js';
import { S as SEO } from './SEO2-CTkOeBTF.js';
import 'clsx';
import './seo-mvhyA8fT.js';

//#region src/lib/sections/tentang/TentangHero.svelte
function TentangHero($$renderer) {
	$$renderer.push(`<section class="relative w-full h-[100svh] min-h-[620px] bg-black text-white overflow-hidden select-none flex flex-col justify-end"><div class="absolute inset-0 w-full h-full pointer-events-none"><img src="/images/our-drive-workshop.png" alt="Workshop dan Fasilitas Rekayasa Presisi ORIA" class="w-full h-full object-cover object-center lg:object-[center_35%]" loading="eager"/> <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/25 to-transparent sm:from-black/85 sm:via-black/35 sm:to-transparent"></div></div> <div class="relative z-20 w-full px-6 sm:px-10 lg:px-16 pb-14 sm:pb-18 lg:pb-22"><div class="max-w-7xl mx-auto w-full"><div class="space-y-3 sm:space-y-4 max-w-3xl"><div class="font-heading font-black text-xs sm:text-sm tracking-[0.25em] text-[#FFE500] uppercase drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">ORIA STORY</div> <h1 class="font-heading font-medium text-xl sm:text-2xl md:text-3xl lg:text-[2.25rem] tracking-[0.18em] sm:tracking-[0.22em] uppercase text-white leading-tight drop-shadow-[0_4px_16px_rgba(0,0,0,0.95)]">ABOUT US</h1> <p class="font-sans text-xs sm:text-sm md:text-base text-neutral-300 font-normal max-w-xl leading-relaxed pt-1 drop-shadow-md">Membangun standar rekayasa mesin percetakan digital dan manufaktur berpresisi tinggi untuk menopang pertumbuhan kreator dan industri di Indonesia.</p></div></div></div></section>`);
}
//#endregion
//#region src/lib/sections/tentang/OriaStory.svelte
function OriaStory($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="oria-story" class="w-full bg-white text-black py-24 sm:py-32 lg:py-40 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden"><div class="max-w-4xl mx-auto text-center space-y-10 sm:space-y-12"><h2 class="font-heading font-light text-3xl sm:text-4xl md:text-5xl lg:text-6xl tracking-[0.22em] sm:tracking-[0.26em] uppercase text-neutral-900 leading-tight transition-transform duration-150 ease-out will-change-transform"${attr_style(`transform: translate3d(0, ${stringify(0)}px, 0);`)}>ENGINEERED FOR INDUSTRY</h2> <div class="space-y-7 sm:space-y-8 font-sans text-neutral-600 text-sm sm:text-base md:text-[1.05rem] leading-relaxed max-w-2xl mx-auto"><p>ORIA berdiri teguh sebagai brand yang didedikasikan untuk keandalan dan presisi mesin produksi industrial. Inilah mengapa setiap unit mesin ORIA dirancang bangun dengan satu komitmen utama:</p> <p class="text-neutral-950 font-medium text-base sm:text-lg md:text-xl">Mewujudkan keselarasan sempurna antara presisi rekayasa, operator, dan produktivitas tanpa henti.</p> <p class="text-neutral-600">Sebuah standar performa industri, yang menjadi hasil akhir sekaligus titik awal dalam mengejar keunggulan manufaktur, seiring kami senantiasa didorong oleh inovasi masa depan. Prinsip panduan dalam setiap hal yang kami lakukan, untuk setiap mesin yang kami bangun — <span class="text-neutral-950 font-semibold tracking-wide">Engineered for Industry.</span></p></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/tentang/OurLegacy.svelte
function OurLegacy($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="our-legacy" class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden"><div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"><div class="lg:col-span-6 w-full overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl"><img src="/images/our-legacy.jpg" alt="Founder dan Tim Rekayasa Presisi ORIA di Fasilitas Manufaktur" class="w-full h-full aspect-[4/3] object-cover object-center scale-100 transition-transform duration-700 ease-out hover:scale-105" loading="lazy"/></div> <div class="lg:col-span-6 space-y-6 sm:space-y-7 max-w-xl transition-transform duration-150 ease-out will-change-transform"${attr_style(`transform: translate3d(0, ${stringify(0)}px, 0);`)}><h2 class="font-heading font-light text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#FFE500]">OUR LEGACY</h2> <div class="space-y-4 font-sans text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed"><p>ORIA lahir dari visi rekayasa presisi dan dedikasi terhadap kemandirian industri manufaktur Indonesia. Kami meyakini bahwa keunggulan sejati sebuah mesin bertumpu pada keselarasan antara stabilitas mikron sasis, daya tahan operasional jangka panjang, dan kemudahan perawatan teknis.</p> <p class="text-white italic text-sm sm:text-base md:text-lg font-serif border-l-2 border-[#FFE500] pl-4 py-1 my-2 text-neutral-200">‘Presisi tanpa kompromi, efisiensi tanpa batas.’</p> <p class="text-neutral-400">Sebuah etos kerja yang kami padukan bersama teknisi tersertifikasi untuk menghadirkan solusi percetakan digital andal bagi para pelaku industri di seluruh Nusantara.</p></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/tentang/OurMachines.svelte
function OurMachines($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="our-machines" class="w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden"><div class="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center"><div class="lg:col-span-5 space-y-6 sm:space-y-8 max-w-xl transition-transform duration-150 ease-out will-change-transform"${attr_style(`transform: translate3d(0, ${stringify(0)}px, 0);`)}><h2 class="font-heading font-light text-2xl sm:text-3xl lg:text-4xl tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#FFE500]">OUR MACHINES</h2> <div class="space-y-5 sm:space-y-6 font-sans text-xs sm:text-sm md:text-base text-neutral-300 font-normal leading-relaxed"><p>Dari mesin UV Flatbed berkecepatan tinggi, printer tekstil sublimasi, hingga CNC Router presisi industri — setiap mesin ORIA dirancang dengan standar toleransi mikron untuk performa tanpa kompromi.</p> <p class="text-white font-medium tracking-wide text-xs sm:text-sm leading-relaxed text-neutral-200">Akurasi. Stabilitas. Material. Sasis. Kecepatan. Daya Tahan. Kalibrasi. Koneksi.</p> <p class="text-neutral-400">Dirancang seimbang, kokoh, dan presisi untuk menghadirkan keandalan operasional mutlak dalam siklus kerja berat 24/7. Menghasilkan ketajaman warna sempurna dan konsistensi cetak terbaik bagi setiap lini produksi bisnis Anda.</p></div></div> <div class="lg:col-span-7 w-full overflow-hidden bg-neutral-900 border border-neutral-800 shadow-2xl relative group"><img src="/images/our-machines-detail.jpg" alt="Detail Presisi Komponen Linear Guide Rail dan Printhead Mesin ORIA" class="w-full h-full aspect-[4/3] object-cover object-center scale-100 transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy"/> <div class="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 pointer-events-none"></div> <div class="absolute bottom-4 left-4 sm:bottom-6 sm:left-6 bg-black/80 backdrop-blur-md px-3.5 py-1.5 border border-white/10 text-[10px] sm:text-xs tracking-wider uppercase text-neutral-300"><span class="text-[#FFE500] font-semibold">Macro View</span> — Linear Guide Rail &amp; Dual Carriage</div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/tentang/OurCore.svelte
function OurCore($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		const values = [
			{
				title: "Presisi Tanpa Kompromi",
				desc: "Menggunakan guide rail heavy-duty THK Jepang, sasis baja peredam getaran mikron, dan printhead piezoelektrik presisi tinggi untuk gradasi warna foto tajam.",
				image: "/images/core-precision.jpg",
				alt: "Detail Linear Guide Rail THK Presisi Tinggi ORIA",
				stackedClass: "translate-y-[100%] md:translate-y-0 md:translate-x-[100%] -rotate-6 scale-[0.6] opacity-30 z-10",
				delay: "delay-100"
			},
			{
				title: "Efisiensi Produksi Tinggi",
				desc: "Optimalisasi software RIP cerdas dan profil warna ICC khusus yang mampu menghemat konsumsi tinta hingga 25% tanpa mengurangi kepadatan warna (density).",
				image: "/images/showcase-products.png",
				alt: "Efisiensi Produksi Tinggi Mesin Percetakan ORIA",
				stackedClass: "translate-y-0 md:translate-x-0 rotate-0 scale-[0.64] opacity-40 z-20",
				delay: "delay-200"
			},
			{
				title: "Dukungan Purna Jual Total",
				desc: "Pelatihan operator bersertifikasi hingga siap mandiri, suku cadang orisinal ready-stock, serta respon teknisi tanggap darurat on-site di berbagai kota.",
				image: "/images/our-drive-showroom.png",
				alt: "Pusat Layanan Purna Jual dan Showroom ORIA",
				stackedClass: "translate-y-[-100%] md:translate-y-0 md:-translate-x-[100%] rotate-6 scale-[0.6] opacity-30 z-10",
				delay: "delay-300"
			}
		];
		$$renderer.push(`<section id="our-core" class="w-full bg-white text-black py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none overflow-hidden scroll-mt-14 sm:scroll-mt-16"><div class="max-w-7xl mx-auto"><div class="max-w-3xl mx-auto text-center space-y-6 sm:space-y-7"><h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.25em] sm:tracking-[0.3em] uppercase text-black">OUR CORE</h2> <div class="space-y-4 font-sans text-xs sm:text-sm md:text-base text-neutral-600 font-normal leading-relaxed"><p>Sejak awal mula berdiri, ORIA didorong oleh satu tekad: menghadirkan teknologi mesin percetakan digital dan fabrikasi presisi dengan standar manufaktur kelas dunia bagi industri Indonesia.</p> <p class="text-neutral-500">Kekuatan sejati sebuah mesin tidak hanya diukur dari kecepatan sesaat, melainkan keselarasan antara akurasi komponen, ketangguhan sasis baja, efisiensi konsumsi bahan, dan kepastian dukungan teknis tanpa jeda.</p></div></div> <div class="relative mt-16 sm:mt-24 min-h-[440px] sm:min-h-[480px]"><div class="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12"><!--[-->`);
		const each_array = ensure_array_like(values);
		for (let $$index = 0, $$length = each_array.length; $$index < $$length; $$index++) {
			let value = each_array[$$index];
			$$renderer.push(`<div${attr_class(`transform-gpu will-change-transform transition-all duration-1000 ease-[cubic-bezier(0.16,1,0.3,1)] ${stringify(value.delay)} ${stringify(value.stackedClass)}`)}><div class="flex flex-col group"><div class="w-full aspect-[4/3] overflow-hidden bg-neutral-100 mb-5 relative"><img${attr("src", value.image)}${attr("alt", value.alt)} class="w-full h-full object-cover object-center scale-100 transition-transform duration-700 ease-out group-hover:scale-105" loading="lazy"/></div> <h3 class="font-heading font-medium text-lg sm:text-xl text-black tracking-wide mb-2.5">${escape_html(value.title)}</h3> <p class="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal">${escape_html(value.desc)}</p></div></div>`);
		}
		$$renderer.push(`<!--]--></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/tentang/StandarRekayasa.svelte
function StandarRekayasa($$renderer) {
	$$renderer.push(`<section id="standar-rekayasa" class="relative w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden"><div class="max-w-7xl mx-auto space-y-12"><div class="max-w-2xl space-y-3"><h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white leading-tight">ENGINEERING EXCELLENCE</h2> <p class="font-sans text-sm sm:text-base text-neutral-400 leading-relaxed pt-2">Setiap komponen mesin ORIA dipilih secara ketat untuk menahan siklus cetak ribuan meter persegi setiap bulannya.</p></div> <div class="relative w-full aspect-[21/9] min-h-[300px] overflow-hidden bg-neutral-900 border border-neutral-800"><img src="/images/engineering-excellence.png" alt="Rekayasa Presisi Mesin Industri ORIA" class="w-full h-full object-cover object-center scale-100 transition-transform duration-700 ease-out hover:scale-105" loading="lazy"/> <div class="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20"></div> <div class="absolute bottom-6 sm:bottom-10 left-6 sm:left-10 max-w-lg z-10"><div class="text-xs font-mono uppercase tracking-[0.2em] text-[#FFE500]">STANDAR KUALITAS</div> <div class="font-heading font-bold text-xl sm:text-2xl uppercase tracking-wider text-white mt-1">Penyelarasan Mikron &amp; Beban Kerja Berat</div></div></div> <div class="grid grid-cols-1 md:grid-cols-2 gap-8 pt-4"><div class="space-y-2 border-l-2 border-[#FFE500] pl-6"><h4 class="font-heading font-bold text-lg uppercase tracking-wider text-white">Sasis Baja Heavy Duty</h4> <p class="font-sans text-sm text-neutral-400 leading-relaxed font-normal">Konstruksi rangka padat yang dinormalisasi dengan perlakuan panas khusus untuk mencegah deformasi struktural jangka panjang akibat tegangan kerja.</p></div> <div class="space-y-2 border-l-2 border-white pl-6"><h4 class="font-heading font-bold text-lg uppercase tracking-wider text-white">Sistem Kontrol Cerdas</h4> <p class="font-sans text-sm text-neutral-400 leading-relaxed font-normal">Monitoring tekanan negatif otomatis dan sensor ketinggian media otomatis melindungi printhead dari gesekan atau benturan material.</p></div></div></div></section>`);
}
//#endregion
//#region src/lib/sections/tentang/KapasitasLayanan.svelte
function KapasitasLayanan($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		let { id = "kapasitas-layanan" } = $$props;
		$$renderer.push(`<section${attr("id", id)} class="w-full bg-neutral-950 text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16"><div class="max-w-7xl mx-auto space-y-16"><div class="space-y-3 max-w-2xl"><h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white">OUR CAPACITY</h2> <p class="font-sans text-sm sm:text-base text-neutral-400 max-w-xl leading-relaxed pt-1">Komitmen nyata dan integritas kemitraan jangka panjang yang telah dipercaya oleh ratusan pengusaha percetakan di Indonesia.</p></div> <div class="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 lg:gap-16"><div class="space-y-3"><div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight tabular-nums">${escape_html(0)}<span class="text-[#FFE500] font-normal">+</span></div> <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">UNITS INSTALLED</div> <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">Beroperasi aktif di berbagai provinsi di Indonesia.</p></div> <div class="space-y-3"><div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight tabular-nums">${escape_html(0)}<span class="text-[#FFE500] font-normal">%</span></div> <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">OFFICIAL WARRANTY</div> <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">Jaminan keaslian komponen dan proteksi investasi unit.</p></div> <div class="space-y-3"><div class="font-heading font-light text-5xl sm:text-6xl lg:text-7xl text-white tracking-tight tabular-nums">${escape_html(0)}<span class="text-[#FFE500] font-normal">/7</span></div> <div class="text-xs sm:text-sm font-heading font-bold uppercase tracking-[0.2em] text-neutral-200 pt-1">TECHNICAL SUPPORT</div> <p class="text-xs sm:text-sm text-neutral-400 font-sans leading-relaxed">Konsultasi cepat dan penanganan teknisi tersertifikasi.</p></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/tentang/VisiDedikasi.svelte
function VisiDedikasi($$renderer, $$props) {
	$$renderer.component(($$renderer) => {
		$$renderer.push(`<section id="visi-dedikasi" class="relative w-full bg-black text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16 overflow-hidden"><div class="max-w-7xl mx-auto space-y-10"><div class="space-y-2"><h2 class="font-heading font-light text-3xl sm:text-4xl lg:text-5xl tracking-[0.2em] sm:tracking-[0.25em] uppercase text-white">OUR DEDICATION</h2></div> <div class="relative w-full min-h-[420px] sm:min-h-[480px] lg:min-h-[540px] flex items-center overflow-hidden bg-neutral-900 border border-neutral-800"><img src="/images/our-drive-showroom.png" alt="Showroom Fasilitas Mesin ORIA" class="absolute inset-0 w-full h-full object-cover object-center" loading="lazy"/> <div class="absolute inset-0 bg-gradient-to-r from-black/60 via-black/30 to-transparent sm:from-black/90 sm:via-black/55 sm:to-transparent"></div> <div class="relative z-10 max-w-xl p-8 sm:p-12 lg:p-16 space-y-5 transition-transform duration-150 ease-out will-change-transform"${attr_style(`transform: translate3d(0, ${stringify(0)}px, 0);`)}><div class="font-heading font-bold text-xs uppercase tracking-[0.28em] text-[#FFE500]">ENGINEERED FOR INDUSTRY</div> <h3 class="font-heading font-bold text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-white leading-tight">Mendukung Kemandirian Industri Kreatif Indonesia</h3> <p class="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">Kami mendampingi para kreator, pelaku UMKM, hingga manufaktur besar bertransformasi mengadopsi teknologi cetak digital dan laser terbaru yang efisien, hemat biaya produksi, dan ramah lingkungan.</p></div></div></div></section>`);
	});
}
//#endregion
//#region src/lib/sections/tentang/ShowroomCta.svelte
function ShowroomCta($$renderer) {
	$$renderer.push(`<section id="showroom" class="w-full bg-neutral-950 text-white py-20 sm:py-28 lg:py-36 px-6 sm:px-10 lg:px-16 select-none scroll-mt-14 sm:scroll-mt-16"><div class="max-w-7xl mx-auto space-y-12"><div class="p-8 sm:p-12 lg:p-16 bg-black flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8 sm:gap-10"><div class="space-y-4 max-w-2xl"><h2 class="font-heading font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-wider text-white leading-tight">VISIT OUR SHOWROOM</h2> <p class="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal">Rasakan langsung kecepatan cetak, detail presisi, dan kestabilan sasis mesin industri ORIA. Anda dapat membawa sample material sendiri untuk uji coba cetak langsung bersama tim engineering kami.</p></div> <div class="w-full lg:w-auto shrink-0"><a href="/kontak" class="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 sm:px-10 py-4 bg-[#FFE500] hover:bg-white text-black font-sans text-xs sm:text-sm font-bold uppercase tracking-[0.22em] transition-colors duration-300 group"><span>BOOK A VISIT</span> <svg class="w-4 h-4 stroke-current transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke-width="2.5" aria-hidden="true"><path stroke-linecap="round" stroke-linejoin="round" d="M9 5l7 7-7 7"></path></svg></a></div></div></div></section>`);
}
//#endregion
//#region src/routes/tentang/+page.svelte
function _page($$renderer) {
	SEO($$renderer, {
		title: "Tentang ORIA | Dedikasi Rekayasa Presisi & Standar Mesin Industri Indonesia",
		description: "Pelajari visi, filosofi rekayasa presisi, dan kapasitas layanan mesin printing industrial serta manufaktur ORIA di Indonesia sejak 2001.",
		keywords: "tentang oria, profil oria indonesia, rekayasa mesin printing, kapasitas layanan oria, inovasi mesin cetak industri",
		canonical: "/tentang",
		breadcrumbs: [{
			name: "Beranda",
			url: "/"
		}, {
			name: "Tentang Kami",
			url: "/tentang"
		}],
		customSchemas: [{
			"@context": "https://schema.org",
			"@type": "AboutPage",
			"@id": "https://oria.co.id/tentang#webpage",
			url: "https://oria.co.id/tentang",
			name: "Tentang ORIA — Dedikasi Rekayasa Presisi & Standar Industri",
			description: "Pelajari visi, filosofi rekayasa presisi, dan kapasitas layanan mesin printing industrial serta manufaktur ORIA di Indonesia.",
			inLanguage: "id-ID"
		}]
	});
	$$renderer.push(`<!----> `);
	TentangHero($$renderer);
	$$renderer.push(`<!----> `);
	OriaStory($$renderer);
	$$renderer.push(`<!----> `);
	OurLegacy($$renderer);
	$$renderer.push(`<!----> `);
	OurMachines($$renderer);
	$$renderer.push(`<!----> `);
	OurCore($$renderer);
	$$renderer.push(`<!----> `);
	StandarRekayasa($$renderer);
	$$renderer.push(`<!----> `);
	KapasitasLayanan($$renderer, {});
	$$renderer.push(`<!----> `);
	VisiDedikasi($$renderer);
	$$renderer.push(`<!----> `);
	ShowroomCta($$renderer);
	$$renderer.push(`<!---->`);
}

export { _page as default };
//# sourceMappingURL=_page.svelte-Rv3r7HaT.js.map
