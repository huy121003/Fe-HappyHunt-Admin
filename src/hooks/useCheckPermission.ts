import { useMemo } from 'react';
import { useAppSelector } from '@/redux/reduxHook';
import { IPERMISSION_CODE_NAME, IPERMISSION_TYPE } from '@/features/permissions/data/constant';

const useCheckPermission = (codeName: IPERMISSION_CODE_NAME, type: IPERMISSION_TYPE): boolean => {
  const permissions = useAppSelector(
    (state) => state.auth?.account?.role?.permissions || []
  );

  return useMemo(() => {
    return permissions.some(
      (permission) =>
        permission?.codeName === codeName && permission?.[type] === true
    );
  }, [permissions, codeName, type]);
};

export default useCheckPermission;
