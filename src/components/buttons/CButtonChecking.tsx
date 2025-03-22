import {
  IPERMISSION_CODE_NAME,
  IPERMISSION_TYPE,
} from '@/features/permissions/data/constant';
import useCheckPermission from '@/hooks/useCheckPermission';
import { Button, ButtonProps, Tooltip } from 'antd';
interface IButtonProps extends ButtonProps {
  codeName: IPERMISSION_CODE_NAME;
  hidden?: boolean;
}
const CButtonChecking = (props: IButtonProps) => {
  const checkPermission = useCheckPermission(
    props.codeName,
    IPERMISSION_TYPE.UPDATE
  );
  return (
    <Tooltip title="Checking">
      <Button
        type="link"
        shape="circle"
        size="large"
        icon={<i className="fas fa-check-circle" />}
        className=" text-red-500"
        hidden={!checkPermission}
        {...props}
      />
    </Tooltip>
  );
};

export default CButtonChecking;
