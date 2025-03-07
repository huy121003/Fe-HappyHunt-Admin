import { CSearch } from '@/components';
import CHeaderCard from '@/components/CHeaderCard';
import CSelect from '@/components/CSelect';
import FilterLayout from '@/components/layouts/FilterLayout';
import UserTable from '@/features/users/components/ui/UserTable';
import { API_KEY } from '@/features/users/data/constant';
import useUserFilter from '@/features/users/hooks/useUserFilter';
import useUserState from '@/features/users/hooks/useUserState';
import UserService from '@/features/users/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useCallback, useState } from 'react';

function UserPage() {
  const [openModal, setOpenModal] = useState(false);
  const [openActiveModal, setOpenActiveModal] = useState(false);
  const { onSuccess, onError } = useUserState();
  const {
    handleChangePagination,
    handleInputSearch,
    pagination,
    computtedFilter,
    handleInputPhoneNumber,
    handleSelectIsVip,
    handleSelectIsBanned,
  } = useUserFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.USER, computtedFilter],
    queryFn: async () => {
      const response = await UserService.getAll(computtedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await UserService.delete(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('User deleted successfully', () => {
        setOpenModal(false);
      });
    },
    onError,
  });
  const { mutate: mutateStatus, isPending: isPendingStatus } = useMutation({
    mutationFn: async (record: any) => {
      const response = await UserService.banned(record._id, !record.isBanned);
      return response;
    },
    onSuccess: () => {
      onSuccess('User status updated successfully', () => {
        setOpenActiveModal(false);
      });
    },
    onError,
  });
  const onDelete = useCallback(
    (record: any) => {
      mutate(record._id);
    },
    [mutate]
  );
  const onActive = useCallback(
    (record: any) => {
      mutateStatus(record);
    },
    [mutateStatus]
  );
  return (
    <div className="bg-gray-100 ">
      <CHeaderCard title="User Listing" actions={null} />
      <Card>
        <FilterLayout>
          <CSearch placeholder="Search user name" onInput={handleInputSearch} />
          <CSearch
            placeholder="Search user phone number"
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
          <CSelect
            placeholder="VIP status"
            allowClear
            options={[
              { label: 'VIP', value: 'true' },
              { label: 'Not VIP', value: 'false' },
            ]}
            onChange={handleSelectIsVip}
          />
        </FilterLayout>
        <UserTable
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

export default UserPage;
