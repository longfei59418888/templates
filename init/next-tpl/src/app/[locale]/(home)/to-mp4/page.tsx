import { generatePageMetadata } from '@/lib/metaData';
import { RoutePathEnum } from '@/constants/route';

import { getLocale, getMessages } from 'next-intl/server';
import Content from '@/app/[locale]/(home)/conponents/_page';

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.toMp4);

export default async function Page() {
  const locale = await getLocale();
  const messages = await getMessages({ locale });
  return (
    <Content
      {...messages.home.toMp4}
      jsonLd={JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'YouTube to MP4 Converter - getytmp3',
        description:
          'Instantly convert and download any YouTube video into a high-quality MP4 file. Free, fast, and works on any device without needing to install software.',
        url: 'https://www.getytmp3.com/to-mp4',
        logo: 'https://resource.friendochat.com/ytb/web/logo.jpeg',
        datePublished: '2024-01-01',
        dateModified: '2025-07-24',
        mainEntityOfPage: {
          '@type': 'WebPage',
          '@id': 'https://www.getytmp3.com/to-mp4',
        },
        applicationCategory: 'MultimediaApplication',
        operatingSystem: ['Windows', 'macOS', 'Android', 'Linux', 'iOS'],
        featureList: [
          'HD & 4K Video Download',
          'Fastest YouTube Download Speed',
          'Completely Free to Use',
          'No Software Installation Required',
          'Works Directly in Your Browser',
          'Safe & Secure Downloads',
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
