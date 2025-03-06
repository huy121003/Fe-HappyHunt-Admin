import { ISearchParams } from '@/interfaces';
import { UploadFile } from 'antd';

export interface IBanner {
  name: string;
  link?: string;
  image: string;
  description: string;
}
export interface IBannerItem {
  _id: number;
  name: string;
  link?: string;
  image: string;
  isShow: boolean;
  createdAt: string;
  updatedAt?: string;
  createdBy?: {
    _id: number;
    name: string;
  };
}
export interface IBannerPayload {
  name: string;
  link: string;
  image: string | UploadFile;
  description: string;
}
export interface ISearchBanner extends ISearchParams {
  name?: string;
}
