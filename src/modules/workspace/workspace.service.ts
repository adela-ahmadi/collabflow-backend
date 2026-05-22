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

export const WorkspaceServices = {
  createWorkspace,
};
