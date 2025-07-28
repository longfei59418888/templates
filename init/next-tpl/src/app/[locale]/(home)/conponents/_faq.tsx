'use client';
import { Img } from '@/components/img';
import { FC, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import titleIcon from 'images/home-title-icon.png';
import faqImg from 'images/faq-icon.png';
import arrImg from 'images/arraw.png';
import cn from '@/lib/cn';
import { InputButton } from '@/app/[locale]/(home)/conponents/_inputBtn';

const FaqItem: FC<{
  title: string;
  description: string;
}> = ({ title, description }) => {
  const [show, setShow] = useState(false);
  return (
    <li className={'mb-[30px]'}>
      <h4
        className={
          'h-[45px] rounded-tl-[20px] rounded-tr-[20px] border-1 border-b-0 border-solid border-[#fff] bg-[#85ACE633] px-[20px] text-[24px] font-[700] text-[#001749] ' +
          'flex items-center justify-between pt-[4px]'
        }
      >
        <span>{title}</span>
        <Img
          alt={'icon'}
          onClick={() => setShow(!show)}
          className={cn('h-[24px] w-[24px] cursor-pointer', {
            ['rotate-180']: !show,
          })}
          src={arrImg}
        />
      </h4>
      <div
        className={cn('h-0 overflow-hidden', {
          ['h-[auto]']: show,
        })}
      >
        <p
          className={
            'rounded-br-[20px] rounded-bl-[20px] border-1 border-solid border-[#fff] bg-[#fff] p-[20px] pr-[44px] text-[16px] leading-[1.5] font-[500] text-[#3B5885]'
          }
          dangerouslySetInnerHTML={{ __html: description }}
        />
      </div>
    </li>
  );
};

export const Faq: FC<{
  faqs: Array<{ name: string; acceptedAnswer: { text: string } }>;
  text: string;
  title: string;
}> = ({ faqs, text, title }) => {
  const t = useTranslations('home');
  return (
    <>
      <section
        className={
          'relative mt-[130px] rounded-[34px] border-2 border-solid border-[#fff] bg-[rgba(255,255,255,0.50)] px-[84px] pb-[62px] shadow-[0px_28px_77.6px_0px_rgba(145,186,247,0.20)]'
        }
      >
        <Img
          alt={'faq img'}
          src={faqImg}
          className={
            'absolute -top-[42px] -left-[33px] z-10 h-[151px] w-[159px]'
          }
        />
        <div
          className={
            'flex items-center justify-center gap-[12px] pt-[18px] text-[24px] font-[700] text-[#001749]'
          }
        >
          <Img alt={'title icon'} src={titleIcon} className={'h-[56px] w-[28px] rotate-180'} />
          <span className={'pt-[30px]'}>{t('faqEditorsChoice')}</span>
          <Img alt={'title icon'} src={titleIcon} className={'h-[56px] w-[28px]'} />
        </div>
        <h3
          className={
            'mt-[26px] text-center text-[40px] leading-[43px] font-[700] text-[#001749]'
          }
        >
          {title}
        </h3>
        <ul className={'mt-[40px] pb-[20px]'}>
          {faqs.map((item) => {
            return (
              <FaqItem
                key={item.name}
                title={item.name}
                description={item.acceptedAnswer.text}
              />
            );
          })}
        </ul>
        <InputButton text={text} />
      </section>
    </>
  );
};
