import { Button as BaseButton, ButtonProps } from '@tarojs/components'
import { flexCenter } from '@/constants/className/common'
import { capitalize } from '@tarojs/shared'
import cls from 'classnames'
import { FC } from 'react'
import styles from './index.module.scss'
import { UseShareAppMessageParams } from '@/hooks/useShare'

export interface IProps extends Omit<ButtonProps, 'type' | 'size'>, UseShareAppMessageParams {
  type?: 'default' | 'primary' | 'info' | 'gray'
  size?: 'mini' | 'small' | 'medium' | 'large'
  round?: boolean
}

export const Button: FC<IProps> = ({
  className,
  children,
  type = 'default',
  size = 'medium',
  round,
  plain,
  ...props
}) => {
  return (
    <BaseButton
      className={cls(
        styles.button,
        flexCenter,
        styles[`button${capitalize(type)}`],
        styles[`button${capitalize(size)}`],
        {
          [styles.buttonDisabled]: props.disabled,
          [styles.buttonRound]: round,
        },
        className,
      )}
      {...props}>
      {children}
    </BaseButton>
  )
}

export default Button
