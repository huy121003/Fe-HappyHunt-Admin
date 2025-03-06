import ChangePasswordForm from '@/features/auth/components/form/ChangePasswordForm';
import useAuthState from '@/features/auth/hooks/useAuthState';
import AuthService from '@/features/auth/service';
import { useAppDispatch } from '@/redux/reduxHook';
import { logoutAction } from '@/redux/slice/SAuthSlice';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';

function ChangePasswordPage() {
  const { onSuccess, onError } = useAuthState();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { mutate, isPending } = useMutation({
    mutationFn: async (data: any) => {
      const response = await AuthService.changePassword(data);
      return response;
    },
    onSuccess: () => {
      onSuccess(
        'Password changed successfully. Please login again to continue',
        () => {
          dispatch(logoutAction());
          localStorage.removeItem('access_token');
          navigate('/login');

          // logout
        }
      );
    },
    onError,
  });
  const onSubmit = (values: any) => {
    mutate(values);
  };
  return (
    <div className="flex flex-1 flex-col gap-4">
      <ChangePasswordForm loading={isPending} onSubmit={onSubmit} />
    </div>
  );
}

export default ChangePasswordPage;
