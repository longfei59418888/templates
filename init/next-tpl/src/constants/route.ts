/** 路由路径枚举 */
export enum RoutePathEnum {
  /** 首页，显示发现页面 */
  home = '/',
  /** to mp4 */
  toMp4 = '/to-mp4',
  toAAC = '/to-aac',
  toWav = '/to-wav',
  toFlac = '/to-flac',
  blog = '/blog',
  about = '/about',
  contact = '/contact',
  faq = '/faq',
  privacy = '/privacy',
  term = '/term',
}

/** 站点地图配置 */
export const RouteConfigs: {
  /** 路由路径 */
  path: string;
  /** 优先级，0-1，越大越优先，首页建议1，重要栏目/内容设为0.8-0.9，一般内容设为0.6-0.7 */
  priority: number;
  /** 页面内容最后修改时间 */
  lastModified: string;
}[] = [
  {
    path: '',
    priority: 1.0,
    lastModified: '2025-07-faq',
  },
  {
    path: RoutePathEnum.toMp4,
    priority: 0.8,
    lastModified: '2025-07-faq',
  },
  {
    path: RoutePathEnum.toAAC,
    priority: 0.8,
    lastModified: '2025-07-faq',
  },
  {
    path: RoutePathEnum.toWav,
    priority: 0.8,
    lastModified: '2025-07-faq',
  },
  {
    path: RoutePathEnum.toFlac,
    priority: 0.8,
    lastModified: '2025-07-25',
  },
  {
    path: RoutePathEnum.blog,
    priority: 0.8,
    lastModified: '2025-07-25',
  },
  {
    path: RoutePathEnum.privacy,
    priority: 0.8,
    lastModified: '2025-07-25',
  },
  {
    path: RoutePathEnum.about,
    priority: 0.6,
    lastModified: '2025-07-25',
  },
  {
    path: RoutePathEnum.contact,
    priority: 0.6,
    lastModified: '2025-07-25',
  },
  {
    path: RoutePathEnum.faq,
    priority: 0.6,
    lastModified: '2025-07-25',
  },
  {
    path: RoutePathEnum.term,
    priority: 0.6,
    lastModified: '2025-07-25',
  },
];

export const Navs = [
  {
    path: RoutePathEnum.home,
    label: 'YouTube to MP3',
  },
  {
    path: RoutePathEnum.toMp4,
    label: 'YouTube  to MP4',
  },
  { path: RoutePathEnum.toAAC, label: 'YouTube  to AAC' },
  { path: RoutePathEnum.toWav, label: 'YouTube  to WAV' },
  { path: RoutePathEnum.toFlac, label: 'YouTube  to FLAC' },
];
