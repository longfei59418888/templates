import type { MetadataRoute } from 'next';
import dayjs from 'dayjs';
import { RoutePathEnum } from '@/constants/route';
import { fetchAllPostsIds } from '@/lib/request/fetch';
import { generateLanguages } from '@/app/sitemap';

// 生成 /blog/sitemap.xml
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const slugs = await fetchAllPostsIds();
  const lastModified = dayjs().format('YYYY-MM-DD');
  const res = slugs?.map((slug) => ({
    url: `${process.env.APP_URL || ''}${RoutePathEnum.blog || ''}/${slug}`,
    lastModified,
    changeFrequency: 'monthly', // 每天更新
    priority: 0.7,
    // alternates: {
    //   languages: generateLanguages(`${RoutePathEnum.blog || ''}/${slug}`),
    // },
  })) as MetadataRoute.Sitemap;

  return res ?? [];
}
