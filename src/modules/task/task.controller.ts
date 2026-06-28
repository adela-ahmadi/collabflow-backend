import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import { TaskServices } from "./task.service";
import sendResponse from "../../utils/sendResponse";

const createTask = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.createTask(
    req.body,

    req.user
  );

  sendResponse(res, {
    statusCode: 201,
    success: true,
    message: "Task created successfully",
    data: result,
  });
});

const getWorkspaceTasks = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.getWorkspaceTasks(
    req.params.workspaceId as string,
    req.query
  );

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Tasks retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const getMyTasks = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.getMyTasks(req.user.userId, req.query);

  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "My tasks retrieved successfully",
    meta: result.meta,
    data: result.result,
  });
});

const updateTaskStatus = asyncHandler(async (req: Request, res: Response) => {
  const result = await TaskServices.updateTaskStatus(
    req.params.taskId as string,

    req.body.status
  );

  sendResponse(res, {
    statusCode: 200,
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

  sendResponse(res, {
    statusCode: 200,
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

  sendResponse(res, {
    statusCode: 200,
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
  getMyTasks,
};
