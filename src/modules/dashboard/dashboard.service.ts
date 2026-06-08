import mongoose from "mongoose";
import Task from "../task/task.model";
import Workspace from "../workspace/workspace.model";

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

  return stats;
};

export const DashboardServices = {
  getDashboardStats,
  getTaskStatusStats,
};
