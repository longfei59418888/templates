import { View } from '@tarojs/components'
import { useCallback, useEffect } from 'react'
import { useParams } from '@/hooks/useRouter'
import { go } from '@/utils/navigate'

export default function Index() {
  const { to, form } = useParams<{
    to: string
    form: string
  }>()
  const toLandPage = useCallback(() => {
    console.log({ form, to })
    go(to, { form }, { redirect: true })
  }, [form, to])

  useEffect(() => {
    toLandPage()
  }, [toLandPage])

  return <View></View>
}
