import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { createUserValidationSchema } from "../user/user.validation";
import { loginValidationSchema } from "./auth.validation";

const router = Router();

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  AuthControllers.registerUser
);

router.post(
  "/login",
  validateRequest(loginValidationSchema),
  AuthControllers.loginUser
);
router.post("/refresh-token", AuthControllers.refreshToken);

router.get("/", (_req, res) => {
  res.send("Auth route working");
});

export default router;
