import QAChatBotForm from '@/features/qa-chatbots/components/form/QAChatBotForm';
import { API_KEY } from '@/features/qa-chatbots/data/constant';
import QAChatbotsService from '@/features/qa-chatbots/service';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
function QAChatbotDetailPage() {
  const { qAChatbotId } = useParams<{ qAChatbotId: string }>();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.Q_A_CHATBOTS_DETAIL, qAChatbotId],
    queryFn: async () => {
      const response = await QAChatbotsService.getById(Number(qAChatbotId));
      return response;
    },
  });
  return (
    <div className="flex flex-1 flex-col gap-4">
      <QAChatBotForm
        loading={isLoading}
        onSubmit={() => {}}
        data={data?.data}
        isView={true}
      />
    </div>
  );
}

export default QAChatbotDetailPage;
