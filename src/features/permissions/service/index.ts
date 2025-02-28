import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';

import {
  IPermission,
  IPermissionItem,
  IPermissionPayload,
  ISearchPermission,
} from '../data/interface';
class PermissionsService {
  private static baseUrl = 'permission';

  static getAll = (): Promise<ICommonResponse<IPermissionItem[]>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}`, false);
  };
  static getAllPagination = (
    params?: ISearchPermission
  ): Promise<IPagedResponse<IPermissionItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/pagination?${newParams}`,
      false
    );
  };

  static getbyId = (id: number): Promise<ICommonResponse<IPermission>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (
    data: IPermissionPayload
  ): Promise<ICommonResponse<IPermission>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };

  static update = (
    id: number,
    data: IPermissionPayload
  ): Promise<ICommonResponse<IPermission>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}`, false, data);
  };

  static delete = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}
export default PermissionsService;
