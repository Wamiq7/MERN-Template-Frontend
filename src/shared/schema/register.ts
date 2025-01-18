import { z } from "zod";

export const registerSchema = z.object({
  email: z.string().trim().email(),
  password: z.string().min(8),
});

export type RegisterSchemaType = z.infer<typeof registerSchema>;
