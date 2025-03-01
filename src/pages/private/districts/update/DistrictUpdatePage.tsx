import DistrictForm from '@/features/districts/components/form/DistrictForm';
import { API_KEY } from '@/features/districts/data/constant';
import useDistrictState from '@/features/districts/hooks/useDistrictState';
import DistrictsService from '@/features/districts/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';
import { useParams } from 'react-router-dom';

function DistrictUpdatePage() {
  const { districtId } = useParams<{ districtId: string }>();
  const { onSuccess, onError } = useDistrictState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.DISTRICT_DETAIL, districtId],
    queryFn: async () => {
      const response = await DistrictsService.getbyId(Number(districtId));
      return response;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await DistrictsService.update(Number(districtId), data);
      return response;
    },
    onSuccess: () => {
      onSuccess('District updated successfully');
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
      <DistrictForm
        loading={isPending || isLoading}
        onSubmit={onSubmit}
        data={data?.data}
        title="Province Update"
      />
    </div>
  );
}

export default DistrictUpdatePage;
