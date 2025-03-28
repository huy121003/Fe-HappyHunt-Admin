import React from 'react';
import { IPaymentStatisticItem } from '../data/interface';
import { Flex, Spin } from 'antd';
import {
  ComposedChart,
  Line,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface PaymentStatisticChartProps {
  data: IPaymentStatisticItem[];
  loading: boolean;
}

const PaymentStatisticChart: React.FC<PaymentStatisticChartProps> = ({
  data,
  loading,
}) => {
  if (loading)
    return (
      <Flex className="w-full justify-center items-center h-screen">
        <Spin />
      </Flex>
    );

  return (
    <Flex className="w-full mt-10 ">
      <ResponsiveContainer width="100%" height={700}>
        <ComposedChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="_id" />
          <YAxis yAxisId="left" />
          <YAxis yAxisId="right" orientation="right" />
          <Tooltip />
          <Legend />
          {/* Cột hiển thị tổng hóa đơn */}
          <Bar
            yAxisId="left"
            dataKey="totalAmount"
            fill="#000"
            name="Total Amount"
            barSize={30}
          />
          {/* Đường hiển thị tổng tiền */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalInvoices"
            stroke="#fa4903"
            strokeWidth={2}
            name="Total Invoices"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default PaymentStatisticChart;
