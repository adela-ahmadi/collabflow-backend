import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";

import { AuthControllers } from "./auth.controller";

import { createUserValidationSchema } from "../user/user.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  AuthControllers.registerUser
);

router.get("/", (_req, res) => {
  res.send("Auth route working");
});

export default router;
