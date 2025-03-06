import { Button, ButtonProps } from 'antd';
import { PauseCircleOutlined, PlayCircleOutlined } from '@ant-design/icons';
import useCheckPermission from '@/hooks/useCheckPermission';
import {
  IPERMISSION_CODE_NAME,
  IPERMISSION_TYPE,
} from '@/features/permissions/data/constant';
interface ICButtonEditProps extends ButtonProps {
  isActived: boolean;
  codeName: IPERMISSION_CODE_NAME;
}
const CButtonActive: React.FC<ICButtonEditProps> = ({
  isActived,
  ...props
}) => {
  const checkPermission = useCheckPermission(
    props.codeName,
    IPERMISSION_TYPE.UPDATE
  );
  return (
    <Button
      type="link"
      size="large"
      shape="circle"
      icon={!isActived ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
      className=" text-blue-600"
      {...props}
      hidden={!checkPermission}
    />
  );
};

export default CButtonActive;
