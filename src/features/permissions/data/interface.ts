import { ISearchParams } from '@/interfaces';

export interface IPermission {
  name: string;
  codeName: string;
  isView: boolean;
  isCreate: boolean;
  isUpdate: boolean;
  isDelete: boolean;
  _id: string;
  description: string;
}
export interface IPermissionItem {
  name: string;
  codeName: string;
  isView: boolean;
  isCreate: boolean;
  isUpdate: boolean;
  isDelete: boolean;
}
export interface IPermissionPayload {
  name: string;
  codeName: string;
  isView: boolean;
  isCreate: boolean;
  isUpdate: boolean;
  isDelete: boolean;
  description: string;
}
export interface ISearchPermission extends ISearchParams {
  name?: string;
}
