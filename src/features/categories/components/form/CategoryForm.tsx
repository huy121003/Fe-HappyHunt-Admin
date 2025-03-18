import {
  Button,
  Card,
  Flex,
  Form,
  Radio,
  Select,
  Spin,
  Typography,
  Upload,
  UploadFile,
} from 'antd';
import ImgCrop from 'antd-img-crop';
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
import CButton from '@/components/buttons/CButton';
import SelectCategoryParent from './SelectCategoryParent';
import useUpload from '@/hooks/useUpload';
import CSelect from '@/components/CSelect';
import { Type } from '../../data/constant';

interface ICategoryFormProps {
  onSubmit: (values: ICategoryPayload, id?: number) => void;
  data?: ICategory;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  isView?: boolean;
}
interface IForm extends Omit<ICategory, 'image'> {
  image?: UploadFile[];
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
  const { fileList, setFileList, onChange, handleBeforeUpload } =
    useUpload(form);
  const navigate = useNavigate();
  const onCancel = useCallback(() => {
    navigate('/categories');
  }, [navigate]);
  const isPayment = Form.useWatch(['isPayment'], form);

  useEffect(() => {
    if (data) {
      setFileList(
        data.icon
          ? [
              {
                uid: `${Date.now()}`,
                name: 'image.png',
                status: 'done',
                url: data.icon,
              },
            ]
          : []
      );
      form.setFieldsValue({
        ...data,
        image: data.icon
          ? [
              {
                uid: `${Date.now()}`,
                name: 'image.png',
                status: 'done',
                url: data.icon,
              },
            ]
          : undefined,
        parent: data.parent?._id,
        keywords: data.keywords,
      });
    } else {
      form.setFieldsValue({
        isPayment: false,
      });
    }
  }, [data, form]);
  const onFinish = async () => {
    const values = await form.validateFields();
    const currentYear = new Date().getFullYear();
    const yearOptions = [
      ...Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i),
      'Before 1980',
    ];
    console.log('ddedew', isPayment);
    const payload: ICategoryPayload = {
      ...values,
      attributes: values.attributes?.map((attr) => ({
        ...attr,
        values: attr.type === Type.YEAR ? yearOptions : attr.values,
      })),
      icon: values.image?.[0]?.originFileObj,
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

      <Card className={`flex-1  overflow-y-auto`}>
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

          <Form.Item label="Payment">
            <Flex gap={8} justify="start" align="center">
              <Form.Item
                name="isPayment"
                valuePropName="value"
                rules={[
                  {
                    required: true,
                    message: 'Please select payment status!',
                  },
                ]}
              >
                <Radio.Group>
                  <Radio
                    onClick={() => {
                      form.setFields([
                        {
                          name: 'pricePayment',
                          errors: [],
                        },
                      ]);
                    }}
                    value={false}
                  >
                    Non Payment
                  </Radio>
                  <Radio value={true}>Payment</Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="pricePayment"
                rules={
                  isPayment
                    ? [
                        {
                          required: true,
                          message: 'Please input price payment!',
                        },
                      ]
                    : []
                }
              >
                <CInput
                  type="number"
                  min={0}
                  placeholder="Input price payment"
                  hidden={!isPayment}
                />
              </Form.Item>
            </Flex>
          </Form.Item>

          <Form.Item name="description" label="Description">
            <CTextArea placeholder="Input category description" rows={4} />
          </Form.Item>
          <Form.Item
            name="image"
            label="Category Icon"
            valuePropName="fileList"
            getValueFromEvent={(e) => e?.fileList || []}
          >
            <ImgCrop rotationSlider aspect={1 / 1}>
              <Upload
                accept=".png,.jpg,.jpeg"
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                multiple={false}
                onChange={onChange}
                beforeUpload={handleBeforeUpload('.png,.jpg,.jpeg')}
              >
                {fileList.length < 1 && (
                  <Button icon={<UploadOutlined />} type="dashed" />
                )}
              </Upload>
            </ImgCrop>
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
          <Form.List
            name="attributes"
            initialValue={[
              {
                name: '',
                values: [],
              },
            ]}
          >
            {(fields, { add, remove }) => (
              <div className="bg-gray-100 p-4 rounded-md">
                {fields.map(({ key, name, ...restField }) => {
                  return (
                    <Flex
                      key={key}
                      className="bg-white p-4 rounded-lg shadow mb-2"
                    >
                      <Flex className="flex-1" vertical gap={8}>
                        {/* Attribute Name */}
                        <Form.Item
                          {...restField}
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

                        {/* Attribute Type */}
                        <Form.Item
                          {...restField}
                          name={[name, 'type']}
                          label="Attribute Type"
                          rules={[
                            {
                              required: true,
                              message: 'Please select attribute type!',
                            },
                          ]}
                        >
                          <CSelect
                            options={Object.values(Type).map((type) => ({
                              label: type,
                              value: type,
                            }))}
                            placeholder="Please select attribute type"
                            style={{ minWidth: 200 }}
                          />
                        </Form.Item>

                        {/* Watch 'type' for conditional rendering */}
                        <Form.Item shouldUpdate>
                          {({ getFieldValue }) => {
                            const type = getFieldValue([
                              'attributes',
                              name,
                              'type',
                            ]);
                            if (type === Type.SELECT || type === Type.RADIO) {
                              return (
                                <Form.Item
                                  {...restField}
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
                              );
                            }
                            return null;
                          }}
                        </Form.Item>
                      </Flex>

                      {/* Remove Button */}
                      {fields.length > 1 && (
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
                  );
                })}

                {/* Add Attribute Button */}
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
