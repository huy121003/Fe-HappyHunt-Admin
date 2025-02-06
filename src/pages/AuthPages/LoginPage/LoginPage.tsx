import authApi from '@/apis/authApi';
import CInput from '@/components/CInput';
import { LAuthLayout } from '@/layouts';
import { useAppDispatch } from '@/redux/reduxHook';
import { loginaction } from '@/redux/slice/SAuthSlice';
import { useMutation } from '@tanstack/react-query';
import { Button, Divider, Form, notification } from 'antd';
import { useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
function LoginPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const loginMutation = useMutation({
    mutationFn: async (values: { phoneNumber: string; password: string }) => {
      const { phoneNumber, password } = values;
      const res = await authApi.ALogin(phoneNumber, password);
      return res;
    },
    onError: (res) => {
      notification.error({
        message: t('common.error'),
        description: res.message,
      });
    },
    onSuccess: (res) => {
      notification.success({
        message: t('common.success'),
        description: res.message,
      });
      localStorage.setItem('access_token', res.data.access_token);
      dispatch(loginaction(res?.data?.result));
      if (res.data.result.role.name === 'Super Admin') {
        navigate('/admin');
      } else navigate('/');
    },
  });
  const handleLogin = useCallback(async () => {
    const values = await form.validateFields();

    await loginMutation.mutate(values);
  }, []);
  const navigate = useNavigate();
  return (
    <LAuthLayout>
      <div className="flex flex-col items-center justify center lg:w-[500px] w-[300px] ">
        <h1 className=" lg:text-6xl text-3xl font-bold text-flame-orange">
          {t('loginPage.login')}
        </h1>
        <Divider />

        <>
          <Form
            form={form}
            layout="vertical"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            onFinish={handleLogin}
          >
            <Form.Item
              name="phoneNumber"
              rules={[
                {
                  required: true,
                  message: t('loginPage.phoneRequired'),
                },
                {
                  pattern: /^0[0-9]{9}$/,
                  message: t('loginPage.phoneInvalid'),
                },
              ]}
            >
              <CInput
                placeholder={t('loginPage.phoneNumber')}
                size="large"
                className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
              />
            </Form.Item>
            <Form.Item
              name="password"
              rules={[
                {
                  required: true,
                  message: t('loginPage.passwordRequired'),
                },
              ]}
            >
              <CInput
                type="password"
                placeholder={t('loginPage.password')}
                className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
                size="large"
              />
            </Form.Item>
          </Form>
          <div className="flex items-center flex-1 justify-end  lg:w-[500px] w-[300px] lg:py-4 py-2">
            <p
              className="text-flame-orange hover:text-sunflower-yellow cursor-pointer"
              onClick={() => navigate('/forgot-password')}
            >
              {t('loginPage.forgotPassword')}
            </p>
          </div>
          <Button
            className="lg:w-[400px] w-[250px] h-[50px] text-lg bg-flame-orange text-white"
            onClick={handleLogin}
            loading={loginMutation.isPending}
          >
            {t('loginPage.loginButton')}
          </Button>
          <div className="flex items-center flex-1 justify-center lg:w-[500px] w-[300px] lg:py-4 py-2 gap-2">
            <p>{t('loginPage.noAccount')}</p>
            <p
              onClick={() => navigate('/register')}
              className="text-flame-orange hover:text-sunflower-yellow cursor-pointer"
            >
              {t('loginPage.signUp')}
            </p>
          </div>
        </>
      </div>
    </LAuthLayout>
  );
}

export default LoginPage;
