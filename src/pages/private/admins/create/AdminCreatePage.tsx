import AdminForm from '@/features/admins/components/form/AdminForm';
import useAdminState from '@/features/admins/hooks/useAdminState';
import AdminService from '@/features/admins/service';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

function AdminCreatePage() {
  const { onSuccess, onError } = useAdminState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await AdminService.create(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Admin created successfully');
    },
    onError,
  });
  const onSubmit = useCallback(
    (values: any) => {
      mutate(values);
    },
    [mutate]
  );

  return (
    <div className="flex flex-1 flex-col gap-4">
      <AdminForm loading={isPending} onSubmit={onSubmit} />
    </div>
  );
}

export default AdminCreatePage;
