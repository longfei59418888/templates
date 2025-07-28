import { getTranslations } from 'next-intl/server';
import { Content, Layout } from '@/app/[locale]/conponents/_layout';
import { generatePageMetadata } from '@/lib/metaData';
import { RoutePathEnum } from '@/constants/route';

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.privacy);

export default async function Page() {
  const t = await getTranslations('home.footer');
  const c = await getTranslations('content');

  return (
    <Layout title={t('privacy')}>
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            name: 'Privacy Policy - getytmp3',
            description:
              'Read the getytmp3 Privacy Policy to understand how we collect, use, and protect your data. We are committed to safeguarding your privacy and ensuring transparency.',
            url: 'https://www.getytmp3.com/privacy',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.getytmp3.com/privacy',
            },
            publisher: {
              '@type': 'Organization',
              name: 'getytmp3',
              url: 'https://www.getytmp3.com/',
            },
          }),
        }}
      ></script>
      <Content content={c.raw('privacy')} />
    </Layout>
  );
}
