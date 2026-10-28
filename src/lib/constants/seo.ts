export const SITE_URL = (process.env.SITE_URL || 'https://oria.co.id').replace(/\/$/, '');

export const DEFAULT_SEO = {
  siteName: 'oria.co.id — ORIA Industrial Printing',
  title: 'ORIA Indonesia — Mesin Digital Printing Industrial Presisi & Solusi Cetak Modern',
  description:
    'Pusat teknologi dan rekayasa mesin digital printing industrial di Indonesia. Solusi terdepan printer UV flatbed, DTF apparel, laser cutting, CNC router, dan sublimasi tekstil bergaransi resmi.',
  keywords:
    'mesin digital printing, jual mesin digital printing, mesin digital printing oria, UV flatbed, DTF apparel, printer sublimasi, fiber laser cutting, CNC router, ecosolvent, oria indonesia, mesin percetakan surabaya',
  defaultImage: 'https://oria.co.id/images/contact/hero-desktop.png',
  locale: 'id_ID',
  robots: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
};

export const COMPANY_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': ['LocalBusiness', 'Corporation', 'ElectronicsStore'],
  '@id': `${SITE_URL}/#Organization`,
  name: 'ORIA Industrial Printing',
  alternateName: 'ORIA Indonesia',
  legalName: 'ORIA Indonesia',
  url: SITE_URL,
  email: 'info@oria.co.id',
  telephone: '+6281252086455',
  priceRange: 'Rp 20.000.000 - Rp 2.500.000.000',
  openingHours: ['Mo Tu We Th Fr 08:30-17:00', 'Sa 08:30-15:00'],
  logo: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#logo`,
    url: `${SITE_URL}/images/oria-logo-hd.png`,
    contentUrl: `${SITE_URL}/images/oria-logo-hd.png`,
    caption: 'ORIA Industrial Printing',
    inLanguage: 'id-ID'
  },
  image: {
    '@type': 'ImageObject',
    '@id': `${SITE_URL}/#primaryImage`,
    url: `${SITE_URL}/images/contact/hero-desktop.png`,
    contentUrl: `${SITE_URL}/images/contact/hero-desktop.png`,
    caption: 'ORIA Flagship Showroom & Precision Machinery',
    inLanguage: 'id-ID'
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales & technical support',
    telephone: '+6281252086455',
    url: `${SITE_URL}/kontak`,
    areaServed: 'ID',
    availableLanguage: ['Indonesian', 'English']
  },
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Ruko Royal Town Blok RB8, Gunung Anyar',
    addressLocality: 'Surabaya',
    addressRegion: 'Jawa Timur',
    postalCode: '60294',
    addressCountry: 'ID'
  },
  hasMap: 'https://maps.google.com/?q=Ruko+Royal+Town+Gunung+Anyar+Surabaya',
  areaServed: [
    { '@type': 'AdministrativeArea', name: 'Indonesia' },
    { '@type': 'City', name: 'Surabaya' },
    { '@type': 'City', name: 'Jakarta' },
    { '@type': 'City', name: 'Bandung' },
    { '@type': 'City', name: 'Semarang' },
    { '@type': 'City', name: 'Medan' },
    { '@type': 'City', name: 'Makassar' },
    { '@type': 'City', name: 'Denpasar' }
  ],
  geo: {
    '@type': 'GeoCoordinates',
    latitude: -7.348425,
    longitude: 112.766708
  },
  sameAs: [
    'https://www.instagram.com/oria.co.id/',
    'https://maps.google.com/?q=Ruko+Royal+Town+Gunung+Anyar+Surabaya'
  ]
};

export const WEBSITE_SCHEMA = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'ORIA Industrial Printing',
  description: DEFAULT_SEO.description,
  publisher: {
    '@type': 'Organization',
    '@id': `${SITE_URL}/#Organization`,
    name: 'ORIA Industrial Printing',
    url: SITE_URL
  },
  potentialAction: [
    {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_URL}/produk?q={search_term_string}`
      },
      'query-input': 'required name=search_term_string'
    }
  ],
  inLanguage: 'id-ID'
};

export const SITE_NAVIGATION_SCHEMA = {
  '@context': 'https://schema.org',
  '@graph': [
    { '@type': 'SiteNavigationElement', '@id': `${SITE_URL}/#home`, name: 'Home', url: `${SITE_URL}/` },
    { '@type': 'SiteNavigationElement', '@id': `${SITE_URL}/#tentang`, name: 'Tentang', url: `${SITE_URL}/tentang` },
    { '@type': 'SiteNavigationElement', '@id': `${SITE_URL}/#produk`, name: 'Produk', url: `${SITE_URL}/produk` },
    { '@type': 'SiteNavigationElement', '@id': `${SITE_URL}/#artikel`, name: 'Artikel', url: `${SITE_URL}/artikel` },
    { '@type': 'SiteNavigationElement', '@id': `${SITE_URL}/#kontak`, name: 'Kontak', url: `${SITE_URL}/kontak` }
  ]
};
