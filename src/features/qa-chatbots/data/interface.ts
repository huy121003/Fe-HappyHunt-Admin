import { ISearchParams } from '@/interfaces';

export interface IQAChatbot {
  question: string;
  answer: string;
}
export interface IQAChatbotItem {
  _id: number;
  question: string;
  answer: string;
  createdAt: string;
  updatedAt: string;
  createdBy: {
    _id: number;
    name: string;
  };
  updatedBy: {
    _id: number;
    name: string;
  };
}

export interface IQAChatbotPayload {
  question?: string;
  answer?: string;
}

export interface ISearchQAChatbot extends ISearchParams {}
