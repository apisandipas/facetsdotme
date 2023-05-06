import type { Context } from "../../trpc";
import {
  ThemeSettingByProfileIdDto,
  UpdateBgColorDto,
  UpdateBgGradientDirectionDto,
  UpdateBgStyleDto,
} from "./themeSettings.schema";

export const getThemeSettingsByProfileId = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: ThemeSettingByProfileIdDto;
}) => {
  return await ctx.prisma.themeSettings.findFirstOrThrow({
    where: { profileId: input.profileId },
  });
};

export const updateBgStyle = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateBgStyleDto;
}) => {
  return await ctx.prisma.themeSettings.update({
    where: { profileId: input.profileId },
    data: {
      bgStyle: input.bgStyle,
    },
  });
};

export const updateBgColor = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateBgColorDto;
}) => {
  return await ctx.prisma.themeSettings.update({
    where: { profileId: input.profileId },
    data: {
      bgColor: input.bgColor,
    },
  });
};

export const updateBgGradientDirection = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateBgGradientDirectionDto;
}) => {
  return await ctx.prisma.themeSettings.update({
    where: { profileId: input.profileId },
    data: {
      bgGradientDirection: input.bgGradientDirection,
    },
  });
};
