import type { MetadataRoute } from "next";
export const dynamic = "force-static";
export const revalidate = false;
export default function sitemap(): MetadataRoute.Sitemap {
  return [{ url: "https://geotapp.com/", lastModified: new Date(), changeFrequency: "weekly", priority: 1 }];
}
