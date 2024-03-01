import * as z from "zod";

const userRegistrationSchema = z
  .object({
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
    confirmPassword: z.string().min(2, {
      message: "",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ["confirmPassword"],
    message: "Password do not match",
  });

export { userRegistrationSchema };
