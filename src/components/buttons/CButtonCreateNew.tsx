import {
  IPERMISSION_CODE_NAME,
  IPERMISSION_TYPE,
} from '@/features/permissions/data/constant';
import useCheckPermission from '@/hooks/useCheckPermission';
import { Button, ButtonProps } from 'antd';
interface IButtonProps extends ButtonProps {
  codeName: IPERMISSION_CODE_NAME;
}
const CButtonCreateNew = (props: IButtonProps) => {
  const checkPermission = useCheckPermission(
    props.codeName,
    IPERMISSION_TYPE.CREATE
  );
  return (
    <Button type="primary" size="large" {...props} hidden={!checkPermission}>
      Create New
    </Button>
  );
};

export default CButtonCreateNew;
