import { useCallback, useEffect } from 'react';
import {
  IQAChatbot,
  IQAChatbotPayload,
} from '@/features/qa-chatbots/data/interface';
import { useNavigate } from 'react-router-dom';
import { Card, Form, Spin } from 'antd';
import CHeaderForm from '@/components/CHeaderForm';
import CTextArea from '@/components/CTextArea';

interface IQAChatBotFormProps {
  loading: boolean;
  onSubmit: (values: IQAChatbotPayload, id?: number) => void;
  disabled?: boolean;
  title?: string;
  isView?: boolean;
  data?: IQAChatbot;
}

function QAChatBotForm({
  loading,
  onSubmit,
  disabled,
  title,
  isView,
  data,
}: IQAChatBotFormProps) {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const onCancel = useCallback(() => {
    navigate('/q&a');
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
    const payload: IQAChatbotPayload = {
      ...values,
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <CHeaderForm
        onCancel={onCancel}
        title={title || 'Q&A Chatbot Create'}
        disable={disabled}
        onSave={isView ? undefined : form.submit}
      />
      <Card className="mt-4">
        <Form<IQAChatbotPayload>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ...data }}
          style={{ width: '100%' }}
          disabled={disabled || isView}
        >
          <Form.Item
            label="Question"
            name="question"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input question!',
              },
            ]}
          >
            <CTextArea placeholder="Question" maxLength={1000} />
          </Form.Item>
          <Form.Item
            label="Answer"
            name="answer"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input answer!',
              },
            ]}
          >
            <CTextArea placeholder="Answer" maxLength={1000} />
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
}

export default QAChatBotForm;
