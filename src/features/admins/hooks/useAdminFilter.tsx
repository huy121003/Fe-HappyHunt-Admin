import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchAdmin } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useAdminFilter = () => {
  const [search, setSearch] = useState<string>('');
  const [role, setRole] = useState<number>();
  const [email, setemail] = useState<string>();
  const [isBanned, setIsBanned] = useState<boolean>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchAdmin = {
      ...parsedPagination,
      ...(search && { name: search }),
      ...(role && { role }),
      ...(email && { email }),
      ...(isBanned !== undefined && { isBanned }),
    };
    return filters;
  }, [search, parsedPagination]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  const handleInputemail: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setemail((event.target as HTMLInputElement).value);
  }, 500);
  const handleSelectRole = (role: number | undefined) => {
    setRole(role);
    handleResetPagination();
  };
  const handleSelectIsBanned = (isBanned: boolean | undefined) => {
    setIsBanned(isBanned);
    handleResetPagination();
  };
  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,
    handleSelectRole,
    handleInputemail,
    handleSelectIsBanned,
  };
};
export default useAdminFilter;
