import { ReactNode } from 'react';

export default function Layout({ children }: { children: ReactNode }) {
  return <div className={'mx-[auto] w-[1200px]'}>{children}</div>;
}
