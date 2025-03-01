import { Flex } from 'antd';
import React from 'react';
interface IProps {
  children: React.ReactNode;
}
const FilterLayout: React.FC<IProps> = ({ children }) => {
  return (
    <Flex wrap className="mb-4" justify="space-between" align="center" gap={8}>
      {children}
    </Flex>
  );
};

export default FilterLayout;
