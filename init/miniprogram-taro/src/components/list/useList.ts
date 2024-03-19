import { useCallback, useEffect, useState } from 'react'

export interface ListParams<T> {
  fetch: (current: number) => Promise<T[]>
}

const useList = <T>({ fetch }: ListParams<T>) => {
  const [end, setEnd] = useState<boolean | undefined>(false)
  const [loading, setLoading] = useState<boolean>(false)
  const [dataSources, setDataSources] = useState<T[]>([])
  const [current, setCurrent] = useState(0)

  const getList = useCallback(
    (refresh?: boolean) => {
      if ((loading || end) && !refresh) return
      let target = current + 1
      if (refresh) target = 1
      setLoading(true)
      fetch(target)
        .then((result) => {
          if (result) {
            setDataSources([...dataSources, ...result])
            setEnd(false)
          } else setEnd(true)
          setCurrent(target)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [current, dataSources, end, fetch, loading],
  )

  useEffect(() => {
    void getList()
  }, [getList])

  return {
    end,
    setEnd,
    loading,
    dataSources,
    getList,
  }
}

export default useList
