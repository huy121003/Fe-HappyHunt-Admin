import React from 'react';
import { Input } from 'antd';

interface CInputProps {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  rest?: any;
}

const CInput: React.FC<CInputProps> = ({
  placeholder,
  value,
  onChange,
  rest,
}) => {
  return (
    <Input
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      {...rest}
    />
  );
};

export default CInput;
