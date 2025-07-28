import type { Messages, NamespaceKeys, NestedKeyOf } from 'use-intl/core';
import { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { getCanonicals } from '@/i18n/routing';

export async function generatePageMetadata(
  page: NamespaceKeys<Messages['metadata'], NestedKeyOf<Messages['metadata']>>,
): Promise<Metadata> {
  const t = await getTranslations(`metadata.${page}`);

  return {
    title: t('title'),
    description: t('description'),
    keywords: t('keywords'),
    alternates: getCanonicals(page),
  };
}
