import DistrictForm from '@/features/districts/components/form/DistrictForm';
import useDistrictState from '@/features/districts/hooks/useDistrictState';
import DistrictsService from '@/features/districts/service';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

function DistrictCreatePage() {
  const { onSuccess, onError } = useDistrictState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await DistrictsService.create(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('District created successfully');
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
      <DistrictForm loading={isPending} onSubmit={onSubmit} />
    </div>
  );
}

export default DistrictCreatePage;
