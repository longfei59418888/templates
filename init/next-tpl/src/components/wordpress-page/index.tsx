import { ComponentProps } from 'react';
import { cn } from '@/lib/cn';
import './style.css';
import { formatTime } from '@/lib/date';
import { Post } from '@/lib/request/type';

/** wordpress 页面内容渲染 */
export function WordPressPage({
  className,
  children,
  tagsTitle = '主题：',
  title,
  content,
  tags,
  modified,
  jsonLd,
  ...props
}: ComponentProps<'div'> & {
  /** 标题 */
  title?: string;
  /** 正文富文本 */
  content?: string;
  /** 标签 */
  tags?: string;
  /** 标签标题 */
  tagsTitle?: string;
  /** 最后修改时间 */
  modified?: string;
  /** 结构化数据 */
  jsonLd?: string;
}) {
  return (
    <div
      className={cn(
        'mb-10 w-full max-w-dvw text-base max-sm:mb-5 max-sm:text-xs',
        className,
      )}
      {...props}
    >
      {jsonLd ? (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: jsonLd,
          }}
        />
      ) : null}

      <div className={'mb-10 flex flex-col gap-2.5 max-sm:mb-5 max-sm:gap-1 mt-[40px]'}>
        {modified ? (
          <p className={'text-xl leading-none text-[#5d77a0] max-sm:text-xs'}>
            {modified}
          </p>
        ) : null}
      </div>

      {content ? (
        <div
          className={
            'entry-content alignfull wp-block-post-content has-global-padding is-layout-constrained wp-block-post-content-is-layout-constrained max-sm:text-sm!'
          }
          dangerouslySetInnerHTML={{
            __html: content,
          }}
        />
      ) : null}

      {children}
    </div>
  );
}

/** 格式化 wordpress文章 */
export function formatWordPress(
  post: Post | undefined,
  options?: {
    /** 要替换的url */
    replaceUrl: string;
  },
): {
  /** 标题 */
  title: string;
  /** 正文富文本 */
  content: string;
  /** 标签 */
  tags: string;
  /** 最后修改时间 */
  modified: string;
  /** 结构化数据 */
  jsonLd: string;
} {
  /** 标题 */
  const title = post?.title?.rendered ?? '';
  /** 正文富文本 */
  const content =
    post?.content?.rendered?.replace?.(
      new RegExp(`${process.env.APP_URL_WORDPRESS}(?!(?:\\/wp-content))`, 'g'),
      `${process.env.APP_URL}`,
    ) ?? '';
  /** 标签 */
  // @ts-ignore
  const tags = post?.['_embedded']?.['wp:term']?.[1]
    ?.map((item: { name: string }) => {
      return item.name as string;
    })
    ?.join('、');
  /** 最后修改时间 */
  const modified = post?.modified ? formatTime(post?.modified) : '';
  /** 结构化数据 */
  const jsonLd = post?.yoast_head_json?.schema
    ? JSON.stringify(post?.yoast_head_json?.schema ?? '')
        .replace(new RegExp(post?.link, 'g'), `${options?.replaceUrl}`)
        .replace(
          new RegExp(
            `${process.env.APP_URL_WORDPRESS}(?!(?:\\/wp-content))`,
            'g',
          ),
          `${process.env.APP_URL}`,
        )
        .replace(/</g, '\\u003c')
    : '';

  return {
    title,
    content,
    tags,
    modified,
    jsonLd,
  };
}
