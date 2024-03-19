import { Picker, PickerSelectorProps, View, BaseEventOrig } from '@tarojs/components'
import { FC, useCallback, useState } from 'react'
import classNames from 'classnames'
import {
  flexAlignCenter,
  flexJustifyContentBetween,
  fontSize,
  gray,
  radius,
  width100,
} from '@/constants/className/common'
import SelectIcon from '@/assets/icon/select-down.png'
import Image from '@/components/image'

import styles from './index.module.scss'

interface Props {
  className?: string
  placeholder?: string
  onChange?: (index: number, value?: unknown) => void
}

const SelectNormal: FC<PickerSelectorProps & Props> = ({
  children,
  defaultValue,
  onChange: onChangeBase,
  placeholder,
  ...props
}) => {
  const [value, setValue] = useState<string | number | undefined>(defaultValue)
  const onChange = useCallback(
    ({ detail }: BaseEventOrig<PickerSelectorProps.ChangeEventDetail>) => {
      onChangeBase?.(detail?.value as number, props.range[detail?.value])
      setValue(props.range[detail?.value])
    },
    [onChangeBase, props.range],
  )
  const ChildrenDefault = (
    <View
      className={classNames(
        width100,
        radius(8),
        fontSize(14),
        flexJustifyContentBetween,
        flexAlignCenter,
        gray,
        styles.container,
      )}>
      <View>{value ?? placeholder ?? '请选择'}</View>
      <Image src={SelectIcon} />
    </View>
  )
  return (
    <Picker onChange={onChange} {...props}>
      {children ?? ChildrenDefault}
    </Picker>
  )
}

export default SelectNormal
