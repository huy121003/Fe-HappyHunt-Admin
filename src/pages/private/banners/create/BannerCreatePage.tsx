import BannerForm from '@/features/banners/components/form/BannerForm';
import useBannerState from '@/features/banners/hooks/useBannerState';
import BannerService from '@/features/banners/service';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

function BannerCreatePage() {
  const { onSuccess, onError } = useBannerState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await BannerService.create(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Banner created successfully');
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
      <BannerForm loading={isPending} onSubmit={onSubmit} />
    </div>
  );
}

export default BannerCreatePage;
