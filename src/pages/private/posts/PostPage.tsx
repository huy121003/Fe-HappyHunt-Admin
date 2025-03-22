import { CSearch } from '@/components';
import CHeaderCard from '@/components/CHeaderCard';
import CSelect from '@/components/CSelect';
import CPriceRange from '@/components/CPriceRange';
import FilterLayout from '@/components/layouts/FilterLayout';
import SelectCategoryParent from '@/features/categories/components/form/SelectCategoryParent';
import SelectDictrict from '@/features/districts/components/form/SelectDictrict';
import PostTable from '@/features/posts/components/ui/PostTable';
import { API_KEY } from '@/features/posts/data/constant';
import usePostFilter from '@/features/posts/hooks/usePostFilter';
import usePostState from '@/features/posts/hooks/usePostStatus';
import PostService from '@/features/posts/service';
import SelectProvince from '@/features/provinces/components/form/SelectProvince';
import SelectWard from '@/features/wards/components/form/SelectWard';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useCallback, useState } from 'react';

import { IPostItem } from '@/features/posts/data/interface';

function PostPage() {
  const [openModal, setOpenModal] = useState(false);

  //  const { onSuccess, onError } = usePostState();
  const {
    handleChangePagination,
    handleInputSearch,
    handleSelectProvince,
    pagination,
    computtedFilter,
    handleSelectCategoryParent,
    handleSelectIsIndividual,
    handleSelectDistrict,
    handleSelectWard,
    handleMinPriceChange,
    handleMaxPriceChange,
  } = usePostFilter();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST, computtedFilter],
    queryFn: async () => {
      const response = await PostService.getAllPagination(computtedFilter);
      return response.data;
    },
  });
  const { onSuccess, onError } = usePostState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await PostService.remove(id);
      return response.data;
    },
    onSuccess: () => {
      onSuccess(
        'This post deleted successfully, notification sent for user',
        () => setOpenModal(false)
      );
    },
    onError,
  });
  const onDelete = useCallback(
    (record: IPostItem) => {
      mutate(record._id);
    },
    [mutate]
  );
  return (
    <div className="bg-gray-100 ">
      <CHeaderCard title="Post Selling Listing" actions={null} />
      <Card>
        <FilterLayout>
          <CSearch placeholder="Search post name" onInput={handleInputSearch} />
          <SelectCategoryParent
            allowClear
            placeholder="Select category parent"
            onChange={handleSelectCategoryParent}
          />
          <CSelect
            allowClear
            placeholder="Select is individual"
            onChange={handleSelectIsIndividual}
            options={[
              { label: 'Individual', value: 'true' },
              { label: 'Professional Seller', value: 'false' },
            ]}
          />

          <SelectProvince
            placeholder="Select province"
            allowClear
            showSearch
            onChange={handleSelectProvince}
          />
          <SelectDictrict
            placeholder="Select district"
            onChange={handleSelectDistrict}
            disabled={!computtedFilter.province}
            allowClear
            showSearch
          />
          <SelectWard
            allowClear
            showSearch
            placeholder="Select ward"
            onChange={handleSelectWard}
            disabled={!computtedFilter.province || !computtedFilter.district}
          />
          <CPriceRange
            onMinChange={handleMinPriceChange}
            onMaxChange={handleMaxPriceChange}
            min={0}
            max={10000000000}
            step={100000}
          />
        </FilterLayout>
        <PostTable
          data={data?.documentList || []}
          isLoading={isLoading}
          pagination={{
            ...pagination,
            total: data?.totalDocuments || 0,
          }}
          notFound={isFetched && !data?.totalDocuments}
          onChange={handleChangePagination}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onDelete={onDelete}
          isDeleteLoading={isPending}
        />
      </Card>
    </div>
  );
}

export default PostPage;
