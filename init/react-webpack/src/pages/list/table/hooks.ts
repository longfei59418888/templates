import {
  UseTableParams,
  QueryPagination,
  Pagination,
  PageReturn,
} from './propsType'
import { DependencyList, useCallback, useEffect, useState } from 'react'
// import { request } from 'xl-story-book'
import { useSearchParams } from 'react-router-dom'
// import { IReturnData } from 'xl-story-book/types/components/request/propsType'
import { AsyncAction } from '@src/types/commons'

export const useData = <D>(
  fetch: AsyncAction<PageReturn<D>, undefined>,
  deps?: DependencyList,
) => {
  const [data, setData] = useState<D[]>()
  const [pagination, setPagination] = useState<Pagination>()
  useEffect(() => {
    void fetch().then(({ data, ...rest }) => {
      setData(data)
      setPagination(rest)
    })
  }, deps)
  return {
    pagination,
    dataSource: data,
  }
}

export const useTable = <D, Q>(useTableParams: UseTableParams<D, Q>) => {
  const { api, fetch, query } = useTableParams
  const [search, setSearch] = useSearchParams()
  const [loading, setLoading] = useState<boolean>(false)
  const [params, setParams] = useState<Q & QueryPagination>()
  const setQuery = useCallback(
    (query: Partial<QueryPagination> & Partial<Q>) => {
      query = { ...params, current: 1, pageSize: 15, ...query }
      const searchParams = new URLSearchParams()
      Object.entries(query).forEach(
        ([key, value]) => value && searchParams.append(key, String(value)),
      )
      setSearch(searchParams)
      setParams(query as Q & QueryPagination)
    },
    [params],
  )

  const { dataSource, pagination } = useData<D>(async () => {
    if (!params?.current) return {} as PageReturn<D>
    setLoading(true)
    console.log(params)
    if (fetch?.list)
      return fetch.list(params).finally(() => {
        setLoading(false)
      })
    else if (api?.list)
      return {
        data: [
          { name: 'test', age: '12', sg: 'hb' },
          { name: 'test2', age: '12', sg: 'hb' },
        ],
        current: params.current,
        total: 100,
        pageSize: params.pageSize,
      } as PageReturn<D>
    // return request
    //   .get<IReturnData<D>>(api.list, params)
    //   .then<D>(request.data, request.toastMessage).finally(() => setLoading(false)
    setLoading(false)
    throw '必须传入 api?.list or fetch.list'
  }, [params, api?.list, fetch?.list])

  useEffect(() => {
    setQuery(
      Object.keys(query ?? {}).reduce(
        (p, n) => {
          return search.get(n)
            ? {
                ...p,
                [n]: search.get(n) ?? '',
              }
            : p
        },
        {
          ...query,
          current: search.get('current') ? Number(search.get('current')) : 1,
          pageSize: search.get('pageSize')
            ? Number(search.get('pageSize'))
            : 15,
        },
      ) as Q & QueryPagination,
    )
  }, [])

  return {
    loading,
    params,
    setQuery,
    dataSource,
    pagination,
  }
}
