import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import {
  IQAChatbot,
  IQAChatbotItem,
  IQAChatbotPayload,
  ISearchQAChatbot,
} from '../data/interface';

class QAChatbotsService {
  private static baseUrl = 'qa-chatbot';

  static getAll = (
    params?: ISearchQAChatbot
  ): Promise<IPagedResponse<IQAChatbotItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };

  static getById = (id: number): Promise<ICommonResponse<IQAChatbot>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };

  static create = (
    data: IQAChatbotPayload
  ): Promise<ICommonResponse<IQAChatbot>> => {
    return apiRequest(EMethod.POST, `${this.baseUrl}`, false, data);
  };

  static update = (
    id: number,
    data: IQAChatbotPayload
  ): Promise<ICommonResponse<IQAChatbot>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}`, false, data);
  };

  static remove = (id: number): Promise<ICommonResponse<null>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
}

export default QAChatbotsService;
