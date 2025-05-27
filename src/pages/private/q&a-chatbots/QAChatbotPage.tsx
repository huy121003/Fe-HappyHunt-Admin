import { CSearch } from '@/components';
import CButtonCreateNew from '@/components/buttons/CButtonCreateNew';
import CHeaderCard from '@/components/CHeaderCard';
import FilterLayout from '@/components/layouts/FilterLayout';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';
import QAChatBotTable from '@/features/qa-chatbots/components/ui/QAChatBotTable';
import { API_KEY } from '@/features/qa-chatbots/data/constant';
import { IQAChatbotItem } from '@/features/qa-chatbots/data/interface';
import useQAChatbotFilter from '@/features/qa-chatbots/hooks/useQAChatbotFilter';
import useQAChatBotState from '@/features/qa-chatbots/hooks/useQAChatBotState';
import QAChatbotsService from '@/features/qa-chatbots/service';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useCallback, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function QAChatbotPage() {
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const { onSuccess } = useQAChatBotState();
  const {
    handleChangePagination,
    handleInputAnswer,
    handleInputSearch,
    pagination,
    computtedFilter,
  } = useQAChatbotFilter();
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.Q_A_CHATBOTS, computtedFilter],
    queryFn: async () => {
      const response = await QAChatbotsService.getAll(computtedFilter);
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (id: number) => {
      const response = await QAChatbotsService.remove(id);
      return response;
    },
    onSuccess: () => {
      onSuccess('Delete Q&A Chatbot Successfully', () => {
        setOpenModal(false);
      });
    },
  });
  const onDelete = useCallback(
    (record: IQAChatbotItem) => {
      mutate(Number(record._id));
    },
    [mutate]
  );
  return (
    <div className="bg-gray-100">
      <CHeaderCard
        title="Q&A Chatbot Listing"
        actions={
          <CButtonCreateNew
            codeName={IPERMISSION_CODE_NAME.PROVINCES}
            onClick={() => navigate('create')}
          />
        }
      />
      <Card>
        <FilterLayout>
          <CSearch
            placeholder="Search by Question"
            onInput={handleInputSearch}
          />
          <CSearch placeholder="Search by Answer" onInput={handleInputAnswer} />
        </FilterLayout>
        <QAChatBotTable
          data={data?.documentList || []}
          isLoading={isLoading}
          onDelete={onDelete}
          isDeleteLoading={isPending}
          pagination={{
            ...pagination,
            total: data?.totalDocuments || 0,
          }}
          notFound={isFetched && !data?.totalDocuments}
          onChange={handleChangePagination}
          openModal={openModal}
          setOpenModal={setOpenModal}
        />
      </Card>
    </div>
  );
}

export default QAChatbotPage;
