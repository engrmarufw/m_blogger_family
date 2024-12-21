import { Types } from 'mongoose';

export interface Blog {
  title: string;
  content: string;
  author: Types.ObjectId;
}
