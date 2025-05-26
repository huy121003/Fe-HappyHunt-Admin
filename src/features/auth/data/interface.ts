import { IRole } from '@/features/roles/data/interface';
import { IType } from './constant';
import { UploadFile } from 'antd';

export interface ILoginRequest {
  emailOrUsername: string;
  password: string;
  type: IType;
}

export interface ILoginResponse {
  access_token: string;
  _id: number;
  name: string;
  email: string;
  isBanned: boolean;
  avatar: string;
  isVip: boolean;
  address: {
    province: {
      _id: number;
      name: string;
    };
    district: {
      _id: number;
      name: string;
    };
    ward: {
      _id: number;
      name: string;
    };
    specificAddress: string;
  };
  role: IRole;
}
export interface IRegisterRequest {
  email: string;
  password: string;
  otp: string;
}

export interface IRegisterOtpRequest {
  email: string;
}

export interface IForgotPasswordRequest extends IRegisterOtpRequest {}

export interface IForgotPasswordOtpRequest {
  email: string;
  otp: string;
}
export interface IGetAccountInfoResponse extends ILoginResponse {}
export interface IRefreshTokenResponse {
  access_token: string;
}

export interface IChangePassword {
  currentPassword: string;
  newPassword: string;
}
export interface IUpdateProfile {
  name: string;
  description: string;
  address: {
    province: number;
    district: number;
    ward: number;
    specificAddress: string;
  };
  avatar: string | UploadFile;
}
