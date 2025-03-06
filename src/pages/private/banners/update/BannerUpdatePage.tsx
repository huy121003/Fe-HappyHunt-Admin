import BannerForm from '@/features/banners/components/form/BannerForm';
import { API_KEY } from '@/features/banners/data/constant';
import { IBannerPayload } from '@/features/banners/data/interface';
import useBannerState from '@/features/banners/hooks/useBannerState';
import BannerService from '@/features/banners/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

function BannerUpdatePage() {
  const { bannerId } = useParams<{ bannerId: string }>();
  const { onSuccess, onError } = useBannerState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.BANNER_DETAIL, bannerId],
    queryFn: async () => {
      const response = await BannerService.getbyId(Number(bannerId));
      return response;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IBannerPayload) => {
      const response = await BannerService.update(Number(bannerId), data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Banner updated successfully');
    },
    onError,
  });
  const onSubmit = useCallback(
    (values: IBannerPayload) => {
      mutate(values);
    },
    [mutate]
  );
  return (
    <div className="flex flex-1 flex-col gap-4">
      <BannerForm
        loading={isLoading || isPending}
        onSubmit={onSubmit}
        data={data?.data}
        title="Banner Update"
      />
    </div>
  );
}

export default BannerUpdatePage;
