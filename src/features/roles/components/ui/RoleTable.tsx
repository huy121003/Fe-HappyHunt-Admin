import { ITableProps } from '@/interfaces';
import { IRoleItem } from '../../data/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, TableColumnsType, Typography } from 'antd';
import { CDeleteModal, CTable } from '@/components';
import CButtonEdit from '@/components/buttons/CButtonEdit';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import CTableParagraph from '@/components/CTableParagraph';
import { dayFormat } from '@/configs/date.';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';

interface IRoleTableProps extends ITableProps<IRoleItem> {
  isDeleteLoading?: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const RoleTable: React.FC<IRoleTableProps> = ({
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
  const [record, setRecord] = useState<IRoleItem | null>(null);
  const navigate = useNavigate();
  const columns: TableColumnsType<IRoleItem> = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      render: (_: any, __: any, index) => (
        <CTableParagraph children={index + 1} />
      ),
      width: 60,
    },
    {
      title: 'Role Name',
      dataIndex: 'name',
      key: 'name',
      width: 150,
      render: (value: string, record: IRoleItem) => (
        <CTableParagraph
          children={
            <Typography.Link onClick={() => navigate(`${record._id}/detail`)}>
              {value}
            </Typography.Link>
          }
        />
      ),
    },

    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => (
        <CTableParagraph children={dayFormat(value)} />
      ),
      width: 100,
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      render: (_: any, record: IRoleItem) => (
        <CTableParagraph children={record.createdBy?.name} />
      ),
      width: 200,
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      fixed: 'right',
      render: (_: any, record: IRoleItem) => (
        <Flex gap={8}>
          <CButtonEdit
            codeName={IPERMISSION_CODE_NAME.ROLES}
            onClick={() => {
              navigate(`${record._id}/update`);
            }}
          />
          <CButtonDelete
            codeName={IPERMISSION_CODE_NAME.ROLES}
            onClick={() => {
              setRecord(record);
              setOpenModal(true);
            }}
          />
        </Flex>
      ),
      width: 100,
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
        message="Are you sure you want to delete this role?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
    </>
  );
};
export default RoleTable;
