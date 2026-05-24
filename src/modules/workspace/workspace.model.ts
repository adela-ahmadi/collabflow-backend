import { Schema, model } from "mongoose";

import { IWorkspace } from "./workspace.interface";

const workspaceSchema = new Schema<IWorkspace>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    description: {
      type: String,
      trim: true,
    },

    owner: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    members: [
      {
        user: {
          type: Schema.Types.ObjectId,

          ref: "User",

          required: true,
        },

        role: {
          type: String,

          enum: ["OWNER", "ADMIN", "MEMBER"],

          default: "MEMBER",
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Workspace = model<IWorkspace>("Workspace", workspaceSchema);

export default Workspace;
