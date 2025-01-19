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
      className="table-container"
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      rowKey={(record) => record?._id}
      onChange={onChange}
      // scroll={{ x: 'max-content', y: 55 * 5 }}
      // scroll={{ y: 'calc(100vh - 500px )', x: '100px' }}
      //style={{ minWidth: '900px' }} // Đảm bảo bảng có thể cuộn ngang
    />
  );
};

export default CTable;
