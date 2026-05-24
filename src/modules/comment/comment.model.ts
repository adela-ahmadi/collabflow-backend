import { Schema, model } from "mongoose";

import { IComment } from "./comment.interface";

const commentSchema = new Schema<IComment>(
  {
    content: {
      type: String,

      required: true,

      trim: true,
    },

    task: {
      type: Schema.Types.ObjectId,

      ref: "Task",

      required: true,
    },

    author: {
      type: Schema.Types.ObjectId,

      ref: "User",

      required: true,
    },
  },

  {
    timestamps: true,
  }
);

const Comment = model<IComment>(
  "Comment",

  commentSchema
);

export default Comment;
