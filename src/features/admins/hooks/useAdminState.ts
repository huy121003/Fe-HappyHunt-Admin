import { postMessageHandler } from '@/components/ToastMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../data/constant';

const useAdminState = () => {
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
    client.invalidateQueries({ queryKey: [API_KEY.ADMIN] });
    client.invalidateQueries({ queryKey: [API_KEY.ADMIN_DETAIL] });
    navigate('/admin_roles/admins');
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};

export default useAdminState;
