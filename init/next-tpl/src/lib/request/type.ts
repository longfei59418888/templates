interface WPEntity {
  id: number;
  date: string;
  date_gmt: string;
  modified: string;
  modified_gmt: string;
  slug: string;
  status: 'publish' | 'future' | 'draft' | 'pending' | 'private';
  link: string;
  guid: {
    rendered: string;
  };
  _embedded: _embedded;
  yoast_head_json?: yoast_head_json;
}

interface RenderedTitle {
  rendered: string;
}

interface RenderedContent {
  rendered: string;
  protected: boolean;
}
interface featuredmedia {
  id: number;
  source_url: string;
}

interface _embedded {
  'wp:featuredmedia': featuredmedia[];
}

interface og_image {
  height: number;
  width: number;
  type: string;
  url: string;
}

interface author {
  '@id': string;
  name: string;
}

interface graph {
  '@id': string;
  '@type': string;
  author?: author;
  commentCount?: number;
  dateModified?: string;
  datePublished?: string;
}

interface schema {
  '@context': string;
  '@graph': graph[];
}

export interface getPostsParams {
  per_page?: number;
  page?: number;
  search?: number;
  categories?: number;
  orderby?: string;
  _fields?: string;
  order?: 'desc' | 'asc';
}

export interface yoast_head_json {
  author: string;
  canonical: string;
  description: string;
  og_description: string;
  og_image: og_image[];
  og_locale: string;
  og_site_name: string;
  og_title: string;
  og_type: string;
  og_url: string;
  robots: string;
  schema: schema;
  article_modified_time: string;
  article_published_time: string;
  twitter_card: string;
  twitter_misc: string;
}

export interface PageMeta {
  total: number;
  totalPages: number;
}

export interface Post extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  sticky: boolean;
  template: string;
  format:
    | 'standard'
    | 'aside'
    | 'chat'
    | 'gallery'
    | 'link'
    | 'image'
    | 'quote'
    | 'status'
    | 'video'
    | 'audio';
  categories: number[];
  tags: number[];
  meta: Record<string, unknown>;
}

export interface Page extends WPEntity {
  title: RenderedTitle;
  content: RenderedContent;
  excerpt: RenderedContent;
  author: number;
  featured_media: number;
  parent: number;
  menu_order: number;
  comment_status: 'open' | 'closed';
  ping_status: 'open' | 'closed';
  template: string;
  meta: Record<string, unknown>;
}
