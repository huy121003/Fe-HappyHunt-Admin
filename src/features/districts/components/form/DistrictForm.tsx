import { useNavigate } from 'react-router-dom';
import { IDistrict, IDistrictPayload } from '../../data/interface';
import { useCallback, useEffect } from 'react';
import { Card, Form, Spin } from 'antd';
import CHeaderForm from '@/components/CHeaderForm';
import CInput from '@/components/CInput';
import SelectProvince from '@/features/provinces/components/form/SelectProvince';

interface DistrictFormProps {
  loading: boolean;
  onSubmit: (values: IDistrictPayload, id?: number) => void;
  disabled?: boolean;
  title?: string;
  isView?: boolean;
  data?: IDistrict;
}
const DistrictForm: React.FC<DistrictFormProps> = ({
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
    navigate('/addresses/districts');
  }, [navigate]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        provinceId: data.provinceId?._id,
      });
    }
  }, [data, form]);
  const onFinish = async () => {
    const values = await form.validateFields();
    const payload: IDistrictPayload = {
      ...values,
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <CHeaderForm
        onCancel={onCancel}
        title={title || 'District Create'}
        disable={disabled}
        onSave={isView ? undefined : form.submit}
      />

      <Card className="mt-4">
        <Form<IDistrictPayload>
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
            rules={[{ required: true, message: 'Please input name!' }]}
          >
            <CInput placeholder="Name" />
          </Form.Item>
          <Form.Item
            className="w-1/2"
            label="Province"
            name="provinceId"
            rules={[{ required: true, message: 'Please input province!' }]}
          >
            <SelectProvince
              allowClear
              placeholder="Select Province"
              defaultSelected={data?.provinceId ? [data.provinceId] : []}
            />
          </Form.Item>
          <Form.Item
            label="Code Name"
            name="codeName"
            rules={[{ required: true, message: 'Please input code name!' }]}
          >
            <CInput placeholder="Code Name" />
          </Form.Item>
          <Form.Item
            label="Short Code"
            name="shortCodeName"
            rules={[{ required: true, message: 'Please input short code!' }]}
          >
            <CInput placeholder="Short Code" />
          </Form.Item>
        </Form>
      </Card>
      {/* <iframe
        width="450"
        height="250"
        style={{ border: 0 }}
        referrerPolicy="no-referrer-when-downgrade"
        title="Google Maps Embed"
        src="https://www.google.com/maps/embed/v1/place
  ?key=AIzaSyCjRn5N1bQTNehuwx0-Vkd1P3XpiAO-jgI
  &q=Eiffel+Tower,Paris+France"
      ></iframe> */}
    </Spin>
  );
};
export default DistrictForm;
