import { Table } from 'antd';
import React from 'react';
interface CTableProps {
  columns: any[];
  dataSource: any[];
  onChange: (_: any, __: any, sorted: any) => void;
}
const CTable: React.FC<CTableProps> = ({ columns, dataSource, onChange }) => {
  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey={(record) => record?._id}
      onChange={onChange}
      //scroll={{ y: 'calc(100vh - 436px )' }}
    />
  );
};

export default CTable;
