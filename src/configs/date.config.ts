import dayjs from 'dayjs';
import i18n from '@/locales/index';

export const DAY_MONTH_YEAR = (time: string) => {
  if (i18n.language === 'en') {
    return dayjs(time).format('MM/DD/YYYY');
  }
  return dayjs(time).format('DD/MM/YYYY');
};
export const DAY_MONTH_YEAR_HOUR_MINUTE_SECOND = (time: string) => {
  if (i18n.language === 'en') {
    return dayjs(time).format('MM/DD/YYYY HH:mm:ss');
  }
  return dayjs(time).format('DD/MM/YYYY HH:mm:ss');
};

export const DAY_MONTH_YEAR_HOUR_MINUTE = (time: string) => {
  if (i18n.language === 'en') {
    return dayjs(time).format('MM/DD/YYYY HH:mm');
  }
  return dayjs(time).format('DD/MM/YYYY HH:mm');
};
