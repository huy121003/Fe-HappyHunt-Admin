export interface IUserStatistics {
  _id: string;
  totalAccounts: number;
}

export interface ISearchUserStatistic {
  type: string;
  start?: Date;
  end?: Date;
}
