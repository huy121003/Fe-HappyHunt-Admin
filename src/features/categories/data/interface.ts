import { ISearchParams } from '@/interfaces';
import { UploadFile } from 'antd';
import { Type } from './constant';

export interface IAttribute {
  name: string;
  type: Type;
  values?: string[];
  isRequired?: boolean;
  isFilter?: boolean;
  isShow?: boolean;
}
export interface ICategory {
  _id: number;
  name: string;
  parent: {
    _id: number;
    name: string;
  };
  description: string;
  icon: string;
  slug: string;
  attributes: IAttribute[];
  keywords: string[];
  isPayment?: boolean;
  pricePayment?: number;
}
export interface ICategoryItem {
  _id: number;
  name: string;
  icon?: string;
  slug: string;
  isPayment: boolean;
  pricePayment?: number;
  parent?: {
    _id: number;
    name: string;
  };
}

export interface ISearchCategory extends ISearchParams {
  name?: string;
  parent?: number | null;
}
export interface ICategoryPayload {
  name: string;
  isPayment: boolean;
  pricePayment?: number;
  parent?: number;
  icon?: string | UploadFile;
  attributes?: IAttribute[];
  keywords?: string[];
  description?: string;
}
