import { z } from "zod";

export const createCommentValidationSchema = z.object({
  body: z.object({
    content: z.string().min(1),

    taskId: z.string(),
  }),
});
