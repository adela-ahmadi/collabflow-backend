import { JwtPayload } from "jsonwebtoken";

import AppError from "../../errors/AppError";

import Task from "../task/task.model";

import Comment from "./comment.model";

const createComment = async (
  payload: any,

  user: JwtPayload
) => {
  const task = await Task.findById(payload.taskId);

  if (!task) {
    throw new AppError(404, "Task not found");
  }

  const comment = await Comment.create({
    content: payload.content,

    task: payload.taskId,

    author: user.userId,
  });

  return comment;
};

const getTaskComments = async (taskId: string) => {
  const comments = await Comment.find({
    task: taskId,
  })
    .populate("author", "name email")
    .sort({
      createdAt: -1,
    });

  return comments;
};

export const CommentServices = {
  createComment,
  getTaskComments,
};
