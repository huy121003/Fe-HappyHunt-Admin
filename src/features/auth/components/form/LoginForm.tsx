import CButton from '@/components/CButton';
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
      type: 'admin',
    });
  };

  return (
    <>
      <Form<ILoginRequest> layout="vertical" form={form}>
        <Form.Item
          label="Phone number"
          name="phoneNumber"
          rules={[
            {
              required: true,
              message: 'Please input your phone number!',
            },
            {
              pattern: /^0[0-9]{9}$/,
              message: 'Phone number is invalid!',
            },
          ]}
        >
          <CInput
            placeholder="Phone number"
            size="large"
            className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
          />
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
          <CPassword
            placeholder={'Password'}
            className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
            size="large"
          />
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
