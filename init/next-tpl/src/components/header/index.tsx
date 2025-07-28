'use client';

import { useRouter } from '@/i18n/navigation';
import { FC } from 'react';
import { useTranslations } from 'next-intl';

export const HeaderAndBack: FC<{ title: string }> = ({ title }) => {
  const router = useRouter();
  const t = useTranslations('app');
  return (
    <div className={'flex items-center pt-[76px]'}>
      <button
        onClick={() => router.back()}
        className={'flex cursor-pointer items-center gap-[10px]'}
      >
        <span
          className={'relative inline-block h-[50px] w-[50px] cursor-pointer'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={
              'absolute -top-[25px] -left-[25px] z-1 h-[100px] w-[100px] cursor-pointer'
            }
            viewBox="0 0 100 100"
            fill="none"
          >
            <g filter="url(#filter0_d_149_14)">
              <circle
                cx="50"
                cy="50"
                r="26"
                fill="white"
                fillOpacity="0.5"
                shapeRendering="crispEdges"
              />
              <circle
                cx="50"
                cy="50"
                r="25"
                stroke="white"
                strokeWidth="2"
                shapeRendering="crispEdges"
              />
            </g>
            <defs>
              <filter
                id="filter0_d_149_14"
                x="0.4"
                y="0.4"
                width="99.2"
                height="99.2"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feColorMatrix
                  in="SourceAlpha"
                  type="matrix"
                  values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                  result="hardAlpha"
                />
                <feOffset />
                <feGaussianBlur stdDeviation="11.8" />
                <feComposite in2="hardAlpha" operator="out" />
                <feColorMatrix
                  type="matrix"
                  values="0 0 0 0 0.567971 0 0 0 0 0.728854 0 0 0 0 0.970177 0 0 0 0.4 0"
                />
                <feBlend
                  mode="normal"
                  in2="BackgroundImageFix"
                  result="effect1_dropShadow_149_14"
                />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="effect1_dropShadow_149_14"
                  result="shape"
                />
              </filter>
            </defs>
          </svg>
          <svg
            className={'absolute top-[11px] left-[17px] z-10 h-[27px] w-[15px]'}
            xmlns="http://www.w3.org/2000/svg"
            width="15"
            height="27"
            viewBox="0 0 15 27"
            fill="none"
          >
            <path
              d="M13.9681 3.77843L5.98549 11.7611C5.45515 12.2914 5.14023 12.6088 4.9251 12.8622C4.72455 13.0984 4.72625 13.1498 4.74084 13.1049C4.69898 13.2338 4.69898 13.373 4.74084 13.5018C4.72625 13.4569 4.72455 13.5083 4.9251 13.7445C5.14023 13.9979 5.45515 14.3153 5.98549 14.8457L13.9681 22.8283C14.7196 23.5798 14.7196 24.7983 13.9681 25.5497C13.2166 26.3012 11.9982 26.3012 11.2467 25.5497L3.26408 17.5671C2.77864 17.0817 2.33153 16.6366 1.99107 16.2356C1.63598 15.8174 1.28533 15.3214 1.08039 14.6907C0.787414 13.7889 0.787415 12.8178 1.08039 11.9161C1.28533 11.2854 1.63598 10.7894 1.99107 10.3711C2.33153 9.97014 2.77864 9.52509 3.26408 9.03965L11.2467 1.05701C11.9982 0.305517 13.2166 0.305517 13.9681 1.05701C14.7196 1.80851 14.7196 3.02693 13.9681 3.77843Z"
              fill="#466DFF"
            />
          </svg>
        </span>
        <span className={'text-[24px] font-[500] text-[#001749]'}>
          {t('back')}
        </span>
      </button>
      <div className={'flex flex-1 justify-center'}>
        <h1
          className={
            'line-clamp-2 px-[120px] text-[52px] font-[700] text-[#001749] text-center'
          }
        >
          {title}
        </h1>
      </div>
    </div>
  );
};
