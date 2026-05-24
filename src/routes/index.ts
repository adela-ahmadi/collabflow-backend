import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import workspaceRoutes from "../modules/workspace/workspace.routes";
import taskRoutes from "../modules/task/task.routes";
import commentRoutes from "../modules/comment/comment.routes";

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
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
