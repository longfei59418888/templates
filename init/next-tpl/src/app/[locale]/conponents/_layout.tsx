'use client';
import { HeaderAndBack } from '@/components/header';
import { FC, PropsWithChildren } from 'react';

export const Content: FC<{ content: string }> = ({ content }) => {
  return (
    <div
      className={
        'mx-[auto] mt-[50px] w-[1200px] rounded-[34px] border-2 border-solid border-[#FFFFFF] bg-[#FFFFFF80] shadow-[0_28px_77.6px_0_rgba(145,186,247,0.20)]' +
        ' p-[40px] text-[18px] font-[500] text-[#5D77A0]'
      }
      dangerouslySetInnerHTML={{ __html: content }}
    />
  );
};

export const Layout: FC<PropsWithChildren<{ title: string }>> = ({
  title,
  children,
}) => {
  return (
    <div className={'px-[180px]'}>
      <HeaderAndBack title={title} />
      {children}
    </div>
  );
};
