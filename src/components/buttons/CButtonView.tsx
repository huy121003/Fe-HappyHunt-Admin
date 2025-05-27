import { Button, ButtonProps, Tooltip } from 'antd';
import { EyeOutlined } from '@ant-design/icons';
import useCheckPermission from '@/hooks/useCheckPermission';
import {
  IPERMISSION_CODE_NAME,
  IPERMISSION_TYPE,
} from '@/features/permissions/data/constant';
interface IButtonProps extends ButtonProps {
  codeName: IPERMISSION_CODE_NAME;
  title?: string;
}
const CButtonView = (props: IButtonProps) => {
  const checkpermission = useCheckPermission(
    props.codeName,
    IPERMISSION_TYPE.VIEW
  );

  return (
    <Tooltip title={props.title || 'View'}>
      {' '}
      <Button
        type="link"
        size="large"
        shape="circle"
        icon={<EyeOutlined />}
        className="  text-blue-600"
        {...props}
        hidden={!checkpermission}
      />
    </Tooltip>
  );
};

export default CButtonView;
