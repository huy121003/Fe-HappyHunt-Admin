import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import {
  IAdmin,
  IAdminItem,
  IAdminPayload,
  ISearchAdmin,
} from '../data/interface';

const convertObjectToFormData = (data: IAdminPayload) => {
  const formData = new FormData();
  formData.append('role', data.role.toString());
  formData.append('name', data.name);
  formData.append('phoneNumber', data.phoneNumber);
  formData.append('username', data.username);
  if (data.avatar) {
    formData.append('avatar', data.avatar as unknown as Blob);
  }
  return formData;
};

class AdminService {
  private static baseUrl = 'admin';

  static getAll = (
    params?: ISearchAdmin
  ): Promise<IPagedResponse<IAdminItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };

  static getById = (id: number): Promise<ICommonResponse<IAdmin>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (data: IAdminPayload): Promise<ICommonResponse<IAdmin>> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}`,
      true,
      convertObjectToFormData(data)
    );
  };

  static update = (
    id: number,
    data: IAdminPayload
  ): Promise<ICommonResponse<IAdmin>> => {
    return apiRequest(
      EMethod.PATCH,
      `${this.baseUrl}/${id}`,
      true,
      convertObjectToFormData(data)
    );
  };

  static delete = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
  static banned = (
    id: number,
    banned: boolean
  ): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}/banned`, false, {
      banned,
    });
  };
}
export default AdminService;
