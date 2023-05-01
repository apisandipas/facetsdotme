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
  profile: z
    .object({
      handle: z.string({
        required_error: "Handle is Required",
      }),
    })
    .optional(),
});

export const checkHandleAvailableSchema = z.object({
  handle: z.string({
    required_error: "Handle is required",
  }),
});

export const checkEmailAvailableSchema = z.object({
  email: z.string({
    required_error: "Email is required",
  }),
});

export type SignUpDto = z.TypeOf<typeof userSignUpSchema>;
export type CheckHandleAvailableDto = z.TypeOf<
  typeof checkHandleAvailableSchema
>;
export type CheckEmailAvailableDto = z.TypeOf<typeof checkEmailAvailableSchema>;
