import WardForm from '@/features/wards/components/form/WardForm';
import { API_KEY } from '@/features/wards/data/constant';
import WardService from '@/features/wards/service';
import { useQuery } from '@tanstack/react-query';

import { useParams } from 'react-router-dom';

function WardUpdatePage() {
  const { wardId } = useParams<{ wardId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.WARD_DETAIL, wardId],
    queryFn: async () => {
      const response = await WardService.getById(Number(wardId));
      return response;
    },
  });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <WardForm
        loading={isLoading}
        onSubmit={() => {}}
        data={data?.data}
        title="Ward Detail"
        isView={true}
      />
    </div>
  );
}

export default WardUpdatePage;
