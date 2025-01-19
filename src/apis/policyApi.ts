import { apiRequest } from '@/configs';
import { EMethod } from '@/constants';

const AGetSettingPost = (): Promise<any> => {
  return apiRequest(EMethod.GET, '/policy/setting-post', false);
};
const AUpdateSettingPost = (data: any): Promise<any> => {
  return apiRequest(EMethod.PATCH, '/policy/setting-post', false, data);
};
const AUpdateDefaultSettingPost = (): Promise<any> => {
  return apiRequest(EMethod.PATCH, '/policy/setting-post/default', false);
};

export default {
  AGetSettingPost,
  AUpdateSettingPost,
  AUpdateDefaultSettingPost,
};
