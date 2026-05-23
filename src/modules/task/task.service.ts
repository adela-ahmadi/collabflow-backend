import { JwtPayload } from "jsonwebtoken";

import Task from "./task.model";
import AppError from "../../errors/AppError";
import Workspace from "../workspace/workspace.model";

const createTask = async (
  payload: any,

  user: JwtPayload
) => {
  const task = await Task.create({
    title: payload.title,

    description: payload.description,

    workspace: payload.workspaceId,

    assignedTo: payload.assignedTo,

    priority: payload.priority,

    dueDate: payload.dueDate,

    createdBy: user.userId,
  });

  return task;
};
const getWorkspaceTasks = async (workspaceId: string) => {
  const tasks = await Task.find({
    workspace: workspaceId,
  })
    .populate("assignedTo", "name email")
    .populate("createdBy", "name email")
    .sort({
      createdAt: -1,
    });

  return tasks;
};

const updateTaskStatus = async (
  taskId: string,

  status: string
) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  task.status = status as "TODO" | "IN_PROGRESS" | "DONE";

  await task.save();

  return task;
};

const assignTask = async (
  taskId: string,

  assignedTo: string
) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  const workspace = await Workspace.findById(task.workspace);

  if (!workspace) {
    throw new AppError(404, "Workspace not found");
  }

  const isMember = workspace.members.some(
    (member) => member.toString() === assignedTo
  );

  if (!isMember) {
    throw new AppError(400, "User is not a workspace member");
  }

  task.assignedTo = assignedTo as any;

  await task.save();

  return task;
};

export const TaskServices = {
  createTask,
  getWorkspaceTasks,
  updateTaskStatus,
  assignTask,
};
