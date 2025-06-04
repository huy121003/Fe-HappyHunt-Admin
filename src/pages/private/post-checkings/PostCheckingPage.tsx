import { CSearch } from '@/components';
import CHeaderCard from '@/components/CHeaderCard';
import CSelect from '@/components/CSelect';

import FilterLayout from '@/components/layouts/FilterLayout';
import SelectCategoryParent from '@/features/categories/components/form/SelectCategoryParent';
import PostTable from '@/features/posts/components/ui/PostTable';
import { API_KEY, EPostStatus } from '@/features/posts/data/constant';
import usePostFilter from '@/features/posts/hooks/usePostFilter';

import PostService from '@/features/posts/service';

import { useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useState } from 'react';

function PostCheckingPage() {
  const [openModal, setOpenModal] = useState(false);

  const {
    handleChangePagination,
    handleInputSearch,
    pagination,
    computtedFilter,
    handleStatusChange,
    handleSelectCategoryParent,
  } = usePostFilter();

  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST_CHECKING, computtedFilter],
    queryFn: async () => {
      const response = await PostService.getAllPagination({
        ...computtedFilter,
        status:
          computtedFilter.status === EPostStatus.SELLING
            ? EPostStatus.CHECKING
            : computtedFilter.status,
      });
      return response.data;
    },
  });

  return (
    <div className="bg-gray-100 ">
      <CHeaderCard title="Post Checking Listing" actions={null} />
      <Card>
        <FilterLayout>
          <CSearch placeholder="Search post name" onInput={handleInputSearch} />
          <SelectCategoryParent
            allowClear
            placeholder="Select category parent"
            onChange={handleSelectCategoryParent}
          />

          <CSelect
            onChange={handleStatusChange}
            placeholder="Select status "
            options={[
              {
                label: 'Rejected',
                value: EPostStatus.REJECTED,
              },
              {
                label: 'Waiting',
                value: EPostStatus.WAITING,
              },
              {
                label: 'Ai Checking Failed',
                value: EPostStatus['WAITING|AI_CHECKING_FAILED'],
              },
            ]}
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
          onDelete={() => {}}
          isDeleteLoading={false}
        />
      </Card>
    </div>
  );
}

export default PostCheckingPage;
