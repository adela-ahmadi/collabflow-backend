import Notification from "./notification.model";

const createNotification = async (
  message: string,

  recipient: string,

  task?: string
) => {
  await Notification.create({
    message,

    recipient,

    task,
  });
};

const getMyNotifications = async (userId: string) => {
  const notifications = await Notification.find({
    recipient: userId,
  })
    .populate("task", "title status")
    .sort({
      createdAt: -1,
    });

  return notifications;
};

const markAsRead = async (notificationId: string) => {
  const notification = await Notification.findByIdAndUpdate(
    notificationId,

    {
      read: true,
    },

    {
      new: true,
    }
  );

  return notification;
};

const markAllAsRead = async (userId: string) => {
  await Notification.updateMany(
    {
      recipient: userId,
      read: false,
    },
    {
      read: true,
    }
  );

  return null;
};

const getUnreadCount = async (userId: string) => {
  const count = await Notification.countDocuments({
    recipient: userId,
    read: false,
  });

  return {
    unreadCount: count,
  };
};

export const NotificationServices = {
  createNotification,
  getMyNotifications,
  markAsRead,
  markAllAsRead,
  getUnreadCount,
};
