export interface IPermission {
  name: string;
  codeName: string;
  isView: boolean;
  isCreate: boolean;
  isUpdate: boolean;
  isDelete: boolean;
  _id?: string;
  description?: string;
}
