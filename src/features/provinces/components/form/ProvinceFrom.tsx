import { useNavigate } from 'react-router-dom';
import { IProvince, IProvincePayload } from '../../data/interface';
import { useCallback, useEffect } from 'react';
import { Card, Form, Spin } from 'antd';
import CHeaderForm from '@/components/CHeaderForm';
import CInput from '@/components/CInput';

interface ProvinceFormProps {
  loading: boolean;
  onSubmit: (values: IProvincePayload, id?: number) => void;
  disabled?: boolean;
  title?: string;
  isView?: boolean;
  data?: IProvince;
}
const ProvinceForm: React.FC<ProvinceFormProps> = ({
  loading,
  onSubmit,
  disabled,
  title,
  isView,
  data,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onCancel = useCallback(() => {
    navigate('/addresses/provinces');
  }, [navigate]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
      });
    }
  }, [data, form]);
  const onFinish = async () => {
    const values = await form.validateFields();
    const payload: IProvincePayload = {
      ...values,
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <CHeaderForm
        onCancel={onCancel}
        title={title || 'Province Create'}
        disable={disabled}
        onSave={isView ? undefined : form.submit}
      />

      <Card className="mt-4">
        <Form<IProvincePayload>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ...data }}
          style={{ width: '100%' }}
          disabled={disabled || isView}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input name!',
              },
            ]}
          >
            <CInput placeholder="Province Name" />
          </Form.Item>
          <Form.Item
            label="Code Name"
            name="codeName"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input code name!',
              },
            ]}
          >
            <CInput placeholder="Code Name" />
          </Form.Item>
          <Form.Item
            label="Phone Code"
            name="phoneCode"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input phone code!',
              },
            ]}
          >
            <CInput placeholder="Phone Code" type="number" />
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};
export default ProvinceForm;
