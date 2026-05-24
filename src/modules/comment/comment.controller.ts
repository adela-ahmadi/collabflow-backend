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

export const CommentControllers = {
  createComment,
  getTaskComments,
};
