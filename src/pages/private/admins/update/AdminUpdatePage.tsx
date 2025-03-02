import AdminForm from '@/features/admins/components/form/AdminForm';
import { API_KEY } from '@/features/admins/data/constant';
import { IAdminPayload } from '@/features/admins/data/interface';
import useAdminState from '@/features/admins/hooks/useAdminState';
import AdminService from '@/features/admins/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

function AdminUpdatePage() {
  const { adminId } = useParams<{ adminId: string }>();
  const { onSuccess, onError } = useAdminState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.ADMIN_DETAIL, adminId],
    queryFn: async () => {
      const response = await AdminService.getById(Number(adminId));
      return response;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IAdminPayload) => {
      const response = await AdminService.update(Number(adminId), data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Admin updated successfully');
    },
    onError,
  });
  const onSubmit = useCallback(
    (values: IAdminPayload) => {
      mutate(values);
    },
    [mutate]
  );
  return (
    <div className="flex flex-1 flex-col gap-4">
      <AdminForm
        loading={isLoading || isPending}
        onSubmit={onSubmit}
        data={data?.data}
        title="Admin Update"
        isEdit={true}
      />
    </div>
  );
}

export default AdminUpdatePage;
