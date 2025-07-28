import { ReactNode } from 'react';
import { Header } from './(home)/conponents/_header';
import { Footer } from '@/app/[locale]/(home)/conponents/_footer';
import { JsonLd } from './_seo';

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <div>
      <JsonLd />
      <div className={'min-h-[100vh] bg-[url(/images/bg.jpg)] bg-cover'}>
        <Header />
        <div className={'min-h-[calc(100vh_-_570px)]'}>
          {children}
        </div>
        <Footer />
      </div>
    </div>
  );
}
