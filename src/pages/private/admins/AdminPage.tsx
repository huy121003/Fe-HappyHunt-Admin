import { CSearch } from '@/components';
import CButtonCreateNew from '@/components/buttons/CButtonCreateNew';
import CHeaderCard from '@/components/CHeaderCard';
import CSelect from '@/components/CSelect';
import FilterLayout from '@/components/layouts/FilterLayout';
import AdminTable from '@/features/admins/components/ui/AdminTable';
import { API_KEY } from '@/features/admins/data/constant';
import { IAdminItem } from '@/features/admins/data/interface';
import useAdminFilter from '@/features/admins/hooks/useAdminFilter';
import useAdminState from '@/features/admins/hooks/useAdminState';
import AdminService from '@/features/admins/service';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';
import SelectRole from '@/features/roles/components/form/SelectRole';

import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function AdminPage() {
  const naviagte = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [openActiveModal, setOpenActiveModal] = useState(false);
  const { onSuccess, onError } = useAdminState();
  const {
    handleChangePagination,
    handleInputSearch,
    pagination,
    computtedFilter,
    handleSelectRole,
    handleInputPhoneNumber,
    handleSelectIsBanned,
  } = useAdminFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.ADMIN, computtedFilter],
    queryFn: async () => {
      const response = await AdminService.getAll(computtedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await AdminService.delete(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('Admin deleted successfully', () => {
        setOpenModal(false);
      });
    },
    onError,
  });
  const { mutate: mutateStatus, isPending: isPendingStatus } = useMutation({
    mutationFn: async (record: IAdminItem) => {
      const response = await AdminService.banned(record._id, !record.isBanned);
      return response;
    },
    onSuccess: () => {
      onSuccess('Admin status updated successfully', () => {
        setOpenActiveModal(false);
      });
    },
    onError,
  });
  const onDelete = useCallback(
    (record: IAdminItem) => {
      mutate(record._id);
    },
    [mutate]
  );
  const onActive = useCallback(
    (record: IAdminItem) => {
      mutateStatus(record);
    },
    [mutateStatus]
  );
  return (
    <div className="bg-gray-100 ">
      <CHeaderCard
        title="Admin Listing"
        actions={
          <CButtonCreateNew
            codeName={IPERMISSION_CODE_NAME.ADMINS}
            onClick={() => naviagte('create')}
          />
        }
      />
      <Card>
        <FilterLayout>
          <CSearch
            placeholder="Search admin name"
            onInput={handleInputSearch}
          />
          <CSearch
            placeholder="Search admin phone number"
            onInput={handleInputPhoneNumber}
          />
          <CSelect
            placeholder="Ban status"
            allowClear
            options={[
              { label: 'Banned', value: 'false' },
              { label: 'Not banned', value: 'true' },
            ]}
            onChange={handleSelectIsBanned}
          />
          <SelectRole
            placeholder="Select Role"
            allowClear
            showSearch
            onChange={handleSelectRole}
          />
        </FilterLayout>
        <AdminTable
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

export default AdminPage;
