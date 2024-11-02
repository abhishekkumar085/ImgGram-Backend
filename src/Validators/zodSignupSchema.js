import { z } from "zod";

export const zodSignupSchema = z.object({
  username: z.string({ message: 'Username is required' }).min(1),
  email: z.string().email({ message: 'Email is required' }),
  password: z
    .string()
    .min(8, { message: 'Password must be at least 8 characters long' })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])/, {
      message:
        'Password must include at least one uppercase letter, one lowercase letter, one number, and one special character.',
    }),
});
