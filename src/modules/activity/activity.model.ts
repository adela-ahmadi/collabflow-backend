import { Schema, model } from "mongoose";

import { IActivity } from "./activity.interface";

const activitySchema = new Schema<IActivity>(
  {
    action: {
      type: String,

      required: true,
    },

    user: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },

    workspace: {
      type: Schema.Types.ObjectId,

      ref: "Workspace",

      required: true,
    },

    task: {
      type: Schema.Types.ObjectId,

      ref: "Task",
    },
  },

  {
    timestamps: true,
  }
);

const Activity = model<IActivity>(
  "Activity",

  activitySchema
);

export default Activity;
