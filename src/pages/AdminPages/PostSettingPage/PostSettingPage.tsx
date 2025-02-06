import policyApi from '@/apis/policyApi';
import { ReloadOutlined } from '@ant-design/icons';
import {
  Button,
  Divider,
  Form,
  InputNumber,
  notification,
  Typography,
} from 'antd';

import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

function PostSettingPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const getPostSetting = async () => {
    const result = await policyApi.AGetSettingPost();
    if (result.statusCode === 200) {
      form.setFieldsValue(result.data);
    }
  };
  useEffect(() => {
    getPostSetting();
  }, []);

  const handleSave = async () => {
    const values = await form.validateFields();
    if (isEdit) {
      setLoading(true);
      const result = await policyApi.AUpdateSettingPost(values);
      if (result.statusCode === 200) {
        getPostSetting();
        notification.success({
          message: t('common.success'),
          description: t('policyManagement.updateSuccess'),
        });
      } else {
        notification.error({
          message: t('common.error'),
          description: t('policyManagement.updateFailed'),
        });
      }
      setIsEdit(!isEdit);
      setLoading(false);
    } else {
      setIsEdit(!isEdit);
    }
  };
  const handleReset = async () => {
    setLoading(true);
    const result = await policyApi.AUpdateDefaultSettingPost();
    if (result.statusCode === 200) {
      getPostSetting();
      notification.success({
        message: t('common.success'),
        description: t('policyManagement.resetSuccess'),
      });
    } else {
      notification.error({
        message: t('common.error'),
        description: t('policyManagement.resetFailed'),
      });
    }

    setLoading(false);
  };

  return (
    <div className="bg-white flex-1  p-4 rounded-md m-2 justify-start flex flex-col">
      <div className="flex items-center justify-between">
        <Typography.Title level={2}>
          {t('policyManagement.postSettings')}
        </Typography.Title>
        <Button
          className="bg-flame-orange text-white"
          loading={loading}
          onClick={handleReset}
          disabled={isEdit}
        >
          <ReloadOutlined /> {t('common.reset')}
        </Button>
      </div>
      <Divider />
      <div className="  overflow-y-auto  flex-1 justify-start p-4 ">
        <Form
          form={form}
          layout="vertical"
          name="postSettingForm"
          onFinish={handleSave}
          style={{ maxWidth: 600 }}
        >
          <Form.Item
            label={t('policyManagement.limitPost', {
              number: parseInt(import.meta.env.VITE_PUBLIC_LIMIT_POST_DEFAULT),
            })}
            name="limitPost"
            rules={[
              {
                required: true,
                message: t('policyManagement.limitPostRequire'),
              },
            ]}
          >
            <InputNumber
              style={{ minWidth: 600 }}
              disabled={!isEdit}
              placeholder={t('policyManagement.limitPostPlaceholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('policyManagement.limitPostVip', {
              number: parseInt(import.meta.env.VITE_PUBLIC_LIMIT_POST_VIP),
            })}
            name="limitVipPost"
            rules={[
              {
                required: true,
                message: t('policyManagement.limitPostVipRequire'),
              },
            ]}
          >
            <InputNumber
              style={{ minWidth: 600 }}
              disabled={!isEdit}
              placeholder={t('policyManagement.limitPostVipPlaceholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('policyManagement.timeExpired', {
              number: parseInt(import.meta.env.VITE_PUBLIC_TIME_EXPIRED),
            })}
            name="timeExpired"
            rules={[
              {
                required: true,
                message: t('policyManagement.timeExpiredRequire'),
              },
            ]}
          >
            <InputNumber
              style={{ minWidth: 600 }}
              disabled={!isEdit}
              placeholder={t('policyManagement.timeExpiredPlaceholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('policyManagement.minImagePost', {
              number: parseInt(import.meta.env.VITE_PUBLIC_MIN_IMAGE_POST),
            })}
            name="minImagePost"
            rules={[
              {
                required: true,
                message: t('policyManagement.minImagePostRequire'),
              },
            ]}
          >
            <InputNumber
              style={{ minWidth: 600 }}
              disabled={!isEdit}
              placeholder={t('policyManagement.minImagePostPlaceholder')}
            />
          </Form.Item>
          <Form.Item
            label={t('policyManagement.maxImagePost', {
              number: parseInt(import.meta.env.VITE_PUBLIC_MAX_IMAGE_POST),
            })}
            name="maxImagePost"
            rules={[
              {
                required: true,
                message: t('policyManagement.maxImagePostRequire'),
              },
            ]}
          >
            <InputNumber
              style={{ minWidth: 600 }}
              disabled={!isEdit}
              placeholder={t('policyManagement.maxImagePostPlaceholder')}
            />
          </Form.Item>
        </Form>
      </div>
      <div className="flex justify-end m-6 gap-4">
        {isEdit ? (
          <Button onClick={() => setIsEdit(!isEdit)}>
            {t('common.cancel')}
          </Button>
        ) : null}
        <Button type="primary" onClick={handleSave} loading={loading}>
          {isEdit ? t('common.save') : t('common.edit')}
        </Button>
      </div>
    </div>
  );
}

export default PostSettingPage;
