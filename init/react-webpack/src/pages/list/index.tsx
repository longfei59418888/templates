import * as React from 'react'
import Table from './table'
import { FilterItemType } from '@src/pages/list/table/propsType'

const Home: React.FC = () => {
  return (
    <>
      <div>
        <Table
          search={[
            {
              type: FilterItemType.INPUT,
              value: '2',
              label: 'test',
              name: 'test',
            },
            {
              type: FilterItemType.SELECT,
              value: '2',
              name: 'test2',
              label: 'test2',
              options: [{ value: '2', label: '2' }],
            },
            {
              type: FilterItemType.DATE_DAY,
              name: 'test4',
              label: 'test4',
            },
            {
              type: FilterItemType.DATE_RANGE,
              name: 'test3',
              label: 'test3',
            },
          ]}
          api={{ list: 'test' }}
          columns={[
            { title: '名称', dataIndex: 'name' },
            { title: '年龄', dataIndex: 'age' },
            { title: '学校', dataIndex: 'sg' },
          ]}
        />
      </div>
    </>
  )
}

export default Home
