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

export type ThemeSettingByProfileIdDto = z.TypeOf<
  typeof themeSettingsByProfileIdSchema
>;
export type UpdateBgStyleDto = z.TypeOf<typeof updateBgStyleSchema>;
export type UpdateBgColorDto = z.TypeOf<typeof updateBgColorSchema>;
export type UpdateBgGradientDirectionDto = z.TypeOf<
  typeof updateBgGradientDirectionSchema
>;
