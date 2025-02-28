import CHeaderCard from '@/components/CHeaderCard';
import VipActivationForm from '@/features/vip-activations/components/form/VipActivationForm';
import { API_KEY } from '@/features/vip-activations/data/constant';
import { IVipActivation } from '@/features/vip-activations/data/interface';
import useVipActivationState from '@/features/vip-activations/hooks/useVipActivationState';
import VipActivationService from '@/features/vip-activations/service';

import { ReloadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useState } from 'react';

function VipActivationPage() {
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { onSuccess, onError } = useVipActivationState();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.VIP_ACTIVATION],
    queryFn: async () => {
      const response = await VipActivationService.get();
      return response.data;
    },
  });
  const updateMutation = useMutation({
    mutationFn: async (data: IVipActivation) => {
      const response = await VipActivationService.update(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Vip activation updated successfully', () => {
        setIsEdit(false);
      });
    },
    onError,
  });
  const updateDefaultMutation = useMutation({
    mutationFn: async () => {
      const response = await VipActivationService.updateDefault();
      return response;
    },
    onSuccess: () => {
      onSuccess('Set default vip activation successfully');
    },
    onError,
  });
  const onUpdate = (values: IVipActivation) => {
    updateMutation.mutate(values);
  };
  const onReset = () => {
    updateDefaultMutation.mutate();
  };

  return (
    <div className=" flex-1 flex flex-col h-full overflow-hidden">
      <CHeaderCard
        title="Vip Activation"
        actions={
          <Button
            className="bg-flame-orange text-white"
            loading={updateDefaultMutation.isPending}
            onClick={onReset}
            disabled={isEdit}
          >
            <ReloadOutlined /> Reset Default
          </Button>
        }
      />
      <VipActivationForm
        data={data || undefined}
        loading={isLoading}
        onSubmit={onUpdate}
        disabled={isFetched}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
}

export default VipActivationPage;
