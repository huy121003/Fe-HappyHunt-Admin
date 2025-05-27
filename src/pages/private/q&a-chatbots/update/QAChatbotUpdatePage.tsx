import QAChatBotForm from '@/features/qa-chatbots/components/form/QAChatBotForm';
import { useParams } from 'react-router-dom';
import { API_KEY } from '@/features/qa-chatbots/data/constant';
import { IQAChatbotPayload } from '@/features/qa-chatbots/data/interface';
import useQAChatBotState from '@/features/qa-chatbots/hooks/useQAChatBotState';
import QAChatbotsService from '@/features/qa-chatbots/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useCallback } from 'react';

function QAChatbotUpdatePage() {
  const { qAChatbotId } = useParams<{ qAChatbotId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.Q_A_CHATBOTS_DETAIL, qAChatbotId],
    queryFn: async () => {
      const response = await QAChatbotsService.getById(Number(qAChatbotId));
      return response;
    },
  });
  const { onSuccess } = useQAChatBotState();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: IQAChatbotPayload) => {
      const response = await QAChatbotsService.update(
        Number(qAChatbotId),
        data
      );
      return response;
    },
    onSuccess: () => {
      onSuccess('Q&A Chatbot updated successfully');
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
      <QAChatBotForm
        loading={isPending || isLoading}
        onSubmit={onSubmit}
        data={data?.data}
        title=" Q&A Chatbot Update"
      />
    </div>
  );
}

export default QAChatbotUpdatePage;
