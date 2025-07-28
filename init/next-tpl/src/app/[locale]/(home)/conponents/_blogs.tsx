import { Img } from '@/components/img';
import { FC } from 'react';
import blogImg from 'images/blog-icon.png';

import { InputButton } from '@/app/[locale]/(home)/conponents/_inputBtn';
import { Link } from '@/i18n/navigation';
import { RoutePathEnum } from '@/constants/route';
import { getLocale, getTranslations } from 'next-intl/server';
import { fetchPostsList } from '@/lib/request/fetch';
import { Post } from '@/lib/request/type';

export const BlogItem: FC<Post> = async ({
  title,
  id,
  slug,
  _embedded,
  content,
  excerpt,
}) => {
  const home = await getTranslations('home');
  return (
    <li
      key={id}
      className={'rounded-[34px] bg-[#fff] p-[20px] px-[20px] pb-[25px]'}
    >
      <Img
        src={_embedded['wp:featuredmedia']?.[0]?.source_url ?? ''}
        unoptimized={true}
        alt={title.rendered}
        title={title.rendered}
        width={475}
        className={
          'h-[221px] w-full overflow-hidden rounded-[14px] object-cover'
        }
        height={221}
      />
      <Link href={`${RoutePathEnum.blog}/${slug}`}>
        <h4
          className={
            'mt-[20px] line-clamp-2 h-[72px] text-[24px] font-[600] text-[#001749]'
          }
        >
          {title.rendered}
        </h4>
      </Link>
      <p
        className={
          'mt-[10px] line-clamp-1 text-[16px] font-[500] text-[#3B5885]'
        }
      >
        <span>{home('blogDes')}：</span>
        <span
          dangerouslySetInnerHTML={{
            __html: excerpt.rendered.replace(/<[^>]*>/g, '').trim(),
          }}
        />
      </p>
      <p
        className={
          'mt-[10px] line-clamp-3 h-[72px] text-[16px] font-[500] text-[#3B5885]'
        }
        dangerouslySetInnerHTML={{
          __html: content.rendered.replace(/<[^>]*>/g, '').trim(),
        }}
      />
    </li>
  );
};

export const Blog: FC<{
  text: string;
}> = async ({ text }) => {
  const home = await getTranslations('home');
  const locale = await getLocale();
  const posts = await fetchPostsList(
    {
      page: 1,
      per_page: 4,
    },
    locale,
  )?.then((res) => res?.data);


  return (
    <>
      <section
        className={
          'relative mt-[60px] min-h-[700] rounded-[34px] border-2 border-solid border-[#fff] bg-[rgba(255,255,255,0.50)] px-[84px] pb-[62px] shadow-[0px_28px_77.6px_0px_rgba(145,186,247,0.20)]'
        }
      >
        <Img
          src={blogImg}
          alt={'blog head image'}
          className={
            'absolute -top-[40px] -left-[44px] z-10 h-[190px] w-[202px]'
          }
        />
        <h3
          className={
            'mt-[60px] text-center text-[40px] leading-[43px] font-[700] text-[#001749]'
          }
        >
          {home('blogTitle')}
        </h3>
        <ul
          className={'mt-[40px] grid grid-cols-[1fr_1fr] gap-[28px] pb-[50px]'}
        >
          {posts?.map((post) => {
            return <BlogItem key={post.id} {...post} />;
          })}
        </ul>
        <div className={'flex justify-center gap-[44px]'}>
          <button
            className={
              'flex h-[88px] w-[274px] cursor-pointer items-center justify-center bg-[url(/images/blog-btn-bg.png)] bg-[length:100%_100%] text-[24px] font-[600] text-white'
            }
          >
            {home('blogBtnText')}
          </button>
          <div>
            <InputButton text={text} />
          </div>
        </div>
      </section>
    </>
  );
};
