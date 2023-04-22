import { User } from "@prisma/client";
import { sign } from "jsonwebtoken";

const authConfig = {
  accessTokenSecretKey: "91283793812792837981327",
  accessTokenExpiresIn: "10h",
};

export const createNewTokens = (user: User) => {
  const accessToken = sign(
    {
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        // role: user.role,
      },
    },
    authConfig.accessTokenSecretKey,
    { expiresIn: authConfig.accessTokenExpiresIn },
  );

  // const refreshToken = sign(
  //   {
  //     user: {
  //       id: user.id,
  //       invalidationCount: user.invalidationCount,
  //     },
  //   },
  //   authConfig.refreshTokenSecretKey,
  //   { expiresIn: authConfig.refreshTokenExpiresIn }
  // );

  return accessToken;
};
