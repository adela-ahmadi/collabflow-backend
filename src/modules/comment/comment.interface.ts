import { Types } from "mongoose";

export interface IComment {
  content: string;

  task: Types.ObjectId;

  author: Types.ObjectId;
}
