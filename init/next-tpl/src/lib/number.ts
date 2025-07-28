export const numberToString = (num: number | string) => {
  num = Number(num);
  if (num >= 1000) {
    return (num / 1000).toFixed(num % 1000 === 0 ? 0 : 1) + 'k';
  }
  return num.toString();
};
