import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import {
  ICategory,
  ICategoryItem,
  ICategoryPayload,
  ISearchCategory,
} from '../data/interface';
const convertObjectToFormData = (data: ICategoryPayload) => {
  const formData = new FormData();
  formData.append('name', data.name);

  formData.append('url', data.url);

  data.keywords?.forEach((keyword) => {
    formData.append('keywords', keyword);
  });
  formData.append('attributes', JSON.stringify(data.attributes));
  if (data.parent) {
    formData.append('parent', Number(data.parent).toString());
  }
  if (data.description) {
    formData.append('description', data.description);
  }
  if (data.icon) {
    formData.append('icon', data.icon as unknown as Blob);
  }

  return formData;
};
class CategoryService {
  private static baseUrl = 'category';

  static getAllWithPagination = (
    params?: ISearchCategory
  ): Promise<IPagedResponse<ICategoryItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/pagination?${newParams}`,
      false
    );
  };
  static getParent = (
    params?: ISearchCategory
  ): Promise<IPagedResponse<ICategoryItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/parent?${newParams}`,
      false
    );
  };

  static getAll = (): Promise<ICommonResponse<ICategoryItem[]>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}`, false);
  };

  static getbyId = (id: number): Promise<ICommonResponse<ICategory>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (data: ICategoryPayload): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.POST,
      `${this.baseUrl}`,
      true,
      convertObjectToFormData(data)
    );
  };

  static update = (
    id: number,
    category: ICategoryPayload
  ): Promise<ICommonResponse<ICategory>> => {
    return apiRequest(
      EMethod.PATCH,
      `${this.baseUrl}/${id}`,
      true,
      convertObjectToFormData(category)
    );
  };

  static delete = (id: number): Promise<ICommonResponse> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}

export default CategoryService;
