import type { Meta, StoryObj } from '@storybook/nextjs';
import Demo from '@/stories/demo';
type Story = StoryObj<typeof Demo>;
const meta: Meta<typeof Demo> = {
  title: 'Example/Tailwind',
  component: Demo,
};

export default meta;

export const Demo1: Story = {
  name: '伪类',
  render: () => {
    return (
      <div>
        <div className="mb-6">
          <p className="m-2">hover、active、focus</p>
          <p className="hover:bg-[red] bg-[#999] text-center">
            hover、active、focus
          </p>
        </div>
        <div className="mb-6">
          <p className="m-2">focus-within、focus-visible</p>
          <label className="focus-within:bg-[red] bg-[#ccc] text-center p-[10px]">
            <input type="text" className="w-[200px] bg-[#bbb]" />
          </label>
        </div>
        <div className="mb-6">
          <p className="m-2">
            first、last、even、first-child、first-letter、first-line
          </p>
          <p className="m-2">
            only-child 【没有同级元素】、only-of-type
            【没有相同同级元素】、empty
          </p>
          <p className="m-2">has-[]、not-[]</p>
          <p className="m-2">md、lg、xl</p>
          <p className="m-2">dark</p>
        </div>
      </div>
    );
  },
};

export const Demo2: Story = {
  name: 'group、pure 和 子选择器',
  render: () => {
    return (
      <div>
        <div className="group">
          <div className="group/item">
            <p className="m-2">group/item、group、group-has-[]</p>
            <p className="group-has-[.m-2]:bg-[red]">
              group/item、group、group-has-[]
            </p>
          </div>
        </div>
        <div>
          <p className="peer m-2">peer/item、peer、peer-has-[]</p>
          <p className="peer-[.m-2]:bg-[red]">peer/item、peer、peer-has-[]</p>
        </div>
        <div className="[&>.is-dragging]:bg-[red]">
          <p className="peer m-2">子选择器</p>
          <p className="is-dragging">{'[&>.is-dragging]:bg-[red]'}</p>
        </div>
      </div>
    );
  },
};

export const Demo3: Story = {
  name: '主题变量',
  render: () => {
    return (
      <div>
        <a className={'m-2'} href="https://tailwindcss.com/docs/theme">
          @theme
        </a>
        <p className={'m-2'}>--*: initial; // 禁用所有 内置 css</p>
        <p className={'m-2'}>--font-sans: var(--font-inter); // 引用其他变量</p>
        <p className={'m-2'}>@layer components </p>
        <p className={'m-2'}>@layer inline </p>
      </div>
    );
  },
};

export const Demo4: Story = {
  name: '自定义样式',
  render: () => {
    return (
      <div>
        <a className={'text-red'} href="https://tailwindcss.com/docs/theme#default-theme-variable-reference">全部css变量</a>
        <p className={'[color:red] hover:[color:blue]'}>
          直接写样式: [color:red]
        </p>
        <p className={'text-(--color-zinc-300)'}>
          直接使用变量 : text-(--color-zinc-300)
        </p>
        <p>添加基础样式 ：@layer base</p>
        <p>添加类样式 ：@layer components</p>
        <p>添加系统颜色变体 ：@variant dark</p>
        <p>添加自定义选择器 ：@utility tab-* </p>
        <p>添加自定义变体 ：@custom-variant theme-midnight </p>
      </div>
    );
  },
};
