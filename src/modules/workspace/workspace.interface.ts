import { Types } from "mongoose";

export type WorkspaceRole = "OWNER" | "ADMIN" | "MEMBER";

export interface IWorkspaceMember {
  user: Types.ObjectId;

  role: WorkspaceRole;
}

export interface IWorkspace {
  name: string;

  description?: string;

  owner: Types.ObjectId;

  members: IWorkspaceMember[];
}
