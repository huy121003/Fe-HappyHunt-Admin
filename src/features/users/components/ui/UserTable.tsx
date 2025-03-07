import { ITableProps } from '@/interfaces';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Badge, Flex, Image, TableColumnsType, Tag, Typography } from 'antd';
import { CDeleteModal, CTable } from '@/components';

import CButtonDelete from '@/components/buttons/CButtonDelete';
import CTableParagraph from '@/components/CTableParagraph';
import { dayFormat } from '@/configs/date.';
import CButtonActive from '@/components/buttons/CButtonActive';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';
import { IUserItem } from '../../data/interface';
interface IUserTableProps extends ITableProps<IUserItem> {
  isDeleteLoading?: boolean;
  isShowLoading?: boolean;
}
const UserTable: React.FC<IUserTableProps> = ({
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
  const [record, setRecord] = useState<IUserItem | null>(null);
  const navigate = useNavigate();
  const columns: TableColumnsType<IUserItem> = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index: number) => (
        <CTableParagraph children={index + 1} />
      ),
      width: 60,
    },
    {
      title: 'User',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (_, record: IUserItem) => (
        <CTableParagraph
          children={
            <Flex align="center" gap={4}>
              <Badge
                size="default"
                count={
                  record.isVip ? (
                    <i className="fa-solid fa-crown text-yellow-500 text-[14px]" />
                  ) : null
                }
                offset={[-10, 5]}
              >
                {record.avatar ? (
                  <Image
                    width={40}
                    src={record.avatar}
                    alt={record.name}
                    style={{
                      borderRadius: '50%',
                      border: record.isVip ? '2px solid gold' : 'none',
                      padding: '2px',
                    }}
                  />
                ) : (
                  <i
                    className={`fa-regular fa-circle-user text-[40px] text-gray-400
                  ${record.isVip ? 'border-2 border-yellow-500' : 'border-0'}
                     `}
                  />
                )}
              </Badge>
              <Typography.Text onClick={() => navigate(`${record._id}/detail`)}>
                {record.name}
              </Typography.Text>
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
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Phone Number',
      dataIndex: 'phoneNumber',
      key: 'phoneNumber',
      width: 200,
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 300,
      render: (_, record) => (
        <CTableParagraph
          children={
            record.address ? (
              <>
                {record.address.provinceId ? (
                  <>
                    {record.address?.specificAddress},
                    {record.address?.wardId?.name},
                    {record.address?.districtId?.name},
                    {record.address?.provinceId?.name}
                  </>
                ) : (
                  'No address'
                )}
              </>
            ) : (
              ''
            )
          }
        />
      ),
    },

    {
      title: 'Banned',
      dataIndex: 'isBanned',
      key: 'isBanned',
      width: 100,
      render: (value: boolean) =>
        !value ? (
          <Tag color="red">Banned</Tag>
        ) : (
          <Tag color="green">Active</Tag>
        ),
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 200,
      render: (value: string) => (
        <CTableParagraph children={dayFormat(value)} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record: IUserItem) => (
        <Flex align="center">
          <CButtonActive
            codeName={IPERMISSION_CODE_NAME.USERS}
            isActived={!record.isBanned}
            onClick={() => {
              setRecord(record);
              setOpenActiveModal && setOpenActiveModal(true);
            }}
          />
          <CButtonDelete
            hidden={record.isBanned}
            codeName={IPERMISSION_CODE_NAME.USERS}
            onClick={() => {
              setRecord(record);
              setOpenModal(true);
            }}
            disabled={isLoading}
          />
        </Flex>
      ),
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
        message="Are you sure you want to delete this user?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
      {setOpenActiveModal && (
        <CDeleteModal
          message={`Are you sure you want to ${
            record?.isBanned ? 'unban' : 'ban'
          } this user?`}
          open={openActiveModal ?? false}
          setOpen={setOpenActiveModal}
          onOk={() => record && onActive && onActive(record)}
          loading={isShowLoading}
        />
      )}
    </>
  );
};

export default UserTable;
