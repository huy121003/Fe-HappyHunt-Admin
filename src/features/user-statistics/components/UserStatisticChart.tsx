import React from 'react';
import { IUserStatistics } from '../data/interface';
import { Flex, Spin } from 'antd';
import {
  ComposedChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';

interface UserStatisticChartProps {
  data: IUserStatistics[];
  loading: boolean;
}

const UserStatisticChart: React.FC<UserStatisticChartProps> = ({
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

          {/* Đường hiển thị  */}
          <Line
            yAxisId="right"
            type="monotone"
            dataKey="totalAccounts"
            stroke="#fa4903"
            strokeWidth={2}
            name="Total New Accounts"
          />
        </ComposedChart>
      </ResponsiveContainer>
    </Flex>
  );
};

export default UserStatisticChart;
