import { apiRequest } from '@/configs';
import { EMethod } from '@/constants';

const ALogin = (phoneNumber: string, password: string): Promise<any> => {
  return apiRequest(EMethod.POST, 'auth/login', false, {
    phoneNumber,
    password,
  });
};
const ARegister = (
  phoneNumber: string,
  password: string,
  otp: string
): Promise<any> => {
  return apiRequest(EMethod.POST, 'auth/register', false, {
    phoneNumber,
    password,
    otp,
  });
};
const ARegisterOtp = (phoneNumber: string): Promise<any> => {
  return apiRequest(EMethod.POST, 'auth/register-otp', false, {
    phoneNumber,
  });
};

const AForgotPasswordOtp = (phoneNumber: string): Promise<any> => {
  return apiRequest(EMethod.POST, 'auth/forgot-password-otp', false, {
    phoneNumber,
  });
};
const AForgotPassword = (phoneNumber: string, otp: string): Promise<any> => {
  return apiRequest(EMethod.POST, 'auth/forgot-password', false, {
    phoneNumber,
    otp,
  });
};
const AGetAccountInfo = (): Promise<any> => {
  return apiRequest(EMethod.GET, 'auth/get-account-info', true);
};
const AGetNewAccessToken = (): Promise<any> => {
  return apiRequest(EMethod.GET, 'auth/get-new-access-token', true);
};
export default {
  ALogin,
  ARegister,
  AForgotPassword,
  ARegisterOtp,
  AForgotPasswordOtp,
  AGetAccountInfo,
  AGetNewAccessToken,
};
