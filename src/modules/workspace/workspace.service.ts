import { JwtPayload } from "jsonwebtoken";
import Workspace from "./workspace.model";
import AppError from "../../errors/AppError";
import User from "../user/user.model";

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

const inviteMember = async (
  workspaceId: string,

  payload: {
    email: string;
  },

  userId: string
) => {
  const workspace = await Workspace.findById(workspaceId);

  if (!workspace) {
    throw new AppError(404, "Workspace not found");
  }

  if (workspace.owner.toString() !== userId) {
    throw new AppError(403, "Only workspace owner can invite members");
  }

  const user = await User.findOne({
    email: payload.email,
  });

  if (!user) {
    throw new AppError(404, "User not found");
  }

  const alreadyMember = workspace.members.some(
    (member) => member.toString() === user._id.toString()
  );

  if (alreadyMember) {
    throw new AppError(400, "User is already a member");
  }

  workspace.members.push(user._id);

  await workspace.save();

  return workspace;
};

export const WorkspaceServices = {
  createWorkspace,
  getMyWorkspaces,
  inviteMember,
};
