import { z } from "zod";

export const createUserValidationSchema = z.object({
  body: z.object({
    name: z.string(),

    email: z.email(),

    password: z.string().min(6),
  }),
});
