import { demoPages, pages } from './constants/page.const'

export default defineAppConfig({
  entryPagePath: pages[0],
  pages,
  subPackages: [{ root: 'pkg-demo', name: 'pkg-demo', pages: demoPages }],
  window: {
    backgroundTextStyle: 'light',
    navigationBarBackgroundColor: '#fff',
    navigationBarTitleText: 'WeChat',
    navigationBarTextStyle: 'black',
  },
  permission: { 'scope.userLocation': { desc: '为了您获得更多佳体验，请授权您的具体位置信息' } },
  requiredPrivateInfos: ['getLocation', 'chooseAddress'],
})
