import type { RequestHandler } from './$types';

const STRAPI_BACKEND = 'http://127.0.0.1:1338';

export const GET: RequestHandler = async ({ params, fetch }) => {
  const filePath = params.file;
  const targetUrl = `${STRAPI_BACKEND}/uploads/${filePath}`;

  try {
    const res = await fetch(targetUrl);
    if (!res.ok) {
      return new Response('Media Not Found', { status: res.status });
    }

    const headers = new Headers();
    const contentType = res.headers.get('content-type');
    const contentLength = res.headers.get('content-length');
    const cacheControl = res.headers.get('cache-control') || 'public, max-age=31536000, immutable';

    if (contentType) headers.set('content-type', contentType);
    if (contentLength) headers.set('content-length', contentLength);
    headers.set('cache-control', cacheControl);

    return new Response(res.body, {
      status: 200,
      headers
    });
  } catch (err) {
    return new Response('Error loading media', { status: 500 });
  }
};
