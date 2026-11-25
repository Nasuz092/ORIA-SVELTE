//#region src/routes/api/save-lead/+server.ts
var TARGET_SHEET_NAME = "Tracking_leads_web_oria";
var leadIpMap = /* @__PURE__ */ new Map();
var recentLeadsMap = /* @__PURE__ */ new Map();
var geoCache = /* @__PURE__ */ new Map();
var BOT_UA_REGEX = /bot|crawler|spider|slurp|headless|puppeteer|playwright|selenium|phantomjs|curl|wget|python-requests|scrapy|ahrefs|semrush|mj12bot|dotbot|bytespider|gptbot|claudebot|lighthouse|pagespeed|gtmetrix|pingdom|uptimerobot|facebookexternalhit|whatsapp|telegrambot|discordbot|bingpreview|yandex/i;
function detectBotUserAgent(request) {
	const ua = request.headers.get("user-agent") || "";
	if (!ua.trim()) return true;
	return BOT_UA_REGEX.test(ua);
}
function formatIspWithFlags(geo, isBotUa) {
	const flags = [];
	if (isBotUa) flags.push("BOT");
	if (geo.isHosting) flags.push("DATA CENTER/VPS");
	if (geo.isProxy) flags.push("VPN/PROXY");
	const baseIsp = geo.isp || "-";
	if (flags.length === 0) return baseIsp;
	return `${baseIsp} [${flags.join(" | ")}]`;
}
function getRealClientIp(request, getClientAddress) {
	const cfIp = request.headers.get("cf-connecting-ip");
	if (cfIp) return cfIp.trim();
	const xRealIp = request.headers.get("x-real-ip");
	if (xRealIp) return xRealIp.trim();
	const xff = request.headers.get("x-forwarded-for");
	if (xff) {
		const firstIp = xff.split(",")[0]?.trim();
		if (firstIp) return firstIp;
	}
	return getClientAddress ? getClientAddress() : "unknown";
}
function isPrivateIp(ip) {
	return !ip || ip === "unknown" || ip === "127.0.0.1" || ip === "::1" || ip.startsWith("10.") || ip.startsWith("192.168.") || /^172\.(1[6-9]|2\d|3[01])\./.test(ip);
}
async function resolveGeoLocation(ip, request) {
	const now = Date.now();
	const cached = geoCache.get(ip);
	if (cached && now - cached.cachedAt < 864e5) return cached;
	const cfCity = request.headers.get("cf-ipcity") || "";
	const cfRegion = request.headers.get("cf-region") || "";
	const cfCountry = request.headers.get("cf-ipcountry") || "";
	let district = "";
	let city = cfCity;
	let region = cfRegion;
	let country = cfCountry;
	let isp = "";
	let isHosting = false;
	let isProxy = false;
	let isMobileNet = false;
	if (!isPrivateIp(ip)) try {
		const geoRes = await fetch(`http://ip-api.com/json/${encodeURIComponent(ip)}?fields=status,country,countryCode,regionName,city,district,isp,proxy,hosting,mobile`, { signal: AbortSignal.timeout(1800) });
		if (geoRes.ok) {
			const g = await geoRes.json();
			if (g && g.status === "success") {
				district = g.district || "";
				city = g.city || city;
				region = g.regionName || region;
				country = g.countryCode || g.country || country;
				isp = g.isp || "";
				isHosting = !!g.hosting;
				isProxy = !!g.proxy;
				isMobileNet = !!g.mobile;
			}
		}
	} catch {}
	const parts = [
		district,
		city,
		region
	].filter(Boolean);
	const baseLocation = parts.length > 0 ? parts.join(", ") : "Tidak Diketahui";
	const info = {
		location: country ? `${baseLocation} (${country})` : baseLocation,
		district: district || "-",
		city: city || "-",
		region: region || "-",
		country: country || "-",
		isp: isp || "-",
		isHosting,
		isProxy,
		isMobileNet,
		cachedAt: now
	};
	if (geoCache.size > 2e3) {
		const firstKey = geoCache.keys().next().value;
		if (firstKey) geoCache.delete(firstKey);
	}
	geoCache.set(ip, info);
	return info;
}
function isDuplicate(key, ttlMs) {
	const now = Date.now();
	for (const [k, timestamp] of recentLeadsMap.entries()) if (now - timestamp > ttlMs) recentLeadsMap.delete(k);
	if (recentLeadsMap.has(key)) return true;
	recentLeadsMap.set(key, now);
	return false;
}
var POST = async ({ request, getClientAddress }) => {
	try {
		const clientIp = getRealClientIp(request, getClientAddress);
		const now = Date.now();
		const data = await request.json();
		const isWaClick = data.type === "wa_click";
		const limit = isWaClick ? 30 : 5;
		const ipData = leadIpMap.get(clientIp);
		if (ipData) {
			if (now < ipData.resetAt) {
				if (ipData.count >= limit) return new Response(JSON.stringify({ error: "Terlalu banyak permintaan. Silakan coba lagi beberapa saat lagi." }), {
					status: 429,
					headers: { "Content-Type": "application/json" }
				});
				ipData.count += 1;
			} else leadIpMap.set(clientIp, {
				count: 1,
				resetAt: now + 6e5
			});
		} else leadIpMap.set(clientIp, {
			count: 1,
			resetAt: now + 6e5
		});
		const scriptUrl = "https://script.google.com/macros/s/AKfycbxT03DlO5Sn4J-JANkWDQ_r-4kexRBYF53failxtZ8d9nIOQm-12mKvpr05RPqVa55nyw/exec";
		const sheetName = data.sheet_name || TARGET_SHEET_NAME;
		if (isWaClick) {
			if (isDuplicate(`wa_${clientIp}_${data.button_location || ""}_${data.wa_message || ""}`, 15e3)) return new Response(JSON.stringify({
				success: true,
				duplicate: true
			}), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
			const geo = await resolveGeoLocation(clientIp, request);
			const isBotUa = detectBotUserAgent(request);
			const ispLabel = formatIspWithFlags(geo, isBotUa);
			const response = await fetch(scriptUrl, {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({
					type: "wa_click",
					sheet_name: sheetName,
					sheetName,
					source_web: "oria.co.id",
					page_url: data.page_url || "-",
					landing_page: data.landing_page || "-",
					traffic_source: data.traffic_source || "Direct",
					is_ads: !!data.is_ads,
					button_location: data.button_location || "Tombol WA",
					wa_message: data.wa_message || "-",
					gclid: data.gclid || "-",
					device: data.device || "Mobile",
					location: geo.location,
					district: geo.district,
					city: geo.city,
					region: geo.region,
					isp: ispLabel,
					ip_address: clientIp,
					is_bot: isBotUa,
					is_hosting: geo.isHosting,
					is_proxy: geo.isProxy
				})
			});
			if (!response.ok) {
				const errText = await response.text();
				console.error("Failed to log WA lead to Google Sheets:", errText);
			}
			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: { "Content-Type": "application/json" }
			});
		}
		const { name, phone, email, product, message, website } = data;
		if (website && website.trim() !== "") return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		if (!name || !phone || !message) return new Response(JSON.stringify({ error: "Nama, nomor HP, dan pesan wajib diisi." }), {
			status: 400,
			headers: { "Content-Type": "application/json" }
		});
		const cleanPhone = (phone || "").replace(/\D/g, "");
		const cleanMsg = (message || "").trim().toLowerCase();
		if (isDuplicate(`lead_${cleanPhone}_${(product || "").trim().toLowerCase()}_${cleanMsg}`, 3e5)) return new Response(JSON.stringify({
			success: true,
			duplicate: true
		}), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
		const geo = await resolveGeoLocation(clientIp, request);
		const isBotUa = detectBotUserAgent(request);
		const ispLabel = formatIspWithFlags(geo, isBotUa);
		const response = await fetch(scriptUrl, {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				sheet_name: sheetName,
				sheetName,
				source_web: "oria.co.id",
				name,
				phone,
				email: email || "-",
				product: product || "-",
				message,
				location: geo.location,
				district: geo.district,
				city: geo.city,
				region: geo.region,
				isp: ispLabel,
				ip_address: clientIp,
				is_bot: isBotUa,
				is_hosting: geo.isHosting,
				is_proxy: geo.isProxy
			})
		});
		if (!response.ok) {
			const errText = await response.text();
			console.error("Failed to save to Google Sheet via Apps Script:", errText);
			return new Response(JSON.stringify({ error: "Gagal mengirim data ke Google Sheets." }), {
				status: 500,
				headers: { "Content-Type": "application/json" }
			});
		}
		return new Response(JSON.stringify({ success: true }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch (error) {
		console.error("Error in save-lead API:", error);
		return new Response(JSON.stringify({ error: error.message }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};

export { POST };
//# sourceMappingURL=_server.ts-YpIqhBqJ.js.map
