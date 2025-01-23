import { z } from "zod";

export const loginFormSchema = z.object({
    email: z
      .string()
      .min(3, { message: "Must be at least 3 characters." }),
    password: z
      .string()
      .min(3, { message: "Password must be at least 3 characters." }),
  });
  
  export type LoginForm = z.infer<typeof loginFormSchema>;
  