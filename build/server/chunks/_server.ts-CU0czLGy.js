//#region src/routes/api/img/+server.ts
var STRAPI_URL = "https://cms.oria.co.id".replace(/\/$/, "").replace("localhost:1338", "127.0.0.1:1338");
var ALLOWED_MIME_TYPES = /* @__PURE__ */ new Set([
	"image/jpeg",
	"image/jpg",
	"image/png",
	"image/webp",
	"image/gif",
	"image/svg+xml",
	"image/avif",
	"image/x-icon"
]);
var GET = async ({ url, fetch }) => {
	const imgPath = url.searchParams.get("url");
	if (!imgPath) return new Response("Missing url parameter", { status: 400 });
	let cleanPath = imgPath;
	if (cleanPath.startsWith("http://") || cleanPath.startsWith("https://")) try {
		const parsed = new URL(cleanPath);
		cleanPath = parsed.pathname + parsed.search;
	} catch {
		return new Response("Invalid URL format", { status: 400 });
	}
	if (!cleanPath.startsWith("/")) cleanPath = "/" + cleanPath;
	if (cleanPath.includes("..")) return new Response("Path traversal prohibited", { status: 403 });
	const fullUrl = `${STRAPI_URL}${cleanPath}`;
	try {
		const res = await fetch(fullUrl, { headers: {
			"User-Agent": "Mozilla/5.0 SvelteKit-Proxy",
			"Accept": "image/*,*/*"
		} });
		if (!res.ok) return new Response("Image not found", { status: 404 });
		const contentType = (res.headers.get("content-type") || "").split(";")[0].trim().toLowerCase();
		if (contentType && !ALLOWED_MIME_TYPES.has(contentType)) return new Response("Invalid content type", { status: 415 });
		const body = await res.arrayBuffer();
		return new Response(body, {
			status: 200,
			headers: {
				"Content-Type": contentType || "image/webp",
				"Cache-Control": "public, max-age=2592000, immutable",
				"Vary": "Accept"
			}
		});
	} catch {
		return new Response("Failed to fetch image", { status: 502 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-CU0czLGy.js.map
