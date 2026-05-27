import { Types } from "mongoose";

export interface INotification {
  message: string;

  recipient: Types.ObjectId;

  task?: Types.ObjectId;

  read: boolean;
}
