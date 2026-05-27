import { Types } from "mongoose";

export interface IActivity {
  action: string;

  user: Types.ObjectId;

  workspace: Types.ObjectId;

  task?: Types.ObjectId;
}
