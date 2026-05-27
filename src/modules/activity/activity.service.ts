import Activity from "./activity.model";

const createActivityLog = async (
  action: string,

  user: string,

  workspace: string,

  task?: string
) => {
  await Activity.create({
    action,

    user,

    workspace,

    task,
  });
};

const getWorkspaceActivities = async (workspaceId: string) => {
  const activities = await Activity.find({
    workspace: workspaceId,
  })
    .populate("user", "name email")
    .populate("task", "title")
    .sort({
      createdAt: -1,
    });

  return activities;
};

export const ActivityServices = {
  createActivityLog,
  getWorkspaceActivities,
};
