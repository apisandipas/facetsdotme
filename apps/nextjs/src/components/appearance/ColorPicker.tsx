import { Box, Flex, XIcon, keyframes, styled } from "@facets/ui";
import * as Popover from "@radix-ui/react-popover";
import { HexColorPicker } from "react-colorful";

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
  borderRadius: "8px",
  width: "auto",
  backgroundColor: "white",
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
    /* boxShadow: `hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px, 0 0 0 2px ${violet.violet7}`, */
  },
});

const PopoverArrow = styled(Popover.Arrow, {
  fill: "white",
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
  position: "absolute",
  top: 5,
  right: 5,

  /* "&:hover": { backgroundColor: violet.violet4 }, */
  /* "&:focus": { boxShadow: `0 0 0 2px ${violet.violet7}` }, */
});

export const ColorPicker = ({ handleChange, value, label, showHex = true }) => {
  return (
    <Box>
      <Popover.Root>
        <Popover.Trigger asChild>
          <Flex css={{ alignItems: "center", gap: "1rem" }}>
            <Box css={{ fontSize: "$lg", mr: "auto" }}>{label || "Color"}</Box>
            <Box
              css={{
                width: "50px",
                height: "50px",
                cursor: "pointer",
                backgroundColor: value,
                borderRadius: "$md",
                ml: "auto",
              }}
            />
            {showHex && <Box>{value}</Box>}
          </Flex>
        </Popover.Trigger>
        <Popover.Portal>
          <PopoverContent sideOffset={5}>
            <PopoverClose aria-label="Close">
              <XIcon />
            </PopoverClose>
            <PopoverArrow />
            <HexColorPicker color={value} onChange={handleChange} />
          </PopoverContent>
        </Popover.Portal>
      </Popover.Root>
    </Box>
  );
};
