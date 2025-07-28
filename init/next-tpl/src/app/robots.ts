import type { MetadataRoute } from 'next';

export const sitemaps = [
  `${process.env.APP_URL || ''}/sitemap.xml`,
  `${process.env.APP_URL || ''}/blog/sitemap.xml`,
];
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: sitemaps,
  };
}
