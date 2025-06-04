import { ITableProps } from '@/interfaces';
import { IReportItem } from '../../data/interface';
import { useState } from 'react';
import { Avatar, Flex, TableColumnsType, Tag, Typography } from 'antd';
import { CTable } from '@/components';

import CTableParagraph from '@/components/CTableParagraph';
import { dayFormat } from '@/configs/date.';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';
import { EStatus, ETargetType } from '../../data/constant';
import CButtonView from '@/components/buttons/CButtonView';
import ReportModal from './ReportModal';

interface IReportTableProps extends ITableProps<IReportItem> {
  isDeleteLoading?: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const ReportTable: React.FC<IReportTableProps> = ({
  data,
  isLoading,
  pagination,
  notFound,

  onChange,
  openModal,
  setOpenModal,
}) => {
  const [record, setRecord] = useState<IReportItem | null>(null);

  const columns: TableColumnsType<IReportItem> = [
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
      title: 'Report Id',
      dataIndex: '_id',
      key: '_id',
      width: 100,
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Reporter',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 200,
      render: (_, record) => (
        <CTableParagraph
          children={
            <Flex>
              {record.createdBy?.avatar ? (
                <Avatar
                  src={record.createdBy?.avatar}
                  size="small"
                  style={{ marginRight: 8 }}
                />
              ) : (
                <Avatar style={{ marginRight: 8 }} size="small">
                  {record.createdBy?.name?.charAt(0).toUpperCase()}
                </Avatar>
              )}

              <Typography.Text>{record.createdBy?.name}</Typography.Text>
            </Flex>
          }
        />
      ),
    },
    {
      title: 'Target Type',
      dataIndex: 'targetType',
      key: 'targetType',
      width: 100,
      render: (value) => (
        <Tag
          color={
            value === ETargetType.ACCOUNT
              ? 'blue'
              : value === ETargetType.POST
                ? 'green'
                : 'purple'
          }
        >
          {value.toUpperCase()}
        </Tag>
      ),
    },

    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',

      width: 200,
      render: (value: string) => (
        <CTableParagraph
          children={<Typography.Link>{value}</Typography.Link>}
        />
      ),
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      width: 150,
      render: (value) => <CTableParagraph children={dayFormat(value)} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 100,
      render: (value) => (
        <Tag
          color={
            value === EStatus.PENDING
              ? 'orange'
              : value === EStatus.APPROVED
                ? 'green'
                : value === EStatus.REJECTED
                  ? 'red'
                  : value === EStatus.SPAM
                    ? 'purple'
                    : 'default'
          }
        >
          {value}
        </Tag>
      ),
    },
    {
      title: 'Approved by',
      dataIndex: 'updatedBy',
      key: 'updatedBy',

      width: 150,
      render: (_, record) => (
        <CTableParagraph
          children={
            record.updatedBy && (
              <Typography.Text>{record.updatedBy.name}</Typography.Text>
            )
          }
        />
      ),
    },
    {
      title: 'Approved At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 150,
      render: (_, record) => (
        <CTableParagraph
          children={record.updatedBy && dayFormat(record.updatedAt)}
        />
      ),
    },

    {
      title: 'Actions',
      key: 'actions',
      width: 100,
      fixed: 'right',
      render: (_, record) => (
        <CButtonView
          onClick={() => {
            setRecord(record);
            setOpenModal(true);
          }}
          title="Check Report"
          codeName={IPERMISSION_CODE_NAME.REPORTS}
        />
      ),
    },
  ];
  return (
    <>
      <CTable
        columns={columns}
        dataSource={data}
        loading={isLoading}
        rowKey="_id"
        pagination={pagination}
        notFound={notFound}
        onChange={onChange}
      />
      {record && (
        <ReportModal
          open={openModal}
          setOpen={setOpenModal}
          reportId={record?._id}
        />
      )}
    </>
  );
};
export default ReportTable;
