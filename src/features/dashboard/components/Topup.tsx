import { API_KEY } from '@/features/payments/data/constant';
import { ITopupItem } from '@/features/payments/data/interface';
import PaymentService from '@/features/payments/service';
import { useQuery } from '@tanstack/react-query';
import { Avatar, Card, Flex, Table, TableColumnsType, Typography } from 'antd';

function Topup() {
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.TOPUP],
    queryFn: async () => {
      const res = await PaymentService.getTopup();
      return res.data;
    },
  });
  const columns: TableColumnsType<ITopupItem> = [
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
      title: 'Total Amount',
      dataIndex: 'totalAmount',
      render: (_, record) => (
        <Flex gap={4} align="center">
          <Typography.Text className="text-green-600 font-medium">
            {record.totalAmount.toLocaleString()} VND
          </Typography.Text>
        </Flex>
      ),
    },
    {
      title: 'Total Bill',
      dataIndex: 'totalFaid',
      render: (_, record) => (
        <Flex gap={4} align="center">
          <Typography.Text className="text-blue-600 font-medium">
            {record.totalFaid.toLocaleString()}
          </Typography.Text>
        </Flex>
      ),
    },
  ];
  return (
    <Card
      title={
        <Flex align="center" gap={8}>
          <Typography.Title level={4} className="mb-0 text-gray-800">
            Topup Transactions
          </Typography.Title>
        </Flex>
      }
      loading={isLoading}
      className="w-full shadow-md hover:shadow-lg transition-all duration-300"
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

export default Topup;
