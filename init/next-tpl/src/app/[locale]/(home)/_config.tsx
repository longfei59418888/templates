export const jsonLd = JSON.stringify({
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'getytmp3 - Free YouTube to MP3 Converter',
  logo: 'https://resource.friendochat.com/ytb/web/logo.jpeg',
  url: 'https://www.getytmp3.com/',
  applicationCategory: 'MultimediaApplication',
  operatingSystem: 'Web-based, Windows, macOS, Android, Linux, iOS',
  description:
    'Fast, free, and high-quality online tool to convert YouTube videos to MP3, MP4, AAC, WAV, and FLAC. No registration or software installation needed. Safe, secure, and works on any device.',
  datePublished: '2024-01-01',
  dateModified: '2025-07-24',
  author: {
    '@type': 'Organization',
    name: 'getytmp3',
    url: 'https://www.getytmp3.com/',
  },
  offers: {
    '@type': 'Offer',
    price: '0',
    priceCurrency: 'USD',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'customer support',
    email: 'support@getytmp3.com',
    url: 'https://www.getytmp3.com/contact',
    availableLanguage: [
      'English',
      'Spanish',
      'Portuguese',
      'Indonesian',
      'Hindi',
      'Korean',
    ],
  },
});
