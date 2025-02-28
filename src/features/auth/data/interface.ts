import { IRole } from '@/features/roles/data/interface';
import { IType } from './constant';

export interface ILoginRequest {
  phoneNumber: string;
  password: string;
  type: IType;
}

export interface ILoginResponse {
  access_token: string;
  _id: number;
  fullName: string;
  phoneNumber: string;
  isBanned: boolean;
  avatar: string;
  isVip: boolean;
  address: string;
  role: IRole;
}
export interface IRegisterRequest {
  phoneNumber: string;
  password: string;
  otp: string;
}

export interface IRegisterOtpRequest {
  phoneNumber: string;
}

export interface IForgotPasswordRequest extends IRegisterOtpRequest {}

export interface IForgotPasswordOtpRequest {
  phoneNumber: string;
  otp: string;
}
export interface IGetAccountInfoResponse extends ILoginResponse {}
export interface IRefreshTokenResponse {
  access_token: string;
}
