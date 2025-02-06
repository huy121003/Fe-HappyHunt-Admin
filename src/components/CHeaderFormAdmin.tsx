import { Button, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';

interface Props {
  isCreate?: boolean;
  onCancel?: () => void;
  onSave?: () => void;
  title: string;
  loading;
}

const CHeaderFormAdmin: React.FC<Props> = ({
  isCreate,
  onCancel,
  onSave,
  title,
  loading,
}) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between bg-white m-2 p-3 rounded-md">
      <Typography.Title level={4}>{title}</Typography.Title>
      <div className="gap-4">
        <Button className="bg-gray-200 text-black m-2" onClick={onCancel}>
          {t('common.back')}
        </Button>
        <Button
          onClick={onSave}
          className="bg-flame-orange text-white"
          loading={loading}
        >
          {isCreate ? t('common.create') : t('common.save')}
        </Button>
      </div>
    </div>
  );
};
export default CHeaderFormAdmin;
