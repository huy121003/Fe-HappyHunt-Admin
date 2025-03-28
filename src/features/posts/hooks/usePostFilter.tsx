import { useMemo, useState } from 'react';
import { ISearchPost } from '../data/interface';
import { SearchProps } from 'antd/es/input';
import { debounce } from 'lodash';
import { EPostStatus } from '../data/constant';

import useTablePagination from '@/hooks/useTablePagination';

const usePostFilter = () => {
  const [search, setSearch] = useState<string>('');

  const [category, setCategory] = useState<number>();
  const [categoryParent, setCategoryParent] = useState<number>();
  const [isIndividual, setIsIndividual] = useState<boolean>();
  const [province, setProvince] = useState<number>();
  const [district, setDistrict] = useState<number>();
  const [ward, setWard] = useState<number>();
  const [minPrice, setMinPrice] = useState<number>();
  const [maxPrice, setMaxPrice] = useState<number>();
  // const location = useLocation();

  // Lấy phần cuối cùng của pathname và chuyển thành chữ hoa
  // const getStatusFromPath = (): EPostStatus => {
  //   const pathSegments = location.pathname.split('/').filter(Boolean); // Loại bỏ phần tử rỗng
  //   const lastSegment = pathSegments[
  //     pathSegments.length - 1
  //   ]?.toUpperCase() as EPostStatus;

  //   return Object.values(EPostStatus).includes(lastSegment)
  //     ? lastSegment
  //     : EPostStatus.SELLING;
  // };

  const [status, setStatus] = useState<EPostStatus>(EPostStatus.SELLING);

  const {
    parsedPagination,
    handleChangePagination,
    pagination,
    handleResetPagination,
  } = useTablePagination();

  const computtedFilter = useMemo(() => {
    const filters: ISearchPost = {
      ...parsedPagination,
      ...(search && { name: search }),
      ...(category && { category }),
      ...(categoryParent && { categoryParent }),
      ...(isIndividual && { isIndividual }),
      ...(province && { province }),
      ...(district && { district }),
      ...(ward && { ward }),
      ...(minPrice && { minPrice }),
      ...(maxPrice && { maxPrice }),
      ...(status && { status }),
    };
    return filters;
  }, [
    search,
    parsedPagination,
    category,
    categoryParent,
    isIndividual,
    province,
    district,
    ward,
    minPrice,
    maxPrice,
    status,
  ]);
  const handleInputSearch: SearchProps['onInput'] = debounce((event) => {
    handleResetPagination();
    setSearch((event.target as HTMLInputElement).value);
  }, 500);
  const handleStatusChange = (status: EPostStatus) => {
    setStatus(status);
    handleResetPagination();
  };
  const handleSelectCategory = (category: number | undefined) => {
    setCategory(category);
    handleResetPagination();
  };
  const handleSelectCategoryParent = (categoryParent: number | undefined) => {
    setCategoryParent(categoryParent);
    handleResetPagination();
  };
  const handleSelectIsIndividual = (value: string | null | undefined) => {
    const isIndividual =
      value === 'true' ? true : value === 'false' ? false : undefined;
    setIsIndividual(isIndividual);
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

  // New handlers for direct number input from CPriceRange
  const handleMinPriceChange = (value: number | undefined) => {
    setMinPrice(value);
    handleResetPagination();
  };

  const handleMaxPriceChange = (value: number | undefined) => {
    setMaxPrice(value);
    handleResetPagination();
  };

  return {
    handleInputSearch,
    pagination,
    handleChangePagination,
    computtedFilter,
    handleSelectCategory,
    handleSelectCategoryParent,
    handleSelectIsIndividual,
    handleSelectProvince,
    handleSelectDistrict,
    handleSelectWard,
    handleStatusChange,
    handleMinPriceChange,
    handleMaxPriceChange,
  };
};
export default usePostFilter;
