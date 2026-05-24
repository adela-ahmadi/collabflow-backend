import { z } from "zod";

export const createTaskValidationSchema = z.object({
  body: z.object({
    title: z.string().min(3),

    description: z.string().optional(),

    workspaceId: z.string(),

    assignedTo: z.string().optional(),

    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),

    dueDate: z.string().optional(),
  }),
});
export const updateTaskStatusValidationSchema = z.object({
  body: z.object({
    status: z.enum(["TODO", "IN_PROGRESS", "DONE"]),
  }),
});

export const assignTaskValidationSchema = z.object({
  body: z.object({
    assignedTo: z.string(),
  }),
});

export const updateTaskValidationSchema = z.object({
  body: z.object({
    title: z.string().optional(),

    description: z.string().optional(),

    priority: z.enum(["LOW", "MEDIUM", "HIGH"]).optional(),

    dueDate: z.string().optional(),
  }),
});
