import { z } from "zod";

export const userSignUpSchema = z.object({
  email: z
    .string({
      required_error: "Email is required",
    })
    .email(),
  name: z
    .string({
      required_error: "Name is required",
    })
    .max(25),
  password: z
    .string({
      required_error: "Password is required",
    })
    .min(8),
  profile: z.object({
    handle: z.string({
      required_error: "Handle is Required",
    }),
  }),
});

export type SignUpDto = z.TypeOf<typeof userSignUpSchema>;
