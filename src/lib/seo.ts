/**
 * SEO Utilities - Structured Data and Meta Tags
 */

export interface StructuredData {
  '@context': string;
  '@type': string;
  [key: string]: unknown;
}

const siteUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace('/api', '') || 'https://geotapp.com';

/**
 * Generate Organization Schema
 */
export function generateOrganizationSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'GeoTapp',
    url: siteUrl,
    logo: `${siteUrl}/images/logo.png`,
    description: 'Timbratura geolocalizzata senza app',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'IT',
      addressRegion: 'Italy',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'Customer Service',
      email: 'info@geotapp.com',
      telephone: '+39-123-456-7890',
    },
    sameAs: [
      'https://www.linkedin.com/company/geotapp',
      'https://twitter.com/geotapp',
      'https://www.facebook.com/geotapp',
    ],
  };
}

/**
 * Generate Software Application Schema
 */
export function generateSoftwareAppSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'GeoTapp',
    applicationCategory: 'BusinessApplication',
    description: 'Timbratura geolocalizzata con badge digitali, foto e report live',
    url: siteUrl,
    image: `${siteUrl}/images/hero-illustration.svg`,
    operatingSystem: 'Web, Android, iOS',
    offers: [
      {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: '2',
        name: 'Piano Basic',
        description: 'Per digitalizzare i badge cartacei',
      },
      {
        '@type': 'Offer',
        priceCurrency: 'EUR',
        price: '4',
        name: 'Piano Pro',
        description: 'Per squadre distribuite e multi-sede',
      },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
    },
  };
}

/**
 * Generate Product Schema for Pricing
 */
export function generateProductSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: 'GeoTapp - Timbratura Geolocalizzata',
    description: 'Piattaforma PWA per timbrature smart con geofencing, foto e report live',
    image: `${siteUrl}/images/hero-illustration.svg`,
    brand: {
      '@type': 'Brand',
      name: 'GeoTapp',
    },
    offers: {
      '@type': 'AggregateOffer',
      priceCurrency: 'EUR',
      lowPrice: '2',
      highPrice: '4',
      offerCount: '3',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      ratingCount: '150',
      bestRating: '5',
      worstRating: '1',
    },
  };
}

/**
 * Generate FAQ Schema
 */
export function generateFaqSchema(faqs: { question: string; answer: string }[]): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };
}

/**
 * Generate LocalBusiness Schema
 */
export function generateLocalBusinessSchema(): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: 'GeoTapp',
    image: `${siteUrl}/images/logo.png`,
    url: siteUrl,
    telephone: '+39-123-456-7890',
    email: 'info@geotapp.com',
    description: 'Soluzione di timbratura geolocalizzata per team distribuiti',
    areaServed: 'IT',
    priceRange: '€€',
    serviceType: 'Software as a Service',
  };
}

/**
 * Generate breadcrumb schema
 */
export function generateBreadcrumbSchema(items: { name: string; url: string }[]): StructuredData {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: item.url,
    })),
  };
}

/**
 * Format structured data as script tag content
 */
export function formatStructuredData(data: StructuredData | StructuredData[]): string {
  return JSON.stringify(data, null, 2);
}

/**
 * Generate canonical URL
 */
export function getCanonicalUrl(path?: string): string {
  return path ? `${siteUrl}${path}` : siteUrl;
}

/**
 * Generate Open Graph image URL
 */
export function getOgImageUrl(image?: string): string {
  const defaultImage = '/images/hero-illustration.svg';
  return image ? `${siteUrl}${image}` : `${siteUrl}${defaultImage}`;
}