import { IPermission } from '@/features/permissions/data/interface';
import { ISearchParams } from '@/interfaces';

export interface IRole {
  _id: string;
  name: string;
  permissions: IPermission[];
  description?: string;
}
export interface IRoleItem {
  _id: string;
  name: string;
  description?: string;
}
export interface IRolePayload {
  name: string;
  permissions: string[];
  description?: string;
}
export interface ISearchRole extends ISearchParams {
  name?: string;
}
