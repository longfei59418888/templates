import { Canvas, View } from '@tarojs/components'
import Button from '@/components/button'
import { useShareAppMessage, useShareFileMessage } from '@/hooks/useShare'
import { showShareImageMenu } from '@tarojs/taro'
import { getLocation, getLocationSilently } from '@/utils/location'
import { drawCanvas } from '@/utils/wxmlToCanvas'
import { error, success } from '@/utils/toast'
import { CommonEventFunction } from '@tarojs/components/types/common'
import classNames from 'classnames'
import { useGetPhoneNumber } from '@/hooks/useUser'
import { displayFlex } from '@/constants/className/common'
import { authorize, AuthScope, getSetting, openSetting, openSettingWithSubscription } from '@/utils/setting'
import { alert, confirm, showModal } from '@/utils/model'
import { back, backPage, go, goMiniProgram, redirect, reLaunch } from '@/utils/navigate'
import { MAIN_PAGES } from '@/constants/page.const'
import { track } from '@/utils/track'
import styles from './index.module.scss'


export default function Index() {
  const { onGetPhoneNumber } = useGetPhoneNumber()
  const { shareImage, shareVideo } = useShareFileMessage()
  useShareAppMessage()
  return (
    <View className={styles.page}>
      <View className={classNames(displayFlex, styles.container)}>
        <View>
          <Button openType='getPhoneNumber' onGetPhoneNumber={onGetPhoneNumber as CommonEventFunction} size='small'>
            登陆
          </Button>
        </View>
      </View>
      <View className={classNames(displayFlex, styles.container)}>
        <View>
          <Button title='sdfsd' openType='share' size='small'>
            分享页面
          </Button>
        </View>
        <View>
          <Button
            onClick={() =>
              shareImage({
                url: 'https://glsp-img.unipus.cn/glsp/dev/public/material/image/20240118/e8a39712c2e2276369c058453dccc1e4.jpg',
              })
            }
            size='small'>
            分享图片
          </Button>
        </View>
        <View>
          <Button
            onClick={() =>
              shareVideo({
                url: 'https://glsp-img.unipus.cn/shuziren/test/video/23449d5817538860778478604.mp4',
              })
            }
            size='small'>
            分享视频
          </Button>
        </View>
        <View>
          <Canvas className={styles.canvas} width='300' height='150' canvasId='CANVAS_IS' />
          <Button
            onClick={async () => {
              const list = [
                {
                  type: 'image',
                  height: 150,
                  width: 300,
                  src: 'https://glsp-img.unipus.cn/glsp/dev/public/material/image/20240118/e8a39712c2e2276369c058453dccc1e4.jpg',
                  left: 0,
                  top: 0,
                },
                {
                  type: 'text',
                  left: 30,
                  top: 30,
                  width: 150,
                  height: 30,
                  rank: 2,
                  'font-size': '18',
                  'border-bottom': '',
                  color: '#ffffff',
                  dataset: { value: '人工智能' },
                },
              ]
              const { canvasToTempFilePath } = await drawCanvas('CANVAS_IS', list as any)
              const { tempFilePath } = await canvasToTempFilePath({})
              showShareImageMenu({
                path: tempFilePath,
              })
            }}
            size='small'>
            分享合成图片
          </Button>
        </View>
      </View>
      <View className={classNames(displayFlex, styles.container)}>
        <View>
          <Button size='small'>订阅消息</Button>
        </View>
        <View>
          <Button size='small'>检查是否订阅</Button>
        </View>
      </View>
      <View className={classNames(displayFlex, styles.container)}>
        <View>
          <Button
            onClick={() => {
              error('error toast')
            }}
            size='small'>
            error toast
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              success('error toast')
            }}
            size='small'>
            success toast
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              alert('alert message!')
            }}
            size='small'>
            alert
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              confirm('confirm message!')
            }}
            size='small'>
            confirm
          </Button>
        </View>
      </View>
      <View className={classNames(displayFlex, styles.container)}>
        <View>
          <Button
            onClick={async () => {
              const auths = await getSetting()
              showModal({
                content: JSON.stringify(auths),
              })
            }}
            size='small'>
            获取权限信息
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void openSetting('是否允许打开设置页面？')
            }}
            size='small'>
            打开设置页面
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void openSettingWithSubscription('是否允许打开订阅设置页面？')
            }}
            size='small'>
            打开订阅设置
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void authorize(AuthScope.USER_LOCATION)
            }}
            size='small'>
            获取定位权限
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void authorize(AuthScope.USER_LOCATION_BACKGROUND)
            }}
            size='small'>
            获取后台定位权限
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void authorize(AuthScope.WRITE_PHOTOS_ALBUM)
            }}
            size='small'>
            获取保存到相册权限
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void authorize(AuthScope.BLUETOOTH)
            }}
            size='small'>
            获取蓝牙权限
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void authorize(AuthScope.WERUN)
            }}
            size='small'>
            获取微信运动权限
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void authorize(AuthScope.CAMERA)
            }}
            size='small'>
            获取相机权限
          </Button>
        </View>
        <View>
          <Button
            onClick={() => {
              void authorize(AuthScope.RECORD)
            }}
            size='small'>
            获取麦克风权限
          </Button>
        </View>
      </View>
      <View className={classNames(displayFlex, styles.container)}>
        <View>
          <Button
            onClick={async () => {
              const location = await getLocation()
              location && alert(JSON.stringify(location))
            }}
            size='small'>
            获取地理位置
          </Button>
        </View>
        <View>
          <Button
            onClick={async () => {
              const location = await getLocationSilently()
              location && alert(JSON.stringify(location))
            }}
            size='small'>
            静默获取地理位置
          </Button>
        </View>
      </View>
      <View className={classNames(displayFlex, styles.container)}>
        <View>
          <Button
            onClick={async () => {
              go(MAIN_PAGES.Home)
            }}
            size='small'>
            跳转首页
          </Button>
        </View>
        <View>
          <Button
            onClick={async () => {
              back(true)
            }}
            size='small'>
            返回上一页
          </Button>
        </View>
        <View>
          <Button
            onClick={async () => {
              backPage(MAIN_PAGES.Home)
            }}
            size='small'>
            返回某一页面
          </Button>
        </View>
        <View>
          <Button
            onClick={async () => {
              redirect(MAIN_PAGES.Home)
            }}
            size='small'>
            重定向到某页面
          </Button>
        </View>
        <View>
          <Button
            onClick={async () => {
              reLaunch(MAIN_PAGES.Home)
            }}
            size='small'>
            重加载到某页面
          </Button>
        </View>
        <View>
          <Button
            onClick={async () => {
              goMiniProgram('', '')
            }}
            size='small'>
            跳转到三方小程序
          </Button>
        </View>
      </View>
      <View className={classNames(displayFlex, styles.container)}>
        <View>
          <Button
            onClick={async () => {
              track('test', {})
            }}
            size='small'>
            神策埋点
          </Button>
        </View>
      </View>
    </View>
  )
}
