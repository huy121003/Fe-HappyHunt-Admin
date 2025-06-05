import CHeaderCard from '@/components/CHeaderCard';
import useChooseDateFilter from '@/hooks/useChooseDateFilter';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useState } from 'react';
import CChooseDate from '@/components/ui/CChooseDate';
import { API_KEY } from '@/features/user-statistics/data/constant';
import UserStatisticService from '@/features/user-statistics/service';
import UserStatisticChart from '@/features/user-statistics/components/UserStatisticChart';
import ExportExcel from '@/features/user-statistics/components/ExportExcel';

function UserStatisticPage() {
  const {
    computtedFilter,
    type,
    handleSelectType,
    handleSelectDate,
    start,
    end,
  } = useChooseDateFilter();
  const [_, setText] = useState('All');
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.USER_STATISTICS, computtedFilter],
    queryFn: async () => {
      const response = await UserStatisticService.getStatistic(computtedFilter);
      return response.data;
    },
  });

  return (
    <div className="bg-gray-100 ">
      <CHeaderCard
        title="New User Statistic"
        actions={
          <ExportExcel
            data={data || []}
            fileName="new-user-statistic"
            sheetName="new-user-statistic"
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

        <UserStatisticChart
          data={data || []}
          loading={isLoading || !isFetched}
        />
      </Card>
    </div>
  );
}

export default UserStatisticPage;
