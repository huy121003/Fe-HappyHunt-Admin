import { ISearchParams } from '@/interfaces';
import { EStatus } from './constant';

export interface IPaymentItem {
  _id: number;
  status: EStatus;
  transactionDateTime: string;
  orderCode: number;
  amount: number;
  description: string;
  createdAt: string;
}
export interface ISearchPayment extends ISearchParams {
  status?: EStatus;
  amount?: number;
}
export interface ITopupItem {
  createdBy: number;
  name: string;
  avatar: string;
  totalAmount: number;
  totalFaid: number;
}
