import CDeleteModal from '@/components/CDeleteModal';
import useAdminState from '@/features/admins/hooks/useAdminState';
import AuthService from '@/features/auth/service';
import { useAppDispatch } from '@/redux/reduxHook';
import { logoutAction } from '@/redux/slice/SAuthSlice';
import { LogoutOutlined } from '@ant-design/icons';
import { useMutation } from '@tanstack/react-query';
import { Button } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

function ButtonLogout() {
  const [open, setOpen] = React.useState(false);
  const { onSuccess, onError } = useAdminState();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: async () => {
      const response = await AuthService.logout();
      return response;
    },
    onSuccess: () => {
      onSuccess('Logout successfully', () => {
        setOpen(false);
        localStorage.removeItem('access_token');
        dispatch(logoutAction());
        navigate('/login');
      });
    },
    onError,
  });
  const handleLogout = () => {
    mutate();
  };
  return (
    <>
      <Button
        icon={<LogoutOutlined />}
        type="link"
        onClick={() => {
          setOpen(true);
        }}
      >
        Logout
      </Button>
      <CDeleteModal
        message="Are you sure you want to logout?"
        open={open}
        setOpen={setOpen}
        onOk={handleLogout}
        loading={isPending}
      />
    </>
  );
}

export default ButtonLogout;
