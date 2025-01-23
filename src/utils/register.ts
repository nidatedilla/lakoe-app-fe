import { z } from "zod";

export const registerFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, "Password must be at least 6 characters"),
  name: z.string().min(4, "Name must be at least 4 characters"),
  phone: z.string().min(4, "Phone number must be at least 4 characters").refine((val) => !isNaN(Number(val)), {
    message: "Phone number must be a number",
  }),
});

export type RegisterForm = z.infer<typeof registerFormSchema>;
