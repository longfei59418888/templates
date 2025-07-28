import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';
dayjs.extend(duration);

export const durationToString = (
  seconds: number | string,
  format: 'mm:ss' | 'HH:mm:ss' = 'mm:ss',
) => {
  if (!seconds) return '';
  return dayjs.duration(Number(seconds), 'seconds').format(format);
};

export const formatTime = (
  timestamp: string | number | Date,
  format = 'YYYY-MM-DD HH:mm:ss',
) => dayjs(timestamp).format(format);
