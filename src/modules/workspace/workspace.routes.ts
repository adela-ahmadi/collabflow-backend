import { Router } from "express";

import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";

import { WorkspaceControllers } from "./workspace.controller";

import {
  createWorkspaceValidationSchema,
  inviteMemberValidationSchema,
  promoteMemberValidationSchema,
} from "./workspace.validation";

const router = Router();

/**
 * @swagger
 * /workspaces/create:
 *   post:
 *     summary: Create a workspace
 *     tags:
 *       - Workspaces
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *                 example: CollabFlow Team
 *               description:
 *                 type: string
 *                 example: Main collaboration workspace
 *     responses:
 *       201:
 *         description: Workspace created successfully
 */

router.post(
  "/create",
  auth("USER", "ADMIN"),

  validateRequest(createWorkspaceValidationSchema),

  WorkspaceControllers.createWorkspace
);

router.get(
  "/my-workspaces",

  auth("USER", "ADMIN"),

  WorkspaceControllers.getMyWorkspaces
);

router.patch(
  "/:workspaceId/invite",

  auth("USER", "ADMIN"),

  validateRequest(inviteMemberValidationSchema),

  WorkspaceControllers.inviteMember
);

router.patch(
  "/:workspaceId/promote",

  auth("USER", "ADMIN"),

  validateRequest(promoteMemberValidationSchema),

  WorkspaceControllers.promoteMemberToAdmin
);

export default router;
