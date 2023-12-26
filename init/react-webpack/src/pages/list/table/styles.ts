import styled from 'styled-components'

export const Wrapper = styled.div`
  padding: 24px 24px 0;
  // todo 配置颜色
  background-color: #fff;
  border-radius: 4px;
  margin-bottom: 16px;
`

export const TableWrapper = styled(Wrapper)`
  padding: 24px;
  .ant-table {
    background-color: transparent;
    font-size: 14px;
    .ant-table-thead > tr > th {
      font-weight: 500 !important;
      line-height: 20px;
      &::before {
        display: none;
      }
    }
  }
`
