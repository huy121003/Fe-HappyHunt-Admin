import { CSearch } from '@/components';
import CButtonCreateNew from '@/components/buttons/CButtonCreateNew';
import CHeaderCard from '@/components/CHeaderCard';
import FilterLayout from '@/components/layouts/FilterLayout';
import DistrictTable from '@/features/districts/components/ui/DistrictTable';
import { API_KEY } from '@/features/districts/data/constant';
import { IDistrictItem } from '@/features/districts/data/interface';
import useDistrictFilter from '@/features/districts/hooks/useDistrictFilter';
import useDistrictState from '@/features/districts/hooks/useDistrictState';
import DistrictsService from '@/features/districts/service';
import SelectProvince from '@/features/provinces/components/form/SelectProvince';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DistrictPage() {
  const naviagte = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { onSuccess, onError } = useDistrictState();
  const {
    handleChangePagination,
    handleInputSearch,
    pagination,
    computtedFilter,
    handleSelectProvince,
  } = useDistrictFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.DISTRICT, computtedFilter],
    queryFn: async () => {
      const response = await DistrictsService.getAll(computtedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await DistrictsService.delete(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('District deleted successfully', () => {
        setOpenModal(false);
      });
    },
    onError,
  });
  const onDelete = useCallback(
    (record: IDistrictItem) => {
      mutate(Number(record._id));
    },
    [mutate]
  );
  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      <CHeaderCard
        title="District Listing"
        actions={<CButtonCreateNew onClick={() => naviagte('create')} />}
      />
      <Card>
        <FilterLayout>
          <CSearch placeholder="Search District" onInput={handleInputSearch} />
          <SelectProvince
            allowClear
            value={computtedFilter.provinceId}
            placeholder="Filter by Province"
            onChange={handleSelectProvince}
          />
        </FilterLayout>
        <DistrictTable
          data={data?.documentList || []}
          isLoading={isLoading}
          onDelete={onDelete}
          isDeleteLoading={isPending}
          pagination={{
            ...pagination,
            total: data?.totalDocuments || 0,
          }}
          notFound={isFetched && !data?.totalDocuments}
          onChange={handleChangePagination}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </Card>
    </div>
  );
}

export default DistrictPage;
