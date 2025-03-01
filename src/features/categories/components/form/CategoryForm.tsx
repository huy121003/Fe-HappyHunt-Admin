import {
  Button,
  Card,
  Flex,
  Form,
  Select,
  Spin,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { ICategory, ICategoryPayload } from '../../data/interface';
import CHeaderForm from '@/components/CHeaderForm';
import CInput from '@/components/CInput';
import CTextArea from '@/components/CTextArea';
import {
  DeleteOutlined,
  PlusOutlined,
  UploadOutlined,
} from '@ant-design/icons';
import DAttributesCategory from '@/data/DAttributesCategory';
import CButton from '@/components/buttons/CButton';
import SelectCategoryParent from './SelectCategoryParent';
interface ICategoryFormProps {
  onSubmit: (values: ICategoryPayload, id?: number) => void;
  data?: ICategory;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  isView?: boolean;
}
interface IForm extends Omit<ICategory, 'icon'> {
  icon?: UploadFile[];
}

const CategoryForm: React.FC<ICategoryFormProps> = ({
  onSubmit,
  data,
  disabled,
  loading,
  title,
  isView,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onCancel = useCallback(() => {
    navigate('/categories');
  }, [navigate]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        parent: data.parent?._id,
        icon: [
          {
            uid: `${Date.now()}`,
            name: 'image.png',
            status: 'done',
            url: data.icon,
          },
        ],
        keywords: data.keywords,
      });
    }
  }, [data, form]);
  const onFinish = async () => {
    const values = await form.validateFields();
    const payload: ICategoryPayload = {
      ...values,
      icon: values.icon?.[0].originFileObj,
    };

    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      {!isView && (
        <CHeaderForm
          onCancel={onCancel}
          onSave={form.submit}
          title={title || 'Category Create'}
          disable={disabled}
        />
      )}

      <Card
        className={`flex-1  overflow-y-auto
          ${isView ? 'h-[550px]' : 'h-[660px]'}
          `}
      >
        <Form<IForm>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ...data, icon: [] }}
          style={{ width: '100%' }}
          disabled={disabled || isView}
        >
          <Form.Item name="parent" label="Parent Category">
            <SelectCategoryParent
              allowClear
              defaultSelected={
                data?.parent
                  ? [
                      {
                        name: data.parent.name,
                        _id: data.parent._id,
                      },
                    ]
                  : undefined
              }
            />
          </Form.Item>
          <Form.Item
            name="name"
            label="Category Name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input category name!',
              },
            ]}
          >
            <CInput placeholder="Input category name" />
          </Form.Item>

          <Form.Item name="description" label="Description">
            <CTextArea placeholder="Input category description" rows={4} />
          </Form.Item>

          <Form.Item
            initialValue="/"
            name="url"
            label="URL"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input category URL!',
              },
              {
                validator: (_, value) => {
                  if (value && value.length > 2 && value[0] === '/') {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('URL must start with "/"'));
                },
              },
            ]}
          >
            <CInput placeholder="Input category URL" addonBefore="/" />
          </Form.Item>

          <Form.Item
            name="icon"
            label="Category Icon"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[
              {
                required: true,
                message: 'Please upload category icon!',
              },
            ]}
          >
            <Upload
              accept=".png,.jpg,.jpeg"
              beforeUpload={() => false}
              maxCount={1}
              multiple={false}
              listType="picture-card"
              onPreview={() => {}}
            >
              <Button icon={<UploadOutlined />} type="dashed" />
            </Upload>
          </Form.Item>
          <Form.Item
            name="keywords"
            label="Keywords"
            rules={[
              {
                required: true,
                message: 'Please input category keywords!',
              },
            ]}
          >
            <Select mode="tags" placeholder="Input category keywords" />
          </Form.Item>

          <Typography.Title level={5}>Attributes</Typography.Title>
          <Form.List name="attributes" initialValue={DAttributesCategory}>
            {(fields, { add, remove }) => (
              <div className="bg-gray-100 p-4 rounded-md">
                {fields.map(({ key, name }, index) => (
                  <Flex
                    key={key}
                    className="bg-white p-4 rounded-lg shadow mb-2"
                  >
                    <Flex className="flex-1" vertical gap={8}>
                      <Form.Item
                        name={[name, 'name']}
                        label="Attribute Name"
                        rules={[
                          {
                            required: true,
                            whitespace: true,
                            message: 'Please input attribute name!',
                          },
                        ]}
                      >
                        <CInput placeholder="Input attribute name" />
                      </Form.Item>

                      <Form.Item
                        name={[name, 'values']}
                        label="Attribute Values"
                        rules={[
                          {
                            required: true,
                            message: 'Please input attribute values!',
                          },
                        ]}
                      >
                        <Select
                          mode="tags"
                          placeholder="Input attribute values"
                          style={{ minWidth: 200 }}
                        />
                      </Form.Item>
                    </Flex>
                    {fields.length > 1 && index > 0 && (
                      <Flex className="items-start">
                        <Button
                          type="text"
                          size="large"
                          icon={<DeleteOutlined />}
                          onClick={() => remove(name)}
                          className="text-red-500"
                        />
                      </Flex>
                    )}
                  </Flex>
                ))}
                <CButton
                  type="dashed"
                  onClick={() => add()}
                  block
                  icon={<PlusOutlined />}
                >
                  Add attribute
                </CButton>
              </div>
            )}
          </Form.List>
        </Form>
      </Card>
    </Spin>
  );
};

export default CategoryForm;
