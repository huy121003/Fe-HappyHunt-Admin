import dayjs from 'dayjs';

export const DAY_MONTH_YEAR = (time: string) => {
  return dayjs(time).format('MM/DD/YYYY');
};
export const DAY_MONTH_YEAR_HOUR_MINUTE_SECOND = (time: string) => {
  return dayjs(time).format('MM/DD/YYYY HH:mm:ss');
};

export const DAY_MONTH_YEAR_HOUR_MINUTE = (time: string) => {
  return dayjs(time).format('MM/DD/YYYY HH:mm');
};
