import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse } from '@/interfaces';
import {
  IForgotPasswordOtpRequest,
  IForgotPasswordRequest,
  IGetAccountInfoResponse,
  ILoginRequest,
  ILoginResponse,
  IRegisterOtpRequest,
  IRegisterRequest,
} from '../data/interface';

class AuthService {
  private static baseUrl = 'auth';

  static login = (
    data: ILoginRequest
  ): Promise<ICommonResponse<ILoginResponse>> => {

    return apiRequest(EMethod.POST, `${this.baseUrl}/login`, false, data);
  };

  static register = (data: IRegisterRequest): Promise<ICommonResponse> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}/register`, false, data);
  };

  static registerOtp = (
    data: IRegisterOtpRequest
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}/register-otp`,
      false,
      data
    );
  };

  static forgotpassword = (
    data: IForgotPasswordRequest
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}/forgot-password-otp`,
      false,
      data
    );
  };

  static forgotpasswordOtp = (
    data: IForgotPasswordOtpRequest
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}/forgot-password`,
      false,
      data
    );
  };

  static getAccountInfo = (): Promise<
    ICommonResponse<IGetAccountInfoResponse>
  > => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/get-account-info`, true);
  };

  static getNewAccessToken = (): Promise<
    ICommonResponse<IGetAccountInfoResponse>
  > => {
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/get-new-access-token`,
      true
    );
  };
}
export default AuthService;
