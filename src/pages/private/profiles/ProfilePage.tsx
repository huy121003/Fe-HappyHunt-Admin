import { API_KEY } from '@/features/auth/data/constant';
import { IUpdateProfile } from '@/features/auth/data/interface';
import useAuthState from '@/features/auth/hooks/useAuthState';
import AuthService from '@/features/auth/service';
import { useAppDispatch } from '@/redux/reduxHook';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { updateAccountAction } from '@/redux/slice/SAuthSlice';
import ProfileForm from '@/features/auth/components/form/ProfileForm';
function ProfilePage() {
  const { onSuccess, onError } = useAuthState();
  const dispatch = useAppDispatch();
  const client = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: [API_KEY.GET_ACCOUNT_INFO],
    queryFn: async () => {
      const response = await AuthService.getAccountInfo();
      return response.data;
    },
  });
  const { mutate, isPending } = useMutation({
    mutationFn: async (values: IUpdateProfile) => {
      const response = await AuthService.updateProfile(values);
      return response.data;
    },
    onSuccess: (data) => {
      onSuccess('Update profile successfully.', () => {
        dispatch(updateAccountAction(data));
        client.invalidateQueries({ queryKey: [API_KEY.GET_ACCOUNT_INFO] });
      });
    },
    onError,
  });
  const onSubmit = (values: IUpdateProfile) => {
    mutate(values);
  };

  return (
    <ProfileForm
      loading={isPending || isLoading}
      onSubmit={onSubmit}
      data={data}
    />
  );
}

export default ProfilePage;
