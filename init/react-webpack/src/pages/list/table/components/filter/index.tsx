import React, {
  FC,
  PropsWithChildren,
  ReactElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
} from 'react'
import { Button, DatePicker, Form, Input, Select, Space } from 'antd'
import { AnyObject } from 'antd/es/_util/type'
import dayjs from 'dayjs'

import {
  BaseOptionType,
  FilterDateProps,
  FilterDateRangeProps,
  FilterInputProps,
  FilterItemType,
  FilterSelectProps,
  TableFilterProps,
} from '../../propsType'
import { FilterWrapper, ItemWrapper, OptionWrapper } from './styles'

const TABLE_TABLE_FILTER_CLEAR_BUTTON_TEXT = 'clear'
const TABLE_TABLE_FILTER_SEARCH_BUTTON_TEXT = 'search'

const FilterInput: FC<FilterInputProps> = ({
  label,
  name,
  rules,
  tooltip,
  ...rest
}) => {
  return (
    <ItemWrapper label={label} name={name} rules={rules} tooltip={tooltip}>
      <Input {...rest} type='text' />
    </ItemWrapper>
  )
}

const FilterDate: FC<FilterDateProps> = ({
  label,
  name,
  rules,
  format = 'YYYY-MM-DD HH:mm:ss',
  tooltip,
  ...rest
}) => {
  return (
    <ItemWrapper label={label} name={name} rules={rules} tooltip={tooltip}>
      <DatePicker format={format} {...rest} />
    </ItemWrapper>
  )
}

const FilterDateRange: FC<FilterDateRangeProps> = ({
  label,
  name,
  rules,
  tooltip,
  format = 'YYYY-MM-DD HH:mm:ss',
  ...rest
}) => {
  return (
    <ItemWrapper label={label} name={name} rules={rules} tooltip={tooltip}>
      <DatePicker.RangePicker format={format} {...rest} />
    </ItemWrapper>
  )
}

const FilterSelect = <ValueType = unknown,>({
  label,
  name,
  rules,
  options,
  tooltip,
  ...rest
}: FilterSelectProps<ValueType>): ReactElement => {
  return (
    <ItemWrapper label={label} name={name} rules={rules} tooltip={tooltip}>
      <Select {...rest}>
        {options.map(({ value, label, ...rest }: BaseOptionType) => (
          <Select.Option key={label} value={value} {...rest}>
            {label}
          </Select.Option>
        ))}
      </Select>
    </ItemWrapper>
  )
}

const TableFilter = <RecordType extends AnyObject>({
  items,
  initialValues,
  onSearch,
  onChange,
  onClear,
  children,
  searchText = TABLE_TABLE_FILTER_SEARCH_BUTTON_TEXT,
  clearText = TABLE_TABLE_FILTER_CLEAR_BUTTON_TEXT,
}: PropsWithChildren<TableFilterProps<RecordType>>): ReactElement => {
  const [form] = Form.useForm<RecordType>()
  const initSignal = useRef<boolean>(false)
  const itemMapTypes = useMemo<Record<string, FilterItemType>>(() => {
    return items.reduce(
      (prev, item) => ({
        ...prev,
        [item.name]: item.type,
      }),
      {},
    )
  }, [items])

  const update = useCallback(
    (callback?: (values: RecordType) => void) => {
      const values = form.getFieldsValue()
      callback?.(
        Object.keys(values).reduce((prev, key) => {
          let value = values[key]
          if (Array.isArray(value))
            value = `${value[0].format(
              'YYYY-MM-DD HH:mm:ss',
            )},${value[1].format('YYYY-MM-DD HH:mm:ss')}`
          if (value?.$isDayjsObject) value = value.format('YYYY-MM-DD HH:mm:ss')
          return {
            ...prev,
            [key]: value,
          }
        }, {}) as RecordType,
      )
    },
    [form, items],
  )

  useEffect(() => {
    if (!initSignal.current && initialValues) {
      initSignal.current = true
      form.setFieldsValue(
        Object.keys(form.getFieldsValue()).reduce((prev, key) => {
          let initValue = initialValues[key] ?? undefined
          if (itemMapTypes[key] === FilterItemType.DATE_RANGE && initValue) {
            const initValues = initValue.split(',')
            if (
              dayjs(initValues[0]).isValid() &&
              dayjs(initValues[1]).isValid()
            )
              initValue = [dayjs(initValues[0]), dayjs(initValues[1])]
            else initValue = undefined
          }
          if (itemMapTypes[key] === FilterItemType.DATE_DAY) {
            if (dayjs(initValue).isValid()) initValue = dayjs(initValue)
            else initValue = undefined
          }

          return {
            ...prev,
            [key]: initValue,
          }
        }, {}),
      )
    }
  }, [initialValues])

  return (
    <FilterWrapper form={form}>
      {children
        ? children
        : items.map((item) => {
            const { type, ...rest } = item
            switch (type) {
              case FilterItemType.INPUT:
                return (
                  <FilterInput
                    key={rest.name}
                    {...(rest as FilterInputProps)}
                    onChange={() => update(onChange)}
                  />
                )
              case FilterItemType.SELECT:
                return (
                  <FilterSelect
                    key={rest.name}
                    {...(rest as FilterSelectProps<unknown>)}
                    onChange={() => update(onChange)}
                  />
                )
              case FilterItemType.DATE_DAY:
                return (
                  <FilterDate
                    key={rest.name}
                    {...(rest as FilterDateProps)}
                    onChange={() => update(onChange)}
                  />
                )
              case FilterItemType.DATE_RANGE:
                return (
                  <FilterDateRange
                    key={rest.name}
                    {...(rest as FilterDateRangeProps)}
                    onChange={() => update(onChange)}
                  />
                )
            }
          })}
      <OptionWrapper>
        <Space>
          <Button onClick={() => update(onSearch)} type='primary'>
            {searchText}
          </Button>
          {onClear && (
            <Button
              onClick={() => {
                initSignal.current = false
                form.resetFields()
                update(onClear)
              }}
              type='default'>
              {clearText}
            </Button>
          )}
        </Space>
      </OptionWrapper>
    </FilterWrapper>
  )
}

export default TableFilter
