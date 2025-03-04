import { Button, ButtonProps } from 'antd';
import { EditOutlined } from '@ant-design/icons';
import useCheckPermission from '@/hooks/useCheckPermission';
import {
  IPERMISSION_CODE_NAME,
  IPERMISSION_TYPE,
} from '@/features/permissions/data/constant';
interface IButtonProps extends ButtonProps {
  codeName: IPERMISSION_CODE_NAME;
}
const CButtonEdit = (props: IButtonProps) => {
  const checkpermission = useCheckPermission(
    props.codeName,
    IPERMISSION_TYPE.UPDATE
  );

  return (
    <Button
      type="link"
      size="large"
      shape="circle"
      icon={<EditOutlined />}
      className="  text-green-600"
      {...props}
      hidden={!checkpermission}
    />
  );
};

export default CButtonEdit;
