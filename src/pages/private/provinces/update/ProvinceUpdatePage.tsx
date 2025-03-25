import ProvinceForm from '@/features/provinces/components/form/ProvinceFrom';
import { API_KEY } from '@/features/provinces/data/constant';
import useProvinceState from '@/features/provinces/hooks/useProvinceState';
import ProvincesService from '@/features/provinces/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

import { useParams } from 'react-router-dom';
function ProvinceUpdatePage() {
  const { province } = useParams<{ province: string }>();
  const { onSuccess } = useProvinceState();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.PROVINCE_DETAIL, province],
    queryFn: async () => {
      const response = await ProvincesService.getbyId(Number(province));
      return response;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await ProvincesService.update(Number(province), data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Province updated successfully');
    },
  });
  const onSubmit = useCallback(
    (values: any) => {
      mutate(values);
    },
    [mutate]
  );
  return (
    <div className="flex flex-1 flex-col gap-4">
      <ProvinceForm
        loading={isPending || isLoading}
        onSubmit={onSubmit}
        data={data?.data}
        title="Province Update"
      />
    </div>
  );
}

export default ProvinceUpdatePage;
