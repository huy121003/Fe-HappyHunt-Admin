import RoleForm from '@/features/roles/components/form/RoleForm';
import { IRolePayload } from '@/features/roles/data/interface';
import useRoleState from '@/features/roles/hooks/useRoleState';
import RolesService from '@/features/roles/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { API_KEY as API_KEY_PERMISSION } from '@/features/permissions/data/constant';
import PermissionsService from '@/features/permissions/service';
import { API_KEY } from '@/features/roles/data/constant';
import { useParams } from 'react-router-dom';
function RoleUpdatePage() {
  const { roleId } = useParams<{ roleId: string }>();
  const { onSuccess, onError } = useRoleState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY_PERMISSION.PERMISSIONS],
    queryFn: async () => {
      const response = await PermissionsService.getAll();
      return response.data;
    },
  });
  const { data: roleData, isLoading: roleLoading } = useQuery({
    queryKey: [API_KEY.ROLE_DETAIL, roleId],
    queryFn: async () => {
      const response = await RolesService.getbyId(Number(roleId));
      return response;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IRolePayload) => {
      const response = await RolesService.update(Number(roleId), data);
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
  const allPermissionsMap = new Map(
    (data || []).map((perm) => [perm.name, perm]) // Ưu tiên data trước
  );

  (roleData?.data?.permissions || []).forEach((rolePerm) => {
    allPermissionsMap.set(rolePerm.name, rolePerm); // Nếu trùng, sẽ ghi đè bằng roleData
  });

  const allPermissions = Array.from(allPermissionsMap.values());

  return (
    <div className="flex flex-1 flex-col gap-4">
      <RoleForm
        loading={isPending || isLoading || roleLoading}
        onSubmit={onSubmit}
        data={{
          ...roleData?.data,
          permissions: allPermissions,
        }}
        title="Role Update"
      />
    </div>
  );
}

export default RoleUpdatePage;
