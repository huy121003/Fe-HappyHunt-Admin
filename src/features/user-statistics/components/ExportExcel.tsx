import React from 'react'
import * as XLSX from 'xlsx';
import { Button } from 'antd';
import { IUserStatistics } from '@/features/user-statistics/data/interface';

interface IExportExcelProps {
  data: IUserStatistics[];
  fileName: string;
  sheetName: string;
}
const ExportExcel: React.FC<IExportExcelProps> = ({
  data,
  fileName,
  sheetName,
}) => {
  const handleExport = () => {
    const columns = [
      { header: 'Time', key: '_id', width: 20 },
      { header: 'Total New Users', key: 'totalAccounts', width: 20 },
    ];

    // Tạo tiêu đề cột
    const headers = [columns.map((col) => col.header)];

    // Chuyển đổi dữ liệu phù hợp với định dạng Excel
    const formattedData = data.map((item) => [item._id, item.totalAccounts]);

    // Gộp tiêu đề và dữ liệu
    const finalData = [...headers, ...formattedData];

    // Chuyển thành worksheet
    const ws = XLSX.utils.aoa_to_sheet(finalData);

    // Cấu hình độ rộng cột
    ws['!cols'] = columns.map((col) => ({ wch: col.width }));

    // Tạo workbook và ghi dữ liệu vào file
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, sheetName);
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  };

  return (
    <Button
      type="primary"
      onClick={handleExport}
      icon={<i className="fas fa-file-excel"></i>}
    >
      Export
    </Button>
  );
};

export default ExportExcel
