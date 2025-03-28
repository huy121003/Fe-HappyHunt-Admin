import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchPayment } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { EStatus } from '../data/constant';
import { debounce } from 'lodash';

const usePayementFilter = () => {
  const [status, setStatus] = useState<EStatus>();
  const [amount, setAmount] = useState<number>();
  const [orderCode, setOrderCode] = useState<number>();
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();

  const computedFilter = useMemo(() => {
    const filters: ISearchPayment = {
      ...parsedPagination,
      ...(status && { status }),
      ...(amount && { amount }),
      ...(orderCode && { orderCode }),
      ...(startDate && { startDate }),
      ...(endDate && { endDate }),
    };

    return filters;
  }, [status, amount, parsedPagination]);

  const handleSelectStatus = (value: EStatus) => {
    handleResetPagination();
    setStatus(value);
  };
  const handleSelectAmount = (value: number) => {
    handleResetPagination();
    setAmount(value);
  };
  const handleInput: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setOrderCode(Number((event.target as HTMLInputElement).value));
  }, 500);
  const handleInputDate = (dates: [Date, Date]) => {
    handleResetPagination();
    setStartDate(dates[0]);
    setEndDate(dates[1]);
  };

  return {
    handleChangePagination,
    pagination,
    computedFilter,
    handleSelectAmount,
    handleSelectStatus,
    handleInput,
    handleInputDate,
  };
};

export default usePayementFilter;
