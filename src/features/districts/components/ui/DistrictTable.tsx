import { ITableProps } from '@/interfaces';
import { IDistrictItem } from '../../data/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, TableColumnsType, Typography } from 'antd';
import { CDeleteModal, CTable } from '@/components';
import CButtonEdit from '@/components/buttons/CButtonEdit';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import CTableParagraph from '@/components/CTableParagraph';
import { dayFormat } from '@/configs/date.';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';

interface IDistrictTableProps extends ITableProps<IDistrictItem> {
  isDeleteLoading?: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const DistrictTable: React.FC<IDistrictTableProps> = ({
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
  const [record, setRecord] = useState<IDistrictItem | null>(null);
  const navigate = useNavigate();
  const columns: TableColumnsType<IDistrictItem> = [
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
      title: 'District Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value: string, record: IDistrictItem) => (
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
      title: 'Code Name',
      dataIndex: 'codeName',
      key: 'codeName',
      width: 200,
      render: (_: any, record: IDistrictItem) => (
        <CTableParagraph children={record.codeName} />
      ),
    },
    {
      title: 'Short Code Name',
      dataIndex: 'shortCodeName',
      key: 'shortCodeName',
      width: 200,
    },

    {
      title: 'Province Name',
      dataIndex: 'provinceId',
      key: 'provinceId',
      width: 150,
      render: (_: any, record: IDistrictItem) => (
        <CTableParagraph children={record.provinceId?.name} />
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 100,
      render: (value: string) => (
        <CTableParagraph children={dayFormat(value)} />
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 200,
      render: (_: any, record: IDistrictItem) => (
        <CTableParagraph children={record.createdBy?.name} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_: string, record: IDistrictItem) => (
        <Flex>
          <CButtonEdit 
          codeName={IPERMISSION_CODE_NAME.DISTRICTS}
          onClick={() => navigate(`${record._id}/update`)} />
          <CButtonDelete
            codeName={IPERMISSION_CODE_NAME.DISTRICTS}
            onClick={() => {
              setRecord(record);
              setOpenModal(true);
            }}
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
        message="Are you sure you want to delete this district?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
    </>
  );
};
export default DistrictTable;
