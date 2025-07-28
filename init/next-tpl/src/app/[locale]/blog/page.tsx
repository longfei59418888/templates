import { getLocale, getTranslations } from 'next-intl/server';
import { Layout } from '@/app/[locale]/conponents/_layout';
import { BlogItem } from '@/app/[locale]/(home)/conponents/_blogs';
import { getPostsParams } from '@/lib/request/type';
import { fetchPostsList } from '@/lib/request/fetch';
import RcPagination from '@/components/pagination';
import { RoutePathEnum } from '@/constants/route';
import { generatePageMetadata } from '@/lib/metaData';

export const generateMetadata = async () =>
  generatePageMetadata(RoutePathEnum.blog);

export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<getPostsParams>;
}) {
  const params = await searchParams;
  const locale = await getLocale();
  const t = await getTranslations('home');

  const page =
    params.page && !isNaN(Number(params.page)) ? Number(params.page) : 1;
  const res = await fetchPostsList(
    {
      ...params,
      per_page: 6,
    },
    locale,
  );
  const posts = res?.data;
  const totalPages = res?.totalPages;

  return (
    <Layout title={t('blogTitle')}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Blog',
            name: 'getytmp3 Blog | YouTube Conversion Tips & Tricks',
            description:
              'The official blog for getytmp3. Discover the latest tips, step-by-step tutorials, and news about YouTube, audio/video formats, and how to get the most out of our free converter.',
            url: 'https://www.getytmp3.com/blog',
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': 'https://www.getytmp3.com/blog',
            },
            datePublished: '2024-06-01',
            dateModified: '2025-07-24',
            author: {
              '@type': 'Organization',
              name: 'getytmp3',
              url: 'https://www.getytmp3.com/',
            },
            publisher: {
              '@type': 'Organization',
              name: 'getytmp3',
              url: 'https://www.getytmp3.com/',
              logo: {
                '@type': 'ImageObject',
                url: 'https://resource.friendochat.com/ytb/web/logo.jpeg',
              },
            },
          }),
        }}
      />
      <ul
        className={
          'mt-[55px] grid grid-cols-[1fr_1fr_1fr] gap-[28px] pb-[50px]'
        }
      >
        {posts?.map((post) => {
          return <BlogItem key={post.id} {...post} />;
        })}
      </ul>
      <RcPagination
        className={
          'flex flex-row justify-center gap-[6px] [&_.rc-pagination-next]:w-[58px] [&_.rc-pagination-options]:hidden! [&_.rc-pagination-prev]:w-[58px] [&_a]:text-[#697C9A]! [&_li]:h-10! [&_li]:min-w-10! [&_li]:rounded-[10px]! [&_li]:bg-transparent! [&_li]:text-center [&_li]:text-xl! [&_li]:leading-10! ' +
          '[&_.rc-pagination-item-active]:bg-[#466DFF]! [&_.rc-pagination-item-active_a]:text-[#fff]! [&_li]:flex! [&_li]:items-center! [&_li]:justify-center! [&_li]:border! [&_li]:border-solid! [&_li]:border-[#697C9A]!'
        }
        path={RoutePathEnum.blog}
        current={page}
        pageSize={6}
        total={totalPages}
      />
    </Layout>
  );
}
