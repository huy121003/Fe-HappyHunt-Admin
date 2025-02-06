import categoryApi from '@/apis/categoryApi';
import HBuildMenuTree from '@/Helpers/HBuildMenuTree';

import { ICategory } from '@/interfaces';
import i18n from '@/locales';
import {
  Button,
  Divider,
  Form,
  FormInstance,
  Image,
  Input,
  Menu,
  notification,
  Table,
  Tag,
  Typography,
} from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import TextArea from 'antd/es/input/TextArea';
import { CDeleteModal, CHeaderAdmin } from '@/components';
import { useMutation, useQuery } from '@tanstack/react-query';

function CategoryPage() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [category, setCategory] = useState<ICategory | null>(null);
  const [open, setOpen] = useState(false);
  const formRef = useRef<FormInstance>(null);
  const handleDelete = async () => {
    if (category && category._id) {
      deleteMutation.mutate(category._id);
    }
  };
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await categoryApi.ADeleteCategory(id);
      return res;
    },
    onError: (res) => {
      notification.error({
        message: t('common.error'),
        description: res.message,
      });
    },
    onSuccess: (res) => {
      notification.success({
        message: t('common.success'),
        description: res.message,
      });
      fetchCategoryQuery.refetch();
      setOpen(false);
      setCategory(null);
    },
  });

  const fetchCategoryQuery = useQuery({
    queryKey: ['fetchCategories'],
    queryFn: async () => {
      const result = await categoryApi.AFetchCategories();
      if (result.statusCode === 200) {
        return HBuildMenuTree(result.data);
      }
      return [];
    },
  });
  useEffect(() => {
    // Khi category thay đổi, cập nhật lại các trường trong form
    if (category) {
      formRef.current?.setFieldsValue(category);
    }
  }, [category]); // Khi category thay đổi, chạy lại useEffect

  const renderMenuItems = (items: any) =>
    items.map((item: any) =>
      item.children?.length > 0 ? (
        <Menu.SubMenu
          key={item._id}
          title={i18n.language === 'en' ? item.nameEn : item.nameVn}
          onTitleClick={() => setCategory(item)}
        >
          {renderMenuItems(item.children)}
        </Menu.SubMenu>
      ) : (
        <Menu.Item key={item._id} onClick={() => setCategory(item)}>
          {i18n.language === 'en' ? item.nameEn : item.nameVn}
        </Menu.Item>
      )
    );

  return (
    <div className="flex-1  flex flex-col l">
      <CHeaderAdmin
        title={t('categoryManagement.categoryTitle')}
        onClick={() => navigate('/admin/categories/create')}
      />

      {/* Giao diện chính */}
      <div className="flex flex-row flex-1 h-full bg-white m-2 p-3  rounded-md">
        {/* Danh mục (Có thanh cuộn) */}
        <div className="w-[280px] bg-white flex-col overflow-y-auto overflow-x-hidden max-h-[calc(100vh-250px)] p-2 border rounded-md shadow-sm">
          <Menu mode="inline">
            {fetchCategoryQuery.data &&
              renderMenuItems(fetchCategoryQuery.data)}
          </Menu>
        </div>

        {/* Chi tiết danh mục */}
        <div className="flex flex-1 p-4 flex-col overflow-hidden">
          {category ? (
            <div className=" rounded-lg w-full  flex-1  p-2 ">
              <div className="flex items-center justify-between mb-6">
                <Typography.Title level={4} className="text-gray-800">
                  {t('categoryManagement.categoryDetail')}
                </Typography.Title>
                <div className="flex gap-4">
                  <Button
                    className="bg-gray-300 text-black hover:bg-gray-400 transition-all"
                    onClick={() => setOpen(true)}
                  >
                    {t('common.delete')}
                  </Button>
                  <Button
                    className="bg-flame-orange text-white hover:bg-orange-600 transition-all"
                    onClick={() =>
                      navigate(`/admin/categories/edit/${category._id}`)
                    }
                  >
                    {t('common.edit')}
                  </Button>
                </div>
              </div>
              <Divider />

              {/* Hiển thị thông tin chi tiết */}
              <Form layout="vertical" ref={formRef}>
                <div className="px-4 overflow-y-auto overflow-x-hidden max-h-[calc(100vh-400px)]">
                  <Form.Item
                    label={t('categoryManagement.nameVn')}
                    name="nameVn"
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label={t('categoryManagement.nameEn')}
                    name="nameEn"
                  >
                    <Input disabled />
                  </Form.Item>

                  <Form.Item label={t('categoryManagement.url')} name="url">
                    <Input disabled />
                  </Form.Item>

                  <Form.Item
                    label={t('categoryManagement.description')}
                    name="description"
                  >
                    <TextArea rows={4} disabled />
                  </Form.Item>

                  {/* Hiển thị icon */}
                  <Form.Item label={t('categoryManagement.icon')}>
                    <Image
                      src={category?.icon}
                      width={150}
                      className="rounded-md"
                    />
                  </Form.Item>

                  {/* Hiển thị attributes nếu có */}
                  {category?.parent !== null && (
                    <>
                      <Typography.Title
                        level={4}
                        className="text-gray-700 font-semibold"
                      >
                        {t('categoryManagement.attributes')}
                      </Typography.Title>
                      {category?.attributes.length > 0 ? (
                        <Table
                          dataSource={category.attributes}
                          rowKey={(record) => record?.nameVn}
                          pagination={false}
                          columns={[
                            {
                              title: t('categoryManagement.attributeNameVn'),
                              dataIndex: 'nameVn',
                              key: 'nameVn',
                              render: (text) => <Tag color="cyan">{text}</Tag>,
                            },
                            {
                              title: t('categoryManagement.attributeNameEn'),
                              dataIndex: 'nameEn',
                              key: 'nameEn',
                              render: (text) => (
                                <Tag color="purple">{text}</Tag>
                              ),
                            },
                            {
                              title: t('categoryManagement.attributeValue'),
                              dataIndex: 'values',
                              key: 'values',
                              render: (values: string[]) =>
                                values.map((value, index) => (
                                  <Tag color="green" key={index}>
                                    {value}
                                  </Tag>
                                )),
                            },
                          ]}
                        />
                      ) : null}
                    </>
                  )}
                </div>
              </Form>

              <CDeleteModal
                open={open}
                setOpen={setOpen}
                message={t('categoryManagement.confirmDelete')}
                onOk={handleDelete}
                loading={deleteMutation.isPending}
              />
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center flex-1 ">
              <i className="fas fa-info-circle text-[50px] mr-2" />
              <Typography.Text
                className="text-gray-500 text-2xl"
                type="secondary"
              >
                {t('categoryManagement.selectCategory')}
              </Typography.Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CategoryPage;
