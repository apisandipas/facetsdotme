import { User } from "@prisma/client";
import { hash } from "bcrypt";

import { Context } from "../../trpc";
import {
  CheckEmailAvailableDto,
  CheckHandleAvailableDto,
  SignUpDto,
} from "./user.schema";

type UserResponse = Omit<User, "password">;

export const signUp = async (
  input: SignUpDto,
  ctx: Context,
): Promise<UserResponse> => {
  const bcryptHash = await hash(input.password, 10);

  const user = await ctx.prisma.user.create({
    data: {
      email: input.email,
      name: input.name,
      password: bcryptHash,
      profile: {
        create: {
          handle: input?.profile?.handle!,
        },
      },
    },
  });
  return {
    id: user.id,
    name: user.name,
    email: user.email,
  };
};

export const checkHandleAvailable = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: CheckHandleAvailableDto;
}) => {
  const profileWithHandle = await ctx.prisma.profile.findFirst({
    where: { handle: input.handle },
  });

  // Is handle available?
  return !!!profileWithHandle;
};

export const checkEmailAvailable = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: CheckEmailAvailableDto;
}) => {
  const user = await ctx.prisma.user.findFirst({
    where: { email: input.email },
  });

  // Is email available?
  return !!!user;
};
