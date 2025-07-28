'use client';
import { Img } from '@/components/img';
import { FC } from 'react';
import { Link, usePathname } from '@/i18n/navigation';
import LogoImg from 'images/logo.png';
import { Navs, RoutePathEnum } from '@/constants/route';
import { changeLang, languageLabels, routing } from '@/i18n/routing';
import { getTranslations } from 'next-intl/server';
import { useTranslations } from 'next-intl';

export const Footer: FC = () => {
  const footer = useTranslations('home.footer');
  const Mores = [
    { label: 'YouTube to MP3' },
    { label: 'ytto mp3' },
    { label: 'YouTube to mp3 converter' },
    { label: 'ytto mp3 converter' },
    { label: 'YouTube mp3 downloader' },
    { label: 'ytmp3 downloader' },
    { label: 'YouTube mp3' },
    { label: footer('about'), path: RoutePathEnum.about },
    { label: footer('blog'), path: RoutePathEnum.blog },
    { label: footer('contact'), path: RoutePathEnum.contact },
    { label: footer('question'), path: RoutePathEnum.faq },
    { label: footer('privacy'), path: RoutePathEnum.privacy },
    { label: footer('term'), path: RoutePathEnum.term },
  ];

  return (
    <footer
      className={
        'flex items-center justify-center gap-[94px] pt-[110px] pb-[100px]'
      }
    >
      <div className={'flex items-center gap-[16px]'}>
        <Img src={LogoImg} className={'h-[117px] w-[117px]'} alt={'logo'} />
        <h2 className={'text-[65px] font-bold text-[#102160]'}>getytmp3</h2>
      </div>
      <div
        className={
          'flex gap-[80px] [&_a]:mt-[10px] [&_a]:block [&_a]:text-[16px] [&_a]:text-[#697C9A] [&_h6]:text-[24px] [&_h6]:font-[700] [&_h6]:text-[#001749]'
        }
      >
        <div>
          <h6>{footer('converter')}</h6>
          <div>
            {Navs.map(({ path: pathName, label }) => {
              return (
                <Link key={pathName} href={pathName}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <h6>More Links</h6>
          <div className={'grid grid-cols-[1fr_1fr] gap-[0_30px]'}>
            {Mores.map(({ path: pathName, label }) => {
              return (
                <Link key={label} href={pathName ?? RoutePathEnum.home}>
                  {label}
                </Link>
              );
            })}
          </div>
        </div>
        <div>
          <h6>{footer('languages')}</h6>
          <div className={'grid grid-cols-[1fr_1fr] gap-[0_30px]'}>
            {routing.locales.map((code) => {
              return (
                <div
                  key={code}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    changeLang(code);
                  }}
                >
                  {languageLabels[code]}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </footer>
  );
};
