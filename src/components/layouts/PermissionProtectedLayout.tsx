import React from 'react';

import useCheckPermission from '@/hooks/useCheckPermission';
import {
  IPERMISSION_CODE_NAME,
  IPERMISSION_TYPE,
} from '@/features/permissions/data/constant';
import CNoPermission from '../CNoPermission';
import { postMessageHandler } from '../ToastMessage';
interface PermissionProtectedLayoutProps {
  codeName: IPERMISSION_CODE_NAME;
  type: IPERMISSION_TYPE;
  children: React.ReactNode;
}

const PermissionProtectedLayout: React.FC<PermissionProtectedLayoutProps> = ({
  codeName,
  type,
  children,
}) => {
  const checkPermission = useCheckPermission(codeName, type);
  if (!checkPermission) {
    postMessageHandler({
      type: 'error',
      text: 'You do not have permission to access this page',
    });
    return <CNoPermission />;
  }
  return <>{children}</>;
};
export default PermissionProtectedLayout;
