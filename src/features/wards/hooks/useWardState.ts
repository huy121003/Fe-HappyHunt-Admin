import { postMessageHandler } from '@/components/ToastMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../data/constant';

const useWardState = () => {
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
    client.invalidateQueries({ queryKey: [API_KEY.WARD] });
    client.invalidateQueries({ queryKey: [API_KEY.WARD_DETAIL] });
    navigate('/addresses/wards');
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};
export default useWardState;
