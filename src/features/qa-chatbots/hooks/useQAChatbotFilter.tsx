import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchQAChatbot } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useQAChatbotFilter = () => {
  const [question, setQuestion] = useState<string>('');
  const [answer, setAnswer] = useState<string>('');
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchQAChatbot = {
      ...parsedPagination,
      ...(question && { question }),
      ...(answer && { answer }),
    };
    return filters;
  }, [question, answer, parsedPagination]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setQuestion((event.target as HTMLInputElement).value);
  }, 500);
  const handleInputAnswer: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setAnswer((event.target as HTMLInputElement).value);
  }, 500);
  return {
    handleInputSearch,
    handleInputAnswer,
    pagination,
    handleChangePagination,
    computtedFilter,
  };
};

export default useQAChatbotFilter;
