import { API_KEY } from '@/features/user-statistics/data/constant';
import UserService from '@/features/users/service';
import { useQuery } from '@tanstack/react-query';
import { Card } from 'antd';
import { Legend, RadialBar, RadialBarChart, Tooltip } from 'recharts';

function SexChart() {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.COUNT_SEX_USER],
    queryFn: async () => {
      const response = await UserService.getCountSexUser();
      return response.data;
    },
  });
  const chartData = [
    { name: 'Male', value: data?.totalMale || 0, fill: '#8884d8' },
    { name: 'Female', value: data?.totalFemale || 0, fill: '#82ca9d' },
    { name: 'Other', value: data?.totalOther || 0, fill: '#ffc658' },
    { name: 'Unknown', value: data?.totalNotUpdate || 0, fill: '#ff7300' },
  ];
  console.log(chartData);
  return (
    <Card title="Gender Chart" loading={isLoading}>
      <RadialBarChart
        width={400}
        data={chartData}
        startAngle={180}
        endAngle={0}
        height={250}
        innerRadius="10%"
        outerRadius="80%"
        cx="50%"
        cy="50%"
      >
        <RadialBar
          label={{ fill: '#666', position: 'insideStart' }}
          background
          dataKey="value"
        />
        <Legend
          iconSize={10}
          width={100}
          height={140}
          layout="vertical"
          verticalAlign="middle"
          align="right"
        />
        <Tooltip />
      </RadialBarChart>
    </Card>
  );
}

export default SexChart;
