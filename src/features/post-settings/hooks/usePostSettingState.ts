import { useQueryClient } from '@tanstack/react-query';
import { API_KEY } from '../data/constant';
import { postMessageHandler } from '@/components/ToastMessage';
import { AxiosError } from 'axios';
import { ICommonResponse } from '@/interfaces';

const usePostSettingState = () => {
  const client = useQueryClient();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: 'success',
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.POST_SETTING] });
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };
  const onError = (error: AxiosError<ICommonResponse<null>>) => {
    postMessageHandler({
      type: 'error',
      text: error.message,
    });
  };
  return { onSuccess, onError };
};
export default usePostSettingState;
