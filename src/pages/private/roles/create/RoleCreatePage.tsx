import RoleForm from '@/features/roles/components/form/RoleForm';
import { IRolePayload } from '@/features/roles/data/interface';
import useRoleState from '@/features/roles/hooks/useRoleState';
import RolesService from '@/features/roles/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { API_KEY as API_KEY_PERMISSION } from '@/features/permissions/data/constant';
import PermissionsService from '@/features/permissions/service';
function RoleCreatePage() {
  const { onSuccess, onError } = useRoleState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY_PERMISSION.PERMISSIONS],
    queryFn: async () => {
      const response = await PermissionsService.getAll();
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IRolePayload) => {
      const response = await RolesService.create(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Role created successfully');
    },
    onError,
  });
  const onSubmit = useCallback(
    (values: IRolePayload) => {
      mutate(values);
    },
    [mutate]
  );
  return (
    <div className="flex flex-1 flex-col gap-4">
      <RoleForm
        loading={isPending || isLoading}
        onSubmit={onSubmit}
        data={{
          permissions: data || [],
        }}
      />
    </div>
  );
}

export default RoleCreatePage;
