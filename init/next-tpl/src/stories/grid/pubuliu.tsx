// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { useEffect } from 'react';

const Pubuliu = () => {
  useEffect(() => {
    document.querySelectorAll('.masonry > .item').forEach((item) => {
      item.style.height = `${Math.floor(Math.random() * 200) + 100}px`;
    });
    const calcRows = () => {
      const masonry = document.querySelector('.masonry');
      const items = masonry.querySelectorAll('.item');
      // 获取当前列数
      const cols =
        getComputedStyle(masonry).gridTemplateColumns.split(' ').length;
      items.forEach((item, index) => {
        // 给需要上下间隔的元素增加上间隔（每列第一个元素无需上间隔）
        const gapRows = index >= cols ? 8 : 0;
        // 根据元素高度设置元素的需占行数
        const rows = item.clientHeight + gapRows;
        item.style.gridRowEnd = `span ${rows}`;
      });
    };

    window.addEventListener('resize', calcRows);
    setTimeout(() => calcRows(), 100);
  }, []);

  return (
    <div className="masonry grid grid-cols-[repeat(3,1fr)] gap-x-[60px] grid-rows-[1px] items-end [&>.item]:bg-[#f8f8fa] [&>.item]:justify-center [&>.item]:flex [&>.item]:item-center">
      <div className="item">item1</div>
      <div className="item">item2</div>
      <div className="item">item3</div>
      <div className="item">item4</div>
      <div className="item">item5</div>
      <div className="item">item6</div>
      <div className="item">item7</div>
      <div className="item">item8</div>
      <div className="item">item9</div>
      <div className="item">item10</div>
      <div className="item">item11</div>
      <div className="item">item12</div>
      <div className="item">item13</div>
      <div className="item">item14</div>
      <div className="item">item15</div>
      <div className="item">item16</div>
      <div className="item">item17</div>
      <div className="item">item18</div>
      <div className="item">item19</div>
      <div className="item">item20</div>
      <div className="item">item21</div>
      <div className="item">item22</div>
      <div className="item">item23</div>
      <div className="item">item24</div>
      <div className="item">item25</div>
    </div>
  );
};

export default Pubuliu;
