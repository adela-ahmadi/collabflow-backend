import { Schema, model } from "mongoose";

import { INotification } from "./notification.interface";

const notificationSchema = new Schema<INotification>(
  {
    message: {
      type: String,

      required: true,
    },

    recipient: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    task: {
      type: Schema.Types.ObjectId,

      ref: "Task",
    },

    read: {
      type: Boolean,

      default: false,
    },
  },

  {
    timestamps: true,
  }
);

const Notification = model<INotification>(
  "Notification",

  notificationSchema
);

export default Notification;
