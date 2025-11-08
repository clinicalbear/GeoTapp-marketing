'use client';

import { Breadcrumbs as MuiBreadcrumbs, Typography, Box } from '@mui/material';
import Link from 'next/link';
import MuiLink from '@mui/material/Link';
import { usePathname } from 'next/navigation';
import StructuredData from './StructuredData';
import { generateBreadcrumbSchema } from '@/lib/seo';

interface BreadcrumbItem {
  name: string;
  path?: string;
}

/**
 * Generate breadcrumb items from pathname
 */
function pathnameToBreadcrumbs(pathname: string): BreadcrumbItem[] {
  const breadcrumbs: BreadcrumbItem[] = [
    { name: 'Home', path: '/' },
  ];

  if (pathname === '/' || pathname === '') {
    return breadcrumbs;
  }

  const pathSegments = pathname.split('/').filter(Boolean);
  let currentPath = '';

  pathSegments.forEach((segment) => {
    currentPath += `/${segment}`;
    const name = segment
      .split('-')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    breadcrumbs.push({ name, path: currentPath });
  });

  // Mark last item as current (no link)
  breadcrumbs[breadcrumbs.length - 1].path = undefined;

  return breadcrumbs;
}

interface BreadcrumbsProps {
  items?: BreadcrumbItem[];
  showSchema?: boolean;
}

/**
 * Breadcrumbs component with structured data
 * Improves navigation and SEO
 */
export default function Breadcrumbs({
  items,
  showSchema = true,
}: BreadcrumbsProps) {
  const pathname = usePathname();
  const breadcrumbs = items || pathnameToBreadcrumbs(pathname);

  // Generate schema data for structured data markup
  const siteUrl = process.env.NEXT_PUBLIC_BACKEND_URL?.replace('/api', '') || 'https://geotapp.com';
  const schemaItems = breadcrumbs.map((item) => ({
    name: item.name,
    url: item.path ? `${siteUrl}${item.path}` : siteUrl,
  }));

  return (
    <>
      {showSchema && <StructuredData data={generateBreadcrumbSchema(schemaItems)} id="breadcrumb-schema" />}
      <Box sx={{ mb: 3 }}>
        <MuiBreadcrumbs aria-label="breadcrumb">
          {breadcrumbs.map((item, index) => {
            const isLast = index === breadcrumbs.length - 1;
            return isLast ? (
              <Typography key={item.name} color="textPrimary">
                {item.name}
              </Typography>
            ) : (
              <MuiLink
                key={item.name}
                component={Link}
                href={item.path || '/'}
                color="primary"
                sx={{
                  textDecoration: 'none',
                  '&:hover': {
                    textDecoration: 'underline',
                  },
                }}
              >
                {item.name}
              </MuiLink>
            );
          })}
        </MuiBreadcrumbs>
      </Box>
    </>
  );
}