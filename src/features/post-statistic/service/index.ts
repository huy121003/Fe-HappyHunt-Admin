import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse } from '@/interfaces';
import { IPostStatistics, ISearchPostStatistic } from '../data/interface';

class PostStatisticService {
  private static baseUrl = 'post';

  static getStatistic = (
    params: ISearchPostStatistic
  ): Promise<ICommonResponse<IPostStatistics[]>> => {
    const newParams = new URLSearchParams(params as any).toString();
    return apiRequest(
      EMethod.GET,
      `${this.baseUrl}/statistics?${newParams}`,
      false
    );
  };
}
export default PostStatisticService;
