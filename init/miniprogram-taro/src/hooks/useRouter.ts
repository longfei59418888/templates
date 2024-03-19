import { useRouter as useTaroRouter } from '@tarojs/taro'
import { useMemo } from 'react'

export const useRouter = <Params extends Partial<Record<string, string>> = {}>(): Taro.RouterInfo<Params> => {
  const router = useTaroRouter<Params>()

  return useMemo(() => {
    const params = Object.entries(router?.params ?? {}).reduce((memo, [key, value]) => {
      return {
        ...memo,
        [key]: decodeURIComponent(value as string),
      }
    }, {})

    return { ...router, params }
  }, [router]) as Taro.RouterInfo<Params>
}

export const useParams = <Params extends Partial<Record<string, string>> = {}>() => {
  const { params } = useRouter<Params>()
  return params
}
