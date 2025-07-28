import type { Meta, StoryObj } from '@storybook/nextjs';
import Demo from '@/stories/demo';
import Pubuliu from '@/stories/grid/pubuliu';
type Story = StoryObj<typeof Demo>;
const meta: Meta<typeof Demo> = {
  title: 'Example/Grid',
  component: Demo,
};

export default meta;

export const Demo1 = {
  name: 'Grid 自动布局',
  render: () => {
    return (
      <div className="ml-auto mr-auto grid grid-cols-[1fr_1fr_2fr] gap-6 mt-3">
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
      </div>
    );
  },
};

export const Demo2 = {
  name: 'Grid 自动布局 定宽',
  render: () => {
    return (
      <div className="ml-auto mr-auto grid grid-cols-[1fr_100px_2fr] gap-6 mt-3">
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
      </div>
    );
  },
};

export const Demo3: Story = {
  name: 'Grid 响应式布局【最少宽度300】',
  render: () => {
    return (
      <div className="ml-auto mr-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] gap-6 mt-3">
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
      </div>
    );
  },
};

export const Demo4: Story = {
  name: 'Grid 不定宽自定排列',
  render: () => {
    return (
      <div className="ml-auto mr-auto grid grid-cols-[repeat(auto-fit,minmax(300px,1fr))] grid-flow-row-dense gap-6 mt-3">
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10 col-start-[span_2] "></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
        <div className="bg-amber-300 h-10"></div>
      </div>
    );
  },
};

export const Demo5: Story = {
  name: 'Grid 瀑布流',
  render: () => {
    return <Pubuliu />;
  },
};
