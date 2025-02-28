import { IPagedResponse } from '@/interfaces';
import { useQuery } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useRef, useState } from 'react';

const SIZE = 5;

export interface IFilters {
  pageNumber: number;
  pageSize: number;
  search?: string | null;
}
interface IProps<T> {
  key: string;
  fetchFn: (filters: IFilters) => Promise<IPagedResponse<T[]>>;
}

const useLoadMore = <T>({ key, fetchFn }: IProps<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const filters = useRef<IFilters>({
    pageNumber: 1,
    pageSize: SIZE,
    search: null,
  });

  const { isFetching, refetch } = useQuery({
    queryKey: [key, 'scroll'],
    queryFn: async () => {
      const result = await fetchFn(filters.current);

      return result?.data.documentList || [];
    },
    retry: 0,
    staleTime: 0,
    enabled: false,
  });

  const onSuccess = (data: T[]) => {
    setHasMore(data?.length === SIZE);

    setItems((prev) => prev.concat(data));
  };

  const fetchData = async () => {
    const response = await refetch();

    if (filters.current.pageNumber === 1) setItems(() => []);
    if (response.isFetched && response.isSuccess)
      onSuccess(response.data as T[]);
  };

  const fetchMore = () => {
    filters.current.pageSize += 1;
    fetchData();
  };

  const onSearch = debounce((value: string) => {
    setItems(() => []);

    filters.current.pageNumber = 1;
    filters.current.search = value || null;
    fetchData();
  }, 500);

  return {
    items,
    hasMore,
    loading: isFetching,
    fetchData,
    fetchMore,
    onSearch,
  };
};

export default useLoadMore;
