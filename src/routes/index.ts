import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import workspaceRoutes from "../modules/workspace/workspace.routes";
import taskRoutes from "../modules/task/task.routes";
import commentRoutes from "../modules/comment/comment.routes";
import activityRoutes from "../modules/activity/activity.routes";

const router = Router();

const moduleRoutes = [
  {
    path: "/auth",
    route: authRoutes,
  },
  {
    path: "/users",
    route: userRoutes,
  },
  {
    path: "/workspaces",
    route: workspaceRoutes,
  },
  {
    path: "/tasks",
    route: taskRoutes,
  },
  {
    path: "/comments",
    route: commentRoutes,
  },
  {
    path: "/activities",
    route: activityRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
