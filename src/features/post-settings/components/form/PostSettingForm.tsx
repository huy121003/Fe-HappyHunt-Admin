import { Button, Card, Form, Spin } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { IPostSetting } from '../../data/interface';

import CInput from '@/components/CInput';
interface IPostSettingFormProps {
  onSubmit: (values: IPostSetting) => void;
  data?: IPostSetting;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
  disabled?: boolean;
  loading?: boolean;
}
const PostSettingForm: React.FC<IPostSettingFormProps> = ({
  onSubmit,
  data,
  loading,
  isEdit,
  setIsEdit,
}) => {
  const [form] = Form.useForm();

  const onCancel = useCallback(() => {
    if (setIsEdit) setIsEdit(false);
  }, []);
  useEffect(() => {
    if (data) {
      form.setFieldsValue(data);
    }
  }, [data, form]);
  const onFinish = async () => {
    if (isEdit) {
      const values = await form.validateFields();
      const payload: IPostSetting = {
        ...values,
      };
      onSubmit(payload);
    } else {
      if (setIsEdit) setIsEdit(true);
    }
  };

  return (
    <Spin spinning={loading}>
      <Card className={`flex-1   overflow-y-auto  `}>
        <Form<IPostSetting>
          initialValues={data}
          form={form}
          layout="vertical"
          name="postSettingForm"
          onFinish={onFinish}
          style={{ width: '100%' }}
          disabled={!isEdit}
        >
          <Form.Item
            className="w-full"
            label="Limit Post Number"
            name="limitPost"
            rules={[
              {
                required: true,
                message: 'Limit Post Number is required',
              },
            ]}
          >
            <CInput
              type="number"
              disabled={!isEdit}
              placeholder="Limit Post Number"
            />
          </Form.Item>
          <Form.Item
            label="Limit Post Vip Number"
            name="limitVipPost"
            rules={[
              {
                required: true,
                message: 'Limit Post Vip Number is required',
              },
            ]}
          >
            <CInput type="number" placeholder="Limit Post Vip Number" />
          </Form.Item>
          <Form.Item
            label="Time Expired (days)"
            name="timeExpired"
            rules={[
              {
                required: true,
                message: 'Time Expired is required',
              },
            ]}
          >
            <CInput type="number" placeholder="Time Expired" />
          </Form.Item>
          <Form.Item
            label="Min Image Post"
            name="minImagePost"
            rules={[
              {
                required: true,
                message: 'Min Image Post is required',
              },
            ]}
          >
            <CInput type="number" placeholder="Min Image Post" />
          </Form.Item>
          <Form.Item
            label="Max Image Post"
            name="maxImagePost"
            rules={[
              {
                required: true,
                message: 'Max Image Post is required',
              },
            ]}
          >
            <CInput type="number" placeholder="Max Image Post" />
          </Form.Item>
        </Form>
        <div className="flex justify-end m-6 gap-4">
          {isEdit ? <Button onClick={onCancel}>Cancel</Button> : null}
          <Button type="primary" loading={loading} onClick={form.submit}>
            {isEdit ? 'Save' : 'Edit'}
          </Button>
        </div>
      </Card>
    </Spin>
  );
};

export default PostSettingForm;
