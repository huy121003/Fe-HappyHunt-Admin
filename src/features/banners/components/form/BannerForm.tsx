import { Button, Card, Form, Spin, Upload, UploadFile } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { IBanner, IBannerPayload } from '../../data/interface';
import CHeaderForm from '@/components/CHeaderForm';
import CInput from '@/components/CInput';
import CTextArea from '@/components/CTextArea';
import { UploadOutlined } from '@ant-design/icons';
import useBeforeUpload from '@/hooks/useBeforeUpload';

interface IBannerFormProps {
  onSubmit: (values: IBannerPayload, id?: number) => void;
  data?: IBanner;
  disabled?: boolean;
  loading?: boolean;
  title?: string;
  isView?: boolean;
}
interface IForm extends Omit<IBanner, 'image'> {
  image?: UploadFile[];
}
const BannerForm: React.FC<IBannerFormProps> = ({
  onSubmit,
  data,
  disabled,
  loading,
  title,
  isView,
}) => {
  const { beforeUploadBanner } = useBeforeUpload();
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onCancel = useCallback(() => {
    navigate('/banners');
  }, [navigate]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        image: [
          {
            uid: `${Date.now()}`,
            name: 'image.png',
            status: 'done',
            url: data.image,
          },
        ],
      });
    }
  }, [data, form]);
  const onFinish = async () => {
    const values = await form.validateFields();
    const payload: IBannerPayload = {
      ...values,
      image: values.image[0].originFileObj,
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <CHeaderForm
        onCancel={onCancel}
        onSave={isView ? undefined : form.submit}
        title={title || 'Category Create'}
        disable={disabled}
      />

      <Card className={`flex-1  overflow-y-auto h-[660px] `}>
        <Form<IForm>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...data,
            image: [],
          }}
          style={{ width: '100%' }}
          disabled={disabled || isView}
        >
          <Form.Item
            label="Title"
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input title',
              },
            ]}
          >
            <CInput placeholder="Input title" />
          </Form.Item>
          <Form.Item
            label="Link"
            name="link"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input link',
              },
              {
                validator: (_, value) => {
                  if (value && !/^(http|https):\/\//.test(value)) {
                    return Promise.reject('Link must be a valid URL');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <CInput placeholder="Input link" />
          </Form.Item>
          <Form.Item
            label="Image"
            name="image"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: 'Please upload image' }]}
          >
            <Upload
              multiple={false}
              listType="picture-card"
              maxCount={1}
              onPreview={() => {}}
              accept=".png,.jpg,.jpeg"
              beforeUpload={beforeUploadBanner}
            >
              <Button icon={<UploadOutlined />} type="dashed" />
            </Upload>
          </Form.Item>
          <Form.Item label="Description" name="description">
            <CTextArea placeholder="Input description" />
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};
export default BannerForm;
