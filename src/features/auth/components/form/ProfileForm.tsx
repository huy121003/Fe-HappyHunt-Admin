import { Button, Card, Form, Spin, Upload } from 'antd';
import React, { useEffect } from 'react';
import { IGetAccountInfoResponse, IUpdateProfile } from '../../data/interface';
import CHeaderForm from '@/components/CHeaderForm';

import CInput from '@/components/CInput';
import { UploadOutlined } from '@ant-design/icons';
import CTextArea from '@/components/CTextArea';
import SelectProvince from '@/features/provinces/components/form/SelectProvince';
import SelectDictrict from '@/features/districts/components/form/SelectDictrict';
import SelectWard from '@/features/wards/components/form/SelectWard';
interface IProfileFormProps {
  onSubmit: (values: IUpdateProfile) => void;
  loading?: boolean;
  title?: string;
  data?: IGetAccountInfoResponse;
}
const ProfileForm: React.FC<IProfileFormProps> = ({
  onSubmit,
  loading,
  title,
  data,
}) => {
  const [form] = Form.useForm();
  const province = Form.useWatch(['province'], form);
  const district = Form.useWatch(['district'], form);
  const ward = Form.useWatch(['ward'], form);
  useEffect(() => {
    if (data) {
      form.setFieldsValue({
        ...data,
        province: data.address.province?._id,
        district: data.address.district?._id,
        ward: data.address.ward?._id,
        specificAddress: data.address.specificAddress,
        avatar: data.avatar
          ? [
              {
                uid: `${Date.now()}`,
                name: 'image.png',
                status: 'done',
                url: data.avatar,
              },
            ]
          : undefined,
      });
    }
  }, [data, form]);
  const onFinish = async () => {
    const values = await form.validateFields();
    const payload: IUpdateProfile = {
      name: values.name,
      description: values.description,
      ...(values.avatar && { avatar: values.avatar[0].originFileObj }),
      address: {
        province: values.province,
        district: values.district,
        ward: values.ward,
        specificAddress: values.specificAddress,
      },
    };
    onSubmit(payload);
  };
  return (
    <Spin spinning={loading}>
      <CHeaderForm title={title || 'Update Profile'} onSave={form.submit} />
      <Card className={`flex-1  overflow-y-auto  `}>
        <Form<IUpdateProfile>
          form={form}
          layout="vertical"
          onFinish={onFinish}
          initialValues={{
            ...data,
            avatar: [],
          }}
        >
          <Form.Item
            label="Avatar"
            name="avatar"
            valuePropName="fileList"
            getValueFromEvent={(e) => e.fileList}
          >
            <Upload
              multiple={false}
              listType="picture-circle"
              maxCount={1}
              beforeUpload={() => false}
              onPreview={() => {}}
              accept=".png,.jpg,.jpeg"
            >
              <Button icon={<UploadOutlined />} type="dashed" />
            </Upload>
          </Form.Item>
          <Form.Item
            label="Full Name"
            name="name"
            rules={[
              {
                required: true,
                whitespace: true,
                message: 'Please input your full name!',
              },
            ]}
          >
            <CInput placeholder="Full Name" />
          </Form.Item>
          <Card title="Address" className="mb-4">
            <Form.Item
              label="Province"
              name="province"
              rules={[{ required: true, message: 'Please select province!' }]}
            >
              <SelectProvince
                placeholder="Province"
                onChange={() => {
                  form.setFieldsValue({
                    district: undefined,
                    ward: undefined,
                    specificAddress: undefined,
                  });
                }}
                defaultSelected={
                  data?.address.province
                    ? [
                        {
                          _id: data.address.province._id,
                          name: data.address.province.name,
                        },
                      ]
                    : undefined
                }
              />
            </Form.Item>
            <Form.Item
              name="district"
              label="District"
              rules={[{ required: true, message: 'Please select district!' }]}
            >
              <SelectDictrict
                onChange={() => {
                  form.setFieldsValue({
                    ward: undefined,
                    specificAddress: undefined,
                  });
                }}
                placeholder="District"
                province={province}
                defaultSelected={
                  data?.address.district
                    ? [
                        {
                          _id: data.address.district._id,
                          name: data.address.district.name,
                        },
                      ]
                    : undefined
                }
                disabled={!province}
              />
            </Form.Item>
            <Form.Item
              name="ward"
              label="Ward"
              rules={[{ required: true, message: 'Please select ward!' }]}
            >
              <SelectWard
                placeholder="Ward"
                onChange={() => {
                  form.setFieldsValue({
                    specificAddress: undefined,
                  });
                }}
                province={province}
                district={district}
                defaultSelected={
                  data?.address.ward
                    ? [
                        {
                          _id: data.address.ward._id,
                          name: data.address.ward.name,
                        },
                      ]
                    : undefined
                }
                disabled={!province || !district}
              />
            </Form.Item>
            <Form.Item
              label="Specific Address"
              name="specificAddress"
              rules={[
                {
                  required: true,
                  whitespace: true,
                  message: 'Please input specific address!',
                },
              ]}
            >
              <CInput
                placeholder="Specific Address"
                disabled={!province || !district || !ward}
              />
            </Form.Item>
          </Card>

          <Form.Item label="Description" name="description">
            <CTextArea placeholder="Description" />
          </Form.Item>
        </Form>
      </Card>
    </Spin>
  );
};
export default ProfileForm;
