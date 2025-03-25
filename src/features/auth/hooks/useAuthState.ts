import { postMessageHandler } from '@/components/ToastMessage';


const useAuthState = () => {
  const onSuccess = (
    successMessage: string,
    onSuccessCallback?: () => void
  ) => {
    postMessageHandler({
      type: 'success',
      text: successMessage,
    });

    if (onSuccessCallback) {
      onSuccessCallback();
    }
  };

  return { onSuccess };
};
export default useAuthState;
