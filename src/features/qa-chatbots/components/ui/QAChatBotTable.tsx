import React, { useState } from 'react';
import { IQAChatbotItem } from '@/features/qa-chatbots/data/interface';
import { ITableProps } from '@/interfaces';
import { Flex, TableColumnsType, Typography } from 'antd';
import { useNavigate } from 'react-router-dom';
import CTableParagraph from '@/components/CTableParagraph';
import CButtonEdit from '@/components/buttons/CButtonEdit';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import CDeleteModal from '@/components/CDeleteModal';
import { CTable } from '@/components';
import { dayFormat } from '@/configs/date.';
interface IQAChatBotTableProps extends ITableProps<IQAChatbotItem> {
  isDeleteLoading?: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const QAChatBotTable: React.FC<IQAChatBotTableProps> = ({
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
  const [record, setRecord] = useState<IQAChatbotItem | null>(null);
  const navigate = useNavigate();
  const columns: TableColumnsType<IQAChatbotItem> = [
    {
      title: 'No.',
      dataIndex: 'index',
      key: 'index',
      width: 70,
      render: (_, record: IQAChatbotItem, index: number) => (
        <CTableParagraph
          children={
            <Typography.Link onClick={() => navigate(`${record._id}/detail`)}>
              {index + 1}
            </Typography.Link>
          }
        />
      ),
    },
    {
      title: 'Question Id',
      dataIndex: '_id',
      key: '_id',
      width: 100,
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Question',
      dataIndex: 'question',
      key: 'question',
      width: 200,
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Answer',
      dataIndex: 'answer',
      key: 'answer',
      width: 200,
      render: (value: string) => <CTableParagraph children={value} />,
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
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 200,
      render: (_, record: IQAChatbotItem) => (
        <CTableParagraph children={record.createdBy?.name} />
      ),
    },
    {
      title: 'Last Updated At',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      width: 200,
      render: (value: string) => (
        <CTableParagraph children={dayFormat(value)} />
      ),
    },

    {
      title: 'Updated By',
      dataIndex: 'updatedBy',
      key: 'updatedBy',
      width: 200,
      render: (_, record: IQAChatbotItem) => (
        <CTableParagraph children={record.updatedBy?.name} />
      ),
    },

    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      width: 100,
      fixed: 'right',
      render: (_, record: IQAChatbotItem) => (
        <Flex>
          <CButtonEdit
            codeName={IPERMISSION_CODE_NAME.Q_A_CHATBOTS}
            onClick={() => navigate(`${record._id}/update`)}
          />
          <CButtonDelete
            codeName={IPERMISSION_CODE_NAME.Q_A_CHATBOTS}
            onClick={() => {
              setOpenModal(true);
              setRecord(record);
            }}
          />
        </Flex>
      ),
    },
  ];
  return (
    <>
      <CTable
        dataSource={data}
        columns={columns}
        loading={isLoading}
        pagination={pagination}
        onChange={onChange}
        rowKey="_id"
        notFound={notFound}
      />
      <CDeleteModal
        message="Are you sure you want to delete this Q&A Chatbot?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
    </>
  );
};

export default QAChatBotTable;
