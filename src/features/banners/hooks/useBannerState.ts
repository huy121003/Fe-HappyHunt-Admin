import { postMessageHandler } from '@/components/ToastMessage';
import { useQueryClient } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { API_KEY } from '../data/constant';

const useBannerState = () => {
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
    client.invalidateQueries({ queryKey: [API_KEY.BANNER] });
    client.invalidateQueries({ queryKey: [API_KEY.BANNER_DETAIL] });
    client.invalidateQueries({ queryKey: [API_KEY.BANNER_PAGINATION] });
    navigate('/banners');
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};
export default useBannerState;
