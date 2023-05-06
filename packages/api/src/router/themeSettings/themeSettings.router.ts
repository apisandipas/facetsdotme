import { createTRPCRouter, protectedProcedure } from "../../trpc";
import {
  themeSettingsByProfileIdSchema,
  updateBgColorSchema,
  updateBgGradientDirectionSchema,
  updateBgStyleSchema,
} from "./themeSettings.schema";
import {
  getThemeSettingsByProfileId,
  updateBgColor,
  updateBgGradientDirection,
  updateBgStyle,
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
});
