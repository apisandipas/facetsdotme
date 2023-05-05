import type * as Stitches from "@stitches/react";

import { styled } from "./theme.config";

export const Button = styled("button", {
  cursor: "pointer",
  backgroundColor: "$slate900",
  fontFamily: "$body",
  color: "$slate200",
  padding: "$2",
  border: 0,
  borderRadius: "25px",
  variants: {
    variant: {
      secondary: {
        background: "$slate400",
        color: "$slate900",
        border: "1px solid $slate500",
      },
    },
  },
});

export type ButtonVariants = Stitches.VariantProps<typeof Button>;
