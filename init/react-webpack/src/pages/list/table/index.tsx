import React, { Key, ReactElement, useMemo, useState } from 'react'
import { TableRowSelection } from 'antd/es/table/interface'
import { AnyObject } from 'antd/es/_util/type'
import { TablePaginationConfig, Empty, Table as TableBase } from 'antd'

import TableProps, {
  EmptyImages,
  QueryPagination,
  TablePropsOptions,
  UseTableParams,
} from './propsType'
// import { setScrollX } from './utils';
import { TableWrapper, Wrapper } from './styles'
//
export { default as TableFilter } from './components/filter'
import TableFilter from './components/filter'
import { useTable } from '@src/pages/list/table/hooks'

export const emptyImageMaps: Record<EmptyImages, string> = {
  [EmptyImages.DEFAULT]: '',
}

export const TablePropsOptionLabel: Record<TablePropsOptions, string> = {
  [TablePropsOptions.DELETE]: '删除',
  [TablePropsOptions.VIEW]: '查看',
  [TablePropsOptions.EDIT]: '编辑',
}

const Table = <RecordType extends AnyObject, Query extends AnyObject>({
  columns: BaseColumns,
  rowSelectionType,
  emptyImage = EmptyImages.DEFAULT,
  /**
   * @deprecated 初始化参数也可以使用 search
   */
  query: queryBase,
  api,
  search = [],
  fetch,
  ...props
}: TableProps<RecordType> &
  UseTableParams<RecordType, Query>): ReactElement => {
  const query = useMemo<Query>(() => {
    if (queryBase) return queryBase
    return search.reduce((prev, item) => {
      return {
        ...prev,
        [item.name]: item.value ?? '',
      }
    }, {}) as Query
  }, [search, queryBase])
  const {
    dataSource = [],
    pagination = {},
    setQuery,
    params,
  } = useTable<RecordType, Query>({
    api,
    fetch,
    query,
  })

  const [selectedRowKeys, setSelectedRowKeys] = useState<Key[]>([])
  const rowSelection: TableRowSelection<RecordType> = useMemo(() => {
    return {
      type: rowSelectionType,
      selectedRowKeys,
      onChange(e) {
        setSelectedRowKeys(e)
      },
      fixed: 'left',
    }
  }, [rowSelectionType, selectedRowKeys])

  const columns = useMemo(() => {
    return BaseColumns?.map((column) => {
      return {
        ellipsis: {
          showTitle: true,
        },
        ...column,
        render: (v: unknown, r: RecordType, i: number) => {
          const value = column.render ? column.render(v, r, i) : v
          return value ?? '-'
        },
      }
    })
  }, [BaseColumns])

  const paginationDefault: TablePaginationConfig = {
    showQuickJumper: true,
    showSizeChanger: true,
    hideOnSinglePage: true,
    current: 1,
    pageSize: 15,
    total: 0,
    ...pagination,
    onChange(current: number, pageSize: number) {
      setQuery({
        current,
        pageSize,
      } as QueryPagination & Query)
      setSelectedRowKeys([])
    },
  }

  return (
    <>
      <Wrapper>
        {search && (
          <TableFilter<Query>
            initialValues={params}
            onSearch={(values) => {
              setQuery(values)
            }}
            onClear={(values) => {
              setQuery({ ...values, ...query } ?? {})
            }}
            items={search}
          />
        )}
      </Wrapper>

      <TableWrapper>
        <TableBase
          rowSelection={rowSelectionType ? rowSelection : undefined}
          dataSource={dataSource}
          pagination={paginationDefault}
          columns={columns}
          // todo 配置属性
          // scroll={{ x: setScrollX(columns), y: '900' }}
          locale={{
            emptyText: (
              <Empty
                image={emptyImageMaps[emptyImage as EmptyImages] || emptyImage}
                imageStyle={{
                  // todo 配置属性
                  height: 160,
                }}
              />
            ),
          }}
          {...props}
        />

      </TableWrapper>
    </>
  )
}

export default Table
