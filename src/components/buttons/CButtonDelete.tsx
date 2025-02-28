import { DeleteOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';

const CButtonDelete = (props: ButtonProps) => {
  return (
    <Button
      type="link"
      shape="circle"
      size="large"
      icon={<DeleteOutlined />}
      className="min-w-4 w-4 h-4 text-red-500"
      {...props}
    />
  );
};

export default CButtonDelete;
