const colorBgBase = '#ffffff'
const colorTextBase = '#000'
const colorPrimary = '#1677ff'
const colorError = '#ff4d4f'
const colorWarning = '#faad14'
const colorSuccess = '#52c41a'

const ConfigProviderTheme = {
  token: {
    // color
    colorPrimary: colorPrimary,
    colorError: colorError,
    colorLink: colorPrimary,
    colorInfo: colorPrimary,
    colorSuccess: colorSuccess,
    colorWarning: colorWarning,
    colorBgBase: colorBgBase,
    colorTextBase: colorTextBase,
    /** 组件的容器背景色，例如：默认按钮、输入框等 */
    colorBgContainer: colorBgBase,
    /** 浮层容器背景色，例如：模态框、弹出框、菜单等 */
    colorBgElevated: colorBgBase,
    /** 该色用于页面整体布局的背景色 */
    colorBgLayout: colorBgBase,
    /** 浮层的背景蒙层颜色 */
    colorBgMask: 'rgba(0, 0, 0, 0.45)',
    /** 目前只用在 Tooltip 的背景色上 */
    colorBgSpotlight: 'rgba(0, 0, 0, 0.85)',
    /** 默认使用的边框颜色, 用于分割不同的元素 */
    colorBorder: '#d9d9d9',
    /** 主色调-激活-背景-悬浮-边框-边框悬浮-文字 */
    colorPrimaryActive: '#0958d9',
    colorPrimaryBg: '#e6f4ff',
    colorPrimaryBgHover: '#bae0ff',
    colorPrimaryBorder: '#91caff',
    colorPrimaryBorderHover: '#69b1ff',
    colorPrimaryHover: '#4096ff',
    colorPrimaryText: '#1677ff',
    /** 文字颜色(重要文字)-常规文案标签label(常规)-补充说明和描述(补充)-禁用或者提示(说明) */
    colorText: 'rgba(0, 0, 0, 0.88)',
    colorTextSecondary: 'rgba(0, 0, 0, 0.65)',
    colorTextTertiary: 'rgba(0, 0, 0, 0.45)',
    colorTextQuaternary: 'rgba(0, 0, 0, 0.25)',
    /** 警告文本 */
    colorWarningText: '#faad14',

    // font
    fontSize: 14,
    // height
    /** 按钮和输入框等基础控件的高度 */
    controlHeight: 32,

    /** 全局圆角大小(按钮、输入框、卡片等) */
    borderRadius: 4,
    /** Card、Modal 等一些组件样式 */
    borderRadiusLG: 8,
    borderRadiusOuter: 4,
    /** 用于控制组件边框、分割线等的样式，默认是实线 */
    lineType: 'solid',
    lineWidth: 1,
    /** 箭头尺寸大小 */
    sizePopupArrow: 1,
  },
  components: {
    Menu: {
      collapsedWidth: 64,
      itemHeight: 48,
      itemBorderRadius: 0,
      itemMarginInline: 0,
      // itemHoverBg: Colors.colorMenuHoverBg,
      // itemSelectedBg: Colors.colorMenuHoverBg,
      // itemSelectedColor: Colors.colorPrimary,
      subMenuItemBg: colorBgBase,
    },
    Layout: {
      headerPadding: '0 24px',
      headerBg: colorBgBase,
      siderBg: colorBgBase,
      headerHeight: 56,
    },
  },
}

export default ConfigProviderTheme
