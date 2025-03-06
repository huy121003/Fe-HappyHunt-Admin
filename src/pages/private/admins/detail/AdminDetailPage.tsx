import AdminForm from '@/features/admins/components/form/AdminForm';
import { API_KEY } from '@/features/admins/data/constant';

import AdminService from '@/features/admins/service';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

function AdminDetailPage() {
  const { adminId } = useParams<{ adminId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.ADMIN_DETAIL, adminId],
    queryFn: async () => {
      const response = await AdminService.getById(Number(adminId));
      return response;
    },
  });
  return (
    <div className="flex flex-1 flex-col gap-4">
      <AdminForm
        loading={isLoading}
        onSubmit={() => {}}
        data={data?.data}
        title="Admin Detail"
        isView
      />
    </div>
  );
}

export default AdminDetailPage;
