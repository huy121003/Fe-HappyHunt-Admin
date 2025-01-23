import { Modal } from 'antd';
import React from 'react';
import { useTranslation } from 'react-i18next';
interface CDeleteModalProps {
  message: string;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  onOk: () => void;
}
const CDeleteModal: React.FC<CDeleteModalProps> = ({
  message,
  open,
  setOpen,
  onOk,
}) => {
  const { t } = useTranslation();
  const [isLoading, setIsLoading] = React.useState(false);
  return (
    <Modal
      title={t('common.confirm')}
      open={open}
      onOk={() => {
        setIsLoading(true);
        onOk();
        setIsLoading(false);
        
      }}
      onCancel={() => setOpen(false)}
      okButtonProps={{ loading: isLoading }}
    >
      <p>{message}</p>
    </Modal>
  );
};
export default CDeleteModal;
