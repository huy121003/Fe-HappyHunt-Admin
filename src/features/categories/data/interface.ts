import { ISearchParams } from '@/interfaces';
import { UploadFile } from 'antd';

export interface IAttribute {
  name: string;
  values: string[];
}
export interface ICategory {
  _id: number;
  name: string;
  parent: {
    _id: number;
    name: string;
  };
  url: string;
  description: string;
  icon: string;
  attributes: IAttribute[];
  keywords: string[];
}
export interface ICategoryItem {
  _id: number;
  name: string;
  icon?: string;
  url?: string;
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
  url: string;
  parent?: number;
  icon?: string | UploadFile;
  attributes?: IAttribute[];
  keywords?: string[];
  description?: string;
}
