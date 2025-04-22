import { API_KEY } from '@/features/users/data/constant';
import { API_KEY as API_KEY_POST } from '@/features/posts/data/constant';
import UserService from '@/features/users/service';
import { useQuery } from '@tanstack/react-query';
import { Card, Flex, Statistic, Typography } from 'antd';
import PostService from '@/features/posts/service';
import {
  UserOutlined,
  StopOutlined,
  ShoppingOutlined,
} from '@ant-design/icons';

function Data() {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.TOTAL_USER],
    queryFn: async () => {
      const res = await UserService.getTotalUser();
      return res.data;
    },
  });
  const { data: dataPost, isLoading: isLoadingPost } = useQuery({
    queryKey: [API_KEY_POST.TOTAL_POST_SELLING],
    queryFn: async () => {
      const res = await PostService.getTotalPostSelling();
      return res.data;
    },
  });

  return (
    <Flex className="w-full" gap={6}>
      <Card
        className="w-full bg-gradient-to-br from-blue-200 to-blue-500 hover:shadow-xl transition-all duration-300"
        loading={isLoading}
        bordered={false}
      >
        <Flex vertical align="start" gap={4} className="p-4">
          <Flex align="center" gap={4}>
            <div className="bg-blue-400/20 p-3 rounded-full">
              <UserOutlined className="text-2xl text-white" />
            </div>
            <Typography.Title level={4} className="text-white m-0">
              Total User
            </Typography.Title>
          </Flex>
          <Statistic
            className="text-4xl font-bold"
            value={data?.totalUser}
            valueStyle={{ color: '#ffffff' }}
          />
        </Flex>
      </Card>
      <Card
        className="w-full bg-gradient-to-br from-red-200 to-red-500 hover:shadow-xl transition-all duration-300"
        loading={isLoading}
        bordered={false}
      >
        <Flex vertical align="start" gap={4} className="p-4">
          <Flex align="center" gap={4}>
            <div className="bg-red-400/20 p-3 rounded-full">
              <StopOutlined className="text-2xl text-white" />
            </div>
            <Typography.Title level={4} className="text-white m-0">
              Total User Banned
            </Typography.Title>
          </Flex>
          <Statistic
            className="text-4xl font-bold"
            value={data?.totalBanned}
            valueStyle={{ color: '#ffffff' }}
          />
        </Flex>
      </Card>
      <Card
        className="w-full bg-gradient-to-br from-green-200 to-green-500 hover:shadow-xl transition-all duration-300"
        loading={isLoadingPost}
        bordered={false}
      >
        <Flex vertical align="start" gap={4} className="p-4">
          <Flex align="center" gap={4}>
            <div className="bg-green-400/20 p-3 rounded-full">
              <ShoppingOutlined className="text-2xl text-white" />
            </div>
            <Typography.Title level={4} className="text-white m-0">
              Total Post Selling
            </Typography.Title>
          </Flex>
          <Statistic
            className="text-4xl font-bold"
            value={dataPost}
            valueStyle={{ color: '#ffffff' }}
          />
        </Flex>
      </Card>
    </Flex>
  );
}

export default Data;
