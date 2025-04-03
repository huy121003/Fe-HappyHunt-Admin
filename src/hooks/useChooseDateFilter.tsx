import { useMemo, useState } from 'react';
import { ISearchPayemtStatistic } from '../features/payment-statistics/data/interface';

const useChooseDateFilter = () => {
  const [type, setType] = useState<string>('ALL');
  const [start, setStart] = useState<Date>();
  const [end, setEnd] = useState<Date>();
  const computtedFilter = useMemo(() => {
    const filters: ISearchPayemtStatistic = {
      type: type,
      ...(start &&
        end && {
          start: start,
          end: end,
        }),
    };
    return filters;
  }, [type, start, end]);
  const handleSelectType = (value: string) => {
    setType(value);
    setStart(undefined);
    setEnd(undefined);
  };
  const handleSelectDate = (dates: [Date, Date]) => {
    setStart(dates[0]);
    setEnd(dates[1]);
    setType('CUSTOM');
    console.log('dates', dates);
  };

  return {
    computtedFilter,
    handleSelectType,
    type,
    handleSelectDate,
    start,
    end,
  };
};
export default useChooseDateFilter;
