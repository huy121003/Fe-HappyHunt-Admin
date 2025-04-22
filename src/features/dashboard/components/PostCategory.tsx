import { API_KEY } from '@/features/posts/data/constant';
import PostService from '@/features/posts/service';
import { useQuery } from '@tanstack/react-query';
import { Card, Flex, Spin } from 'antd';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  CartesianGrid,
} from 'recharts';

function PostCategory() {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.TOTAL_POST_BY_CATEGORY],
    queryFn: async () => {
      const res = await PostService.getTotalPostByCategory();
      return res.data;
    },
  });

  const chartData = Object.entries(data || {}).map(([key, value]) => ({
    name: key,
    value,
  }));

  if (isLoading) {
    return (
      <Card title="Total Post By Category" className="h-full">
        <Flex className="w-full h-[300px] justify-center items-center">
          <Spin />
        </Flex>
      </Card>
    );
  }

  return (
    <Card title="Total Post By Category" className="h-full">
      <ResponsiveContainer width="100%" height={300}>
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Bar dataKey="value" fill="#d45115" />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}

export default PostCategory;
