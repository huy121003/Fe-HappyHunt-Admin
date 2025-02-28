import CHeaderCard from '@/components/CHeaderCard';
import PostSettingForm from '@/features/post-settings/components/form/PostSettingForm';
import { API_KEY } from '@/features/post-settings/data/constant';
import { IPostSetting } from '@/features/post-settings/data/interface';
import usePostSettingState from '@/features/post-settings/hooks/usePostSettingState';
import PostSettingService from '@/features/post-settings/service';
import { ReloadOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button } from 'antd';
import { useState } from 'react';

function PostSettingPage() {
  const { onSuccess, onError } = usePostSettingState();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST_SETTING],
    queryFn: async () => {
      const response = await PostSettingService.get();
      return response.data;
    },
  });
  const updateMutation = useMutation({
    mutationFn: async (data: IPostSetting) => {
      const response = await PostSettingService.update(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Post setting updated successfully', () => setIsEdit(false));
    },
    onError,
  });
  const updateDefaultMutation = useMutation({
    mutationFn: async () => {
      const response = await PostSettingService.updateDefault();
      return response;
    },
    onSuccess: () => {
      onSuccess('Set default post setting successfully');
    },
    onError,
  });
  const onUpdate = (values: IPostSetting) => {
    updateMutation.mutate(values);
  };
  const onReset = () => {
    updateDefaultMutation.mutate();
  };

  return (
    <div className=" flex-1 flex flex-col h-full overflow-hidden">
      <CHeaderCard
        title="Post Setting"
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
      <PostSettingForm
        data={data || undefined}
        loading={isLoading}
        disabled={isFetched}
        onSubmit={onUpdate}
        isEdit={isEdit}
        setIsEdit={setIsEdit}
      />
    </div>
  );
}

export default PostSettingPage;
