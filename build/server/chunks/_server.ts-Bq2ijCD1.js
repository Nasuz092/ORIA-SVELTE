//#region src/routes/uploads/[...file]/+server.ts
var STRAPI_BACKEND = "http://127.0.0.1:1338";
var GET = async ({ params, fetch }) => {
	const targetUrl = `${STRAPI_BACKEND}/uploads/${params.file}`;
	try {
		const res = await fetch(targetUrl);
		if (!res.ok) return new Response("Media Not Found", { status: res.status });
		const headers = new Headers();
		const contentType = res.headers.get("content-type");
		const contentLength = res.headers.get("content-length");
		const cacheControl = res.headers.get("cache-control") || "public, max-age=31536000, immutable";
		if (contentType) headers.set("content-type", contentType);
		if (contentLength) headers.set("content-length", contentLength);
		headers.set("cache-control", cacheControl);
		return new Response(res.body, {
			status: 200,
			headers
		});
	} catch (err) {
		return new Response("Error loading media", { status: 500 });
	}
};

export { GET };
//# sourceMappingURL=_server.ts-Bq2ijCD1.js.map
