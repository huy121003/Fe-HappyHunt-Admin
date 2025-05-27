import { EPostStatus } from "@/features/posts/data/constant";

export interface IReview {
  _id: number;
  target: {
    _id: number;
    name: string;
    slug: string;
  };
  post: {
    _id: number;
    name: string;
    images: {
      url: string;
      index: number;
    }[];
    slug: string;
    price: number;
    status: EPostStatus;
  };
  isSeller: boolean;
  createdAt: string;

  createdBy: {
    _id: number;
    name: string;
    avatar: string;
    slug: string;
  };
  content: string[];
  star: number;
}
