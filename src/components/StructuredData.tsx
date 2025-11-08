'use client';

import Script from 'next/script';
import type { StructuredData } from '@/lib/seo';
import { formatStructuredData } from '@/lib/seo';

interface StructuredDataProps {
  data: StructuredData | StructuredData[];
  id?: string;
}

/**
 * Component to inject structured data (JSON-LD) into the page
 * Improves SEO by providing machine-readable data to search engines
 */
export default function StructuredData({ data, id }: StructuredDataProps) {
  const scriptId = id || 'structured-data';
  const jsonLd = formatStructuredData(data);

  return (
    <Script
      id={scriptId}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: jsonLd }}
      strategy="afterInteractive"
    />
  );
}