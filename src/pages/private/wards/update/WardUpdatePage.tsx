import WardForm from '@/features/wards/components/form/WardForm';
import { API_KEY } from '@/features/wards/data/constant';
import useWardState from '@/features/wards/hooks/useWardState';
import WardService from '@/features/wards/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

function WardUpdatePage() {
  const { wardId } = useParams<{ wardId: string }>();
  const { onSuccess, onError } = useWardState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.WARD_DETAIL, wardId],
    queryFn: async () => {
      const response = await WardService.getById(Number(wardId));
      return response;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await WardService.update(Number(wardId), data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Ward updated successfully');
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
      <WardForm
        loading={isPending || isLoading}
        onSubmit={onSubmit}
        data={data?.data}
        title="Ward Update"
      />
    </div>
  )
}

export default WardUpdatePage;
