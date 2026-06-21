import { Request, Response } from "express";

import asyncHandler from "../../utils/asyncHandler";

import { CommentServices } from "./comment.service";

const createComment = asyncHandler(async (req: Request, res: Response) => {
  const result = await CommentServices.createComment(
    req.body,

    req.user
  );

  res.status(201).json({
    success: true,

    message: "Comment added successfully",

    data: result,
  });
});

const getTaskComments = asyncHandler(async (req: Request, res: Response) => {
  const result = await CommentServices.getTaskComments(
    req.params.taskId as string
  );

  res.status(200).json({
    success: true,

    message: "Comments retrieved successfully",

    data: result,
  });
});

const updateComment = asyncHandler(async (req: Request, res: Response) => {
  const result = await CommentServices.updateComment(
    req.params.commentId as string,
    req.body,
    req.user
  );

  res.status(200).json({
    success: true,
    message: "Comment updated successfully",
    data: result,
  });
});

const deleteComment = asyncHandler(async (req: Request, res: Response) => {
  await CommentServices.deleteComment(req.params.commentId as string, req.user);

  res.status(200).json({
    success: true,
    message: "Comment deleted successfully",
  });
});

export const CommentControllers = {
  createComment,
  getTaskComments,
  updateComment,
  deleteComment,
};
