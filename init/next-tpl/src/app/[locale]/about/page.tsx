import { getTranslations } from 'next-intl/server';
import { Content, Layout } from '@/app/[locale]/conponents/_layout';
import { generatePageMetadata } from '@/lib/metaData';
import { RoutePathEnum } from '@/constants/route';

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.about);

export default async function Page() {
  const t = await getTranslations('home.footer');
  const c = await getTranslations('content');

  return (
    <Layout title={t('about')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'AboutPage',
            name: 'About getytmp3 | Our Mission and Story',
            description:
              'Learn about the mission and story behind getytmp3. We are a passionate team dedicated to providing a fast, secure, and user-friendly YouTube converter for creators, educators, and users worldwide.',
            url: 'https://www.getytmp3.com/about',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.getytmp3.com/about',
            },
            datePublished: '2024-01-01',
            dateModified: '2025-07-24',
            author: {
              '@type': 'Organization',
              name: 'getytmp3',
              url: 'https://www.getytmp3.com/',
            },
            publisher: {
              '@type': 'Organization',
              name: 'getytmp3',
              url: 'https://www.getytmp3.com/',
              logo: {
                '@type': 'ImageObject',
                url: 'https://resource.friendochat.com/ytb/web/logo.jpeg',
              },
            },
          }),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: 'getytmp3',
            url: 'https://www.getytmp3.com/',
            logo: 'http://resource.friendochat.com/ytb/web/logo.jpeg',
          }),
        }}
      />
      <Content content={c.raw('about')} />
    </Layout>
  );
}
