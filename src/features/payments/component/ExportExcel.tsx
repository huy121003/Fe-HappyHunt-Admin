import * as XLSX from 'xlsx';
import { IPaymentItem } from '../data/interface';
import { Button } from 'antd';
import { dayFormat } from '@/configs/date.';

interface ExportExcelProps {
  data: IPaymentItem[];
  fileName: string;
  sheetName: string;
}

const ExportExcel = ({ data, fileName, sheetName }: ExportExcelProps) => {
  const handleExport = () => {
    const columns = [
      { header: 'ID', key: 'id', width: 10 },
      { header: 'Order Code', key: 'orderCode', width: 15 },
      { header: 'Amount', key: 'amount', width: 15 },
      { header: 'Description', key: 'description', width: 30 },
      { header: 'Status', key: 'status', width: 15 },
      {
        header: 'Transaction Date Time',
        key: 'transactionDateTime',
        width: 20,
      },
      { header: 'Created At', key: 'createdAt', width: 20 },
    ];

    // Tạo tiêu đề cột
    const headers = [columns.map((col) => col.header)];

    // Chuyển đổi dữ liệu phù hợp với định dạng Excel
    const formattedData = data.map((item) => [
      item._id,
      item.orderCode,
      item.amount.toLocaleString(),
      item.description,
      item.status,
      dayFormat(item.transactionDateTime),
      dayFormat(item.createdAt),
    ]);

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

export default ExportExcel;
