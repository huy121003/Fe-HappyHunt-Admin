import {
  Button,
  Card,
  Flex,
  Form,
  Radio,
  Select,
  Spin,
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
import { UploadOutlined } from '@ant-design/icons';
import SelectCategoryParent from './SelectCategoryParent';
import useUpload from '@/hooks/useUpload';
import { Type } from '../../data/constant';
import AttributeForm from './AttributeForm';
import MessageForm from './MessageForm';

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
  const {
    fileList,
    setFileList,
    onChange,
    handleBeforeUpload,
    handlePreview,
    PreviewPlaceholder,
  } = useUpload(form);
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
    const payload: ICategoryPayload = {
      ...values,
      attributes: values.attributes?.map((attr) => ({
        ...attr,
        values: attr.type === Type.YEAR ? yearOptions : attr.values,
        isRequired: attr.isRequired ? true : false,
      })),
      messages: values.messages?.map((message) => ({
        messageSeller: message.messageSeller,
        messageBuyer: message.messageBuyer,
      })),
      icon: values.image?.[0]?.originFileObj,
    };
    console.log('payload', payload);
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
            <ImgCrop rotationSlider>
              <Upload
                accept=".png,.jpg,.jpeg"
                listType="picture-card"
                fileList={fileList}
                maxCount={1}
                multiple={false}
                onChange={onChange}
                onPreview={handlePreview}
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

          <AttributeForm />
          <MessageForm />
        </Form>
        {PreviewPlaceholder}
      </Card>
    </Spin>
  );
};

export default CategoryForm;
