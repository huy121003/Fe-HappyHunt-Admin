import { postMessageHandler } from '@/components/ToastMessage';
import { useMutation } from '@tanstack/react-query';

interface UseMutationWithHandlersProps<T> {
  mutationFn: (data: T) => Promise<any>;
  successMessage: string;
  onSuccessCallback?: () => void; // Thêm callback để thực hiện hành động khác sau khi thành công
}

export const useMutationWithHandlers = <T,>({
  mutationFn,
  successMessage,
  onSuccessCallback,
}: UseMutationWithHandlersProps<T>) => {
  const { mutate, isPending } = useMutation({
    mutationFn,
    onSuccess: () => {
      postMessageHandler({
        type: 'success',
        text: successMessage,
      });

      if (onSuccessCallback) {
        onSuccessCallback(); // Gọi callback nếu có
      }
    },
    onError: (error: Error) => {
      postMessageHandler({
        type: 'error',
        text: error.message,
      });
    },
  });

  return { mutate, isPending };
};
