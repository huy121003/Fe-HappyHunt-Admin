import { postMessageHandler } from '@/components/ToastMessage';
import { useQueryClient } from '@tanstack/react-query';
import { API_KEY } from '../data/constant';
import { useNavigate } from 'react-router-dom';

const useQAChatBotState = () => {
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
    client.invalidateQueries({ queryKey: [API_KEY.Q_A_CHATBOTS] });
    client.invalidateQueries({ queryKey: [API_KEY.Q_A_CHATBOTS_DETAIL] });
    navigate('/q&a');
    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};

export default useQAChatBotState;
