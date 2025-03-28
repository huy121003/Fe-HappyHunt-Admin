import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse } from '@/interfaces';
import { IPayemtStatistic, ISearchPayemtStatistic } from '../data/interface';

class PaymentStatisticService {
  private static baseUrl = 'payment';
  static getStatistic = (
    params: ISearchPayemtStatistic
  ): Promise<ICommonResponse<IPayemtStatistic[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/statistic?${newParams}`,
      false
    );
  };
}
export default PaymentStatisticService;
