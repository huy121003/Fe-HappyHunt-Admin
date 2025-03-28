export interface IPaymentStatisticItem {
  _id: string;
  totalAmount: number;
  totalInvoices: number;
}
export interface IPayemtStatistic {
  data: IPaymentStatisticItem[];
  grandTotalAmount: number;
  grandTotalInvoices: number;
}
export interface ISearchPayemtStatistic {
  type: string;
  start?: Date;
  end?: Date;
}
