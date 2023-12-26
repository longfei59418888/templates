import {
  DatePickerProps,
  InputProps,
  TablePaginationConfig,
  TableProps as Table,
} from 'antd'
import { RowSelectionType } from 'antd/es/table/interface'
import { Rule } from 'rc-field-form/lib/interface'
import { LabelTooltipType } from 'antd/es/form/FormItemLabel'
import { SelectProps } from 'antd/es/select'
import { AnyObject } from 'antd/es/_util/type'
import { RangePickerProps } from 'antd/es/date-picker'
import { AsyncAction } from '@src/types/commons'

export enum EmptyImages {
  DEFAULT = 'DEFAULT',
}

export enum TablePropsOptions {
  DELETE = 'DELETE',
  VIEW = 'VIEW',
  EDIT = 'EDIT',
}

export interface TablePropsOption {
  type: TablePropsOptions
}

export interface TableProps<RecordType extends AnyObject>
  extends Table<RecordType> {
  pagination?: Omit<
    TablePaginationConfig,
    'pageSize' | 'current' | 'total' | 'onChange' | 'position'
  >
  rowSelectionType?: RowSelectionType | undefined
  emptyImage?: EmptyImages | string
  search?: TableFilterItem[]
  options?: []
}

export interface BaseOptionType {
  disabled?: boolean
  label: string
  value: unknown
  [name: string]: unknown
}

export enum FilterItemType {
  INPUT = 'INPUT',
  SELECT = 'SELECT',
  DATE_DAY = 'DATE_DAY',
  DATE_RANGE = 'DATE_RANGE',
}

export interface FilterItemProps {
  label: string
  type: FilterItemType
  name: string
  rules?: Rule[]
  tooltip?: LabelTooltipType
}

export type FilterInputProps = Omit<InputProps, 'name' | 'type'> &
  FilterItemProps
export type FilterDateProps = DatePickerProps & FilterItemProps
export type FilterDateRangeProps = RangePickerProps & FilterItemProps

export interface FilterSelectProps<ValueType = unknown>
  extends SelectProps<ValueType, BaseOptionType>,
    FilterItemProps {
  options: BaseOptionType[]
}

export type TableFilterItem =
  | FilterInputProps
  | FilterSelectProps<unknown>
  | FilterDateProps
  | FilterDateRangeProps

export interface TableFilterProps<FilterValue extends AnyObject> {
  items: TableFilterItem[]
  initialValues?: FilterValue
  onChange?: (values: FilterValue) => void
  onSearch?: (values: FilterValue) => void
  onClear?: (values?: FilterValue) => void
  searchText?: string
  clearText?: string
}

export interface TableAPI {
  list?: string
}
export interface TableFetch<R, P> {
  list?: AsyncAction<PageReturn<R>, P>
}

export interface UseTableParams<R, P> {
  api?: TableAPI
  fetch?: TableFetch<R, P>
  query?: P
}

export interface Pagination {
  pageSize: number
  total: number
  current: number
}

export interface PageReturn<D> extends Pagination {
  data: D[]
}

export type QueryPagination = Pick<Pagination, 'pageSize' | 'current'>

export default TableProps
