import { getTranslations } from 'next-intl/server';

export async function JsonLd() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        url: 'https://www.getytmp3.com',
        name: 'getytmp3',
        publisher: {
          '@type': 'Organization',
          name: 'getytmp3',
          url: 'https://www.getytmp3.com',
          logo: {
            '@type': 'ImageObject',
            url: 'https://resource.friendochat.com/ytb/web/logo.jpeg',
          },
        },
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://www.getytmp3.com?url={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  );
}
