import BannerForm from '@/features/banners/components/form/BannerForm';
import { API_KEY } from '@/features/banners/data/constant';
import BannerService from '@/features/banners/service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';

function BannerDetailPage() {
  const { bannerId } = useParams<{ bannerId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.BANNER_DETAIL, bannerId],
    queryFn: async () => {
      const response = await BannerService.getbyId(Number(bannerId));
      return response;
    },
  });

  return (
    <div className="flex flex-1 flex-col gap-4">
      <BannerForm
        loading={isLoading}
        onSubmit={() => {}}
        data={data?.data}
        isView={true}
        title="Banner Detail"
      />
    </div>
  );
}

export default BannerDetailPage;
