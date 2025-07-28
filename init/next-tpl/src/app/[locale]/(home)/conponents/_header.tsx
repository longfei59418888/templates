'use client';
import { Img } from '@/components/img';
import { FC, useEffect, useState } from 'react';
import { Link, usePathname, useRouter } from '@/i18n/navigation';
import LogoImg from 'images/logo.png';
import cn from '@/lib/cn';
import { Navs } from '@/constants/route';
import * as Select from '@radix-ui/react-select';
import { changeLang, languageLabels, routing } from '@/i18n/routing';
import { ChevronDown } from 'lucide-react';
import { useLocale } from 'next-intl';

export const Header: FC = () => {
  const path = usePathname();
  const locale = useLocale();
  const [language, setLanguage] =
    useState<(typeof routing.locales)[number]>('en');

  useEffect(() => {
    setLanguage(locale);
  }, [locale]);

  return (
    <header
      className={
        'flex h-[120px] items-center justify-center gap-[40px] bg-[#D8E1F680] backdrop-blur-[40Px]'
      }
    >
      <div className={'flex items-center gap-[16px]'}>
        <Img src={LogoImg} className={'h-[64px] w-[64px]'} alt={'logo'} />
        <h2 className={'text-[40px] leading-[43px] font-bold text-[#102160]'}>
          getytmp3
        </h2>
      </div>
      <nav
        className={
          'flex h-[64px] rounded-[56px] border-1 border-solid border-[#FFFFFFCC] bg-[#E9F0FFB2]'
        }
      >
        {Navs.map(({ path: pathName, label }) => {
          return (
            <Link
              key={pathName}
              className={cn(
                'flex h-full rounded-[56px] px-[26px] text-[18px] leading-[64px] font-[600] text-[#5D77A0]',
                {
                  ['text-[#001749]']: path === pathName,
                  ['bg-[#FFF]']: path === pathName,
                },
              )}
              href={pathName}
            >
              {label}
            </Link>
          );
        })}
      </nav>
      <Select.Root
        value={language}
        onValueChange={(value: (typeof routing.locales)[number]) => {
          if (language !== value) changeLang(value);
          setLanguage(value);
        }}
      >
        <Select.Trigger
          className={
            'flex h-[48px] min-w-[148px] cursor-pointer items-center gap-[8] rounded-[24px] bg-[#466DFF] px-[12px] text-[18px] leading-[18px] font-[600] text-[#fff]'
          }
          aria-label="set language"
        >
          <Select.Icon>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={'h-[24px] w-[24px]'}
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle cx="12" cy="12" r="11" stroke="#EDF2F0" strokeWidth="2" />
              <line
                x1="1.2002"
                y1="12.2"
                x2="22.8002"
                y2="12.2"
                stroke="#EDF2F0"
                strokeWidth="2"
              />
              <path
                d="M12 2.2C12.3182 2.2 12.7097 2.34911 13.1602 2.80156C13.6142 3.25777 14.0692 3.96843 14.4727 4.92656C15.2781 6.83951 15.7998 9.55255 15.7998 12.6004C15.7998 15.6481 15.2781 18.3604 14.4727 20.2732C14.0692 21.2314 13.6142 21.942 13.1602 22.3982C12.7097 22.8507 12.3182 22.9998 12 22.9998C11.6818 22.9997 11.2911 22.8506 10.8408 22.3982C10.3866 21.942 9.9309 21.2317 9.52734 20.2732C8.72193 18.3604 8.20024 15.6481 8.2002 12.6004C8.2002 9.55255 8.72189 6.83951 9.52734 4.92656C9.9309 3.96819 10.3867 3.25778 10.8408 2.80156C11.2911 2.34924 11.6818 2.20006 12 2.2Z"
                stroke="#EDF2F0"
                strokeWidth="2"
              />
            </svg>
          </Select.Icon>
          <Select.Value placeholder="Select" />
          <Select.Icon>
            <ChevronDown />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
            position="popper"
          >
            <Select.Viewport className="p-1">
              {routing.locales.map((code) => (
                <Select.Item
                  key={code}
                  value={code}
                  className={cn(
                    'relative flex cursor-default items-center rounded-md px-8 py-2 text-sm text-gray-700 select-none',
                    'data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900',
                  )}
                >
                  <Select.ItemText>{languageLabels[code]}</Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </header>
  );
};
