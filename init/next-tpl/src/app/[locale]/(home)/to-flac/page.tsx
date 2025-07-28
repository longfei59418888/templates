import { generatePageMetadata } from '@/lib/metaData';
import { RoutePathEnum } from '@/constants/route';

import { getLocale, getMessages } from 'next-intl/server';
import Content from '@/app/[locale]/(home)/conponents/_page';

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.toFlac);

export default async function Page() {
  const locale = await getLocale();
  const messages = await getMessages({ locale });
  return (
    <Content
      {...messages.home.toFlac}
      jsonLd={JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'YouTube to FLAC Converter - getytmp3',
        description:
          'The ultimate free tool for converting YouTube videos to FLAC. Experience the power of a fast, reliable download solution that preserves 100% of the original audio data in a compressed, lossless format.',
        url: 'https://www.getytmp3.com/to-flac',
        logo: 'https://resource.friendochat.com/ytb/web/logo.jpeg',
        datePublished: '2024-01-01',
        dateModified: '2025-07-24',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.getytmp3.com/to-flac',
        },
        applicationCategory: 'MultimediaApplication',
        operatingSystem: ['Windows', 'macOS', 'Android', 'Linux', 'iOS'],
        featureList: [
          'Truly Lossless Audio',
          'Unlimited Free Conversions',
          'High-Speed Processing',
          'YouTube Playlist Support',
          'Universal Compatibility',
          'Safe and Secure',
        ],
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
        author: {
          '@type': 'Organization',
          name: 'getytmp3',
          url: 'https://www.getytmp3.com/',
        },
        provider: {
          '@type': 'Organization',
          name: 'getytmp3',
          url: 'https://www.getytmp3.com/',
        },
      })}
    />
  );
}
