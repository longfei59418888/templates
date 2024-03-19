import { Text, View } from '@tarojs/components'
import { FC, useEffect, useState } from 'react'
import UnSelect from '@/assets/icon/agreement/un-select.svg'
import Select from '@/assets/icon/agreement/select.svg'
import Image from '@/components/image'
import { fontSize, positionRelative } from '@/constants/className/common'
import classNames from 'classnames'
import { go } from '@/utils/navigate'

import styles from './index.module.scss'

interface Agreements {
  name: string
  path?: string
  onClick?: (target: Agreements, index?: number) => void
}

interface Props {
  className?: string
  agreements: Agreements[]
  onChange?: (value: boolean) => void
}

const AgreementNormal: FC<Props> = ({ onChange, className, agreements }) => {
  const [value, setValue] = useState<boolean>(false)
  useEffect(() => {
    onChange?.(value)
  }, [onChange, value])
  return (
    <View className={classNames(styles.container, fontSize(12), positionRelative, className)}>
      <Image onClick={() => setValue(!value)} src={value ? Select : UnSelect}></Image>
      <Text onClick={() => setValue(!value)}>已阅读并同意</Text>
      {agreements.map(({ name, path, onClick }, index) => (
        <Text
          onClick={() => {
            if (path) go(path)
            else if (onClick) onClick({ name }, index)
          }}
          className={styles.agreement}
          key={name}>
          《{name}》
        </Text>
      ))}
    </View>
  )
}

export default AgreementNormal
