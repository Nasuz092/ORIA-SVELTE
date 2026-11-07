import type { Handle } from '@sveltejs/kit';

function createRedirect301(location: string, maxAge = 86400): Response {
	return new Response(null, {
		status: 301,
		headers: {
			Location: location,
			'Cache-Control': `public, max-age=${maxAge}`,
			'X-Frame-Options': 'SAMEORIGIN',
			'X-Content-Type-Options': 'nosniff',
			'Referrer-Policy': 'strict-origin-when-cross-origin',
			'Content-Security-Policy': "default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';"
		}
	});
}

export const handle: Handle = async ({ event, resolve }) => {
	const pathname = event.url.pathname;

	// Safely read search string without breaking SvelteKit prerendering
	let search = '';
	try {
		search = event.url.search;
	} catch {
		search = '';
	}

	// 1. Enforce non-WWW canonical host (Prevents duplicate domain crawling & canonical split)
	const host = event.request.headers.get('host') || event.url.host;
	if (host.startsWith('www.')) {
		const nonWwwHost = host.replace(/^www\./, '');
		const target = `https://${nonWwwHost}${pathname}${search}`;
		return createRedirect301(target);
	}

	// 2. Enforce lowercase on all route paths (fixes duplicate URL / uppercase indexing issues)
	if (
		pathname !== pathname.toLowerCase() &&
		!pathname.startsWith('/api/') &&
		!pathname.startsWith('/_app/') &&
		!pathname.startsWith('/images/') &&
		!pathname.startsWith('/fonts/')
	) {
		const lowerTarget = `${pathname.toLowerCase()}${search}`;
		return createRedirect301(lowerTarget);
	}

	// 3. Strip tracking query parameters on crawler/direct requests
	let hasTrackingQuery = false;
	try {
		if (search && (event.url.searchParams.get('utm_source')?.toLowerCase() === 'chatgpt.com' || search.includes('utm_source=chatgpt.com'))) {
			hasTrackingQuery = true;
		}
	} catch {}
	if (hasTrackingQuery) {
		return createRedirect301(pathname);
	}

	// 4. Common URL normalizations & legacy redirects
	if (pathname === '/home' || pathname === '/home/') {
		return createRedirect301('/', 86400);
	}

	// Cloudflare Email Protection URL catcher (prevent 404 for scrapers/bots)
	if (pathname.startsWith('/cdn-cgi/l/email-protection')) {
		return createRedirect301('/kontak', 86400);
	}

	const response = await resolve(event, {
		transformPageChunk: ({ html }) => {
			// A. Wrap all email occurrences with Cloudflare <!--email_off--> comments so Cloudflare does not obfuscate
			let out = html.replace(/(<a[^>]*href=["']mailto:[^"']+["'][^>]*>[\s\S]*?<\/a>)/gi, (match) => {
				return `<!--email_off-->${match}<!--/email_off-->`;
			});

			// Also wrap ANY plain email text not already inside <!--email_off-->
			out = out.replace(/([a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})/g, (match, p1, offset, str) => {
				const before = str.slice(Math.max(0, offset - 40), offset);
				if (before.includes('<!--email_off-->')) return match;
				return `<!--email_off-->${match}<!--/email_off-->`;
			});

			return out;
		}
	});

	// Production OWASP Security Headers (Equivalent to mesinprinting.id)
	response.headers.set('X-Frame-Options', 'SAMEORIGIN');
	response.headers.set('X-Content-Type-Options', 'nosniff');
	response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
	response.headers.set(
		'Content-Security-Policy',
		"default-src 'self' https: data: blob: 'unsafe-inline' 'unsafe-eval'; frame-ancestors 'self';"
	);
	response.headers.set(
		'Permissions-Policy',
		'accelerometer=(), camera=(), geolocation=(), gyroscope=(), magnetometer=(), microphone=(), payment=(), usb=()'
	);
	response.headers.set(
		'Strict-Transport-Security',
		'max-age=31536000; includeSubDomains; preload'
	);

	// Strip technology fingerprinting headers (OWASP WSTG-INFO-02)
	response.headers.delete('x-sveltekit-page');
	response.headers.delete('x-powered-by');

	// Protect healthcheck and internal API routes from search indexing via HTTP headers
	if (
		event.url.pathname.startsWith('/health') ||
		(event.url.pathname.startsWith('/api/') && !event.url.pathname.startsWith('/api/img'))
	) {
		response.headers.set('X-Robots-Tag', 'noindex, nofollow, noarchive, nosnippet');
	}

	// Apply Cloudflare Edge & Browser Caching Headers for public GET requests
	if (
		event.request.method === 'GET' &&
		!event.url.pathname.startsWith('/api/') &&
		!event.url.pathname.startsWith('/health')
	) {
		if (!response.headers.has('cache-control')) {
			response.headers.set(
				'Cache-Control',
				'public, max-age=0, s-maxage=120, stale-while-revalidate=86400'
			);
		}
		if (!response.headers.has('cdn-cache-control')) {
			response.headers.set(
				'CDN-Cache-Control',
				'public, max-age=120, stale-while-revalidate=86400'
			);
		}
		if (!response.headers.has('cloudflare-cdn-cache-control')) {
			response.headers.set(
				'Cloudflare-CDN-Cache-Control',
				'public, max-age=120, stale-while-revalidate=86400'
			);
		}
	}

	return response;
};

