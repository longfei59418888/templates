import { RouteConfigs } from '@/constants/route';
import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';

export const generateLanguages = (path: string) => {
  return routing.locales.reduce((previousValue, local) => {
    return {
      ...previousValue,
      [local]:
        local === 'en'
          ? `${process.env.APP_URL || ''}${path || ''}`
          : `${process.env.APP_URL || ''}/${local}${path || ''}`,
    };
  }, {});
};

export default async function sitemap() {
  return RouteConfigs?.reduce<MetadataRoute.Sitemap[]>(
    (previousValue, { path, priority, lastModified }) => {
      const list = routing.locales.map(
        (local) =>
          ({
            url:
              local === 'en'
                ? `${process.env.APP_URL || ''}${path || ''}`
                : `${process.env.APP_URL || ''}/${local}${path || ''}`,
            lastModified,
            changeFrequency: 'weekly',
            priority,
            alternates: {
              languages: generateLanguages(path),
            },
          }) as any,
      );
      return [...previousValue, ...list];
    },
    [],
  ) as MetadataRoute.Sitemap[];
}
