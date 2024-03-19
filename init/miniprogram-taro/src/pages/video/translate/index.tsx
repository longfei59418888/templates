import { View, Text } from '@tarojs/components'
import PageNavigation from '@/components/page/navigation'
import Image from '@/components/image'
import { useLoad } from '@tarojs/taro'
import Banner from '@/assets/video/tanslate-banner.png'
import Upload from '@/assets/video/upload.png'
import classNames from 'classnames'
import {
  backgroundWhite,
  displayInlineBlock,
  flexCenter,
  flexDirectionColumn,
  flexWrap,
  fontSize,
  fontWeight,
  gray,
  positionAbsolute,
  positionRelative,
  radius,
  testAlignCenter,
} from '@/constants/className/common'
import SelectNormal from '@/components/select/normal'
import Button from '@/components/button'
import AgreementNormal from '@/components/agreement/normal'
import TitleNormal from '@/components/title/normal'
import VideoItem from '@/pages/video/components/list'
import styles from './index.module.scss'

export default function Index() {
  useLoad(() => {
    console.log('Page loaded.')
  })

  return (
    <PageNavigation hasScrollTop stick title='视频翻译' className={styles.pageContainer}>
      <View className={classNames(positionRelative, styles.banner)}>
        <View className={classNames(fontSize(24), fontWeight(5))}>视频翻译</View>
        <View>
          <Text className={classNames(fontSize(14))}>{'一键将您的中文视频讲解翻译\n翻译成你想要的其他语言'}</Text>
        </View>
        <Image className={classNames(positionAbsolute)} src={Banner}></Image>
        <View className={classNames(fontSize(12), displayInlineBlock)}>还能保留您说话的音色和风格</View>
      </View>
      <View className={classNames(backgroundWhite, radius(24), styles.optionsContainer)}>
        <View
          className={classNames(
            radius(12),
            flexCenter,
            flexDirectionColumn,
            testAlignCenter,
            fontSize(18),
            styles.upload,
          )}>
          <Image src={Upload}></Image>
          <View>上传视频</View>
          <View className={classNames(gray, fontSize(12))}>
            <Text>{'文件类型：mp4、mov\n文件大小：低于500mb'}</Text>
          </View>
        </View>
        <View className={styles.language}>
          <View>
            <View>初始语言</View>
            <SelectNormal range={['英文', '中文', '日语', '韩语', '德语', '法语']} />
          </View>
          <View>
            <View>目标语言</View>
            <SelectNormal range={['英文', '中文', '日语', '韩语', '德语', '法语']} />
          </View>
        </View>
      </View>
      <View className={styles.button}>
        <Button className={fontSize(16)} round>
          翻译视频
        </Button>
        <AgreementNormal agreements={[{ name: '免责声明', onClick: () => {} }]} />
      </View>
      <View>
        <TitleNormal title='我的作品' />
        <View className={classNames(flexWrap, styles.list)}>
          <VideoItem cover='' duration='12' src='' targetLanguage='中国' sourceLanguage='引文' />
          <VideoItem cover='' duration='12' src='' targetLanguage='中国' sourceLanguage='引文' />
        </View>
      </View>
    </PageNavigation>
  )
}
