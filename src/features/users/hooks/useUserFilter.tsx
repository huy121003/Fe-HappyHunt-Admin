import useTablePagination from '@/hooks/useTablePagination';
import { useMemo, useState } from 'react';
import { ISearchUser } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';

const useUserFilter = () => {
  const [search, setSearch] = useState<string>('');

  const [phoneNumber, setPhoneNumber] = useState<string>();
  const [isBanned, setIsBanned] = useState<boolean>();
  const [isVip, setIsVip] = useState<boolean>();
  const [province, setProvince] = useState<number>();
  const [district, setDistrict] = useState<number>();
  const [ward, setWard] = useState<number>();
  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();
  const computtedFilter = useMemo(() => {
    const filters: ISearchUser = {
      ...parsedPagination,
      ...(search && { name: search }),
      ...(phoneNumber && { phoneNumber }),
      ...(isBanned && { isBanned }),
      ...(isVip && { isVip }),
      ...(province && { province }),
      ...(district && { district }),
      ...(ward && { ward }),
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
  const handleSelectIsBanned = (isBanned: boolean | undefined) => {
    setIsBanned(isBanned);
    handleResetPagination();
  };
  const handleSelectIsVip = (isVip: boolean | undefined) => {
    setIsVip(isVip);
    handleResetPagination();
  };
  const handleSelectProvince = (province: number) => {
    setProvince(province);
    handleResetPagination();
  };
  const handleSelectDistrict = (district: number) => {
    setDistrict(district);
    handleResetPagination();
  };
  const handleSelectWard = (ward: number) => {
    setWard(ward);
    handleResetPagination();
  };
  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,

    handleInputPhoneNumber,
    handleSelectIsBanned,
    handleSelectIsVip,
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectWard,
  };
};
export default useUserFilter;
