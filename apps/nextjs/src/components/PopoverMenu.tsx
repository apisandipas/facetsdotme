import React from "react";
import { XIcon, keyframes, styled } from "@facets/ui";
import * as Popover from "@radix-ui/react-popover";

export const UIPopover = ({ trigger, content }) => (
  <Popover.Root>
    <Popover.Trigger asChild>{trigger}</Popover.Trigger>
    <Popover.Portal>
      <PopoverContent sideOffset={5}>
        {content}
        <PopoverArrow />
      </PopoverContent>
    </Popover.Portal>
  </Popover.Root>
);

const slideUpAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideRightAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(-2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const slideDownAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateY(-2px)" },
  "100%": { opacity: 1, transform: "translateY(0)" },
});

const slideLeftAndFade = keyframes({
  "0%": { opacity: 0, transform: "translateX(2px)" },
  "100%": { opacity: 1, transform: "translateX(0)" },
});

const PopoverContent = styled(Popover.Content, {
  borderRadius: 25,
  padding: 20,
  width: 260,
  backgroundColor: "$slate700",
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  animationDuration: "400ms",
  animationTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
  willChange: "transform, opacity",
  '&[data-state="open"]': {
    '&[data-side="top"]': { animationName: slideDownAndFade },
    '&[data-side="right"]': { animationName: slideLeftAndFade },
    '&[data-side="bottom"]': { animationName: slideUpAndFade },
    '&[data-side="left"]': { animationName: slideRightAndFade },
  },
  "&:focus": {
    boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px $violet700`,
  },
});

const PopoverArrow = styled(Popover.Arrow, {
  fill: "$slate700",
});

const PopoverClose = styled(Popover.Close, {
  all: "unset",
  fontFamily: "inherit",
  borderRadius: "100%",
  height: 25,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  color: "$slate300",
  cursor: "pointer",
  position: "absolute",
  top: 5,
  right: 5,

  "&:hover": { backgroundColor: "$voilet400" },
  "&:focus": { boxShadow: `0 0 0 2px $voilet700` },
});
