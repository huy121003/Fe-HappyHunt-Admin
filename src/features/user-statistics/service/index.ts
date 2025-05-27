import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse } from '@/interfaces';
import { ISearchUserStatistic, IUserStatistics } from '../data/interface';

class UserStatisticService {
  private static baseUrl = 'user';

  static getStatistic = (
    params: ISearchUserStatistic
  ): Promise<ICommonResponse<IUserStatistics[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/statistics?${newParams}`,
      false
    );
  };
}

export default UserStatisticService;
