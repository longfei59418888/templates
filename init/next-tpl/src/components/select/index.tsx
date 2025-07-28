/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import * as SelectPrimitive from '@radix-ui/react-select';
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  Loader2,
  XIcon,
} from 'lucide-react';

import { cn } from '@/lib/cn';
import { useEffect, useState } from 'react';

export function SelectRoot({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Root>) {
  return <SelectPrimitive.Root data-slot="select" {...props} />;
}

export function SelectGroup({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Group>) {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />;
}

export function SelectValue({
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Value>) {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />;
}

export function SelectTrigger({
  className,
  size = 'default',
  loading = false,
  hiddenIcon = false,
  children,
  iconClassName,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default';
  loading?: SelectProps['loading'];
  hiddenIcon?: boolean;
  iconClassName?: string;
}) {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        // eslint-disable-next-line quotes
        "border-input text-muted-foreground aria-invalid:border-destructive aria-invalid:ring-destructive/20 data-[placeholder]:text-muted-foreground dark:bg-input/30 dark:hover:bg-input/50 dark:aria-invalid:ring-destructive/40 [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-fit cursor-pointer items-center justify-between gap-2 rounded-md border px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      {!hiddenIcon && (
        <SelectPrimitive.Icon asChild>
          {loading ? (
            <Loader2
              className={(cn('size-4 animate-spin opacity-80'), iconClassName)}
            />
          ) : (
            <ChevronDownIcon
              className={(cn('size-4 opacity-50'), iconClassName)}
            />
          )}
        </SelectPrimitive.Icon>
      )}
    </SelectPrimitive.Trigger>
  );
}

export function SelectContent({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={cn(
          'bg-popover text-popover-foreground relative z-50 max-h-(--radix-select-content-available-height) min-w-[8px] origin-(--radix-select-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95 data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95',
          position === 'popper' &&
            'data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1',
          className,
        )}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={cn(
            'p-1',
            position === 'popper' &&
              'h-[var(--radix-select-trigger-height)] w-full min-w-[var(--radix-select-trigger-width)] scroll-my-1',
          )}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  );
}

export function SelectLabel({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  );
}

export function SelectItem({
  className,
  children,
  iconClassName,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item> & {
  iconClassName?: string;
}) {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={cn(
        // eslint-disable-next-line quotes
        "focus:bg-accent focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-pointer items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className={cn('size-4', iconClassName)} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  );
}

export function SelectSeparator({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  );
}

export function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="size-4" />
    </SelectPrimitive.ScrollUpButton>
  );
}

export function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={cn(
        'flex cursor-default items-center justify-center py-1',
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="size-4" />
    </SelectPrimitive.ScrollDownButton>
  );
}

export type SelectProps = {
  /** 数据化配置选项内容 */
  options?: {
    value?: any;
    label?: string;
  }[];
  /** 选择框默认文本 */
  placeholder?: string;
  // /** 配置是否可搜索 */
  // showSearch?: boolean;
  /** 加载中状态 */
  loading?: boolean;
  /** 自定义清除按钮 */
  allowClear?: boolean;
  /** 清除内容时回调 */
  onClear?: (event: React.MouseEvent<SVGSVGElement>) => void;
  /** 输入值 */
  value?: any;
  /** 初始值 */
  defaultValue?: any;
  /** 数据更新事件 */
  onChange?: (value?: any) => void;
  className?: string;
  classNameForContent?: string;
  disabled?: boolean;
};

/** 选择器 */
export function Index({
  options,
  placeholder = '请选择',
  allowClear = true,
  onClear,
  loading = false,
  value,
  defaultValue,
  onChange,
  className,
  classNameForContent,
  disabled = false,
  ...props
}: SelectProps) {
  const [selectedValue, setSelectedValue] = useState(value || defaultValue);

  useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  const onChangeHandler = (newValue: string) => {
    setSelectedValue(newValue);
    if (onChange) {
      onChange(newValue);
    }
  };

  const onClearHandler = (event: React.MouseEvent<SVGSVGElement>) => {
    setSelectedValue('');
    if (onChange) {
      onChange('');
    }
    onClear?.(event);
  };

  const showClearIcon = !!(allowClear && selectedValue);
  return (
    <SelectRoot
      disabled={disabled}
      value={selectedValue}
      onValueChange={onChangeHandler}
      {...props}
    >
      <div
        className={cn(
          'relative inline-flex w-fit items-center rounded-[26px] bg-[#272D2C]',
          className,
        )}
      >
        <SelectTrigger
          aria-label={placeholder}
          loading={loading}
          hiddenIcon={showClearIcon}
          className={cn(
            'w-full rounded-[inherit] border-none leading-[1]',
            // TODO： 自定义样式
            'h-full min-h-[52px] border-none bg-transparent p-[14px]',
            'text-base leading-normal font-normal text-[#f1fffa] placeholder-[#738080]',
            showClearIcon ? 'pr-[2em]' : '',
          )}
        >
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        {showClearIcon && (
          <XIcon
            onClick={onClearHandler}
            className="absolute right-1 size-4 -translate-x-1/2 transform cursor-pointer opacity-80"
          />
        )}
      </div>

      <SelectContent className={classNameForContent}>
        {options?.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </SelectRoot>
  );
}
