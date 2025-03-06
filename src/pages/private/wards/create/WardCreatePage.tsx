import WardForm from '@/features/wards/components/form/WardForm';
import useWardState from '@/features/wards/hooks/useWardState';
import WardService from '@/features/wards/service';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

function WardCreatePage() {
  const { onSuccess, onError } = useWardState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await WardService.create(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Ward created successfully');
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
      <WardForm loading={isPending} onSubmit={onSubmit} />
    </div>
  );
}

export default WardCreatePage;
