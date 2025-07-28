'use client';
import { Img } from '@/components/img';
import { FC, PropsWithChildren, useCallback, useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { useSearchParams } from 'next/navigation';
import { downloadMedia, getUrlInfo, queryTask } from '@/services/task';
import supportImg from 'images/support.png';
import loadingImg from 'images/input-loading.png';
import aDown from 'images/a-down.png';
import cn from '@/lib/cn';
import { z } from 'zod';
import { usePathname, useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import { Format, Media, UrlInfo } from '@/services/types/video';
import * as Select from '@radix-ui/react-select';
import { durationToString } from '@/lib/date';
import { numberToString } from '@/lib/number';
import { LoaderCircle } from 'lucide-react';
import { downloadMediaWithUrl } from '@/lib/media';

const resolutionToP = {
  '256x144': '144P',
  '426x240': '240P',
  '640x360': '360P',
  '854x480': '480P',
  '1280x720': '720P',
  '1920x1080': '1080P',
  '2560x1440': '1440P',
  '3840x2160': '4K',
  '7680x4320': '8K',
};

const youtubeUrlSchema = z.url().refine(
  (url) => {
    try {
      const parsed = new URL(url);
      return (
        parsed.hostname === 'www.youtube.com' ||
        parsed.hostname === 'youtube.com' ||
        parsed.hostname === 'youtu.be'
      );
    } catch {
      return false;
    }
  },
  {
    message: 'error',
  },
);

const DownloadItem: FC<Media & { webpage_url?: string }> = ({
  ext,
  formats,
  webpage_url,
}) => {
  const t = useTranslations('home.input');
  const [target, setTarget] = useState<Format['format_id']>();
  const [loading, setLoading] = useState(false);

  const download = useCallback(() => {
    if (target && !loading) {
      setLoading(true);
      downloadMedia(target, webpage_url ?? '')
        .then(
          (download_url) => {
            download_url && downloadMediaWithUrl(download_url);
          },
          () => {
            toast.error(t('downloadError'));
          },
        )
        .finally(() => {
          setTimeout(() => {
            setLoading(false);
          }, 500);
        });
    }
  }, [target]);

  useEffect(() => {
    setTarget(formats[0].format_id);
  }, []);

  return (
    <div className={'flex gap-[20px]'}>
      <Select.Root
        value={target}
        onValueChange={(value) => {
          console.log(value);
          setTarget(value);
        }}
      >
        <Select.Trigger
          className="flex h-[50px] w-[180px] items-center justify-between gap-[14px] rounded-[14px] border-2 border-solid border-[#697C9A] px-[16px] [&_span]:text-[16px] [&_span]:font-bold [&_span]:text-[#697C9A]"
          aria-label="Fruit"
        >
          <Select.Value placeholder="Select" />
          <Select.Icon>
            <Img alt={'download icon'} src={aDown} className={'h-[10px] w-[18px]'} />
          </Select.Icon>
        </Select.Trigger>

        <Select.Portal>
          <Select.Content
            className="overflow-hidden rounded-md border border-gray-200 bg-white shadow-md"
            position="popper"
          >
            <Select.Viewport className="p-1">
              {formats.map((format) => (
                <Select.Item
                  key={format.format_id}
                  value={format.format_id}
                  className={cn(
                    'relative flex cursor-default items-center rounded-md px-8 py-2 text-sm text-gray-700 select-none',
                    'data-[highlighted]:bg-blue-100 data-[highlighted]:text-blue-900',
                  )}
                >
                  <Select.ItemText>
                    <span className={'text-[16px] font-bold text-[#697C9A]'}>
                      {ext} (
                      {format.resolution
                        ? /* @ts-ignore*/
                          resolutionToP[format.resolution]
                        : /* @ts-ignore*/
                          `${parseInt(format?.asr ?? '0') / 1000}khz`}
                      )
                    </span>
                  </Select.ItemText>
                </Select.Item>
              ))}
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
      <button
        onClick={download}
        className={
          'flex h-[50px] w-[118px] cursor-pointer items-center justify-center gap-[4px] rounded-[14px] bg-[linear-gradient(90deg,#466DFF_0.21%,#8872F5_99.81%)] pt-[2px] text-[16px] font-bold text-white'
        }
      >
        {loading && <LoaderCircle className={'loading-spin'} size={16} />}
        <span className={'pt-[2px]'}>{t('button')}</span>
      </button>
    </div>
  );
};

export const Download: FC<{
  url?: string;
  loading: boolean;
  setLoading: (v: boolean) => void;
}> = ({ url, loading, setLoading }) => {
  const [data, setData] = useState<UrlInfo>();
  const t = useTranslations('home.input');

  useEffect(() => {
    if (url) {
      const result = youtubeUrlSchema.safeParse(url);
      if (result.success) {
        setLoading(true);
        getUrlInfo(url)
          .then(setData)
          .finally(() => setLoading(false));
      } else {
        toast.error(t('errorTips'));
      }
    }
  }, [url]);
  return (
    <>
      {(loading || data) && (
        <div>
          {loading ? (
            <div className={'flex flex-col items-center pt-[68px] pb-[192px]'}>
              <Img alt={'loading icon'} src={loadingImg} className={'h-[175px] w-[166px]'} />
              <p className={'mt-[20px] text-[24px] text-[#000]'}>
                {t('loadingTip')}
              </p>
            </div>
          ) : (
            <>
              <div className={'flex gap-[40px] pt-[30px]'}>
                <img
                  src={data?.thumbnail}
                  className={'h-[302px] w-[662px] rounded-[24px]'}
                  width={662}
                  height={302}
                  alt="YouTube Thumbnail"
                />
                <aside
                  className={
                    'flex-1 overflow-hidden [&_p]:mt-[20px] [&_p]:line-clamp-1 [&_p]:rounded-[30px] [&_p]:bg-[#85ACE633] [&_p]:px-[16px] [&_p]:text-[14px] [&_p]:leading-[36px] [&_p]:text-[#496796]'
                  }
                >
                  <h4
                    className={
                      'line-clamp-2 h-[72px] text-[24px] font-[700] text-[#000]'
                    }
                  >
                    {data?.title}
                  </h4>
                  <p>URL：{url}</p>
                  <p>channel：{data?.channel}</p>
                  <p>
                    Duration：
                    {data?.duration && durationToString(data?.duration)}
                  </p>
                  <p>
                    Views：{data?.view_count && numberToString(data.view_count)}
                  </p>
                </aside>
              </div>
              <div
                className={
                  'mt-[40px] grid grid-cols-[1fr_1fr_1fr] gap-[20px_85px]'
                }
              >
                {[...(data?.audio ?? []), ...(data?.video ?? [])].map(
                  (item) => {
                    return (
                      <DownloadItem
                        webpage_url={data?.webpage_url && url}
                        key={item.ext}
                        {...item}
                      />
                    );
                  },
                )}
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
};

export const Input: FC<
  PropsWithChildren<{
    className?: string;
    showBottom?: boolean;
  }>
> = ({ className, showBottom = true }) => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState('');
  const path = usePathname();
  const router = useRouter();
  const url = searchParams.get('url');
  const t = useTranslations('home.input');
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (url) setSearch(url);
  }, [url]);

  return (
    <>
      <section
        className={cn(
          'mt-[40px] rounded-[34px] bg-[#fff] p-[40px] shadow-[0px_28px_82px_0px_rgba(133,180,251,0.40)]',
          className,
        )}
      >
        <div className={'flex'}>
          <div className={'flex flex-1 items-center'}>
            <input
              value={search}
              onInput={(e) => {
                setSearch(e.currentTarget.value);
              }}
              className={
                'w-full text-[18px] font-[500] text-[#496796] placeholder-[#496796]'
              }
              placeholder={t('placeholder')}
              type="text"
            />
          </div>
          <div
            className={cn(
              'flex h-[68px] w-[203px] cursor-pointer items-center justify-center gap-[12px] rounded-[20px]',
              {
                ['bg-[linear-gradient(90deg,#466DFF_0.21%,#8872F5_99.81%)]']:
                  !loading,
                ['bg-[#85ACE633]']: loading,
              },
            )}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className={'h-[27px] w-[30px]'}
              viewBox="0 0 30 27"
              fill="none"
            >
              <path
                d="M0 21.5V16.5C0 15.6716 0.610521 15 1.36364 15C2.11675 15 2.72727 15.6716 2.72727 16.5V21.5C2.72727 22.8807 3.74481 24 5 24H25C26.2552 24 27.2727 22.8807 27.2727 21.5V16.5C27.2727 15.6716 27.8832 15 28.6364 15C29.3895 15 30 15.6716 30 16.5V21.5C30 24.5376 27.7614 27 25 27H5C2.23858 27 1.02495e-07 24.5376 0 21.5Z"
                fill={loading ? '#697C9A' : '#F7FAFF'}
              />
              <path
                d="M23.642 9.41577C24.1193 9.87952 24.1193 10.6312 23.642 11.095L15.8641 18.6522C15.3868 19.1159 14.6132 19.1159 14.1359 18.6522L6.35797 11.095C5.88068 10.6312 5.88068 9.87953 6.35797 9.41578C6.83526 8.95203 7.60892 8.95203 8.08622 9.41578L13.7778 14.9459L13.7778 1.18751C13.7778 0.531665 14.325 4.22908e-07 15 3.93403e-07C15.675 3.63898e-07 16.2222 0.531665 16.2222 1.18751L16.2222 14.9459L21.9138 9.41578C22.3911 8.95203 23.1647 8.95203 23.642 9.41577Z"
                fill={loading ? '#697C9A' : 'white'}
              />
            </svg>
            <p
              onClick={() => {
                // toast.error(t('errorTips'));
                // return
                if (loading) return;
                const result = youtubeUrlSchema.safeParse(search);
                if (!search) return;
                if (result.success) return router.push(`${path}?url=${search}`);
                if (result.error) {
                  toast.error(t('errorTips'));
                }
              }}
              className={cn('text-[24px] font-[600] text-[#F7FAFF]', {
                ['text-[#697C9A]']: loading,
              })}
            >
              {t('button')}
            </p>
          </div>
        </div>
        {showBottom && (
          <Download
            loading={loading}
            setLoading={setLoading}
            url={url ?? undefined}
          />
        )}
      </section>
      {showBottom && (
        <>
          <p
            className={
              'mt-[20px] text-center text-[16px] font-[600] text-[#5D77A0]'
            }
          >
            {t('tips')}
          </p>
          <div className={'flex flex-col items-center'}>
            <h3
              className={
                'mx-[auto] mt-[60px] inline-block rounded-[24px] bg-[#F0F5FF] px-[38px] py-[9px] text-[20px] text-[#001749]'
              }
            >
              {t('support')}
            </h3>
            <Img alt={'support icon'} src={supportImg} className={'mt-[55px] h-[100px] w-[754px]'} />
          </div>
        </>
      )}
    </>
  );
};
