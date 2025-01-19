import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import {
  Form,
  Input,
  Button,
  Upload,
  Space,
  Select,
  Typography,
  Divider,
  notification,
} from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import categoryApi from '@/apis/categoryApi';
import DAttributesCategory from '@/data/DAttributesCategory';

function CategoryCreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [id, setId] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      if (window.location.pathname.includes('edit')) {
        setIsCreate(false);
        const _id = window.location.pathname.split('/').pop();

        if (_id) {
          setId(_id);
          const result = await categoryApi.AFetchCategoryById(_id);
          if (result.statusCode === 200) {
            form.setFieldsValue({
              ...result.data,
              icon: [
                {
                  uid: '-1',
                  name: `${result.data.icon.split('/').pop()}`,
                  status: 'done',
                  url: result.data.icon,
                },
              ],
            });
          }
        }
      }
    };
    fetchData();
  }, []);
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      if (values.attributes.length === 0) {
        console.log('Received values:', values);
        notification.error({
          message: t('common.error'),
          description: 'Vui lòng thêm ít nhất một thuộc tính cho danh mục!',
        });
        return;
      }
      console.log('Received values:', values);
      const formData = new FormData();
      formData.append('nameVn', values.nameVn);
      formData.append('nameEn', values.nameEn);
      formData.append('description', values.description);
      formData.append('url', values.url);

      // Kiểm tra icon có tồn tại không
      if (isCreate) {
        formData.append('icon', values.icon[0].originFileObj);
      } else {
        formData.append(
          'icon',
          values.icon[0].originFileObj || `${values.icon[0].url}`
        );
      }

      // Chuyển đổi attributes thành JSON
      //loai bỏ id của thuộc tính

      formData.append('attributes', JSON.stringify(values.attributes || []));

      // Gửi dữ liệu (thay thế bằng API của bạn)

      if (isCreate) {
        const result = await categoryApi.ACreateCategory(formData);

        if (result.statusCode === 200) {
          notification.success({
            message: t('common.success'),
            description: t('categoryManagement.createSuccess'),
          });
          navigate('/admin/categories');
          form.resetFields();
        } else {
          notification.error({
            message: t('common.error'),
            description: t('common.systemError'),
          });
        }
      } else {
        const result = await categoryApi.AUpdateCategory(id, formData);
        if (result.statusCode === 200) {
          notification.success({
            message: t('common.success'),
            description: t('categoryManagement.updateSuccess'),
          });
          navigate('/admin/categories');
        } else {
          notification.error({
            message: t('common.error'),
            description: t('common.systemError'),
          });
        }
      }
    } catch {
      // Do nothing
    }
    setLoading(false);
  };

  return (
    <div className="bg-white flex-1  p-4 rounded-md m-2 justify-start flex flex-col">
      <div className="flex items-center justify-between">
        <Typography.Title level={2}>
          {isCreate
            ? t('categoryManagement.categoryCreate')
            : t('categoryManagement.categoryUpdate')}
        </Typography.Title>
        <div className="gap-4">
          <Button
            className="bg-gray-200 text-black m-2"
            onClick={() => navigate('/admin/categories')}
          >
            {t('common.back')}
          </Button>
          <Button
            onClick={handleSubmit}
            loading={loading}
            className="bg-flame-orange text-white"
          >
            {isCreate ? t('common.create') : t('common.save')}
          </Button>
        </div>
      </div>
      <Divider />
      <div className="  overflow-y-auto  flex-1 justify-start p-4 ">
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
            name="nameVn"
            label={t('categoryManagement.nameVn')}
            rules={[
              {
                required: true,
                message: t('categoryManagement.nameVnRequired'),
              },
            ]}
          >
            <Input
              placeholder={t('categoryManagement.nameVnPlaceholder')}
              disabled={isCreate ? false : true}
            />
          </Form.Item>

          <Form.Item
            name="nameEn"
            label={t('categoryManagement.nameEn')}
            rules={[
              {
                required: true,
                message: t('categoryManagement.nameEnRequired'),
              },
            ]}
          >
            <Input
              placeholder={t('categoryManagement.nameEnPlaceholder')}
              disabled={isCreate ? false : true}
            />
          </Form.Item>

          <Form.Item
            name="description"
            label={t('categoryManagement.description')}
            rules={[
              {
                required: true,
                message: t('categoryManagement.descriptionRequired'),
              },
            ]}
          >
            <Input.TextArea
              rows={3}
              placeholder={t('categoryManagement.descriptionPlaceholder')}
            />
          </Form.Item>

          <Form.Item
            name="url"
            label={t('categoryManagement.url')}
            rules={[
              { required: true, message: t('categoryManagement.urlRequired') },
            ]}
          >
            <Input
              placeholder={t('categoryManagement.urlPlaceholder')}
              disabled={isCreate ? false : true}
            />
          </Form.Item>

          {/* Upload Icon */}
          <Form.Item
            name="icon"
            label={t('categoryManagement.icon')}
            rules={[
              { required: true, message: t('categoryManagement.iconRequired') },
            ]}
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList}
          >
            <Upload beforeUpload={() => false} maxCount={1} listType="picture">
              <Button icon={<UploadOutlined />}>
                {t('categoryManagement.chooseIcon')}
              </Button>
            </Upload>
          </Form.Item>

          {/* Danh sách thuộc tính */}
          <Form.List name="attributes" initialValue={DAttributesCategory}>
            {(fields, { add, remove }) => (
              <div>
                {fields.map(({ key, name, ...restField }) => (
                  <Space
                    key={key}
                    style={{ display: 'flex', marginBottom: 4, width: '100%' }}
                    align="baseline"
                  >
                    <Form.Item
                      {...restField}
                      name={[name, 'nameVn']}
                      rules={[
                        {
                          required: true,
                          message: t(
                            'categoryManagement.attributeNameVnRequired'
                          ),
                        },
                      ]}
                    >
                      <Input
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
                          message: t(
                            'categoryManagement.attributeNameEnRequired'
                          ),
                        },
                      ]}
                    >
                      <Input
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
        </Form>
      </div>
    </div>
  );
}

export default CategoryCreatePage;
