import { JwtPayload } from "jsonwebtoken";

import Task from "./task.model";
import AppError from "../../errors/AppError";
import Workspace from "../workspace/workspace.model";
import { ActivityServices } from "../activity/activity.service";
import { NotificationServices } from "../notification/notification.service";
import QueryBuilder from "../../builder/QueryBuilder";

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
  await ActivityServices.createActivityLog(
    "created a task",

    user.userId,

    payload.workspaceId,

    task._id.toString()
  );
  return task;
};

const getWorkspaceTasks = async (
  workspaceId: string,
  query: Record<string, any>
) => {
  const taskQuery = new QueryBuilder(
    Task.find({
      workspace: workspaceId,
    })
      .populate("assignedTo", "name email")
      .populate("createdBy", "name email"),
    query
  )
    .search(["title"])
    .filter()
    .sort()
    .paginate()
    .fields();

  const meta = await taskQuery.countTotal();

  const tasks = await taskQuery.modelQuery;

  return {
    meta,
    result: tasks,
  };
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

  await ActivityServices.createActivityLog(
    `changed task status to ${status}`,

    task.createdBy.toString(),

    task.workspace.toString(),

    task._id.toString()
  );

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
    (member) => member.user.toString() === assignedTo
  );

  if (!isMember) {
    throw new AppError(400, "User is not a workspace member");
  }

  task.assignedTo = assignedTo as any;

  await NotificationServices.createNotification(
    "You have been assigned a task",

    assignedTo,

    task._id.toString()
  );

  await task.save();

  return task;
};

const getWorkspaceMemberRole = (
  workspace: any,

  userId: string
) => {
  const member = workspace.members.find(
    (member: any) => member.user.toString() === userId
  );

  return member?.role;
};

const updateTask = async (
  taskId: string,

  payload: any,

  currentUserId: string
) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  const workspace = await Workspace.findById(task.workspace);

  if (!workspace) {
    throw new AppError(404, "Workspace not found");
  }

  const role = getWorkspaceMemberRole(
    workspace,

    currentUserId
  );

  const isCreator = task.createdBy.toString() === currentUserId;

  const canEdit = isCreator || role === "ADMIN" || role === "OWNER";

  if (!canEdit) {
    throw new AppError(403, "You are not allowed to edit this task");
  }

  const updatedTask = await Task.findByIdAndUpdate(
    taskId,

    payload,

    {
      new: true,
      runValidators: true,
    }
  );

  return updatedTask;
};

const deleteTask = async (
  taskId: string,

  currentUserId: string
) => {
  const task = await Task.findById(taskId);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  const workspace = await Workspace.findById(task.workspace);

  if (!workspace) {
    throw new AppError(404, "Workspace not found");
  }

  const role = getWorkspaceMemberRole(
    workspace,

    currentUserId
  );

  const canDelete = role === "ADMIN" || role === "OWNER";

  if (!canDelete) {
    throw new AppError(403, "You are not allowed to delete this task");
  }

  await Task.findByIdAndDelete(taskId);

  return null;
};

export const TaskServices = {
  createTask,
  getWorkspaceTasks,
  updateTaskStatus,
  assignTask,
  updateTask,
  deleteTask,
};
