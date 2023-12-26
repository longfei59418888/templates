import styled from 'styled-components';
import { Form } from 'antd';

export const FilterWrapper = styled(Form)`
  display: flex;
  flex-wrap: wrap;
  position: relative;
`;

export const OptionWrapper = styled(Form.Item)`
  flex: 1;
  .ant-form-item-control-input-content {
    justify-content: right;
    display: flex;
  }
`;

export const ItemWrapper = styled(Form.Item)`
  padding-right: 32px;
  min-width: 248px;
  .ant-form-item-control {
    min-width: 184px;
  }
  .ant-select-in-form-item,
  .ant-picker {
    width: 184px;
  }
  .ant-picker-range {
    width: 470px;
  }
  .ant-form-item-label {
    min-width: 70px;
    color: #191d2e;
    font-size: 14px;
  }
`;
