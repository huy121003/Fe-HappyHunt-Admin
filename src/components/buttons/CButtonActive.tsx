import { Button, ButtonProps } from 'antd';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
interface ICButtonEditProps extends ButtonProps {
  isActived: boolean;
}
const CButtonActive: React.FC<ICButtonEditProps> = ({
  isActived,
  ...props
}) => {
  return (
    <Button
      type="link"
      size="large"
      shape="circle"
      icon={!isActived ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      className="min-w-4 w-4 h-4 text-blue-600"
      {...props}
    />
  );
};

export default CButtonActive;
