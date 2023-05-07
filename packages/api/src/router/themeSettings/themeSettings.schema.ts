import { z } from "zod";

export const themeSettingsByProfileIdSchema = z.object({
  profileId: z.string(),
});

export const updateBgStyleSchema = z.object({
  profileId: z.string(),
  bgStyle: z.string(),
});

export const updateBgColorSchema = z.object({
  profileId: z.string(),
  bgColor: z.string(),
});

export const updateBgGradientDirectionSchema = z.object({
  profileId: z.string(),
  bgGradientDirection: z.string(),
});

export const updateButtonStyleSchema = z.object({
  profileId: z.string(),
  buttonStyle: z.string(),
});

export const updateButtonFGColorSchema = z.object({
  profileId: z.string(),
  buttonFGColor: z.string(),
});

export const updateButtonBGColorSchema = z.object({
  profileId: z.string(),
  buttonBGColor: z.string(),
});

export const updateButtonShadowColorSchema = z.object({
  profileId: z.string(),
  buttonShadowColor: z.string(),
});

export const updateFontSchema = z.object({
  profileId: z.string(),
  font: z.string(),
});

export const updateFontColorSchema = z.object({
  profileId: z.string(),
  fontColor: z.string(),
});

export type ThemeSettingByProfileIdDto = z.TypeOf<
  typeof themeSettingsByProfileIdSchema
>;
export type UpdateBgStyleDto = z.TypeOf<typeof updateBgStyleSchema>;
export type UpdateBgColorDto = z.TypeOf<typeof updateBgColorSchema>;
export type UpdateBgGradientDirectionDto = z.TypeOf<
  typeof updateBgGradientDirectionSchema
>;
export type UpdateButtonStyleDto = z.TypeOf<typeof updateButtonStyleSchema>;
export type UpdateButtonFGColorDto = z.TypeOf<typeof updateButtonFGColorSchema>;
export type UpdateButtonBGColorDto = z.TypeOf<typeof updateButtonBGColorSchema>;
export type UpdateButtonShadowColorDto = z.TypeOf<
  typeof updateButtonShadowColorSchema
>;
export type UpdateFontDto = z.TypeOf<typeof updateFontSchema>;
export type UpdateFontColorDto = z.TypeOf<typeof updateFontColorSchema>;
