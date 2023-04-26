import type * as Stitches from "@stitches/react";

import { styled } from "./theme.config";

export const Button = styled("button", {
  cursor: "pointer",
  backgroundColor: "$slate900",
  color: "$slate200",
  padding: "$2",
  border: 0,
  borderRadius: "25px",
});

export type ButtonVariants = Stitches.VariantProps<typeof Button>;
