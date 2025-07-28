import { fetchAllPostsIds, fetchPosts } from '@/lib/request/fetch';
import { getLocale } from 'next-intl/server';
import { RoutePathEnum } from '@/constants/route';
import { Layout } from '../../conponents/_layout';
import { formatWordPress, WordPressPage } from '@/components/wordpress-page';
import { getCanonicals } from '@/i18n/routing';
import { Metadata } from 'next';

export const revalidate = 3600; // 每1小时重新验证生成
export async function generateStaticParams() {
  const slugs = await fetchAllPostsIds();
  return slugs?.length ? slugs?.map((slug) => ({ slug })) : [];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await fetchPosts(slug, locale);

  if (!post || !post?.yoast_head_json) {
    return {};
  }
  const { og_title, og_description, og_site_name, og_image, robots } =
    post.yoast_head_json || {};
  const description = post.excerpt.rendered.replace(/<[^>]*>/g, '').trim();
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const term = post['_embedded']['wp:term'][1];
  const keywords = term
    ?.map((item: { name: string }) => {
      return item.name as string;
    })
    ?.join('、');

  return {
    title: post.title.rendered,
    description: description,
    keywords,
    alternates: getCanonicals(`${RoutePathEnum.blog}/${slug}`),
    robots: robots,
    openGraph: {
      siteName: og_site_name ?? post.title.rendered,
      title: og_title ?? post.title.rendered,
      description: og_description ?? description,
      type: 'article',
      url: `${process.env.APP_URL}${RoutePathEnum.blog}/${post.slug}`,
      images: og_image,
    },
    twitter: {
      card: 'summary_large_image',
      site: '@Friendo_AI',
      title: post.title.rendered,
      description: description,
      images: og_image,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const locale = await getLocale();
  const post = await fetchPosts(slug, locale);

  const { title, content, tags, modified, jsonLd } = formatWordPress(post, {
    replaceUrl: `${RoutePathEnum.blog}/${slug}`,
  });

  return (
    <Layout title={post?.title?.rendered ?? ''}>
      <div
        className={
          'scrollbar-hidden flex w-full flex-col overflow-hidden overflow-y-auto'
        }
      >
        <WordPressPage
          className="mx-auto max-w-204"
          title={title}
          content={content}
          tags={tags}
          modified={modified}
          jsonLd={jsonLd}
        />
      </div>
    </Layout>
  );
}
