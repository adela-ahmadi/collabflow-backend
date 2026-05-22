import { Types } from "mongoose";

export interface IWorkspace {
  name: string;

  description?: string;

  owner: Types.ObjectId;

  members: Types.ObjectId[];
}
