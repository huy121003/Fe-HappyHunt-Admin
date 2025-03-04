import { ITableProps } from '@/interfaces';
import { IAdminItem } from '../../data/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Image, TableColumnsType, Typography } from 'antd';
import { CDeleteModal, CTable } from '@/components';
import CButtonEdit from '@/components/buttons/CButtonEdit';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import CTableParagraph from '@/components/CTableParagraph';
import { dayFormat } from '@/configs/date.';
import CButtonActive from '@/components/buttons/CButtonActive';
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';

interface IAdminTableProps extends ITableProps<IAdminItem> {
  isDeleteLoading?: boolean;
  isShowLoading?: boolean;
}
const AdminTable: React.FC<IAdminTableProps> = ({
  data,
  isLoading,
  pagination,
  notFound,
  onDelete,
  isDeleteLoading,
  onChange,
  openModal,
  setOpenModal,
  onActive,
  isShowLoading,
  openActiveModal,
  setOpenActiveModal,
}) => {
  const [record, setRecord] = useState<IAdminItem | null>(null);
  const navigate = useNavigate();
  const columns: TableColumnsType<IAdminItem> = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => (
        <CTableParagraph children={index + 1} />
      ),
      width: 100,
    },
    {
      title: 'Admin Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value: string, record: IAdminItem) => (
        <CTableParagraph
          children={
            <Flex align="center" gap={4}>
              {record.avatar ? (
                <Image
                  width={30}
                  height={30}
                  src={record.avatar}
                  alt={record.name}
                  style={{ borderRadius: '50%' }}
                />
              ) : (
                <i className="fa-regular fa-circle-user text-[30px] text-gray-400" />
              )}
              <Typography.Link onClick={() => navigate(`${record._id}/detail`)}>
                {value}
              </Typography.Link>
            </Flex>
          }
        />
      ),
    },
    {
      title: 'Username',
      dataIndex: 'username',
      key: 'username',
      width: 200,
      render: (_: any, record: IAdminItem) => (
        <CTableParagraph children={record.username} />
      ),
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      width: 200,
      render: (_: any, record: IAdminItem) => (
        <CTableParagraph children={record.role?.name} />
      ),
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 200,
      render: (_: any, record: IAdminItem) => (
        <CTableParagraph children={record.phoneNumber} />
      ),
    },
    {
      title: 'Banned',
      dataIndex: 'isBanned',
      key: 'isBanned',
      width: 100,
      render: (value: boolean) =>
        !value ? (
          <CheckCircleOutlined className="text-green-500 text-xl" />
        ) : (
          <MinusCircleOutlined className="text-red-500 text-xl" />
        ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (_: any, record: IAdminItem) => (
        <CTableParagraph children={dayFormat(record.createdAt)} />
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 200,
      render: (_: any, record: IAdminItem) => (
        <CTableParagraph children={record.createdBy?.name} />
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      fixed: 'right',
      render: (_: any, record: IAdminItem) => {
        if (record.username !== 'super.admin') {
          return (
            <Flex>
              <CButtonEdit
                codeName={IPERMISSION_CODE_NAME.ADMINS}
                onClick={() => navigate(`${record._id}/update`)}
                disabled={isLoading}
              />
              <CButtonDelete
                codeName={IPERMISSION_CODE_NAME.ADMINS}
                onClick={() => {
                  setRecord(record);
                  setOpenModal(true);
                }}
                disabled={isLoading}
              />
              <CButtonActive
                codeName={IPERMISSION_CODE_NAME.ADMINS}
                isActived={record.isBanned}
                onClick={() => {
                  setRecord(record);
                  setOpenActiveModal && setOpenActiveModal(true);
                }}
              />
            </Flex>
          );
        }
        return null;
      },
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
        message="Are you sure you want to delete this admin?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
      {setOpenActiveModal && (
        <CDeleteModal
          message={`Are you sure you want to ${
            record?.isBanned ? 'unban' : 'ban'
          } this admin?`}
          open={openActiveModal ?? false}
          setOpen={setOpenActiveModal}
          onOk={() => record && onActive && onActive(record)}
          loading={isShowLoading}
        />
      )}
    </>
  );
};
export default AdminTable;
