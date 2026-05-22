import { JwtPayload } from "jsonwebtoken";

import Task from "./task.model";

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

export const TaskServices = {
  createTask,
};
