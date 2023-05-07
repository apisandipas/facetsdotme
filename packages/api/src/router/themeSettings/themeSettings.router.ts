import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  themeSettingsByProfileIdSchema,
  updateBgColorSchema,
  updateBgGradientDirectionSchema,
  updateBgStyleSchema,
  updateButtonBGColorSchema,
  updateButtonFGColorSchema,
  updateButtonShadowColorSchema,
  updateButtonStyleSchema,
  updateButtonStylesSchema,
  updateFontColorSchema,
  updateFontSchema,
} from "./themeSettings.schema";
import {
  getThemeSettingsByProfileId,
  updateBgColor,
  updateBgGradientDirection,
  updateBgStyle,
  updateButtonBGColor,
  updateButtonFGColor,
  updateButtonShadowColor,
  updateButtonStyle,
  updateFont,
  updateFontColor,
} from "./themeSettings.service";

export const themeSettingsRouter = createTRPCRouter({
  byProfileId: protectedProcedure
    .input(themeSettingsByProfileIdSchema)
    .query(async ({ ctx, input }) =>
      getThemeSettingsByProfileId({ ctx, input }),
    ),

  updateBgStyle: protectedProcedure
    .input(updateBgStyleSchema)
    .mutation(async ({ ctx, input }) => updateBgStyle({ ctx, input })),

  updateBgColor: protectedProcedure
    .input(updateBgColorSchema)
    .mutation(async ({ ctx, input }) => updateBgColor({ ctx, input })),

  updateBgGradientDirection: protectedProcedure
    .input(updateBgGradientDirectionSchema)
    .mutation(async ({ ctx, input }) =>
      updateBgGradientDirection({ ctx, input }),
    ),

  updateButtonStyles: protectedProcedure
    .input(updateButtonStyleSchema)
    .mutation(async ({ ctx, input }) => updateButtonStyle({ ctx, input })),

  updateButtonFGColor: protectedProcedure
    .input(updateButtonFGColorSchema)
    .mutation(async ({ ctx, input }) => updateButtonFGColor({ ctx, input })),

  updateButtonBGColor: protectedProcedure
    .input(updateButtonBGColorSchema)
    .mutation(async ({ ctx, input }) => updateButtonBGColor({ ctx, input })),

  updateButtonShadowColor: protectedProcedure
    .input(updateButtonShadowColorSchema)
    .mutation(async ({ ctx, input }) =>
      updateButtonShadowColor({ ctx, input }),
    ),

  updateFont: protectedProcedure
    .input(updateFontSchema)
    .mutation(async ({ ctx, input }) => updateFont({ ctx, input })),

  updateFontColor: protectedProcedure
    .input(updateFontColorSchema)
    .mutation(async ({ ctx, input }) => updateFontColor({ ctx, input })),
});
