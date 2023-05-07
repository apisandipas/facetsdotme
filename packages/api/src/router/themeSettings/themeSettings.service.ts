import type { Context } from "../../trpc";
import {
  ThemeSettingByProfileIdDto,
  UpdateBgColorDto,
  UpdateBgGradientDirectionDto,
  UpdateBgStyleDto,
  UpdateButtonBGColorDto,
  UpdateButtonFGColorDto,
  UpdateButtonShadowColorDto,
  UpdateButtonStyleDto,
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

export const updateButtonStyle = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateButtonStyleDto;
}) => {
  return await ctx.prisma.themeSettings.update({
    where: { profileId: input.profileId },
    data: {
      buttonStyle: input.buttonStyle,
    },
  });
};

export const updateButtonFGColor = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateButtonFGColorDto;
}) => {
  return await ctx.prisma.themeSettings.update({
    where: { profileId: input.profileId },
    data: {
      buttonFGColor: input.buttonFGColor,
    },
  });
};

export const updateButtonBGColor = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateButtonBGColorDto;
}) => {
  return await ctx.prisma.themeSettings.update({
    where: { profileId: input.profileId },
    data: {
      buttonBGColor: input.buttonBGColor,
    },
  });
};

export const updateButtonShadowColor = async ({
  ctx,
  input,
}: {
  ctx: Context;
  input: UpdateButtonShadowColorDto;
}) => {
  return await ctx.prisma.themeSettings.update({
    where: { profileId: input.profileId },
    data: {
      buttonShadowColor: input.buttonShadowColor,
    },
  });
};
