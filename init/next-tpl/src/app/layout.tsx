import type { Metadata, Viewport } from 'next';
import '../styles/globals.css';
import { routing } from '@/i18n/routing';
import { getLocale, getTranslations } from 'next-intl/server';
import { RoutePathEnum } from '@/constants/route';
import { ReactNode } from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { getLangDir } from 'rtl-detect';
import Firebase from '@/components/firebase';
import { Toaster } from '@/components/sonner';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('metadata');
  // todo 需要修改对应的文案和图片
  return {
    metadataBase: new URL(process.env.APP_URL as string),
    openGraph: {
      type: 'website',
      url: RoutePathEnum.home,
      title: t('openGraph.title'),
      description: t('openGraph.description'),
      images: ['/images/og.png'],
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Friendo_AI',
      title: t('twitter.title'),
      description: t('twitter.description'),
      images: ['/images/og.png'],
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  minimumScale: 1,
  userScalable: false,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  const locale = await getLocale();
  const direction = getLangDir(locale);
  return (
    <html lang={locale} dir={direction}>
      <body>
        <NextIntlClientProvider>
          <div className={'min-w-[1100Px]'}>
            <Firebase />
            <Toaster />
            {children}
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
