import { Img } from '@/components/img';
import { FC } from 'react';
import featureImg from 'images/feature-icon.png';

import { InputButton } from '@/app/[locale]/(home)/conponents/_inputBtn';
import { Post } from '@/lib/request/type';
import { Link } from '@/i18n/navigation';
import sd from 'images/feature-bg.png';
import { getTranslations } from 'next-intl/server';

export const Feature: FC<{
  features: Array<{ title: string; description: string }>;
  text: string;
  title: string;
}> = async ({ text, title, features }) => {
  const home = await getTranslations('home');
  return (
    <>
      <section
        className={
          'relative mt-[60px] min-h-[700] rounded-[34px] border-2 border-solid border-[#fff] bg-[rgba(255,255,255,0.50)] px-[42px] pb-[62px] shadow-[0px_28px_77.6px_0px_rgba(145,186,247,0.20)]'
        }
      >
        <Img
          alt={'feature icon'}
          src={featureImg}
          className={
            'absolute -top-[84px] -left-[103px] z-10 h-[269px] w-[292px]'
          }
        />
        <h3
          className={
            'mt-[60px] px-[116px] text-center text-[40px] leading-[43px] font-[700] text-[#001749]'
          }
        >
          {title}
        </h3>
        <h6
          className={
            'mx-[auto] mt-[31px] flex h-[60px] w-[228px] items-center justify-center rounded-[30px] bg-[#85ACE633] text-[28px] font-[700] text-[#001749]'
          }
        >
          {home('Features')}
        </h6>
        <ul
          className={
            'mt-[40px] grid grid-cols-[1fr_1fr_1fr] gap-[20px] pb-[50px]'
          }
        >
          {features?.map(({ title, description }, index) => {
            return (
              <li
                key={title}
                className={
                  'rounded-[34px] bg-[#fff] bg-[url(/images/feature-bg.png)] bg-[length:181px_201px] bg-right-bottom bg-no-repeat p-[20px] px-[20px] pb-[25px]'
                }
              >
                <p
                  className={
                    'mx-[auto] flex h-[60px] w-[60px] items-center justify-center rounded-[30px] bg-[linear-gradient(180deg,#466DFF_0%,#8872F5_100%)]'
                  }
                >
                  <span className={'text-[36px] font-[600] text-[#fff]'}>
                    {index + 1}
                  </span>
                </p>
                <h4
                  className={
                    'mt-[20px] line-clamp-1 text-[24px] font-[600] text-[#001749]'
                  }
                >
                  {title}
                </h4>
                <p
                  className={
                    'line-clamp-4 h-[94px] text-[16px] font-[500] text-[#3B5885] [&_strong]:font-[700]'
                  }
                  dangerouslySetInnerHTML={{ __html: description }}
                />
              </li>
            );
          })}
        </ul>
        <InputButton text={text} />
      </section>
    </>
  );
};
