import { Img } from '@/components/img';
import { FC } from 'react';
import reviewImg from 'images/review-icon.png';
import headImg from 'images/review-head.png';

import { InputButton } from '@/app/[locale]/(home)/conponents/_inputBtn';
import { getTranslations } from 'next-intl/server';

export const Review: FC<{
  text: string;
  title: string;
  jsonLd: string;
}> = async ({ text, title, jsonLd }) => {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLd }}
      />
      <section
        className={
          'relative mt-[60px] min-h-[700] rounded-[34px] border-2 border-solid border-[#fff] bg-[rgba(255,255,255,0.50)] px-[42px] pb-[62px] shadow-[0px_28px_77.6px_0px_rgba(145,186,247,0.20)]'
        }
      >
        <Img
          alt={'review icon'}
          src={reviewImg}
          className={
            'absolute -top-[75px] -left-[40px] z-10 h-[261px] w-[220px]'
          }
        />
        <h3
          className={
            'mt-[60px] px-[126px] text-center text-[40px] leading-[43px] font-[700] text-[#001749]'
          }
        >
          {title}
        </h3>
        <ul
          className={
            'mt-[40px] grid grid-cols-[1fr_1fr_1fr] gap-[20px] pb-[50px]'
          }
        >
          {[
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Alex' },
              datePublished: '2025-07-22',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '4.5',
                bestRating: '5',
              },
              reviewBody:
                "I've tried a few sites, but this is by far the fastest YouTube to MP3 converter online. My download was ready in seconds, not minutes. Absolutely brilliant!",
              name: "The Fastest Converter I've Used! ⚡",
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Sarah' },
              datePublished: '2025-07-22',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '4.7',
                bestRating: '5',
              },
              reviewBody:
                'Finally, a tool that provides YouTube to MP3 in high quality. The 320kbps audio sounds crisp and clear. It even handles YouTube to WAV for lossless quality. Perfect for audiophiles!',
              name: 'Amazing High-Quality Audio!',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'David' },
              datePublished: '2025-07-22',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '4.6',
                bestRating: '5',
              },
              reviewBody:
                'The best part is you can convert YouTube to MP3 without software. I hate installing random programs. This works right in my browser, making it super easy and convenient.',
              name: 'No Software, No Hassle!',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Emily Chen' },
              datePublished: '2025-07-22',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
              },
              reviewBody:
                'I was looking for a way to download audio on the go, and this is it. It works flawlessly for getting YouTube to MP3 on mobile. The interface is clean and simple on my iPhone.',
              name: 'My Go-To for Mobile Use!',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Michael' },
              datePublished: '2025-07-22',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '5',
                bestRating: '5',
              },
              reviewBody:
                "I'm always cautious with online tools. This site is different. It's a safe YouTube to MP4 downloader and MP3 converter. No pop-ups, no malware, just a clean and secure experience.",
              name: 'Safe, Secure, and Trustworthy.',
            },
            {
              '@type': 'Review',
              author: { '@type': 'Person', name: 'Jessica' },
              datePublished: '2025-07-22',
              reviewRating: {
                '@type': 'Rating',
                ratingValue: '4.9',
                bestRating: '5',
              },
              reviewBody:
                "This has become my all-in-one tool. It's a fantastic YouTube to MP4 online converter for when I need video, and the best free YouTube to MP3 converter for audio. It does everything!",
              name: 'More Than Just MP3! ⭐',
            },
          ].map(({ name, reviewBody, reviewRating, author }, index) => {
            return (
              <li
                key={name}
                style={{
                  boxShadow: '0px 4px 66px 0px rgba(145, 186, 247, 0.20)',
                }}
                className={
                  'rounded-[34px] bg-[#fff] bg-[url(/images/review-bg.png)] bg-[length:100%_100%] p-[20px] px-[20px] pb-[25px]'
                }
              >
                <h4
                  className={
                    'line-clamp-1 text-[20px] font-[600] text-[#001749]'
                  }
                >
                  {name}
                </h4>
                <div className={'mt-[10px] w-[178px]'}>
                  <p
                    style={{
                      width: `${(parseFloat(reviewRating.ratingValue) * 100) / parseFloat(reviewRating.bestRating)}%`,
                    }}
                    className={
                      'h-[23px] bg-[url(/images/review-star.png)] bg-[length:178px_23px]'
                    }
                  ></p>
                </div>
                <p
                  className={
                    'mt-[20px] line-clamp-5 h-[120px] text-[16px] font-[500] text-[#3B5885] [&_strong]:font-[700]'
                  }
                >
                  {reviewBody}
                </p>
                <div className={'mt-[14px] flex items-center gap-[6px]'}>
                  <Img
                    alt={'head icon'}
                    src={headImg}
                    className={'h-[32px] w-[32px]'}
                  />
                  <p
                    className={'pt-[4px] text-[16px] font-bold text-[#001749]'}
                  >
                    {author.name}
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
        <InputButton text={text} />
      </section>
    </>
  );
};
