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

const updateComment = async (
  commentId: string,
  payload: { content: string },
  user: JwtPayload
) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  // Only the author of the comment can update it
  if (comment.author.toString() !== user.userId) {
    throw new AppError(403, "You are not authorized to update this comment");
  }

  const updatedComment = await Comment.findByIdAndUpdate(
    commentId,
    {
      content: payload.content,
    },
    {
      new: true,
    }
  );

  return updatedComment;
};

const deleteComment = async (commentId: string, user: JwtPayload) => {
  const comment = await Comment.findById(commentId);

  if (!comment) {
    throw new AppError(404, "Comment not found");
  }

  // Only the author of the comment can delete it
  if (comment.author.toString() !== user.userId) {
    throw new AppError(403, "You are not authorized to delete this comment");
  }

  await Comment.findByIdAndDelete(commentId);

  return null;
};

export const CommentServices = {
  createComment,
  getTaskComments,
  updateComment,
  deleteComment,
};
