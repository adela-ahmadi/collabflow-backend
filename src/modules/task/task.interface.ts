import { Types } from "mongoose";

export type TaskStatus = "TODO" | "IN_PROGRESS" | "DONE";

export type TaskPriority = "LOW" | "MEDIUM" | "HIGH";

export interface ITask {
  title: string;

  description?: string;

  workspace: Types.ObjectId;

  assignedTo?: Types.ObjectId;

  createdBy: Types.ObjectId;

  status: TaskStatus;

  priority: TaskPriority;

  dueDate?: Date;
}
