import { getTranslations } from 'next-intl/server';
import { Content, Layout } from '@/app/[locale]/conponents/_layout';
import { generatePageMetadata } from '@/lib/metaData';
import { RoutePathEnum } from '@/constants/route';

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.contact);

export default async function Page() {
  const t = await getTranslations('home.footer');
  const c = await getTranslations('content');

  return (
    <Layout title={t('contact')}>
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
            '@type': 'ContactPage',
            name: 'Contact getytmp3 | Get in Touch',
            description:
              'Have questions or feedback? Contact the getytmp3 team. We are here to help with any inquiries regarding our YouTube converter service.',
            url: 'https://www.getytmp3.com/contact',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.getytmp3.com/contact',
            },
            publisher: {
              '@type': 'Organization',
              name: 'getytmp3',
              url: 'https://www.getytmp3.com/',
            },
          }),
        }}
      />
      <Content content={c.raw('contact')} />
    </Layout>
  );
}
