import { Schema, model } from "mongoose";

import { ITask } from "./task.interface";

const taskSchema = new Schema<ITask>(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    workspace: {
      type: Schema.Types.ObjectId,
      ref: "Workspace",
      required: true,
    },

    assignedTo: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },

    createdBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    status: {
      type: String,

      enum: ["TODO", "IN_PROGRESS", "DONE"],

      default: "TODO",
    },

    priority: {
      type: String,

      enum: ["LOW", "MEDIUM", "HIGH"],

      default: "MEDIUM",
    },

    dueDate: {
      type: Date,
    },
  },

  {
    timestamps: true,
  }
);

const Task = model<ITask>("Task", taskSchema);

export default Task;
