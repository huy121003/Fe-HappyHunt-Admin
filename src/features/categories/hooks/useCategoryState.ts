import { useQueryClient } from '@tanstack/react-query';
import { API_KEY } from '../data/constant';
import { useNavigate } from 'react-router-dom';
import { postMessageHandler } from '@/components/ToastMessage';
import { AxiosError } from 'axios';
import { ICommonResponse } from '@/interfaces';

const useCategoryState = () => {
  const client = useQueryClient();
  const navigate = useNavigate();
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: 'success',
      text: successMessage,
    });
    client.invalidateQueries({ queryKey: [API_KEY.GET_CATEGORIES] });
    client.invalidateQueries({
      queryKey: [API_KEY.GET_CATEGORIES_PAGINATION],
    });
    client.invalidateQueries({ queryKey: [API_KEY.GET_CATEGORY_DETAIL] });
    navigate('/categories');
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

export default useCategoryState;
