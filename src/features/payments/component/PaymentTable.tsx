import { ITableProps } from '@/interfaces';

import { useState } from 'react';
import { Flex, TableColumnsType, Tag } from 'antd';
import { CDeleteModal, CTable } from '@/components';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import CTableParagraph from '@/components/CTableParagraph';
import { dayFormat } from '@/configs/date.';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';
import { IPaymentItem } from '../data/interface';
import { EStatus } from '../data/constant';
interface IPaymentTableProps extends ITableProps<IPaymentItem> {
  isDeleteLoading?: boolean;
  openModal: boolean;
  setOpenModal: React.Dispatch<React.SetStateAction<boolean>>;
}
const PaymentTable: React.FC<IPaymentTableProps> = ({
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
  const [record, setRecord] = useState<IPaymentItem | null>(null);
  const columns: TableColumnsType<IPaymentItem> = [
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
      title: 'Order Code',
      dataIndex: 'orderCode',
      key: 'orderCode',
      width: 200,
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Payment Link Id',
      dataIndex: 'paymentLinkId',
      key: 'paymentLinkId',
      width: 300,
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Amount',
      dataIndex: 'amount',
      key: 'amount',
      width: 200,
      render: (value: number) => (
        <CTableParagraph children={`${value.toLocaleString()} VND`} />
      ),
    },
    {
      title: 'Description',
      dataIndex: 'description',
      width: 300,
      key: 'description',
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (value: EStatus) => (
        <CTableParagraph
          children={
            <Tag
              color={
                value === EStatus.SUCCESS
                  ? 'green'
                  : value === EStatus.PENDING
                    ? 'orange'
                    : value === EStatus.CANCELLED
                      ? 'red'
                      : 'red'
              }
            >
              {value}
            </Tag>
          }
        />
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
      title: 'Transaction Date Time',
      dataIndex: 'transactionDateTime',
      width: 200,
      render: (value: string, record: IPaymentItem) => {
        if (record.status === EStatus.SUCCESS) {
          return <CTableParagraph children={dayFormat(value)} />;
        }
      },
    },
    {
      title: 'Action',
      key: 'action',
      fixed: 'right',
      width: 100,
      dataIndex: 'action',
      render: (_: any, record: IPaymentItem) => (
        <Flex>
          {record.status !== EStatus.SUCCESS && (
            <CButtonDelete
              codeName={IPERMISSION_CODE_NAME.PAYMENTS}
              onClick={() => {
                setRecord(record);
                setOpenModal(true);
              }}
            />
          )}
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
        message="Are you sure you want to delete this record?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
    </>
  );
};

export default PaymentTable;
