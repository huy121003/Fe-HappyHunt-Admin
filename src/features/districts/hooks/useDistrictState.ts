import { postMessageHandler } from '@/components/ToastMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../data/constant';

const useDistrictState = () => {
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
    client.invalidateQueries({ queryKey: [API_KEY.DISTRICT] });
    client.invalidateQueries({ queryKey: [API_KEY.DISTRICT_DETAIL] });
    navigate('/addresses/districts');
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};
export default useDistrictState;
