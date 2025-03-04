import { IPermissionItem } from '@/features/permissions/data/interface';
import { ISearchParams } from '@/interfaces';

export interface IRole {
  permissions: IPermissionItem[];
  description?: string;
  name?: string;
}
export interface IRoleItem {
  _id: number;
  name: string;
  description?: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: number;
    name: string;
  };
}
export interface IRolePayload {
  name: string;
  permissions: string[];
  description?: string;
}
export interface ISearchRole extends ISearchParams {
  name?: string;
}
