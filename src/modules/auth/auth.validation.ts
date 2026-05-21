import { z } from "zod";

export const loginValidationSchema = z.object({
  body: z.object({
    email: z.email(),

    password: z.string(),
  }),
});
