import QAChatBotForm from '@/features/qa-chatbots/components/form/QAChatBotForm';
import { IQAChatbotPayload } from '@/features/qa-chatbots/data/interface';
import useQAChatBotState from '@/features/qa-chatbots/hooks/useQAChatBotState';
import QAChatbotsService from '@/features/qa-chatbots/service';
import { useMutation } from '@tanstack/react-query';
import { useCallback } from 'react';

function QAChatbotCreatePage() {
  const { onSuccess } = useQAChatBotState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IQAChatbotPayload) => {
      const response = await QAChatbotsService.create(data);
      return response;
    },
    onSuccess: () => {
      onSuccess('Q&A Chatbot created successfully');
    },
  });
  const onSubmit = useCallback(
    (values: IQAChatbotPayload) => {
      mutate(values);
    },
    [mutate]
  );
  return (
    <div className="flex flex-1 flex-col gap-4">
      <QAChatBotForm loading={isPending} onSubmit={onSubmit} />
    </div>
  );
}

export default QAChatbotCreatePage;
