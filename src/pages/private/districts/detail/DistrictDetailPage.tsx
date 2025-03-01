import DistrictForm from '@/features/districts/components/form/DistrictForm';
import { API_KEY } from '@/features/districts/data/constant';
import DistrictsService from '@/features/districts/service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function DistrictDetailPage() {
  const { districtId } = useParams<{ districtId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.DISTRICT_DETAIL, districtId],
    queryFn: async () => {
      const response = await DistrictsService.getbyId(Number(districtId));
      return response;
    },
  });
  return (
    <div className="flex flex-1 flex-col gap-4">
      <DistrictForm
        loading={isLoading}
        onSubmit={() => {}}
        data={data?.data}
        isView={true}
        title="District Detail"
      />
    </div>
  );
}

export default DistrictDetailPage;
