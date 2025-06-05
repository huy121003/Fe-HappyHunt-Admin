export interface IPostStatistics {
  _id: string;
  totalPosts: number;
}

export interface ISearchPostStatistic {
  type: string;
  start?: Date;
  end?: Date;
}
