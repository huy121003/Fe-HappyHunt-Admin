import ProvinceForm from '@/features/provinces/components/form/ProvinceFrom';

import { IProvincePayload } from '@/features/provinces/data/interface';
import useProvinceState from '@/features/provinces/hooks/useProvinceState';
import ProvincesService from '@/features/provinces/service';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

function ProvinceCreatePage() {
  const { onSuccess, onError } = useProvinceState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IProvincePayload) => {
      const response = await ProvincesService.create(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Province created successfully');
    },
    onError,
  });
  const onSubmit = useCallback(
    (values: IProvincePayload) => {
      mutate(values);
    },
    [mutate]
  );
  return (
    <div className="flex flex-1 flex-col gap-4">
      <ProvinceForm loading={isPending} onSubmit={onSubmit} />
    </div>
  );
}

export default ProvinceCreatePage;
