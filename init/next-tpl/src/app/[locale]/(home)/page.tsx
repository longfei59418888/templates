import { generatePageMetadata } from '@/lib/metaData';
import { RoutePathEnum } from '@/constants/route';
import Content from '@/app/[locale]/(home)/conponents/_page';
import { getLocale, getMessages } from 'next-intl/server';
import { jsonLd } from '@/app/[locale]/(home)/_config';

export const revalidate = 3600;

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.home);

export default async function Page() {
  const locale = await getLocale();
  const messages = await getMessages({ locale });
  return <Content {...messages.home.toMp3} jsonLd={jsonLd} />;
}
