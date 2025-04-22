import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import {
  ICountSold,
  ICountStatus,
  IPost,
  IPostItem,
  ISearchPost,
  IUpdateStatusChecking,
} from '../data/interface';

class PostService {
  private static baseUrl = '/post';

  static countStatus = (
    idUser: number
  ): Promise<ICommonResponse<ICountStatus>> => {
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/count-status/${idUser}`,
      false
    );
  };
  static updateStatus = (
    id: number,
    status: string
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.PATCH,
      `${PostService.baseUrl}/${id}/status`,
      true,
      {
        status,
      }
    );
  };
  static updateStatusChecking = (
    id: number,
    data: IUpdateStatusChecking
  ): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.PATCH,
      `${PostService.baseUrl}/${id}/checking-status`,
      false,
      data
    );
  };

  static getAllPagination = (
    params: ISearchPost
  ): Promise<IPagedResponse<IPostItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/pagination?${newParams}`,
      false
    );
  };
  static getById = (id: number): Promise<ICommonResponse<IPost>> => {
    return apiRequest(EMethod.GET, `${PostService.baseUrl}/${id}`, false);
  };

  static remove = (id: number): Promise<ICommonResponse> => {
    return apiRequest(EMethod.DELETE, `${PostService.baseUrl}/${id}`, false);
  };
  static countSold = (idUser: number): Promise<ICommonResponse<ICountSold>> => {
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/count-sold/${idUser}`,
      false
    );
  };
  static updateClickCount = (id: number): Promise<ICommonResponse> => {
    return apiRequest(
      EMethod.PATCH,
      `${PostService.baseUrl}/click-count/${id}`,
      false
    );
  };
  static getTotalPostSelling = (): Promise<ICommonResponse<number>> => {
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/total-post-selling`,
      false
    );
  };
  static getTotalPostByCategory = (): Promise<
    ICommonResponse<Record<string, number>>
  > => {
    console.log('getTotalPostByCategory');
    return apiRequest(
      EMethod.GET,
      `${PostService.baseUrl}/total-statistic-by-category`,
      false
    );
  };
}

export default PostService;
