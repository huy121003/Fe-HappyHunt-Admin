import CHeaderCard from '@/components/CHeaderCard';
import useChooseDateFilter from '@/hooks/useChooseDateFilter';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useState } from 'react';
import CChooseDate from '@/components/ui/CChooseDate';
import PostStatisticService from '@/features/post-statistic/service';
import { API_KEY } from '@/features/post-statistic/data/constant';
import PostStatisticChart from '@/features/post-statistic/components/PostStatisticChart';
import ExportExcel from '@/features/post-statistic/components/ExportExcel';

function PostStatisticPage() {
  const {
    computtedFilter,
    type,
    handleSelectType,
    handleSelectDate,
    start,
    end,
  } = useChooseDateFilter(); // Include status
  const [_, setText] = useState('All');
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.POST_STATISTICS, computtedFilter],
    queryFn: async () => {
      const response = await PostStatisticService.getStatistic(computtedFilter);
      return response.data;
    },
  });
  return (
    <div className="bg-gray-100 ">
      <CHeaderCard
        title="New Post Statistic"
        actions={
          <ExportExcel
            data={data || []}
            fileName="new-post-statistic"
            sheetName="new-post-statistic"
          />
        }
      />
      <Card>
        <CChooseDate
          type={type}
          handleSelectType={handleSelectType}
          handleSelectDate={handleSelectDate}
          start={start?.toString()}
          end={end?.toString()}
          setText={setText}
        />

        <PostStatisticChart
          data={data || []}
          loading={isLoading || !isFetched}
        />
      </Card>
    </div>
  );
}

export default PostStatisticPage;
