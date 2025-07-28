import { getTranslations } from 'next-intl/server';
import { Content, Layout } from '@/app/[locale]/conponents/_layout';
import { generatePageMetadata } from '@/lib/metaData';
import { RoutePathEnum } from '@/constants/route';

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.faq);
export default async function Page() {
  const t = await getTranslations('home.footer');
  const c = await getTranslations('content');

  return (
    <Layout title={t('question')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'FAQPage',
            name: 'Frequently Asked Questions (FAQ) - getytmp3',
            description:
              'Find answers to common questions about using getytmp3, your free YouTube to MP3/MP4 converter. Learn about features, security, formats, and more.',
            url: 'https://www.getytmp3.com/faq',
            mainEntity: [
              {
                '@type': 'Question',
                name: 'How do I use getytmp3 to convert a YouTube video?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'It\'s a simple three-step process: 1. Copy the YouTube video URL you want to convert. 2. Paste the URL into the input box on our homepage. 3. Select your desired format (e.g., MP3, MP4) and click the "Convert" button. Your download will be ready in moments.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is this service completely free?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes, absolutely. getytmp3 is 100% free to use. There are no hidden fees, subscription costs, or charges for any of our conversion services.',
                },
              },
              {
                '@type': 'Question',
                name: 'Do I need to install any software or register for an account?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "No. Our service is entirely web-based. You do not need to install any software, browser extensions, or create an account to use our converter. Just open our website and you're ready to go.",
                },
              },
              {
                '@type': 'Question',
                name: 'Is it safe to download files from getymp3?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: "Yes, your security is our priority. We use SSL encryption to protect your connection to our site. We do not store your data, and we ensure that our service is free from malware and intrusive ads. The files you download are sourced directly from YouTube's servers.",
                },
              },
              {
                '@type': 'Question',
                name: 'What audio and video formats do you support?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We support a wide range of popular formats to meet all your needs, including: Audio (MP3, AAC, WAV, FLAC) and Video (MP4).',
                },
              },
              {
                '@type': 'Question',
                name: 'Are there any limits on the number or length of videos I can convert?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'No. We offer unlimited conversions and downloads. You can convert as many videos as you like, with no restrictions on the length of the video.',
                },
              },
              {
                '@type': 'Question',
                name: 'Does your converter work on mobile devices (Android/iOS)?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Yes. Our website is fully responsive and designed to work perfectly on any modern device, including desktops, laptops, tablets, and smartphones (Android and iOS).',
                },
              },
              {
                '@type': 'Question',
                name: 'What is the quality of the converted files?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'We strive to provide the best possible quality for all conversions. For audio, we offer MP3 files up to 320kbps and lossless formats like FLAC. For video, the quality of the downloaded file will match the highest quality available for the source video on YouTube.',
                },
              },
              {
                '@type': 'Question',
                name: 'How long will my download link be available?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'For security and privacy reasons, download links are available for a few hours after the conversion is complete. We recommend you download your file immediately after converting it.',
                },
              },
              {
                '@type': 'Question',
                name: 'Is it legal to download videos from YouTube?',
                acceptedAnswer: {
                  '@type': 'Answer',
                  text: 'Our service acts as a technical tool to convert publicly available online content. It is your responsibility to respect copyright law. We recommend you only download videos for which you have permission from the copyright owner, or videos that are in the public domain or available under a Creative Commons license. You should not use this service to download copyrighted material without consent.',
                },
              },
            ],
            publisher: {
              '@type': 'Organization',
              name: 'getytmp3',
              url: 'https://www.getytmp3.com/',
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
      <Content content={c.raw('question')} />
    </Layout>
  );
}
