import {
  IPERMISSION_CODE_NAME,
  IPERMISSION_TYPE,
} from '@/features/permissions/data/constant';
import useCheckPermission from '@/hooks/useCheckPermission';
import { DeleteOutlined } from '@ant-design/icons';
import { Button, ButtonProps } from 'antd';
interface IButtonProps extends ButtonProps {
  codeName: IPERMISSION_CODE_NAME;
}
const CButtonDelete = (props: IButtonProps) => {
  const checkPermission = useCheckPermission(
    props.codeName,
    IPERMISSION_TYPE.DELETE
  );
  return (
    <Button
      type="link"
      shape="circle"
      size="large"
      icon={<DeleteOutlined />}
      className=" text-red-500"
      hidden={!checkPermission}
      {...props}
    />
  );
};

export default CButtonDelete;
