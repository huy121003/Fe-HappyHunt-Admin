import { useNavigate } from 'react-router-dom';
import { IAdmin, IAdminPayload } from '../../data/interface';
import { useCallback, useEffect } from 'react';
import { Button, Card, Form, Spin, Upload } from 'antd';
import CHeaderForm from '@/components/CHeaderForm';
import CInput from '@/components/CInput';
import SelectRole from '@/features/roles/components/form/SelectRole';
import { UploadOutlined } from '@ant-design/icons';
import useUpload from '@/hooks/useUpload';
import ImgCrop from 'antd-img-crop';

interface AdminFormProps {
  loading: boolean;
  onSubmit: (values: IAdminPayload, id?: number) => void;
  disabled?: boolean;
  title?: string;
  isView?: boolean;
  data?: IAdmin;
  isEdit?: boolean;
}

const AdminForm: React.FC<AdminFormProps> = ({
  loading,
  onSubmit,
  disabled,
  title,
  isView,
  data,
  isEdit,
}) => {
  const [form] = Form.useForm();
  const {
    handleBeforeUpload,
    handlePreview,
    onChange,
    fileList,
    setFileList,
    PreviewPlaceholder,
  } = useUpload(form);
  const navigate = useNavigate();
  const onCancel = useCallback(() => {
    navigate('/admin_roles/admins');
  }, [navigate]);
  useEffect(() => {
    if (data) {
      setFileList([
        {
          uid: `${Date.now()}`,
          name: 'image.png',
          status: 'done',
          url: data.avatar,
        },
      ]);
      form.setFieldsValue({
        ...data,
        role: data.role?._id,
      });
    }
  }, [data, form]);
  const onFinish = async () => {
    const values = await form.validateFields();
    const payload: IAdminPayload = {
      ...values,
      avatar: fileList[0]?.originFileObj,
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <CHeaderForm
        onCancel={onCancel}
        title={title || 'Admin Create'}
        disable={disabled}
        onSave={isView ? undefined : form.submit}
      />

      <Card className={`flex-1  overflow-y-auto h-[660px] `}>
        <Form<IAdminPayload>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{ ...data, avatar: [] }}
          style={{ width: '100%' }}
          disabled={disabled || isView}
        >
          <Form.Item
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input your name!' }]}
          >
            <CInput placeholder="Name" />
          </Form.Item>
          <Form.Item
            label="Avatar"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
            rules={[{ required: true, message: 'Please upload an image!' }]}
          >
            <ImgCrop rotationSlider>
              <Upload
                multiple={false}
                listType="picture-circle"
                maxCount={1}
                beforeUpload={handleBeforeUpload('.png,.jpg,.jpeg')}
                onPreview={handlePreview}
                accept=".png,.jpg,.jpeg"
                onChange={onChange}
                fileList={fileList}
              >
                <Button icon={<UploadOutlined />} type="dashed" />
              </Upload>
            </ImgCrop>
          </Form.Item>
          <Form.Item
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input your username!',
              },
              {
                validator: async (_, value) => {
                  if (!/^[a-zA-Z0-9]+(\.[a-zA-Z0-9]+)*$/g.test(value)) {
                    return Promise.reject(
                      'Invalid username format (e.g., admin.super, admin123.232)'
                    );
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <CInput placeholder="Username" disabled={isEdit} />
          </Form.Item>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input your Email!',
              },
              {
                validator: async (_, value) => {
                  if (!/((09|03|07|08|05)+([0-9]{8})\b)/g.test(value)) {
                    return Promise.reject('Invalid Email');
                  }
                  return Promise.resolve();
                },
              },
            ]}
          >
            <CInput placeholder="Email" disabled={isEdit} />
          </Form.Item>
          <Form.Item
            label="Role"
            name="role"
            rules={[{ required: true, message: 'Please select role!' }]}
          >
            <SelectRole
              placeholder="Select Role"
              allowClear
              defaultSelected={data?.role ? [data.role] : []}
            />
          </Form.Item>
        </Form>
        {PreviewPlaceholder}
      </Card>
    </Spin>
  );
};
export default AdminForm;
