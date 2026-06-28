import { Router } from "express";

import auth from "../../middlewares/auth";

import { UserControllers } from "./user.controller";
import upload from "../../middlewares/upload";

const router = Router();

router.get("/me", auth("USER", "ADMIN"), UserControllers.getMe);

router.patch(
  "/upload-avatar",

  auth("USER", "ADMIN"),

  upload.single("avatar"),

  UserControllers.uploadAvatar
);

export default router;
