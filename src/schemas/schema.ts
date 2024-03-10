import * as z from "zod";

// Register schema without confirm password because there is an issue about zod in .omit()
export const RegisterSchema = z.object({
  firstName: z.string().min(2, {
    message: "Required",
  }),
  lastName: z.string().min(2, {
    message: "Required",
  }),
  email: z
    .string()
    .min(2, {
      message: "Must be a valid Email",
    })
    .email(),
  password: z.string().min(2, {
    message: "Min of 8 Characters",
  }),
});

export const PasswordSchema = RegisterSchema.extend({
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  path: ["confirmPassword"],
  message: "Password do not match",
});
