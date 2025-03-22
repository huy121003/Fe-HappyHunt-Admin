import ProvinceForm from '@/features/provinces/components/form/ProvinceFrom';
import { API_KEY } from '@/features/provinces/data/constant';
import ProvincesService from '@/features/provinces/service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProvinceDetailPage() {
  const { province } = useParams<{ province: string }>();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.PROVINCE_DETAIL, province],
    queryFn: async () => {
      const response = await ProvincesService.getbyId(Number(province));
      return response;
    },
  });
  return (
    <div className="flex flex-1 flex-col gap-4">
      <ProvinceForm
        loading={isLoading}
        onSubmit={() => {}}
        data={data?.data}
        isView={true}
        title="Province Detail"
      />
    </div>
  );
}

export default ProvinceDetailPage;
