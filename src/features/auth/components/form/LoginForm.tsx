import CButton from '@/components/buttons/CButton';
import CInput from '@/components/CInput';
import { Form } from 'antd';
import { ILoginRequest } from '../../data/interface';
import CPassword from '@/components/CPassword';
import { useMutation } from '@tanstack/react-query';
import AuthService from '../../service';
import { loginaction } from '@/redux/slice/SAuthSlice';
import { useAppDispatch } from '@/redux/reduxHook';
import { useNavigate } from 'react-router-dom';
import useAuthState from '../../hooks/useAuthState';
import { IType } from '../../data/constant';

function LoginForm() {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { onSuccess, onError } = useAuthState();
  const loginMutation = useMutation({
    mutationFn: async (data: ILoginRequest) => {
      const response = await AuthService.login(data);
      return response;
    },
    onSuccess: (data) => {
      onSuccess('Login successfully!', () => {
        const { access_token, ...account } = data.data;
        localStorage.setItem('access_token', access_token);
        dispatch(loginaction(account));
        navigate('/');
      });
    },

    onError,
  });
  const onSubmit = async () => {
    const values = await form.validateFields();

    loginMutation.mutate({
      ...values,
      type: IType.ADMIN,
    });
  };

  return (
    <>
      <Form<ILoginRequest> layout="vertical" form={form}>
        <Form.Item
          label="Phone number or Username"
          name="phoneOrUsername"
          rules={[
            {
              required: true,
              message: 'Please input your phone number or username!',
            },
          ]}
        >
          <CInput placeholder="Phone number or Username" />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <CPassword placeholder={'Password'} />
        </Form.Item>
      </Form>
      <CButton
        loading={loginMutation.isPending}
        onClick={onSubmit}
        type="primary"
        htmlType="submit"
        className="w-full"
      >
        Login
      </CButton>
    </>
  );
}

export default LoginForm;
