import { API_KEY } from '@/features/users/data/constant';
import { IUserItem } from '@/features/users/data/interface';
import UserService from '@/features/users/service';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Flex, Table, TableColumnsType, Typography } from 'antd';
import { UserAddOutlined } from '@ant-design/icons';
import { dayFormat } from '@/configs/date.';

function NewUserCard() {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.NEW_USER],
    queryFn: async () => {
      const res = await UserService.getNewUser();
      return res.data;
    },
  });

  const columns: TableColumnsType<IUserItem> = [
    {
      title: 'Name',
      dataIndex: 'name',
      render: (_, record) => (
        <Flex gap={10} align="center">
          {record.avatar ? (
            <Avatar src={record.avatar} size="large" />
          ) : (
            <Avatar style={{ backgroundColor: '#f56a00' }} size="large">
              {record.name.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Typography.Text className="text-gray-800 font-medium">
            {record.name}
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Joined',
      dataIndex: 'createdAt',
      render: (_, record) => (
        <Typography.Text className="text-gray-600">
          {dayFormat(record.createdAt)}
        </Typography.Text>
      ),
    },
  ];

  return (
    <Card
      title={
        <Flex align="center" gap={8}>
          <div className="bg-orange-400/20 p-2 rounded-full">
            <UserAddOutlined className="text-xl text-orange-500" />
          </div>
          <Typography.Title level={4} className="mb-0 text-gray-800">
            New Users
          </Typography.Title>
        </Flex>
      }
      loading={isLoading}
      className="w-full shadow-md hover:shadow-xl transition-all duration-300"
      headStyle={{
        borderBottom: '1px solid #f0f0f0',
        padding: '16px 24px',
      }}
      bodyStyle={{ padding: '16px' }}
    >
      <Table
        dataSource={data}
        columns={columns}
        pagination={false}
        className="custom-table"
        rowClassName="hover:bg-orange-50 transition-colors duration-300"
      />
    </Card>
  );
}

export default NewUserCard;
