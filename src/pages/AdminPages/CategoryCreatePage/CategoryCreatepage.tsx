import { useTranslation } from 'react-i18next';
import { useEffect, useState } from 'react';
import { Form, Input, Button, Upload, Space, Select, notification } from 'antd';
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import categoryApi from '@/apis/categoryApi';
import DAttributesCategory from '@/data/DAttributesCategory';
import i18n from '@/locales';
import { CHeaderFormAdmin } from '@/components';
import CTextArea from '@/components/CTextArea';

function CategoryCreatePage() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [isCreate, setIsCreate] = useState(true);
  const [categoryParent, setCategoryParent] = useState([]);
  const [id, setId] = useState('');
  const [isParent, setIsParent] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      if (window.location.pathname.includes('edit')) {
        setIsCreate(false);
        const _id = window.location.pathname.split('/').pop();

        if (_id) {
          setId(_id);
          const result = await categoryApi.AFetchCategoryById(_id);

          if (result.statusCode === 200) {
            if (result.data.parent) {
              setIsParent(false);
            }
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
  useEffect(() => {
    const fetchCategoryParent = async () => {
      const categoryParent = await categoryApi.AgetCategoryParent();

      if (categoryParent.statusCode === 200) {
        const newCategoryParent = categoryParent.data.filter(
          (item: any) => item._id !== id
        );
        setCategoryParent(newCategoryParent);
        console.log(newCategoryParent);
      }
    };
    fetchCategoryParent();
  }, [id]);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const values = await form.validateFields();
      console.log(values);

      console.log('Received values:', values);
      const formData = new FormData();
      formData.append('nameVn', values.nameVn);
      formData.append('nameEn', values.nameEn);
      formData.append('description', values.description);
      formData.append('url', values.url);
      if (isParent) formData.append('parent', 'null');
      else formData.append('parent', values.parent);
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
    <div className=" flex-1  justify-start flex flex-col">
      <CHeaderFormAdmin
        isCreate={isCreate}
        onCancel={() => navigate('/admin/categories')}
        onSave={handleSubmit}
        title={
          isCreate
            ? t('categoryManagement.categoryCreate')
            : t('categoryManagement.categoryUpdate')
        }
        loading={loading}
      />

      <div className="  bg-white m-2 p-3 rounded-md">
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

              {categoryParent.map((item: any) => (
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
                message: t('categoryManagement.nameVnRequired'),
              },
            ]}
          >
            <Input placeholder={t('categoryManagement.nameVnPlaceholder')} />
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
            <Input placeholder={t('categoryManagement.nameEnPlaceholder')} />
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
            {/* <CTextArea
              placeholder={t('categoryManagement.descriptionPlaceholder')}
              maxLenght={500}
              value={form.getFieldValue('description')}
              onChange={(value: string) => {
                console.log(value);
                form.setFieldsValue({ description: value });
              }}
            /> */}
          </Form.Item>

          <Form.Item
            name="url"
            label={t('categoryManagement.url')}
            rules={[
              { required: true, message: t('categoryManagement.urlRequired') },
            ]}
          >
            <Input placeholder={t('categoryManagement.urlPlaceholder')} />
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
          )}
        </Form>
      </div>
    </div>
  );
}

export default CategoryCreatePage;
