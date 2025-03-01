import { CSearch } from '@/components';
import CButtonCreateNew from '@/components/buttons/CButtonCreateNew';
import CHeaderCard from '@/components/CHeaderCard';
import FilterLayout from '@/components/layouts/FilterLayout';
import BannerTable from '@/features/banners/components/ui/BannerTable';
import { API_KEY } from '@/features/banners/data/constant';
import { IBannerItem } from '@/features/banners/data/interface';
import useBannerFilter from '@/features/banners/hooks/useBannerFilter';
import useBannerState from '@/features/banners/hooks/useBannerState';
import BannerService from '@/features/banners/service';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function BannerPage() {
  const naviagte = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openActiveModal, setOpenActiveModal] = useState(false);
  const { onSuccess, onError } = useBannerState();
  const {
    handleChangePagination,
    handleInputSearch,
    pagination,
    computtedFilter,
  } = useBannerFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.BANNER_PAGINATION, computtedFilter],
    queryFn: async () => {
      const response =
        await BannerService.getAllWithPagination(computtedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await BannerService.delete(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('Banner deleted successfully', () => {
        setOpenModal(false);
      });
    },
    onError,
  });
  const { mutate: mutateStatus, isPending: isPendingStatus } = useMutation({
    mutationFn: async (record: IBannerItem) => {
      const response = await BannerService.show(record._id, !record.isShow);
      return response;
    },
    onSuccess: () => {
      onSuccess('Banner status updated successfully', () => {
        setOpenActiveModal(false);
      });
    },
    onError,
  });
  const onDelete = useCallback(
    (record: IBannerItem) => {
      mutate(Number(record._id));
    },
    [mutate]
  );
  const onActive = useCallback(
    (record: IBannerItem) => {
      mutateStatus(record);
    },
    [mutateStatus]
  );
  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      <CHeaderCard
        title="Banner Listing"
        actions={<CButtonCreateNew onClick={() => naviagte('create')} />}
      />
      <Card>
        <FilterLayout>
          <CSearch
            placeholder="Search banner name"
            onInput={handleInputSearch}
          />
        </FilterLayout>
        <BannerTable
          data={data?.documentList || []}
          isLoading={isLoading}
          onDelete={onDelete}
          isDeleteLoading={isPending}
          isShowLoading={isPendingStatus}
          pagination={{
            ...pagination,
            total: data?.totalDocuments || 0,
          }}
          notFound={isFetched && !data?.totalDocuments}
          onChange={handleChangePagination}
          openModal={openModal}
          setOpenModal={setOpenModal}
          onActive={onActive}
          openActiveModal={openActiveModal}
          setOpenActiveModal={setOpenActiveModal}
        />
      </Card>
    </div>
  );
}

export default BannerPage;
