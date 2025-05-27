import { ISearchParams } from '@/interfaces';
import { EStatus, ETargetType } from './constant';
import { IUser } from '@/features/users/data/interface';
import { IPost } from '@/features/posts/data/interface';
import { IReview } from '@/features/review/data/interface';

export interface IReportItem {
  _id: number;
  target: number;
  targetType: ETargetType;
  title: string;
  reason: string;
  status: EStatus;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    _id: string;
    name: string;
    slug: string;
    avatar: string;
  };
  updatedBy?: {
    _id: string;
    name: string;
  };
}
export interface IReport {
  target: number;
  targetType: ETargetType;
  images: string[];
  title: string;
  reason: string;
  status: EStatus;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    _id: string;
    name: string;
    slug: string;
    avatar: string;
    email: string;
  };
  updatedBy?: {
    _id: string;
    name: string;
  };
  account: IUser;
  post: IPost;
  review: IReview;
}

export interface ISearchReport extends ISearchParams {
  targetType?: ETargetType;
  status?: EStatus;
}
