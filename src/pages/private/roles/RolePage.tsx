import { CSearch } from '@/components';
import CButtonCreateNew from '@/components/buttons/CButtonCreateNew';
import CHeaderCard from '@/components/CHeaderCard';
import FilterLayout from '@/components/layouts/FilterLayout';
import RoleTable from '@/features/roles/components/ui/RoleTable';
import { API_KEY } from '@/features/roles/data/constant';
import { IRoleItem } from '@/features/roles/data/interface';
import useRoleFilter from '@/features/roles/hooks/useRoleFilter';
import useRoleState from '@/features/roles/hooks/useRoleState';
import RolesService from '@/features/roles/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

function RolePage() {
  const naviagte = useNavigate();
  const { onSuccess, onError } = useRoleState();
  const {
    handleChangePagination,
    handleInputSearch,
    pagination,
    computtedFilter,
  } = useRoleFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.ROLES, computtedFilter],
    queryFn: async () => {
      const response = await RolesService.getAll(computtedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await RolesService.delete(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('Role deleted successfully');
    },
    onError,
  });

  const onDelete = useCallback((record: IRoleItem) => {
    mutate(Number(record._id));
  }, [mutate]);

  return (
    <div className="bg-gray-100 h-screen overflow-hidden">
      <CHeaderCard
        title="User Management Listing"
        actions={<CButtonCreateNew onClick={() => naviagte('/roles/create')} />}
      />
      <Card className="!mt-4 overflow-auto">
        <FilterLayout>
          <CSearch
            placeholder="Search by name"
            onInput={handleInputSearch}
            className="!w-96"
          />
        </FilterLayout>

        <RoleTable
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
        />
      </Card>
    </div>
  );
}

export default RolePage;
