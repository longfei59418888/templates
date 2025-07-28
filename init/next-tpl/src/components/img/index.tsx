import NextImage, { ImageProps } from 'next/image';

// 本地：
// 存放小图标、首屏关键图片、项目专属图片，建议放到项目，
// 建议静态导入
// 开启优化：自动判断是否提供webp格式&自动计算大小
// 不需要设置宽高，系统自动计算宽高推断图像纵横比

// CDN:
// 存放业务及第三方资源、需要全球加速的图片、大图&背景图，
// url动态导入，
// 不开启优化
// 需要设置宽高来计算宽高推断图像纵横比

export type ImgProps = Omit<
  ImageProps,
  | 'src'
  | 'alt'
  | 'fill'
  | 'width'
  | 'height'
  | 'quality'
  | 'loader'
  | 'priority'
  | 'loading'
> & {
  /** 图片地址，支持本地和外部url，外部 URL 时，还必须配置remotePatterns */
  src?: ImageProps['src'];
  /** 图片描述，为屏幕阅读器和搜索引擎描述图片 */
  alt?: ImageProps['alt'];
  /** 图片是否填充父元素。 */
  fill?: ImageProps['fill'];
  /** 图片的固有宽度（以像素为单位）。必需，静态导入的图片或具有fill属性的图片除外。此属性用于推断图片的正确宽高比，并避免加载过程中的布局偏移 */
  width?: ImageProps['width'];
  /** 图片的固有高度（以像素为单位）。必需，静态导入的图片或具有fill属性的图片除外。此属性用于推断图片的正确宽高比，并避免加载过程中的布局偏移 */
  height?: ImageProps['height'];
  /** 图片的质量 */
  quality?: ImageProps['quality'];
  /** 图片是否预加载， */
  priority?: ImageProps['priority'];
  /** 图片加载方式，默认lazy，推迟加载图像，直到它到达与视口计算出的距离。当 时eager，立即加载图像。 */
  loading?: ImageProps['loading'];
  /** 解析图片 URL 的自定义函数  */
  loader?: ImageProps['loader'];
  /** 是否不处理图片，默认false，优化图片 */
  unoptimized?: boolean;
};

/** 图片
 * @see [next图片](https://nextjs.org/docs/app/api-reference/components/image)
 */
export function Img({
  src = '',
  alt = '',
  fill = false,
  quality = 75,
  loading = 'lazy',
  priority = false,
  unoptimized = false,
  ...props
}: ImgProps) {
  return (
    <NextImage
      loading={loading}
      fill={fill}
      quality={quality}
      priority={priority}
      src={src}
      alt={alt}
      data-slot="img"
      unoptimized={unoptimized}
      {...props}
    />
  );
}
