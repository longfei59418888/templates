'use client';
import { Img } from '@/components/img';
import { FC } from 'react';
import { useTranslations } from 'next-intl';
import { Link } from '@/i18n/navigation';

export const Des: FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  return (
    <section className={'pt-[80px]'}>
      <h1
        className={
          'text-center text-[52px] leading-[43px] font-[700] text-[#001749]'
        }
      >
        {title}
      </h1>
      <p
        className={
          'mt-[40px] text-center text-[18px] font-[500] text-[#5D77A0]'
        }
        dangerouslySetInnerHTML={{ __html: description }}
      />
    </section>
  );
};
