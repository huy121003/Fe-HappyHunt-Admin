import { postMessageHandler } from '@/components/ToastMessage';
import { ICommonResponse } from '@/interfaces';
import { useQueryClient } from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { API_KEY } from '../data/constant';
import { useNavigate } from 'react-router-dom';

const useRoleState = () => {
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
    client.invalidateQueries({ queryKey: [API_KEY.ROLES] });
    client.invalidateQueries({ queryKey: [API_KEY.ROLE_DETAIL] });
    navigate('/admin_roles/roles');
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

export default useRoleState;
