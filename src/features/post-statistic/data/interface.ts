export interface IPostStatistics {
  _id: string;
  totalAccounts: number;
}

export interface ISearchPostStatistic {
  type: string;
  start?: Date;
  end?: Date;
}
