import { Router } from "express";

import auth from "../../middlewares/auth";

import validateRequest from "../../middlewares/validateRequest";

import { CommentControllers } from "./comment.controller";

import { createCommentValidationSchema } from "./comment.validation";

const router = Router();

router.post(
  "/create",

  auth("USER", "ADMIN"),

  validateRequest(createCommentValidationSchema),

  CommentControllers.createComment
);

router.get(
  "/task/:taskId",

  auth("USER", "ADMIN"),

  CommentControllers.getTaskComments
);

router.patch(
  "/:commentId",

  auth("USER", "ADMIN"),

  CommentControllers.updateComment
);

router.delete(
  "/:commentId",

  auth("USER", "ADMIN"),

  CommentControllers.deleteComment
);

export default router;
