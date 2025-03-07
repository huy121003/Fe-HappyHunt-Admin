import { ISearchParams } from '@/interfaces';
import { UploadFile } from 'antd';

export interface IAdmin {
  role?: {
    name: string;
    _id: number;
  };
  name: string;
  username?: string;
  avatar?: string;
  phoneNumber?: string;
}
export interface IAdminItem {
  _id: number;
  role?: {
    name: string;
    _id: number;
  };
  isBanned: boolean;

  name: string;
  username?: string;
  avatar?: string;
  phoneNumber?: string;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    _id: number;
    name: string;
  };
}
export interface IAdminPayload {
  role: number;
  name: string;
  avatar: string | UploadFile;
  phoneNumber: string;
  username: string;
}
export interface ISearchAdmin extends ISearchParams {
  name?: string | null;
  role?: number | null;
  phoneNumber?: string | null;
  username?: string | null;
  isBanned?: boolean | null;
  
}
