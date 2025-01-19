import React from 'react';
import { Pagination } from 'antd';
interface CPaginationProps {
  total: number;
  pageSize: number;
  current: number;
  onChange: (pagination: any) => void;
}

const CPagination: React.FC<CPaginationProps> = ({
  total,
  pageSize,
  current,
  onChange,
}) => {
  return (
    <Pagination
      pageSizeOptions={['10', '20', '50', '100']}
      showSizeChanger
      showQuickJumper
      className="table-pagination"
      total={total}
      pageSize={pageSize}
      current={current}
      onChange={onChange}
    />
  );
};

export default CPagination;
