import { Button, ButtonProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';

const CButtonEdit = (props: ButtonProps) => {
  return (
    <Button
      type="link"
      size="large"
      shape="circle"
      icon={<EditOutlined />}
      className="min-w-4 w-4 h-4 text-green-600"
      {...props}
    />
  );
};

export default CButtonEdit;
