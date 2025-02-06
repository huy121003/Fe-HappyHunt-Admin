import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Form, Button, Upload, Space, Select, notification, Spin } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useNavigate, useParams } from 'react-router-dom';
import categoryApi from '@/apis/categoryApi';
import DAttributesCategory from '@/data/DAttributesCategory';
import i18n from '@/locales';
import { CHeaderFormAdmin } from '@/components';
import CInput from '@/components/CInput';
import CTextArea from '@/components/CTextArea';
import { useMutation, useQuery } from '@tanstack/react-query';

function CategoryCreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();

  const [isParent, setIsParent] = useState(true);
  const { id } = useParams();

  const categoryParentQuery = useQuery({
    queryKey: ['categoryParent', id],
    queryFn: async () => {
      const categoryParent = await categoryApi.AgetCategoryParent();
   
      return categoryParent.data.filter((item: any) => item._id !== id);
    },
  });
  const fetchCategoryQuery = useQuery({
    queryKey: ['category', id],
    queryFn: async () => {
      const result = await categoryApi.AFetchCategoryById(id as string);
      return result.data;
    },
  });

  useEffect(() => {
  
    if (id && fetchCategoryQuery.data) {
      setIsParent(!fetchCategoryQuery.data.parent);

      form.setFieldsValue({
        ...fetchCategoryQuery.data,
        icon: fetchCategoryQuery.data.icon
          ? [
              {
                uid: '-1',
                name: fetchCategoryQuery.data.icon.split('/').pop(),
                status: 'done',
                url: fetchCategoryQuery.data.icon,
              },
            ]
          : [],
      });
    }
  }, [fetchCategoryQuery.data, form]);

  const createCategoryMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await categoryApi.ACreateCategory(values);
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
      navigate('/admin/categories');
    },
  });
  const updateCategoryMutation = useMutation({
    mutationFn: async (values: any) => {
      const res = await categoryApi.AUpdateCategory(id as string, values);
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
      navigate('/admin/categories');
    },
  });

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      const formData = new FormData();
      formData.append('nameVn', values.nameVn);
      formData.append('nameEn', values.nameEn);
      formData.append('description', values.description);
      formData.append('url', values.url);
      if (isParent) formData.append('parent', 'null');
      else formData.append('parent', values.parent);
      // Kiểm tra icon có tồn tại không
      if (id) {
        formData.append('icon', values.icon[0].originFileObj);
      } else {
        formData.append(
          'icon',
          values.icon[0].originFileObj || `${values.icon[0].url}`
        );
      }
      formData.append('attributes', JSON.stringify(values.attributes || []));
      if (id) {
        await updateCategoryMutation.mutate(formData);
      } else {
        await createCategoryMutation.mutate(formData);
      }
    } catch {
      // Do nothing
    }
  };

  return (
    <div className=" flex-1  justify-start flex flex-col">
      <Spin
        spinning={fetchCategoryQuery.isLoading || categoryParentQuery.isLoading}
      >
        <CHeaderFormAdmin
          onCancel={() => navigate('/admin/categories')}
          onSave={handleSubmit}
          title={
            id
              ? t('categoryManagement.categoryUpdate')
              : t('categoryManagement.categoryCreate')
          }
          loading={
            createCategoryMutation.isPending || updateCategoryMutation.isPending
          }
        />

        <div className="  bg-white m-2 p-3 rounded-md overflow-y-auto">
          <Form
            form={form}
            layout="vertical"
            onFinish={handleSubmit}
            style={{
              //  maxWidth: 900,
              margin: 'auto',
              justifyContent: 'start',
            }}
          >
            <Form.Item
              name="parent"
              label={t('categoryManagement.parentCategory')}
            >
              <Select
                size="large"
                placeholder={t('categoryManagement.parentCategoryPlaceholder')}
                onChange={(value: any) => {
                  // Kiểm tra giá trị được chọn và thay đổi trạng thái tương ứng
                  if (value === null) {
                    setIsParent(true);
                  } else {
                    setIsParent(false);
                  }
                }}
              >
                <Select.Option value={null}>--</Select.Option>
                {categoryParentQuery.data?.map((item: any) => (
                  <Select.Option key={item._id} value={item._id}>
                    {i18n.language === 'en' ? item.nameEn : item.nameVn}
                  </Select.Option>
                ))}
              </Select>
            </Form.Item>
            <Form.Item
              name="nameVn"
              label={t('categoryManagement.nameVn')}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: t('categoryManagement.nameVnRequired'),
                },
              ]}
            >
              <CInput placeholder={t('categoryManagement.nameVnPlaceholder')} />
            </Form.Item>
            <Form.Item
              name="nameEn"
              label={t('categoryManagement.nameEn')}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: t('categoryManagement.nameEnRequired'),
                },
              ]}
            >
              <CInput placeholder={t('categoryManagement.nameEnPlaceholder')} />
            </Form.Item>

            <Form.Item
              name="description"
              label={t('categoryManagement.description')}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: t('categoryManagement.descriptionRequired'),
                },
              ]}
            >
              <CTextArea
                placeholder={t('categoryManagement.descriptionPlaceholder')}
              />
            </Form.Item>

            <Form.Item
              name="url"
              label={t('categoryManagement.url')}
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: t('categoryManagement.urlRequired'),
                },
              ]}
            >
              <CInput placeholder={t('categoryManagement.urlPlaceholder')} />
            </Form.Item>

            {/* Upload Icon */}
            <Form.Item
              name="icon"
              label={t('categoryManagement.icon')}
              rules={[
                {
                  required: true,
                  message: t('categoryManagement.iconRequired'),
                },
              ]}
              valuePropName="fileList"
              getValueFromEvent={(e) => e?.fileList}
            >
              <Upload
                beforeUpload={() => false}
                maxCount={1}
                listType="picture"
              >
                <Button icon={<UploadOutlined />}>
                  {t('categoryManagement.chooseIcon')}
                </Button>
              </Upload>
            </Form.Item>

            {/* Danh sách thuộc tính */}
            {isParent ? (
              <></>
            ) : (
              <Form.List name="attributes" initialValue={DAttributesCategory}>
                {(fields, { add, remove }) => (
                  <div>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space
                        key={key}
                        style={{
                          display: 'flex',
                          marginBottom: 4,
                          width: '100%',
                        }}
                        align="baseline"
                      >
                        <Form.Item
                          {...restField}
                          name={[name, 'nameVn']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: t(
                                'categoryManagement.attributeNameVnRequired'
                              ),
                            },
                          ]}
                        >
                          <CInput
                            placeholder={t(
                              'categoryManagement.attributeNameVnPlaceholder'
                            )}
                          />
                        </Form.Item>
                        <Form.Item
                          {...restField}
                          name={[name, 'nameEn']}
                          rules={[
                            {
                              required: true,
                              whitespace: true,
                              message: t(
                                'categoryManagement.attributeNameEnRequired'
                              ),
                            },
                          ]}
                        >
                          <CInput
                            placeholder={t(
                              'categoryManagement.attributeNameEnPlaceholder'
                            )}
                          />
                        </Form.Item>

                        <Form.Item
                          {...restField}
                          name={[name, 'values']}
                          rules={[
                            {
                              required: true,
                              message: t(
                                'categoryManagement.attributeValueRequired'
                              ),
                            },
                          ]}
                        >
                          <Select
                            mode="tags"
                            placeholder={t(
                              'categoryManagement.attributeValuePlaceholder'
                            )}
                            style={{ minWidth: 200 }}
                          />
                        </Form.Item>

                        {fields.length > 1 ? (
                          <p
                            className="text-red-500  cursor-pointer hover:text-red-200"
                            onClick={() => remove(name)}
                          >
                            <DeleteOutlined /> {t('common.delete')}
                          </p>
                        ) : null}
                      </Space>
                    ))}
                    <div className="flex flex-1">
                      <Form.Item>
                        <Button
                          className="bg-sunflower-yellow text-white"
                          onClick={() => add()}
                          icon={<PlusOutlined />}
                        >
                          {t('categoryManagement.addAttribute')}
                        </Button>
                      </Form.Item>
                    </div>
                  </div>
                )}
              </Form.List>
            )}
          </Form>
        </div>
      </Spin>
    </div>
  );
}

export default CategoryCreatePage;
