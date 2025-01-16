import { apiRequest } from '@/configs';
import { EMethod } from '@/constants';

const ASendOtp = (phoneNumber: string): Promise<any> => {
  return apiRequest(EMethod.POST, 'otp/send', false, {
    phoneNumber,
  });
};
const AVerifyOtp = (phoneNumber: string, otp: string): Promise<any> => {
  return apiRequest(EMethod.POST, 'otp/verify', false, {
    phoneNumber,
    otp,
  });
};
export default {
  ASendOtp,
  AVerifyOtp,
};
