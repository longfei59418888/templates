export interface Format {
  ext: string;
  filesize: number;
  asr: number;
  format_id: string;
  resolution: string;
}

export interface Media {
  ext: string;
  formats: Format[];
}

export interface UrlInfo {
  /** 音频信息 */
  audio: Media[];
  /** 频道名称 */
  channel: string;
  /** 地址 */
  url: string;
  /** 视频时长 */
  duration: number;
  /** 视频缩略图 */
  thumbnail: string;
  /** 视频标题*/
  title: string;
  /** 视频信息 */
  video: Media[];
  /** 观看次数 */
  view_count: number;
  /** 地址 */
  webpage_url: string;
}
