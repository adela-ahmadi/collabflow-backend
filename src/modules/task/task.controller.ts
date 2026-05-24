import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import { TaskServices } from "./task.service";

const createTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.createTask(
    req.body,

    req.user
  );

  res.status(201).json({
    success: true,
    message: "Task created successfully",

    data: result,
  });
});
const getWorkspaceTasks = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.getWorkspaceTasks(
    req.params.workspaceId as string
  );

  res.status(200).json({
    success: true,
    message: "Tasks retrieved successfully",

    data: result,
  });
});

const updateTaskStatus = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.updateTaskStatus(
    req.params.taskId as string,

    req.body.status
  );

  res.status(200).json({
    success: true,
    message: "Task status updated successfully",

    data: result,
  });
});

const assignTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.assignTask(
    req.params.taskId as string,

    req.body.assignedTo
  );

  res.status(200).json({
    success: true,
    message: "Task assigned successfully",

    data: result,
  });
});

const updateTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.updateTask(
    req.params.taskId as string,

    req.body,

    req.user.userId
  );

  res.status(200).json({
    success: true,
    message: "Task updated successfully",

    data: result,
  });
});

const deleteTask = asyncHandler(async (req: Request, res: Response) => {
  await TaskServices.deleteTask(
    req.params.taskId as string,

    req.user.userId
  );

  res.status(200).json({
    success: true,
    message: "Task deleted successfully",
  });
});
export const TaskControllers = {
  createTask,
  getWorkspaceTasks,
  updateTaskStatus,
  assignTask,
  updateTask,
  deleteTask,
};
