<script lang="ts">
  import {
    SITE_URL,
    DEFAULT_SEO,
    COMPANY_SCHEMA,
    WEBSITE_SCHEMA,
    SITE_NAVIGATION_SCHEMA
  } from '$lib/constants/seo';

  interface BreadcrumbItem {
    name: string;
    url: string;
  }

  interface Props {
    title?: string;
    description?: string;
    keywords?: string;
    canonical?: string;
    image?: string;
    type?: 'website' | 'product' | 'article';
    breadcrumbs?: BreadcrumbItem[];
    productSchema?: Record<string, unknown> | null;
    articleSchema?: Record<string, unknown> | null;
    customSchemas?: Record<string, unknown>[];
  }

  let {
    title = DEFAULT_SEO.title,
    description = DEFAULT_SEO.description,
    keywords = DEFAULT_SEO.keywords,
    canonical = '',
    image = DEFAULT_SEO.defaultImage,
    type = 'website',
    breadcrumbs = [],
    productSchema = null,
    articleSchema = null,
    customSchemas = []
  }: Props = $props();

  const canonicalUrl = $derived(
    canonical
      ? (canonical.startsWith('http') ? canonical : `${SITE_URL}${canonical.startsWith('/') ? canonical : `/${canonical}`}`)
      : SITE_URL
  );

  const fullImageUrl = $derived(
    image
      ? (image.startsWith('http') ? image : `${SITE_URL}${image.startsWith('/') ? image : `/${image}`}`)
      : DEFAULT_SEO.defaultImage
  );

  const breadcrumbSchema = $derived(
    breadcrumbs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'BreadcrumbList',
          '@id': `${canonicalUrl}#breadcrumb`,
          itemListElement: breadcrumbs.map((b, idx) => ({
            '@type': 'ListItem',
            position: idx + 1,
            name: b.name,
            item: b.url.startsWith('http') ? b.url : `${SITE_URL}${b.url.startsWith('/') ? b.url : `/${b.url}`}`
          }))
        }
      : null
  );
</script>

<svelte:head>
  <!-- 1. Primary Meta Tags -->
  <title>{title}</title>
  <meta name="title" content={title} />
  <meta name="description" content={description} />
  <meta name="keywords" content={keywords} />
  <meta name="robots" content={DEFAULT_SEO.robots} />
  <meta name="googlebot" content={DEFAULT_SEO.robots} />

  <!-- 2. Canonical & Hreflang Tags -->
  <link rel="canonical" href={canonicalUrl} />
  <link rel="alternate" hreflang="id" href={canonicalUrl} />
  <link rel="alternate" hreflang="x-default" href={canonicalUrl} />

  <!-- 3. Open Graph / Facebook -->
  <meta property="og:type" content={type} />
  <meta property="og:url" content={canonicalUrl} />
  <meta property="og:title" content={title} />
  <meta property="og:description" content={description} />
  <meta property="og:image" content={fullImageUrl} />
  <meta property="og:locale" content={DEFAULT_SEO.locale} />
  <meta property="og:site_name" content={DEFAULT_SEO.siteName} />

  <!-- 4. Twitter Cards -->
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:url" content={canonicalUrl} />
  <meta name="twitter:title" content={title} />
  <meta name="twitter:description" content={description} />
  <meta name="twitter:image" content={fullImageUrl} />

  <!-- 5. Structured Data: Company / LocalBusiness -->
  {@html `<script type="application/ld+json">${JSON.stringify(COMPANY_SCHEMA)}<\/script>`}

  <!-- 6. Structured Data: WebSite & SearchAction -->
  {@html `<script type="application/ld+json">${JSON.stringify(WEBSITE_SCHEMA)}<\/script>`}

  <!-- 7. Structured Data: SiteNavigationElement -->
  {@html `<script type="application/ld+json">${JSON.stringify(SITE_NAVIGATION_SCHEMA)}<\/script>`}

  <!-- 8. Structured Data: BreadcrumbList (if present) -->
  {#if breadcrumbSchema}
    {@html `<script type="application/ld+json">${JSON.stringify(breadcrumbSchema)}<\/script>`}
  {/if}

  <!-- 9. Structured Data: Product (if present) -->
  {#if productSchema}
    {@html `<script type="application/ld+json">${JSON.stringify(productSchema)}<\/script>`}
  {/if}

  <!-- 10. Structured Data: Article (if present) -->
  {#if articleSchema}
    {@html `<script type="application/ld+json">${JSON.stringify(articleSchema)}<\/script>`}
  {/if}

  <!-- 11. Custom Schemas -->
  {#each customSchemas as s}
    {@html `<script type="application/ld+json">${JSON.stringify(s)}<\/script>`}
  {/each}
</svelte:head>
