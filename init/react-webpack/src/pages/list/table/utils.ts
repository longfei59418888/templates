import { ColumnsType } from 'antd/es/table';
import { ColumnGroupType } from 'antd/es/table/interface';

/** 动态计算table宽度 */
export const setScrollX = <T>(columns: ColumnsType<T>): number => {
  let scrollX = 0;
  columns.forEach((v) => {
    const column = v as ColumnGroupType<unknown>;
    if (column?.children) {
      column.children.forEach((item) => {
        scrollX = scrollX + parseInt(<string>item.width ?? 80);
      });
    } else {
      scrollX = scrollX + parseInt(<string>v.width ?? 80);
    }
  });
  return scrollX;
};
