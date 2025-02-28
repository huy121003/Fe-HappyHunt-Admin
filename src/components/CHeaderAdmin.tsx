import { Button, Typography } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface Props {
  title: string;
  onClick: () => void;
}
const CHeaderAdmin: React.FC<Props> = ({ title, onClick }) => {
  const { t } = useTranslation();
  return (
    <div className="flex items-center justify-between bg-white m-2 p-3 rounded-md">
      <>
        <Typography.Title level={4}>{title}</Typography.Title>
      </>
      <Button className="bg-flame-orange text-white" onClick={onClick}>
        {t('common.create')}
      </Button>
    </div>
  );
};

export default CHeaderAdmin;
