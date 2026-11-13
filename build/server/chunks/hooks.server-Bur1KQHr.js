//#region src/hooks.server.ts
function createRedirect301(location, maxAge = 86400) {
	return new Response(null, {
		status: 301,
		headers: {
			Location: location,
			"Cache-Control": `public, max-age=${maxAge}`,
			"X-Frame-Options": "SAMEORIGIN",
			"X-Content-Type-Options": "nosniff",
			"Referrer-Policy": "strict-origin-when-cross-origin",
			"Content-Security-Policy": "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';"
		}
	});
}
var handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;
	let search = "";
	try {
		search = event.url.search;
	} catch {
		search = "";
	}
	const host = event.request.headers.get("host") || event.url.host;
	if (host.startsWith("www.")) return createRedirect301(`https://${host.replace(/^www\./, "")}${pathname}${search}`);
	if (pathname !== pathname.toLowerCase() && !pathname.startsWith("/api/") && !pathname.startsWith("/_app/") && !pathname.startsWith("/images/") && !pathname.startsWith("/fonts/")) return createRedirect301(`${pathname.toLowerCase()}${search}`);
	let hasTrackingQuery = false;
	try {
		if (search && (event.url.searchParams.get("utm_source")?.toLowerCase() === "chatgpt.com" || search.includes("utm_source=chatgpt.com"))) hasTrackingQuery = true;
	} catch {}
	if (hasTrackingQuery) return createRedirect301(pathname);
	if (pathname === "/home" || pathname === "/home/") return createRedirect301("/", 86400);
	if (pathname.startsWith("/cdn-cgi/l/email-protection")) return createRedirect301("/kontak", 86400);
	const response = await resolve(event, { transformPageChunk: ({ html }) => {
		let out = html.replace(/(<a[^>]*href=["']mailto:[^"']+["'][^>]*>[\s\S]*?<\/a>)/gi, (match) => {
			return `<!--email_off-->${match}<!--/email_off-->`;
		});
		out = out.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (match, p1, offset, str) => {
			if (str.slice(Math.max(0, offset - 40), offset).includes("<!--email_off-->")) return match;
			return `<!--email_off-->${match}<!--/email_off-->`;
		});
		if (pathname.startsWith("/landing-ads")) out = out.replace(/<head>/i, `<head>\n\t\t<meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate" />\n\t\t<meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate" />\n\t\t<meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate" />`);
		return out;
	} });
	response.headers.set("X-Frame-Options", "SAMEORIGIN");
	response.headers.set("X-Content-Type-Options", "nosniff");
	response.headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
	response.headers.set("Content-Security-Policy", "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';");
	response.headers.set("Permissions-Policy", "accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()");
	response.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
	response.headers.delete("x-sveltekit-page");
	response.headers.delete("x-powered-by");
	if (event.url.pathname.startsWith("/landing-ads") || event.url.pathname.startsWith("/health") || event.url.pathname.startsWith("/api/") && !event.url.pathname.startsWith("/api/img")) response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet, noimageindex, notranslate");
	if (event.url.pathname.startsWith("/landing-ads")) {
		response.headers.set("Cache-Control", "private, no-cache, no-store, max-age=0, must-revalidate");
		response.headers.set("CDN-Cache-Control", "no-store");
		response.headers.set("Cloudflare-CDN-Cache-Control", "no-store");
	}
	if (event.request.method === "GET" && !event.url.pathname.startsWith("/api/") && !event.url.pathname.startsWith("/health") && !event.url.pathname.startsWith("/landing-ads")) {
		if (!response.headers.has("cache-control")) response.headers.set("Cache-Control", "public, max-age=0, s-maxage=120, stale-while-revalidate=86400");
		if (!response.headers.has("cdn-cache-control")) response.headers.set("CDN-Cache-Control", "public, max-age=120, stale-while-revalidate=86400");
		if (!response.headers.has("cloudflare-cdn-cache-control")) response.headers.set("Cloudflare-CDN-Cache-Control", "public, max-age=120, stale-while-revalidate=86400");
	}
	return response;
};

export { handle };
//# sourceMappingURL=hooks.server-Bur1KQHr.js.map
