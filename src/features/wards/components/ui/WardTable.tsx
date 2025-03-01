import { ITableProps } from '@/interfaces';
import { IWardItem } from '../../data/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Typography } from 'antd';
import { CDeleteModal, CTable } from '@/components';
import CButtonEdit from '@/components/buttons/CButtonEdit';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import CTableParagraph from '@/components/CTableParagraph';
import { dayFormat } from '@/configs/date.';

interface IWardTableProps extends ITableProps<IWardItem> {
  isDeleteLoading?: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const WardTable: React.FC<IWardTableProps> = ({
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
  const [record, setRecord] = useState<IWardItem | null>(null);
  const navigate = useNavigate();
  const columns = [
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
      title: 'Ward Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value: string, record: IWardItem) => (
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
      render: (_: any, record: IWardItem) => (
        <CTableParagraph children={record.codeName} />
      ),
    },
    {
      title: 'Short Code Name',
      dataIndex: 'shortCodeName',
      key: 'shortCodeName',
      width: 200,
      render: (_: any, record: IWardItem) => (
        <CTableParagraph children={record.shortCodeName} />
      ),
    },
    {
      title: 'District Name',
      dataIndex: 'districtId',
      key: 'districtId',
      width: 200,
      render: (value: any) => <CTableParagraph children={value?.name} />,
    },
    {
      title: 'Province Name',
      dataIndex: 'provinceId',
      key: 'provinceId',
      width: 200,
      render: (value: any) => <CTableParagraph children={value?.name} />,
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (value: string) => (
        <CTableParagraph children={dayFormat(value)} />
      ),
      width: 150,
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 150,
      render: (_: any, record: IWardItem) => (
        <Flex>
          <CButtonEdit
            onClick={() => navigate(`/addresses/wards/${record._id}/update`)}
          />
          <CButtonDelete
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
        message="Are you sure you want to delete this ward?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
    </>
  );
};
export default WardTable;
