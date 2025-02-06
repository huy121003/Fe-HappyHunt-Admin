import { useState } from 'react';
import { Button, Divider, Form, notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { LAuthLayout } from '@/layouts';
import OtpInput from 'react18-input-otp';
import authApi from '@/apis/authApi';
import { useMutation } from '@tanstack/react-query';
import CInput from '@/components/CInput';
function RegisterPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [openOTP, setOpenOTP] = useState(false);
  const navigate = useNavigate();
  const [otp, setOtp] = useState('');
  const [register, setRegister] = useState({
    phoneNumber: '',
    password: '',
  });

  const registerMutation = useMutation({
    mutationFn: async () => {
      const res = await authApi.ARegister(
        register.phoneNumber,
        register.password,
        otp
      );
      return res;
    },
    onSuccess: (res) => {
      notification.success({
        message: t('common.success'),
        description: res.message,
      });
      navigate('/login');
    },
    onError: (res) => {
      notification.error({
        message: t('common.error'),
        description: res.message,
      });
    },
  });
  const registerOtpMutation = useMutation({
    mutationFn: async () => {
      const values = await form.validateFields();
      const res = await authApi.ARegisterOtp(values?.phoneNumber);
      return res;
    },
    onSuccess: (res) => {
      notification.success({
        message: t('common.success'),
        description: t('sendOtp.OTPSend'),
      });
      setRegister({
        phoneNumber: res.phoneNumber,
        password: res.password,
      });
      setOpenOTP(true);
    },
    onError: (res) => {
      notification.error({
        message: t('common.error'),
        description: res.message,
      });
    },
  });
  const handleRegister = async () => {
    await registerMutation.mutate();
  };
  const handelRegisterOTP = async () => {
    await registerOtpMutation.mutate();
  };

  return (
    <LAuthLayout>
      <div className="flex flex-col items-center justify center lg:w-[500px] w-[300px] ">
        <h1 className=" lg:text-6xl text-3xl font-bold text-flame-orange">
          {t('registerPage.register')}
        </h1>
        <Divider />
        {!openOTP ? (
          <>
            <Form
              form={form}
              onFinish={handelRegisterOTP}
              layout="vertical"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
              requiredMark={false}
            >
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: t('registerPage.phoneRequired'),
                  },
                  {
                    pattern: /^[0-9]+$/,
                    message: t('registerPage.phoneValidate'),
                  },
                ]}
              >
                <CInput
                  placeholder={t('registerPage.phoneNumber')}
                  size="large"
                  className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
                />
              </Form.Item>
              <Form.Item
                name="password"
                rules={[
                  {
                    required: true,
                    message: t('registerPage.passwordRequired'),
                  },
                  {
                    pattern: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/,
                    message: t('registerPage.validatePassword'),
                  },
                ]}
              >
                <CInput
                  type="password"
                  placeholder={t('registerPage.password')}
                  className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
                  size="large"
                />
              </Form.Item>
              <Form.Item
                name="rePassword"
                rules={[
                  {
                    required: true,
                    message: t('registerPage.passwordRequired'),
                  },
                ]}
              >
                <CInput
                  type="password"
                  placeholder={t('registerPage.rePassword')}
                  className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
                  size="large"
                />
              </Form.Item>
            </Form>

            <Button
              className="lg:w-[400px] w-[250px] h-[50px] text-lg bg-flame-orange text-white"
              onClick={handelRegisterOTP}
              loading={registerOtpMutation.isPending}
            >
              {t('registerPage.register')}
            </Button>
            <div className="flex items-center flex-1 justify-center lg:w-[500px] w-[300px] lg:py-4 py-2 gap-2">
              <p>{t('registerPage.hasAccount')}</p>
              <p
                onClick={() => navigate('/login')}
                className="text-flame-orange hover:text-sunflower-yellow cursor-pointer"
              >
                {t('registerPage.loginButton')}
              </p>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-center justify-start flex-1 lg:w-[500px] w-[300px] l">
              <i
                className="fas fa-arrow-left lg:text-4xl text-2xl text-flame-orange cursor-pointer"
                onClick={() => setOpenOTP(!openOTP)}
              />
            </div>

            <div className=" flex-col justify-start flex-1 lg:w-[500px] w-[300px] lg:py-4 py-2">
              <p className="text-lg my-2">{t('sendOtp.otpVerify')}</p>
            </div>
            <OtpInput
              value={otp}
              onChange={(value) => setOtp(value)}
              numInputs={6}
              separator={<span> </span>}
              isInputNum={true}
              isSuccessed={false}
              inputStyle="lg:text-6xl text-5xl h-[70px] lg:h-[100px] text-center border-2 border-sunflower-yellow
         rounded-md mx-[5px] "
            />

            <Button
              loading={registerMutation.isPending}
              onClick={handleRegister}
              disabled={otp.length !== 6}
              size="large"
              className="lg:w-[400px] w-[250px] h-[50px] text-lg bg-flame-orange text-white mt-[20px]"
            >
              <span>{t('sendOtp.verify')}</span>
            </Button>
          </>
        )}
      </div>
    </LAuthLayout>
  );
}

export default RegisterPage;
