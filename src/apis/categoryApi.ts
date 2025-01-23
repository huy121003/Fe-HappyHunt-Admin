import { apiRequest } from '@/configs';
import { EMethod } from '@/constants';

const ACreateCategory = (data: any): Promise<any> => {
  return apiRequest(EMethod.POST, 'category', true, data);
};
const AFetchCategoryById = (id: string): Promise<any> => {
  return apiRequest(EMethod.GET, `category/${id}`, true);
};
const AUpdateCategory = (id: string, data: any): Promise<any> => {
  return apiRequest(EMethod.PATCH, `category/${id}`, true, data);
};
const AFetchCategoriesWithPagination = (params: any): Promise<any> => {
  const newParams = new URLSearchParams(params).toString();
  //sort: string[]  => sort=string&sort=string

  return apiRequest(EMethod.GET, `category/pagination?${newParams}`, true);
};
const AFetchCategories = (): Promise<any> => {
  return apiRequest(EMethod.GET, `category`, true);
};
const ADeleteCategory = (id: string): Promise<any> => {
  return apiRequest(EMethod.DELETE, `category/${id}`, true);
};
const AgetCategoryParent = (): Promise<any> => {
  return apiRequest(EMethod.GET, `category/parent`, true);
};
export default {
  ACreateCategory,
  AFetchCategoryById,
  AUpdateCategory,
  AFetchCategoriesWithPagination,
  ADeleteCategory,
  AgetCategoryParent,
  AFetchCategories,
};
