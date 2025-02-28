
import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse } from '@/interfaces';
import { IPostSetting } from '../data/interface';
class PostSettingService {
  private static baseUrl = 'policy/setting-post';

  static get = (): Promise<ICommonResponse<any>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}`, false);
  };
  static update = (data: IPostSetting): Promise<ICommonResponse> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}`, false, data);
  };
  static updateDefault = (): Promise<ICommonResponse> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/default`, false);
  };
}
export default PostSettingService;
