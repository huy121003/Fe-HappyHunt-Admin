import categoryApi from '@/apis/categoryApi';
import { CTable, CPagination } from '@/components';
import CDeleteModal from '@/components/CDeleteModal';
import { DAY_MONTH_YEAR_HOUR_MINUTE_SECOND } from '@/configs';

import { ICategory } from '@/interfaces';
import { Button, Divider, Image, Typography } from 'antd';
import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

function CategoryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [totalDocuments, setTotalDocuments] = useState<number>(0);
  const [sort, setSort] = useState<string[]>([]);
  const [openDeleteModal, setOpenDeleteModal] = useState<boolean>(false);
  const [setIdDelete, setSetIdDelete] = useState<string>('');
  const handleChangedPagination = (pageNumber: number, pageSize?: number) => {
    setPageNumber(pageNumber);
    setPageSize(pageSize || 10);
  };
  const handleSortChange = (_: any, __: any, sorter: any) => {
    let sortField = '';
    let sortOrder = '';

    if (sorter && sorter.field) {
      sortField = sorter.field; // Tên cột sắp xếp
      sortOrder = sorter.order === 'ascend' ? '' : '-'; // Dùng dấu + cho asc và dấu - cho desc
    }

    const newSort = sortField && sortOrder ? [`${sortOrder}${sortField}`] : [];
    setSort(newSort); // Cập nhật state sort với thông tin mới
    setPageNumber(1); // Reset lại trang về 1
  };
  const handleDeleteCategory = async (id: string) => {
    // Gọi API xóa category
    const result = await categoryApi.ADeleteCategory(id);
    if (result.statusCode === 200) {
      // Nếu xóa thành công thì cập nhật lại danh sách
      getCategories();
    }
    setOpenDeleteModal(false);
  };
  const getCategories = async () => {
    const result = await categoryApi.AFetchCategoriesWithPagination({
      pageSize: pageSize,
      pageNumber: pageNumber,
      sort: sort,
    });
    if (result.statusCode === 200) {
      setCategories(result.data.result);
      setTotalDocuments(result.data.totalDocuments);
    }
  };
  useEffect(() => {
    getCategories();
  }, [pageNumber, pageSize, sort]);
  const column = [
    {
      title: <>{t('categoryManagement.nameVn')}</>,
      dataIndex: 'nameVn',
      key: 'nameVn',
      sorter: true,
    },
    {
      title: t('categoryManagement.nameEn'),
      dataIndex: 'nameEn',
      key: 'nameEn',
      sorter: true,
    },

    {
      title: t('categoryManagement.url'),
      dataIndex: 'url',
      key: 'url',
      sorter: true,
    },
    {
      title: t('categoryManagement.icon'),
      dataIndex: 'icon',
      key: 'icon',
      render: (icon: string) => <Image src={icon} width={50} height={50} />,
    },
    {
      title: t('categoryManagement.createdAt'),
      dataIndex: 'createdAt',
      key: 'createdAt',
      sorter: true,
      render: (createdAt: string) =>
        DAY_MONTH_YEAR_HOUR_MINUTE_SECOND(createdAt),
    },
    {
      title: t('categoryManagement.updatedAt'),
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      sorter: true,
      render: (updatedAt: string) =>
        DAY_MONTH_YEAR_HOUR_MINUTE_SECOND(updatedAt),
    },

    {
      title: t('common.action'),
      dataIndex: 'action',
      key: 'action',
      render: (_: string, record: ICategory) => (
        <div className="flex gap-2">
          <p
            className="cursor-pointer text-blue-500"
            onClick={() => navigate(`/admin/categories/edit/${record._id}`)}
          >
            {t('common.edit')}
          </p>
          <p
            className="cursor-pointer text-red-500"
            onClick={() => {
              setOpenDeleteModal(true);
              setSetIdDelete(record._id);
            }}
          >
            {t('common.delete')}
          </p>
        </div>
      ),
      width: 150,
    },
  ];

  return (
    <div className="bg-white flex-1  p-4 rounded-md m-2 w-full">
      <div className="flex items-center justify-between">
        <Typography.Title level={2}>
          {t('categoryManagement.categoryTitle')}
        </Typography.Title>
        <Button
          className="bg-flame-orange text-white"
          onClick={() => navigate('/admin/categories/create')}
        >
          {t('common.create')}
        </Button>
      </div>
      <Divider />

      <CTable
        columns={column}
        dataSource={categories}
        onChange={handleSortChange}
      />
      <div className="flex justify-end m-6">
        <CPagination
          total={totalDocuments}
          pageSize={pageSize}
          current={pageNumber}
          onChange={handleChangedPagination}
        />
      </div>
      <CDeleteModal
        message={t('categoryManagement.confirmDelete')}
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        onOk={() => handleDeleteCategory(setIdDelete)}
      />
    </div>
  );
}

export default CategoryPage;
