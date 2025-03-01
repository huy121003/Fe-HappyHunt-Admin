import { ITableProps } from '@/interfaces';
import { IProvinceItem } from '../../data/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import { CDeleteModal, CTable } from '@/components';
import CButtonEdit from '@/components/buttons/CButtonEdit';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import dayjs from 'dayjs';

interface IProvinceTableProps extends ITableProps<IProvinceItem> {
  isDeleteLoading?: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ProvinceTable: React.FC<IProvinceTableProps> = ({
  data,
  isLoading,
  pagination,
  notFound,
  onDelete,
  isDeleteLoading,
  onChange,
  openModal,
  setOpenModal,
}) => {
  const [record, setRecord] = useState<IProvinceItem | null>(null);
  const navigate = useNavigate();
  const columns = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => (
        <Typography.Text>{index + 1}</Typography.Text>
      ),
      width: 100,
    },
    {
      title: 'Province Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value: string, record: IProvinceItem) => (
        <Typography.Link onClick={() => navigate(`${record._id}/detail`)}>
          {value}
        </Typography.Link>
      ),
    },
    {
      title: 'Code Name',
      dataIndex: 'codeName',
      key: 'codeName',
      width: 200,
    },
    {
      title: 'Phone Code',
      dataIndex: 'phoneCode',
      key: 'phoneCode',
      width: 200,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => (
        <Typography.Text>{dayjs(value).format('DD MMM YYYY')}</Typography.Text>
      ),
      width: 200,
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_: any, record: IProvinceItem) => (
        <Flex>
          <CButtonEdit onClick={() => navigate(`${record._id}/update`)} />
          <CButtonDelete
            onClick={() => {
              setOpenModal(true);
              setRecord(record);
            }}
          />
        </Flex>
      ),
      width: 150,
    },
  ];

  return (
    <>
      <CTable
        columns={columns}
        dataSource={data}
        loading={isLoading}
        pagination={pagination}
        rowKey="_id"
        notFound={notFound}
        onChange={onChange}
      />
      <CDeleteModal
        message="Are you sure you want to delete this province?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
    </>
  );
};
export default ProvinceTable;
