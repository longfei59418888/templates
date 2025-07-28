'use client';
import 'rc-pagination/assets/index.css';
import Pagination, { PaginationProps } from 'rc-pagination';
import { ChevronLeftIcon, ChevronRightIcon } from 'lucide-react';
import { Link } from '@/i18n/navigation';

/** antd分页 */
export default function RcPagination({
  path,
  ...props
}: PaginationProps & { path?: string }) {
  return (
    <Pagination
      {...props}
      onChange={() => {}}
      itemRender={(page, type, element) => {
        return (
          <Link href={path + '?page=' + page}>
            {type === 'prev' || type === 'next' ? element : page}
          </Link>
        );
      }}
      prevIcon={() => <ChevronLeftIcon className={'text-[#697C9A]'} />}
      nextIcon={() => <ChevronRightIcon className={'text-[#697C9A]'} />}
    />
  );
}
