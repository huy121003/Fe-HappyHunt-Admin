import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchRole } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useRoleFilter = () => {
  const [search, setSearch] = useState<string>('');
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchRole = {
      ...parsedPagination,
      name: search || '',
    };
    return filters;
  }, [search, parsedPagination]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,
  };
};
export default useRoleFilter;
