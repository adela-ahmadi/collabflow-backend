import { Router } from "express";
import validateRequest from "../../middlewares/validateRequest";
import { AuthControllers } from "./auth.controller";
import { createUserValidationSchema } from "../user/user.validation";
import { loginValidationSchema } from "./auth.validation";

const router = Router();

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Register a new user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Adela
 *               email:
 *                 type: string
 *                 example: adela@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: User registered successfully
 */

router.post(
  "/register",
  validateRequest(createUserValidationSchema),
  AuthControllers.registerUser
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags:
 *       - Auth
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: fatema@example.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: User logged in successfully
 */

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
