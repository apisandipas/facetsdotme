import { User } from "@prisma/client";
import { hash } from "bcrypt";

import { SignUpDto } from "./user.schema";

type UserResponse = Omit<User, "password">;

export const signUp = async (
  input: SignUpDto,
  ctx: any,
): Promise<UserResponse> => {
  const bcryptHash = await hash(input.password, 10);

  const user = await ctx.prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: bcryptHash,
    },
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};
