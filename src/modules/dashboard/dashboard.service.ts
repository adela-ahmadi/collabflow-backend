import mongoose from "mongoose";
import Task from "../task/task.model";
import Workspace from "../workspace/workspace.model";
import Activity from "../activity/activity.model";
import AppError from "../../errors/AppError";

const getDashboardStats = async (userId: string) => {
  const totalTasks = await Task.countDocuments({
    createdBy: userId,
  });

  const todoTasks = await Task.countDocuments({
    createdBy: userId,
    status: "TODO",
  });

  const inProgressTasks = await Task.countDocuments({
    createdBy: userId,
    status: "IN_PROGRESS",
  });

  const doneTasks = await Task.countDocuments({
    createdBy: userId,
    status: "DONE",
  });

  const totalWorkspaces = await Workspace.countDocuments({
    members: {
      $elemMatch: {
        user: userId,
      },
    },
  });

  return {
    totalTasks,
    todoTasks,
    inProgressTasks,
    doneTasks,
    totalWorkspaces,
  };
};

const getTaskStatusStats = async (userId: string) => {
  const stats = await Task.aggregate([
    {
      $match: {
        createdBy: new mongoose.Types.ObjectId(userId),
      },
    },
    {
      $group: {
        _id: "$status",
        count: {
          $sum: 1,
        },
      },
    },
  ]);

  const result = {
    todo: 0,
    inProgress: 0,
    done: 0,
  };

  stats.forEach((item) => {
    if (item._id === "TODO") {
      result.todo = item.count;
    }

    if (item._id === "IN_PROGRESS") {
      result.inProgress = item.count;
    }

    if (item._id === "DONE") {
      result.done = item.count;
    }
  });

  return result;
};
const getRecentActivities = async (userId: string) => {
  const activities = await Activity.find({
    user: userId,
  })
    .populate("user", "name email")
    .populate("task", "title")
    .populate("workspace", "name")
    .sort({
      createdAt: -1,
    })
    .limit(10);

  return activities;
};

const getWorkspaceActivities = async (workspaceId: string, userId: string) => {
  const workspace = await Workspace.findOne({
    _id: workspaceId,
    members: {
      $elemMatch: {
        user: userId,
      },
    },
  });

  if (!workspace) {
    throw new AppError(403, "Access denied to this workspace");
  }

  const activities = await Activity.find({
    workspace: workspaceId,
  })
    .populate("user", "name email")
    .populate("task", "title")
    .populate("workspace", "name")
    .sort({
      createdAt: -1,
    })
    .limit(20);

  return activities;
};

const getCompletionRate = async (userId: string) => {
  const totalTasks = await Task.countDocuments({
    createdBy: userId,
  });

  const completedTasks = await Task.countDocuments({
    createdBy: userId,
    status: "DONE",
  });

  const completionRate =
    totalTasks === 0
      ? 0
      : Number(((completedTasks / totalTasks) * 100).toFixed(2));

  return {
    totalTasks,
    completedTasks,
    completionRate,
  };
};

const getWorkspaceOverview = async (workspaceId: string, userId: string) => {
  const workspace = await Workspace.findOne({
    _id: workspaceId,
    members: {
      $elemMatch: {
        user: userId,
      },
    },
  });

  if (!workspace) {
    throw new AppError(403, "Access denied to this workspace");
  }

  const taskCount = await Task.countDocuments({
    workspace: workspaceId,
  });

  return {
    workspaceName: workspace.name,
    memberCount: workspace.members.length,
    taskCount,
  };
};

export const DashboardServices = {
  getDashboardStats,
  getTaskStatusStats,
  getRecentActivities,
  getWorkspaceActivities,
  getCompletionRate,
  getWorkspaceOverview,
};
