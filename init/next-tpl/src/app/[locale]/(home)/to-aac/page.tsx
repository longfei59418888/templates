import { generatePageMetadata } from '@/lib/metaData';
import { RoutePathEnum } from '@/constants/route';

import { getLocale, getMessages } from 'next-intl/server';
import Content from '@/app/[locale]/(home)/conponents/_page';

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.toAAC);

export default async function Page() {
  const locale = await getLocale();
  const messages = await getMessages({ locale });
  return <Content {...messages.home.toAAC} jsonLd={JSON.stringify({
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    "name": "YouTube to AAC Converter - getytmp3",
    "description": "The best online tool to convert YouTube videos to high-quality AAC audio files. Fast, free, and works on any device directly in your browser.",
    "url": "https://www.getytmp3.com/to-aac",
    "logo": "https://resource.friendochat.com/ytb/web/logo.jpeg",
    "datePublished": "2024-01-01",
    "dateModified": "2025-07-24",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.getytmp3.com/to-aac"
    },
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": [
      "Windows",
      "macOS",
      "Android",
      "Linux",
      "iOS"
    ],
    "featureList": [
      "Unlimited Free Conversions",
      "High-Speed Processing",
      "Highest Quality Audio",
      "YouTube Playlist Support",
      "Universal Compatibility",
      "Safe and Secure"
    ],
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "author": {
      "@type": "Organization",
      "name": "getytmp3",
      "url": "https://www.getytmp3.com/"
    },
    "provider": {
      "@type": "Organization",
      "name": "getytmp3",
      "url": "https://www.getytmp3.com/"
    }
  })}/>;
}
