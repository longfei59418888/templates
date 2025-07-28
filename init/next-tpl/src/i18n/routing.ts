import { defineRouting } from 'next-intl/routing';

export const locales = ['en', 'hi', 'es', 'ko', 'pt', 'id'] as const;

export const languageLabels: Record<(typeof locales)[number], string> = {
  en: 'English',
  es: 'Español',
  pt: 'Português',
  id: 'Indonesian',
  hi: 'हिन्दी',
  ko: '한국인',
};

export const routing = defineRouting({
  locales,
  defaultLocale: 'en',
  localePrefix: 'as-needed',
  localeDetection: false,
});

export function getCanonicals(pathname: string) {
  return {
    canonical: pathname,
    languages: {
      ['x-default']: pathname,
      [routing.defaultLocale]: pathname,
      ...routing.locales.reduce((previousValue, locale) => {
        if (locale === routing.defaultLocale) return previousValue;
        return {
          ...previousValue,
          [locale]: `/${locale}${pathname === '/' ? '' : pathname}`,
        };
      }, {}),
    },
  };
}

export function changeLang(lang: string) {
  if (typeof window !== 'undefined') {
    const pathname = window.location.pathname;
    const [, locale, ...rest] = pathname.split('/');
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (locales.includes(locale as any)) {
      window.location.replace(
        `${lang === 'en' ? '' : '/' + lang}/${rest.join('/')}` +
          window.location.search,
      );
    } else {
      window.location.replace(
        `${lang === 'en' ? '' : '/' + lang}/${locale}/${rest.join('/')}` +
          window.location.search,
      );
    }
  }
}
