import { JwtPayload } from "jsonwebtoken";

import Workspace from "./workspace.model";

const createWorkspace = async (
  payload: {
    name: string;
    description?: string;
  },
  user: JwtPayload
) => {
  const workspace = await Workspace.create({
    ...payload,

    owner: user.userId,

    members: [user.userId],
  });

  return workspace;
};

const getMyWorkspaces = async (userId: string) => {
  const workspaces = await Workspace.find({
    members: userId,
  })
    .populate("owner", "name email")
    .sort({
      createdAt: -1,
    });

  return workspaces;
};

export const WorkspaceServices = {
  createWorkspace,
  getMyWorkspaces,
};
