import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import {
  IBanner,
  IBannerItem,
  IBannerPayload,
  ISearchBanner,
} from '../data/interface';
const convertObjectToFormData = (data: IBannerPayload) => {
  const formData = new FormData();
  formData.append('name', data.name);

  formData.append('link', data.link);

  if (data.image) {
    formData.append('image', data.image as unknown as Blob);
  }
  if (data.description) {
    formData.append('description', data.description);
  }

  return formData;
};
class BannerService {
  private static baseUrl = 'banner';

  static getAllWithPagination = (
    params?: ISearchBanner
  ): Promise<IPagedResponse<IBannerItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/pagination?${newParams}`,
      false
    );
  };

  static getAll = (): Promise<ICommonResponse<IBannerItem[]>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}`, false);
  };

  static getbyId = (id: number): Promise<ICommonResponse<IBanner>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (data: IBannerPayload): Promise<ICommonResponse<IBanner>> => {
    const formData = convertObjectToFormData(data);
    return apiRequest(EMethod.POST, `${this.baseUrl}`, true, formData);
  };

  static update = (
    id: number,
    data: IBannerPayload
  ): Promise<ICommonResponse<IBanner>> => {
    const formData = convertObjectToFormData(data);
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}`, true, formData);
  };
  static show = (
    id: number,
    isShow: boolean
  ): Promise<ICommonResponse<IBanner>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}/show`, false, {
      isShow,
    });
  };

  static delete = (id: number): Promise<ICommonResponse<IBanner>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}
export default BannerService;
