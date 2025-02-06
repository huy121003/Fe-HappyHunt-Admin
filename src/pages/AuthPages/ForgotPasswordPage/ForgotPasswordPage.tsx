import { useState } from 'react';
import { Button, Divider, Form, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { LAuthLayout } from '@/layouts';
import OtpInput from 'react18-input-otp';
import authApi from '@/apis/authApi';
import { useMutation } from '@tanstack/react-query';

function ForgotPasswordPage() {
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [openOTP, setOpenOTP] = useState(false);
  const [otp, setOtp] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const navigate = useNavigate();
  const handleChange = (enteredOtp: any) => {
    setOtp(enteredOtp);
  };
  const senOtpMutation = useMutation({
    mutationFn: async (phoneNumber: string) => {
      const res = await authApi.AForgotPasswordOtp(phoneNumber);
      return res;
    },
    onSuccess: (res) => {
      notification.success({
        message: t('common.success'),
        description: res.message,
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

  const handleSendOTP = async () => {
    const values = await form.validateFields();
    setPhoneNumber(values.phoneNumber);
    senOtpMutation.mutate(values.phoneNumber);
  };
  const forgotPasswordMutation = useMutation({
    mutationFn: async () => {
      const res = await authApi.AForgotPassword(phoneNumber, otp);
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
  const handleForgotPassword = async () => {
    await forgotPasswordMutation.mutate();
  };

  return (
    <LAuthLayout>
      <div className="flex flex-col items-center justify center lg:w-[500px] w-[300px] ">
        <h1 className=" lg:text-6xl text-3xl font-bold text-flame-orange">
          {t('forgotPassword.forgotPassword')}
        </h1>
        <Divider />
        <div className=" flex-col justify-start flex-1 lg:w-[500px] w-[300px] lg:py-4 py-2"></div>
        {!openOTP ? (
          <>
            <p className="text-lg my-2">{t('forgotPassword.pleaseEnter')}</p>
            <Form
              onFinish={handleSendOTP}
              form={form}
              layout="vertical"
              labelCol={{
                span: 8,
              }}
              wrapperCol={{
                span: 16,
              }}
            >
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: t('forgotPassword.phoneRequired'),
                  },
                ]}
              >
                <Input
                  placeholder={t('forgotPassword.phoneNumber')}
                  size="large"
                  className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
                />
              </Form.Item>
            </Form>

            <Button
              className="lg:w-[400px] w-[250px] h-[50px] text-lg bg-flame-orange text-white"
              onClick={handleSendOTP}
            >
              {t('forgotPassword.sendOTP')}
            </Button>
            <div className="flex items-center flex-1 justify-center lg:w-[500px] w-[300px] lg:py-4 py-2 gap-2">
              <p
                onClick={() => navigate('/login')}
                className="text-flame-orange hover:text-sunflower-yellow cursor-pointer"
              >
                {t('forgotPassword.back')}
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
              onChange={handleChange}
              numInputs={6}
              separator={<span> </span>}
              isInputNum={true}
              isSuccessed={false}
              inputStyle="lg:text-6xl text-5xl h-[70px] lg:h-[100px] text-center border-2 border-sunflower-yellow rounded-md mx-[5px] "
            />

            <Button
              onClick={handleForgotPassword}
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

export default ForgotPasswordPage;
