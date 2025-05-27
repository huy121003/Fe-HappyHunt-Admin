import CHeaderCard from '@/components/CHeaderCard';
import PaymentStatisticChart from '@/features/payment-statistics/components/PaymentStatisticChart';
import TotalGrand from '@/features/payment-statistics/components/TotalGrand';
import { API_KEY } from '@/features/payment-statistics/data/constant';
import useChooseDateFilter from '@/hooks/useChooseDateFilter';
import PaymentStatisticService from '@/features/payment-statistics/service';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { useState } from 'react';
import CChooseDate from '@/components/ui/CChooseDate';

function PaymentStatisticPage() {
  const {
    computtedFilter,
    type,
    handleSelectType,
    handleSelectDate,
    start,
    end,
  } = useChooseDateFilter(); // Include status

  const [text, setText] = useState('All');
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.PAYMENT_STATISTICS, computtedFilter],
    queryFn: async () => {
      const response =
        await PaymentStatisticService.getStatistic(computtedFilter);
      return response.data[0];
    },
  });

  return (
    <div className="bg-gray-100 ">
      <CHeaderCard title="Payment Statistic" actions={null} />
      <Card>
        <CChooseDate
          type={type}
          handleSelectType={handleSelectType}
          handleSelectDate={handleSelectDate}
          start={start?.toString()}
          end={end?.toString()}
          setText={setText}
        />
        <TotalGrand
          grandTotalInvoices={data?.grandTotalInvoices}
          grandTotalAmount={data?.grandTotalAmount}
          text={text}
        />
        <PaymentStatisticChart
          data={data?.data || []}
          loading={isLoading || !isFetched}
        />
      </Card>
    </div>
  );
}

export default PaymentStatisticPage;
