import { useState } from 'react';
import { Button, Divider, Form, Input, notification } from 'antd';
import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';
import { LAuthLayout } from '@/layouts';
import { VPassword, VPhone } from '@/validators';
import OtpInput from 'react18-input-otp';
import authApi from '@/apis/authApi';
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

  const handleChange = (enteredOtp: any) => {
    setOtp(enteredOtp);
  };
  const handleRegister = async () => {
    try {
      const result = await authApi.ARegister(
        register.phoneNumber,
        register.password,
        otp
      );
      if (result.statusCode === 200) {
        notification.success({
          message: t('common.success'),
          description: result.message,
        });
        navigate('/login');
      } else {
        notification.error({
          message: t('common.error'),
          description: result.message,
        });
      }
    } catch {
      notification.error({
        message: t('common.error'),
        description: t('common.systemError'),
      });
    }
  };

  const handelRegisterOTP = async () => {
    try {
      const values = await form.validateFields();
      const { phoneNumber, password, rePassword } = values;

      if (VPhone(phoneNumber) === false) {
        notification.error({
          message: t('common.error'),
          description: t('registerPage.phoneRequired'),
        });
        return;
      }
      if (VPassword(password) === false) {
        notification.error({
          message: t('common.error'),
          description: t('registerPage.validatePassword'),
        });
        return;
      }
      if (password !== rePassword) {
        notification.error({
          message: t('common.error'),
          description: t('registerPage.passwordNotMatch'),
        });
        return;
      }

      const result = await authApi.ARegisterOtp(phoneNumber);
      if (result.statusCode === 200) {
        setRegister({
          phoneNumber,
          password,
        });
        setOpenOTP(true);
        notification.success({
          message: t('common.success'),
          description: t('sendOtp.OTPSend') + phoneNumber,
        });
        form.resetFields();
      } else {
        notification.error({
          message: t('common.error'),
          description: result.message,
        });
      }
    } catch {
      notification.error({
        message: t('common.error'),
        description: t('common.systemError'),
      });
    }
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
            >
              <Form.Item
                name="phoneNumber"
                rules={[
                  {
                    required: true,
                    message: t('registerPage.phoneRequired'),
                  },
                ]}
              >
                <Input
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
                ]}
              >
                <Input.Password
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
                <Input.Password
                  placeholder={t('registerPage.rePassword')}
                  className="text-lg rounded-md border-gray-300 lg:w-[500px] w-[300px]"
                  size="large"
                />
              </Form.Item>
            </Form>

            <Button
              className="lg:w-[400px] w-[250px] h-[50px] text-lg bg-flame-orange text-white"
              onClick={handelRegisterOTP}
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
              onChange={handleChange}
              numInputs={6}
              separator={<span> </span>}
              isInputNum={true}
              isSuccessed={false}
              inputStyle="lg:text-6xl text-5xl h-[70px] lg:h-[100px] text-center border-2 border-sunflower-yellow
         rounded-md mx-[5px] "
            />

            <Button
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
