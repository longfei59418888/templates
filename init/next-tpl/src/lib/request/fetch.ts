/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-console */
import { getPostsParams, Page, PageMeta, Post } from './type';

// doc: [wordpress 接口](https://developer.aliyun.com/article/937395)

/** wordpress token */
let Authorization = '';

/** 登录wordpress */
async function loginWordPress() {
  const tokenRes = await fetch(
    `${API_URL}/wp-json/jwt-auth/v1/token?username=${'admin'}&password=${'G7wK8b9T5YpQ4LaZ1vXu2cFm3NqS6JrD'}`,
    {
      headers: {
        'Content-Type': 'application/json',
      },
      method: 'POST',
    },
  );
  const token = (await tokenRes.json())?.token;
  if (!token) {
    console.warn('获取token失败');
    return undefined;
  }
  Authorization = 'Bearer ' + token;
  return Authorization;
}

/** 处理请求，自动获取Authorization */
async function handleRequest(fn: any) {
  try {
    if (!Authorization) {
      await loginWordPress();
    }
    return fn().then((res: any) => {
      if (res?.status === 401) {
        return loginWordPress().then(() => {
          return fn();
        });
      } else {
        return res;
      }
    });
  } catch (error) {
    console.warn('[handleRequest]', error);
    return undefined;
  }
}

const API_URL = 'https://admin-blog.friendochat.com';

/** 获取所有文章ID */
export const fetchAllPostsIds = async () => {
  try {
    let allItems: Post[] = [];
    let page = 1;

    while (true) {
      const res = await handleRequest(() =>
        fetch(
          `${API_URL}/wp-json/wp/v2/posts?_embed=true&page=${page}&per_page=${10}&Authorization=${Authorization}&categories=59`,
          {
            headers: {
              'Content-Type': 'application/json',
              Authorization,
            },
            cache: 'force-cache',
            next: {
              revalidate: 60 * 60, // 1小时缓存
            },
          },
        ),
      );
      // 当前页的数据
      const result = (await res.json()) as Post[];
      const currentData = result?.length ? result : [];
      // 将当前页数据添加到总数据中
      allItems = [...allItems, ...currentData];
      page = page + 1;
      // 如果当前页没有数据，结束循环
      if (currentData?.length <= 0) {
        break;
      }
    }

    return allItems?.map((item) => item?.slug);
  } catch (error) {
    console.error(error);
    return undefined;
  }
};

/** 获取文章列表，基于url数据共享 */
export async function fetchPostsList(
  { page = 1, per_page = 10 }: getPostsParams,
  locale?: string,
): Promise<
  | (PageMeta & {
      data: Post[];
    })
  | undefined
> {
  try {
    const res = await handleRequest(() =>
      fetch(
        `${API_URL}/wp-json/custom/v1/posts?_embed=true&page=${page}&per_page=${per_page}&lang=${locale}&Authorization=${Authorization}&category=getytmp3`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization,
          },
          cache: 'force-cache',
          next: {
            revalidate: 60 * 60, // 1小时缓存
          },
        },
      ),
    );
    const data = (await res.json()) as Post[];
    const result = {
      data,
      total: Number(res.headers.get('x-wp-total')),
      totalPages: Number(res.headers.get('x-wp-totalpages')),
    };
    return result;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

/** 获取文章详情，基于url数据共享 */
export async function fetchPosts(
  id: string,
  locale?: string,
): Promise<Post | undefined> {
  try {
    const res = await handleRequest(() =>
      fetch(
        `${API_URL}/wp-json/wp/v2/posts?_embed=true&slug=${id}&_locale=${locale}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization,
          },
          cache: 'force-cache',
          next: {
            revalidate: 60 * 30, // 30分钟缓存
          },
        },
      ),
    );
    const result = (await res.json())?.[0] as Post;
    return result;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

/** 获取页面列表，基于url数据共享 */
export async function fetchPagesList(
  { page = 1, per_page = 10 }: getPostsParams,
  locale?: string,
): Promise<
  | (PageMeta & {
      data: Page[];
    })
  | undefined
> {
  try {
    const res = await handleRequest(() =>
      fetch(
        `${API_URL}/wp-json/wp/v2/pages?_embed=true&page=${page}&per_page=${per_page}&lang=${locale}&Authorization=${Authorization}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization,
          },
          cache: 'force-cache',
          next: {
            revalidate: 60 * 60, // 1小时缓存
          },
        },
      ),
    );
    const data = (await res.json()) as Page[];
    const result = {
      data,
      total: Number(res.headers.get('x-wp-total')),
      totalPages: Number(res.headers.get('x-wp-totalpages')),
    };
    return result;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}

/** 获取页面详情，基于url数据共享 */
export async function fetchPages(
  id: string,
  locale?: string,
): Promise<Page | undefined> {
  try {
    const res = await handleRequest(() =>
      fetch(`${API_URL}/wp-json/wp/v2/pages/${id}?_embed=true&lang=${locale}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization,
        },
        cache: 'force-cache',
        next: {
          revalidate: 60 * 30, // 30分钟缓存
        },
      }),
    );
    const result = (await res.json()) as Page;
    return result;
  } catch (error) {
    console.warn(error);
    return undefined;
  }
}
