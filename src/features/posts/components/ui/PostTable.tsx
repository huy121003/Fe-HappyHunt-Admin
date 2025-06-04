import { ITableProps } from '@/interfaces';
import React, { useState } from 'react';
import { IPostItem } from '../../data/interface';
import { useNavigate } from 'react-router-dom';
import { Badge, Flex, Image, TableColumnsType, Tag, Typography } from 'antd';
import { CDeleteModal, CTable } from '@/components';
import CTableParagraph from '@/components/CTableParagraph';
import { dayFormat } from '@/configs/date.';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';
import { EPostStatus } from '../../data/constant';
import CButtonChecking from '@/components/buttons/CButtonChecking';
import CButtonEdit from '@/components/buttons/CButtonEdit';

interface IPostTableProps extends ITableProps<IPostItem> {
  isDeleteLoading: boolean;
}

const PostTable: React.FC<IPostTableProps> = ({
  data,
  isLoading,
  setOpenModal,
  openModal,
  pagination,
  notFound,
  onChange,
  onDelete,
  isDeleteLoading,
}) => {
  const [record, setRecord] = useState<IPostItem | null>(null);
  const navigate = useNavigate();
  const columns: TableColumnsType<IPostItem> = [
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
      title: 'Post Id',
      dataIndex: '_id',
      key: '_id',
      width: 100,
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Post Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value: string, record: IPostItem) => (
        <Flex gap={10} align="center">
          {record.images.length > 0 ? (
            <Badge count={record.images.length}>
              <Image
                height={60}
                width={60}
                src={record.images[0].url}
                className="rounded-md"
              />
            </Badge>
          ) : (
            <i className="fas fa-image text-[50px] rounded-md"></i>
          )}
          <CTableParagraph
            children={
              <Typography.Link onClick={() => navigate(`${record._id}/detail`)}>
                {value}
              </Typography.Link>
            }
          />
        </Flex>
      ),
    },
    {
      title: 'Owner',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 200,
      render: (_: any, record: IPostItem) => (
        <CTableParagraph children={record.createdBy?.name} />
      ),
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
      width: 150,
      render: (_: string, record) => (
        <CTableParagraph
          children={`${record.categoryParent.name}${record.category && ` - ${record.category.name}`}`}
        />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 150,
      render: (value: number) => (
        <CTableParagraph children={`${value.toLocaleString('VND')} VND`} />
      ),
    },
    {
      title: 'Individual',
      dataIndex: 'isIndividual',
      key: 'isIndividual',
      width: 150,
      render: (value: boolean) => (
        <Tag
          color={value ? 'green' : 'blue'}
          children={value ? 'Individual' : 'Professional Seller'}
        />
      ),
    },

    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      width: 200,
      render: (value: string) => (
        <Tag
          color={
            value === EPostStatus.SELLING
              ? 'green'
              : value === EPostStatus.WAITING
                ? 'blue'
                : value === EPostStatus['WAITING|AI_CHECKING_FAILED']
                  ? 'orange'
                  : value === EPostStatus.REJECTED
                    ? 'red'
                    : 'default'
          }
        >
          {value}
        </Tag>
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
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
      width: 200,
      render: (_, record) => (
        <CTableParagraph
          children={`${record.address.district.name} - ${record.address.province.name} `}
        />
      ),
    },
    {
      title: 'Last Update',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
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
      render: (_: any, record: IPostItem) => (
        <Flex gap={0}>
          {record.status === EPostStatus.SELLING && (
            <CButtonDelete
              codeName={IPERMISSION_CODE_NAME.POSTS}
              disabled={isLoading}
              onClick={() => {
                setOpenModal(true);
                setRecord(record);
              }}
            />
          )}
          {record.status === EPostStatus['WAITING|AI_CHECKING_FAILED'] && (
            <CButtonChecking
              codeName={IPERMISSION_CODE_NAME.POSTS}
              onClick={() => {
                navigate(`${record._id}/checking`);
              }}
            />
          )}
          {record.status === EPostStatus.REJECTED && (
            <CButtonEdit
              codeName={IPERMISSION_CODE_NAME.POSTS}
              onClick={() => {
                navigate(`${record._id}/update`);
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
        message="Are you sure you want to delete this post? Notification will be sent to the user"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
    </>
  );
};

export default PostTable;
