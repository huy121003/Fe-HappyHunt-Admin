import apiRequest from '@/libs/axios';
import { EMethod } from '@/constants';
import { ICommonResponse } from '@/interfaces';
import { IVipActivation } from '../data/interface';
class VipActivationService {
  private static baseUrl = 'policy/vip-activation';

  static get = (): Promise<ICommonResponse<IVipActivation>> => {
    return apiRequest(EMethod.GET, `${this.baseUrl}`, false);
  };
  static update = (data: IVipActivation): Promise<ICommonResponse> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}`, false, data);
  };
  static updateDefault = (): Promise<ICommonResponse> => {
    return apiRequest(EMethod.PATCH, `${this.baseUrl}/default`, false);
  };
}
export default VipActivationService;
