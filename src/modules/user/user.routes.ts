import { Router } from "express";

import auth from "../../middlewares/auth";

import { UserControllers } from "./user.controller";

const router = Router();

router.get("/me", auth("USER", "ADMIN"), UserControllers.getMe);

export default router;
