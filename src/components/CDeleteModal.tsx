import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface CDeleteModalProps {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
  loading?: boolean;
}
const CDeleteModal: React.FC<CDeleteModalProps> = ({
  message,
  open,
  setOpen,
  onOk,
  loading,
}) => {
  const { t } = useTranslation();

  return (
    <Modal
      title={t('common.confirm')}
      open={open}
      onOk={() => {
        onOk();
      }}
      onCancel={() => setOpen(false)}
      okButtonProps={{ loading: loading }}
    >
      <p>{message}</p>
    </Modal>
  );
};
export default CDeleteModal;
