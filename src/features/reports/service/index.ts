import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';

import { IReport, IReportItem, ISearchReport } from '../data/interface';
import { EStatus } from '../data/constant';

class ReportService {
  private static baseUrl = '/report';
  static getAll = (
    params?: ISearchReport
  ): Promise<IPagedResponse<IReportItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(EMethod.GET, `${this.baseUrl}?${newParams}`, false);
  };
  static getById = (id: number): Promise<ICommonResponse<IReport>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/${id}`, false);
  };
  static updateStatus = (
    id: number,
    status: EStatus
  ): Promise<ICommonResponse<IReportItem>> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/${id}/status`, false, {
      status,
    });
  };
}
export default ReportService;
