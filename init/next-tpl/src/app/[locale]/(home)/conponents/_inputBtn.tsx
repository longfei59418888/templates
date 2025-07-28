'use client';
import { FC, useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogOverlay,
  DialogTitle,
} from '@/components/dialog';
import cn from '@/lib/cn';
import { Input } from '../conponents/_input';

export const InputButton: FC<{ text: string }> = ({ text }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={
          'mx-[auto] flex h-[88px] w-[351px] cursor-pointer items-center justify-center bg-[url(/images/btn-bg.png)] bg-[length:100%_100%] pl-[46px] text-[24px] font-[600] text-white'
        }
      >
        Start {text}
      </button>
      <Dialog open={open}>
        <DialogOverlay
          onClick={() => setOpen(false)}
          className={'bg-[#353F4F80] pointer-events-auto!'}
        />
        <DialogContent
          aria-describedby={undefined}
          isShowClose={false}
          className={cn(
            'block w-[1280px] rounded-[57px] bg-[#F6F8FF] p-[40px]',
          )}
        >
          <DialogTitle
            className={
              'h-[43px] text-center text-[52px] leading-[43px] font-[700] text-[#001749]'
            }
          >
            {text}
          </DialogTitle>
          <Input className={'mt-[40px]'} showBottom={false} />
        </DialogContent>
      </Dialog>
    </>
  );
};
