import { Button, Card, Form, Spin } from 'antd';
import React, { useCallback, useEffect } from 'react';
import { IVipActivation } from '../../data/interface';
import CInput from '@/components/CInput';
interface IVipActivationFormProps {
  onSubmit: (values: IVipActivation) => void;
  data?: IVipActivation;
  disabled?: boolean;
  loading?: boolean;
  isEdit?: boolean;
  setIsEdit?: React.Dispatch<React.SetStateAction<boolean>>;
}
const VipActivationForm: React.FC<IVipActivationFormProps> = ({
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
      const payload: IVipActivation = {
        ...values,
      };
      onSubmit(payload);
    } else {
      if (setIsEdit) setIsEdit(true);
    }
  };

  return (
    <Spin spinning={loading}>
      <Card className={`flex-1  overflow-y-auto h-[600px]  `}>
        <Form<IVipActivation>
          initialValues={data}
          form={form}
          layout="vertical"
          name="vipActivationForm"
          onFinish={onFinish}
          style={{ width: '100%' }}
          disabled={!isEdit}
        >
          <Form.Item
            name="moneyToCoin"
            label="Money to Coin"
            rules={[
              {
                required: true,
                message: 'Money to Coin is required',
              },
            ]}
          >
            <CInput placeholder="Money to Coin" type="number" />
          </Form.Item>
          <Form.Item
            name="coinToVip"
            label="Coin to Vip"
            rules={[
              {
                required: true,
                message: 'Coin to Vip is required',
              },
            ]}
          >
            <CInput placeholder="Coin to Vip" type="number" />
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
export default VipActivationForm;
