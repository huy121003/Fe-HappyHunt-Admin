import ProvinceForm from '@/features/provinces/components/form/ProvinceFrom';
import { API_KEY } from '@/features/provinces/data/constant';
import ProvincesService from '@/features/provinces/service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function ProvinceDetailPage() {
  const { provinceId } = useParams<{ provinceId: string }>();

  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.PROVINCE_DETAIL, provinceId],
    queryFn: async () => {
      const response = await ProvincesService.getbyId(Number(provinceId));
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
        title='Province Detail'
      />
    </div>
  );
}

export default ProvinceDetailPage;
