import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse, IPagedResponse } from '@/interfaces';
import { IPaymentItem, ISearchPayment, ITopupItem } from '../data/interface';

class PaymentService {
  private static baseUrl = 'payment';
  static getAllPagination = (
    params?: ISearchPayment
  ): Promise<IPagedResponse<IPaymentItem[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/pagination?${newParams}`,
      false
    );
  };
  static remove = (id: number): Promise<ICommonResponse<any>> => {
    return apiRequest(EMethod.DELETE, `${this.baseUrl}/${id}`, false);
  };
  static getTopup = (): Promise<ICommonResponse<ITopupItem[]>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}/top5`, false);
  };
}
export default PaymentService;
