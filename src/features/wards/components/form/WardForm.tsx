import { useNavigate } from 'react-router-dom';
import { IWard, IWardPayload } from '../../data/interface';
import { useCallback, useEffect } from 'react';
import { Card, Form, Spin } from 'antd';
import CHeaderForm from '@/components/CHeaderForm';
import CInput from '@/components/CInput';
import SelectDictrict from '@/features/districts/components/form/SelectDictrict';
import SelectProvince from '@/features/provinces/components/form/SelectProvince';
interface WardFormProps {
  loading: boolean;
  onSubmit: (values: IWardPayload, id?: number) => void;
  disabled?: boolean;
  title?: string;
  isView?: boolean;
  data?: IWard;
}
const WardForm: React.FC<WardFormProps> = ({
  loading,
  onSubmit,
  disabled,
  title,
  isView,
  data,
}) => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const province = Form.useWatch(['province'], form);
  const onCancel = useCallback(() => {
    navigate('/addresses/wards');
  }, [navigate]);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        district: data.district?._id,
        province: data.province?._id,
      });
    }
  }, [data, form]);
  const onFinish = async () => {
    const values = await form.validateFields();
    const payload: IWardPayload = {
      ...values,
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <CHeaderForm
        onCancel={onCancel}
        title={title || 'Ward Create'}
        disable={disabled}
        onSave={isView ? undefined : form.submit}
      />

      <Card className="mt-4">
        <Form<IWardPayload>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ...data }}
          style={{ width: '100%' }}
          disabled={disabled || isView}
        >
          <Form.Item
            label="Ward Name"
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input ward name!',
              },
            ]}
          >
            <CInput placeholder="Enter Ward Name" />
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
            <CInput placeholder="Enter Code Name" />
          </Form.Item>
          <Form.Item
            label="Short Code Name"
            name="shortCodeName"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input short code name!',
              },
            ]}
          >
            <CInput placeholder="Enter Short Code Name" />
          </Form.Item>
          <Form.Item
            label="Province Name"
            name="province"
            rules={[
              {
                required: true,

                message: 'Please select province name!',
              },
            ]}
          >
            <SelectProvince
              placeholder="Select Province"
              defaultSelected={
                data?.province
                  ? [
                      {
                        _id: data.province._id,
                        name: data.province.name,
                      },
                    ]
                  : undefined
              }
            />
          </Form.Item>
          <Form.Item
            label="District Name"
            name="district"
            rules={[
              { required: true, message: 'Please select district name!' },
            ]}
          >
            <SelectDictrict
              province={province}
              disabled={!province}
              placeholder="Select District"
              defaultSelected={
                data?.district
                  ? [
                      {
                        _id: data.district._id,
                        name: data.district.name,
                      },
                    ]
                  : undefined
              }
            />
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};
export default WardForm;
