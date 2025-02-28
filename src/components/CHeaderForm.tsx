import { Flex } from 'antd';
import React from 'react';
import CHeaderCard from './CHeaderCard';
import CButton from './CButton';

interface HeaderProps {
  title: string;
  onCancel?: () => void;
  onSave?: () => void;
  disable?: boolean;
  loading?: boolean;
}

const CHeaderForm: React.FC<HeaderProps> = ({
  onCancel,
  onSave,
  title,

  disable,
  loading,
}) => {
  return (
    <CHeaderCard
      title={title}
      actions={
        <Flex gap={8}>
          <CButton size="large" type="default" onClick={onCancel}>
            Cancel
          </CButton>
          <CButton
            loading={loading}
            size="large"
            onClick={onSave}
            disabled={disable}
          >
            Save
          </CButton>
        </Flex>
      }
    />
  );
};

export default CHeaderForm;
