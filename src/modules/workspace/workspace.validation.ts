import { z } from "zod";

export const createWorkspaceValidationSchema = z.object({
  body: z.object({
    name: z.string().min(3),

    description: z.string().optional(),
  }),
});
