import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchAdmin } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useAdminFilter = () => {
  const [search, setSearch] = useState<string>('');
  const [role, setRole] = useState<number>();
  const [phoneNumber, setPhoneNumber] = useState<string>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchAdmin = {
      ...parsedPagination,
      name: search || '',
      ...(role && { role }),
      phoneNumber: phoneNumber || '',
    };
    return filters;
  }, [search, parsedPagination]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  const handleInputPhoneNumber: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setPhoneNumber((event.target as HTMLInputElement).value);
  }, 500);
  const handleSelectRole = (role: number | undefined) => {
    setRole(role);
    handleResetPagination();
  };
  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,
    handleSelectRole,
    handleInputPhoneNumber,
  };
};
export default useAdminFilter;
