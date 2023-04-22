import { styled } from "./theme.config";
import type * as Stitches from "@stitches/react";

export const Button = styled("button", {
  color: "red",
  variants: {
    size: {
      base: {
        fontSize: "$base",
      },
      lg: {
        fontSize: "$lg",
      },
      xl: {
        fontSize: "$3xl",
        padding: "$8",
      },
    },
  },
});

export type ButtonVariants = Stitches.VariantProps<typeof Button>;
