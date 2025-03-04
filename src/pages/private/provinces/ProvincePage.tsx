import { CSearch } from '@/components';
import CButtonCreateNew from '@/components/buttons/CButtonCreateNew';
import CHeaderCard from '@/components/CHeaderCard';
import FilterLayout from '@/components/layouts/FilterLayout';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';

import ProvinceTable from '@/features/provinces/components/ui/ProvinceTable';
import { API_KEY } from '@/features/provinces/data/constant';
import { IProvinceItem } from '@/features/provinces/data/interface';
import useProvinceFilter from '@/features/provinces/hooks/useProvinceFilter';
import useProvinceState from '@/features/provinces/hooks/useProvinceState';
import ProvincesService from '@/features/provinces/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function ProvincePage() {
  const naviagte = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { onSuccess, onError } = useProvinceState();
  const {
    handleChangePagination,
    handleInputSearch,
    pagination,
    computtedFilter,
  } = useProvinceFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.PROVINCE, computtedFilter],
    queryFn: async () => {
      const response = await ProvincesService.getAll(computtedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await ProvincesService.delete(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('Province deleted successfully', () => {
        setOpenModal(false);
      });
    },
    onError,
  });
  const onDelete = useCallback(
    (record: IProvinceItem) => {
      mutate(Number(record._id));
    },
    [mutate]
  );
  return (
    <div className="bg-gray-100 ">
      <CHeaderCard
        title="Province Listing"
        actions={
          <CButtonCreateNew
            codeName={IPERMISSION_CODE_NAME.PROVINCES}
            onClick={() => naviagte('create')}
          />
        }
      />
      <Card>
        <FilterLayout>
          <CSearch placeholder="Search Province" onInput={handleInputSearch} />
        </FilterLayout>
        <ProvinceTable
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

export default ProvincePage;
