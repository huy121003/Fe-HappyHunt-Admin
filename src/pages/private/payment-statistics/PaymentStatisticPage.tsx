import CButton from '@/components/buttons/CButton';
import CHeaderCard from '@/components/CHeaderCard';
import PaymentStatisticChart from '@/features/payment-statistics/components/PaymentStatisticChart';
import TotalGrand from '@/features/payment-statistics/components/TotalGrand';
import {
  API_KEY,
  Type1,
  Type2,
} from '@/features/payment-statistics/data/constant';
import usePaymentStatistic from '@/features/payment-statistics/hooks/usePaymentStatistic';
import PaymentStatisticService from '@/features/payment-statistics/service';
import { DownOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Button, Card, Flex, DatePicker, Dropdown } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';
const { RangePicker } = DatePicker;
function PaymentStatisticPage() {
  const {
    computtedFilter,
    type,
    handleSelectType,
    handleSelectDate,
    start,
    end,
  } = usePaymentStatistic(); // Include status
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
    null,
    null,
  ]);
  const [visible, setVisible] = useState(false);
  const [text, setText] = useState('All');
  const { data, isLoading, isFetched } = useQuery({
    queryKey: [API_KEY.PAYMENT_STATISTICS, computtedFilter],
    queryFn: async () => {
      const response =
        await PaymentStatisticService.getStatistic(computtedFilter);
      return response.data[0];
    },
  });

  const handleMenuClick = (e: any) => {
    if (e.key === 'CUSTOM') {
      setShowDatePicker(true);

      e.preventDefault();
    } else {
      setText(Type2.find((item) => item.value === e.key)?.label || 'All');

      setShowDatePicker(false);

      handleSelectType(e.key);
      setVisible(true);
    }
  };
  const handlezVisible = (flag) => {
    setVisible(flag);
  };
  const menuItems = [
    ...Type2.map((item) => ({
      key: item.value,
      label: item.label,
    })),
    {
      key: 'CUSTOM',
      label: (
        <Flex gap={10}>
          {'Custom'}

          {showDatePicker && (
            <Flex vertical gap={10}>
              <RangePicker
                onChange={(dates: any) => {
                  setDateRange(dates);
                }}
              />
              <Flex gap={10}>
                <CButton
                  type="default"
                  onClick={() => {
                    setShowDatePicker(false);
                    setVisible(false);
                  }}
                >
                  Cancel
                </CButton>
                <CButton
                  type="primary"
                  onClick={() => {
                    if (dateRange[0] && dateRange[1]) {
                      handleSelectDate([dateRange[0], dateRange[1]]);
                      setText(
                        `${dayjs(dateRange[0]).format(
                          'DD/MM/YYYY'
                        )} - ${dayjs(dateRange[1]).format('DD/MM/YYYY')}`
                      );
                    }
                    setVisible(false);
                  }}
                >
                  Apply
                </CButton>
              </Flex>
            </Flex>
          )}
        </Flex>
      ),
    },
  ];

  return (
    <div className="bg-gray-100 ">
      <CHeaderCard title="Payment Statistic" actions={null} />
      <Card>
        <Flex justify="start" align="center" gap={10} wrap>
          {Type1.map((item) => (
            <Button
              key={item.value}
              value={type}
              type={type === item.value ? 'primary' : 'default'}
              onClick={() => {
                handleSelectType(item.value);
                setText(item.label);
              }}
              className={`px-4 py-2 rounded-lg transition-all duration-300
            `}
            >
              {item.label}
            </Button>
          ))}

          <Dropdown
            menu={{ items: menuItems, onClick: handleMenuClick }}
            trigger={['click']}
            open={visible}
            onOpenChange={handlezVisible}
          >
            <Button
              type={
                Type2.find((item) => item.value === type)?.value
                  ? 'primary'
                  : type === 'CUSTOM'
                    ? 'primary'
                    : 'default'
              }
              className="px-4 py-2 rounded-lg transition-all duration-300"
            >
              {Type2.find((item) => item.value === type)
                ? Type2.find((item) => item.value === type)?.label
                : type === 'CUSTOM'
                  ? `${dayjs(start).format(
                      'DD/MM/YYYY'
                    )} - ${dayjs(end).format('DD/MM/YYYY')}`
                  : 'Custom'}
              <DownOutlined />
            </Button>
          </Dropdown>
        </Flex>
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
