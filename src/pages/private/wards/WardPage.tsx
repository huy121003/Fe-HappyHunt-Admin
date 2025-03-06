import { CSearch } from '@/components';
import CButtonCreateNew from '@/components/buttons/CButtonCreateNew';
import CHeaderCard from '@/components/CHeaderCard';
import FilterLayout from '@/components/layouts/FilterLayout';
import SelectDictrict from '@/features/districts/components/form/SelectDictrict';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';
import SelectProvince from '@/features/provinces/components/form/SelectProvince';
import WardTable from '@/features/wards/components/ui/WardTable';
import { API_KEY } from '@/features/wards/data/constant';
import { IWardItem } from '@/features/wards/data/interface';
import useWardFilter from '@/features/wards/hooks/useWardFilter';
import useWardState from '@/features/wards/hooks/useWardState';
import WardService from '@/features/wards/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function WardPage() {
  const navigate = useNavigate();
  const { onSuccess, onError } = useWardState();
  const [openModal, setOpenModal] = useState(false);
  const {
    handleChangePagination,
    handleInputSearch,
    pagination,
    computtedFilter,
    handleSelectProvince,
    handleSelectDistrict,
  } = useWardFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.WARD, computtedFilter],
    queryFn: async () => {
      const response = await WardService.getAll(computtedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await WardService.delete(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('Ward deleted successfully', () => {
        setOpenModal(false);
      });
    },
    onError,
  });
  const onDelete = useCallback(
    (record: IWardItem) => {
      mutate(Number(record._id));
    },
    [mutate]
  );
  return (
    <div className="bg-gray-100 h-screen ">
      <CHeaderCard
        title="Ward Listing"
        actions={
          <CButtonCreateNew
            codeName={IPERMISSION_CODE_NAME.WARDS}
            onClick={() => navigate('create')}
          />
        }
      />
      <Card>
        <FilterLayout>
          <CSearch placeholder="Search Ward" onInput={handleInputSearch} />
          <SelectProvince
            value={computtedFilter.provinceId}
            allowClear
            placeholder="Select Country"
            onSelect={handleSelectProvince}
          />
          <SelectDictrict
            value={computtedFilter.districtId}
            allowClear
            placeholder="Select District"
            onSelect={handleSelectDistrict}
            disabled={!computtedFilter.provinceId}
            provinceId={computtedFilter.provinceId}
          />
        </FilterLayout>
        <WardTable
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

export default WardPage;
