import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import { IRole, IRoleItem, IRolePayload, ISearchRole } from '../data/interface';

class RolesService {
  private static baseUrl = 'role';

  static getAll = (
    params?: ISearchRole
  ): Promise<IPagedResponse<IRoleItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };

  static getbyId = (id: number): Promise<ICommonResponse<IRole>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (data: IRolePayload): Promise<ICommonResponse<IRole>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };

  static update = (
    id: number,
    data: IRolePayload
  ): Promise<ICommonResponse<IRole>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}`, false, data);
  };

  static delete = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}

export default RolesService;
