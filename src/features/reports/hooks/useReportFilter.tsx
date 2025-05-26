import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchReport } from '../data/interface';
import { EStatus, ETargetType } from '../data/constant';

const useReportFilter = () => {
  const [targetType, setTargetType] = useState<ETargetType | undefined>(
    undefined
  );
  const [status, setStatus] = useState<EStatus | undefined>(undefined);
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();

  const computtedFilter = useMemo((): ISearchReport => {
    return {
      ...parsedPagination,
      ...(targetType && { targetType }),
      ...(status && { status }),
    };
  }, [parsedPagination, targetType, status]);

  const handelSelectTargetType = (value: ETargetType | undefined) => {
    handleResetPagination();
    setTargetType(value);
  };
  const handelSelectStatus = (value: EStatus | undefined) => {
    handleResetPagination();
    setStatus(value);
  };

  return {
    pagination,
    handleChangePagination,
    computtedFilter,
    handelSelectTargetType,
    handelSelectStatus,
  };
};
export default useReportFilter;
