import { ITableProps } from '@/interfaces';
import { IBannerItem } from '../../data/interface';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Image, TableColumnsType, Typography } from 'antd';
import { CDeleteModal, CTable } from '@/components';
import CButtonEdit from '@/components/buttons/CButtonEdit';
import CButtonDelete from '@/components/buttons/CButtonDelete';
import { CheckCircleOutlined, MinusCircleOutlined } from '@ant-design/icons';
import CButtonActive from '@/components/buttons/CButtonActive';
import { dayFormat } from '@/configs/date.';
import CTableParagraph from '@/components/CTableParagraph';
import { IPERMISSION_CODE_NAME } from '@/features/permissions/data/constant';

interface IBannerTableProps extends ITableProps<IBannerItem> {
  isDeleteLoading?: boolean;
  isShowLoading?: boolean;
}
const BannerTable: React.FC<IBannerTableProps> = ({
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
  const [record, setRecord] = useState<IBannerItem | null>(null);
  const navigate = useNavigate();
  const columns: TableColumnsType<IBannerItem> = [
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
      title: 'Banner Name',
      dataIndex: 'name',
      key: 'name',
      width: 200,
      render: (value: string, record: IBannerItem) => (
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
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      width: 100,
      render: (value: string) =>
        value ? (
          <Image width={50} src={value} />
        ) : (
          <Typography.Text>--</Typography.Text>
        ),
    },
    {
      title: 'Link',
      dataIndex: 'link',
      key: 'link',
      width: 200,
      render: (value: string) => <CTableParagraph children={value} />,
    },
    {
      title: 'Status',
      dataIndex: 'isShow',
      key: 'isShow',
      width: 100,
      render: (value: boolean) =>
        value ? (
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
      render: (value: string) => (
        <CTableParagraph children={dayFormat(value)} />
      ),
    },
    {
      title: 'Created By',
      dataIndex: 'createdBy',
      key: 'createdBy',
      width: 200,
      render: (_: any, record: IBannerItem) => (
        <CTableParagraph children={record.createdBy?.name} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      width: 200,
      fixed: 'right',
      render: (_: any, record: IBannerItem) => (
        <Flex gap={0}>
          <CButtonEdit
            codeName={IPERMISSION_CODE_NAME.BANNERS}
            onClick={() => navigate(`${record._id}/update`)}
            disabled={isLoading}
          />
          <CButtonDelete
            codeName={IPERMISSION_CODE_NAME.BANNERS}
            onClick={() => {
              setRecord(record);
              setOpenModal(true);
            }}
            disabled={isLoading}
          />
          <CButtonActive
            codeName={IPERMISSION_CODE_NAME.BANNERS}
            isActived={record.isShow}
            onClick={() => {
              setRecord(record);
              setOpenActiveModal && setOpenActiveModal(true);
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
        message="Are you sure you want to delete this banner?"
        open={openModal}
        setOpen={setOpenModal}
        onOk={() => record && onDelete && onDelete(record)}
        loading={isDeleteLoading}
      />
      {setOpenActiveModal && (
        <CDeleteModal
          message="Are you sure you want to change the status of this banner?"
          open={openActiveModal ?? false}
          setOpen={setOpenActiveModal}
          onOk={() => record && onActive && onActive(record)}
          loading={isShowLoading}
        />
      )}
    </>
  );
};
export default BannerTable;
