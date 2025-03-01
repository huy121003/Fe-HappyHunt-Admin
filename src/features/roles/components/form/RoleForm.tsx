import { useNavigate } from 'react-router-dom';
import { IRole, IRolePayload } from '../../data/interface';
import { useCallback, useEffect } from 'react';
import { Card, Form, Spin } from 'antd';
import CHeaderForm from '@/components/CHeaderForm';
import CInput from '@/components/CInput';
import PermissionForm from './PermissionForm';
import CTextArea from '@/components/CTextArea';

interface RoleFormProps {
  loading: boolean;
  onSubmit: (values: IRolePayload, id?: number) => void;
  disabled?: boolean;
  title?: string;
  isView?: boolean;
  data?: IRole;
}
const RoleForm: React.FC<RoleFormProps> = ({
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
    navigate('/admin_roles/roles');
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
    const payload: IRolePayload = {
      ...values,
      permissions: values.permissions.map((item: any) => ({
        name: item.name,
        codeName: item.codeName,
        isView: item.isView,
        isCreate: item.isCreate,
        isUpdate: item.isUpdate,
        isDelete: item.isDelete,
      })),
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <CHeaderForm
        onCancel={onCancel}
        onSave={isView ? undefined : form.submit}
        title={title || 'Role Create'}
        disable={disabled}
      />

      <Card className={`flex-1  overflow-y-auto h-[670px]`}>
        <Form<IRolePayload>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ...data, icon: [] }}
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
                message: 'Please input role name!',
              },
            ]}
          >
            <CInput placeholder="Input role name" />
          </Form.Item>
          <Form.Item label="Description" name="description">
            <CTextArea placeholder="Input role description" />
          </Form.Item>
          <PermissionForm permissions={data?.permissions || []} form={form} />
        </Form>
      </Card>
    </Spin>
  );
};

export default RoleForm;
