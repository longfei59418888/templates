import { FC, PropsWithChildren } from 'react';

export const Demo: FC<PropsWithChildren> = ({ children }) => {
  return <div className={'m-10'}>{children}</div>;
};
export default Demo;

