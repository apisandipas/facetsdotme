import { useEffect, useState } from "react";
import Link from "next/link";
import { styled } from "@facets/ui";

import { getContrastRatio, lightenColor } from "../color-fns";

const rectRadius = 0;
const roundishRadius = "8px";
const roundRadious = "24px";
const hardShadow = "8px 8px 0px 0px";
const hardShadowHovered = "4px 4px 0px 0px";
const softShadow = "0px 2px 8px 0px ";

interface ThemeSettings {
  bgStyle: string;
  bgImage: string;
  bgGradientDirection: string;
  buttonStyle: string;
  buttonBGColor: string;
  buttonFGColor: string;
  bgColor: string;
  buttonShadowColor: string;
}

export const useThemedComponents = ({
  bgColor,
  bgStyle,
  // bgImage,
  bgGradientDirection,
  buttonStyle,
  buttonBGColor,
  buttonFGColor,
  buttonShadowColor,
}: ThemeSettings) => {
  const [background] = useState(bgColor); // initial background color
  const [foreground, setForeground] = useState("#fff"); // initial foreground color

  useEffect(() => {
    const contrast = getContrastRatio(background); // calculate the contrast ratio
    if (contrast < 4.5) {
      setForeground("#fff"); // if contrast is too low, set foreground to light color
    } else {
      setForeground("#000"); // otherwise, set foreground to dark color
    }
  }, [background]);

  let backgroundStyles = { background: bgColor } as any;
  if (bgStyle === "GRADIENT") {
    if (bgGradientDirection === "TO_TOP") {
      backgroundStyles = {
        backgroundImage: `linear-gradient(${bgColor}, ${lightenColor(
          bgColor,
          0.75,
        )})`,
      };
    } else {
      backgroundStyles = {
        backgroundImage: `linear-gradient(${lightenColor(
          bgColor,
          0.75,
        )}, ${bgColor})`,
      };
    }
  }

  const ProfilePage = styled("div", {
    width: "100vw",
    height: "100vh",
    color: foreground,
    pt: "1.5rem",
    ...backgroundStyles,
  });

  const ProfileLinkButton = styled(Link, {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: buttonFGColor,
    width: "$full",
    p: "1rem",
    mb: "1rem",
    "&:hover": {
      color: buttonFGColor,
      textDecoration: "none",
    },
    variants: {
      buttonStyle: {
        SOLID_RECT: {
          borderRadius: rectRadius,
          backgroundColor: buttonBGColor,
        },
        SOLID_ROUNDISH: {
          borderRadius: roundishRadius,
          backgroundColor: buttonBGColor,
        },
        SOLID_ROUND: {
          borderRadius: roundRadious,
          backgroundColor: buttonBGColor,
        },
        OUTLINE_RECT: {
          borderRadius: rectRadius,
          border: `1px solid ${buttonBGColor}`,
          backgroundColor: 0,
        },
        OUTLINE_ROUNDISH: {
          borderRadius: roundishRadius,
          border: `1px solid ${buttonBGColor}`,
          backgroundColor: 0,
        },
        OUTLINE_ROUND: {
          borderRadius: roundRadious,
          border: `1px solid ${buttonBGColor}`,
          backgroundColor: "none",
        },
        SOFT_SHADOW_RECT: {
          borderRadius: rectRadius,
          border: `none`,
          backgroundColor: 0,
          boxShadow: `${softShadow} ${buttonShadowColor}`,
          "&:hover": {
            transform: "scale(1.01)",
            transition:
              "transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s",
          },
        },
        SOFT_SHADOW_ROUNDISH: {
          borderRadius: roundishRadius,
          border: `none`,
          backgroundColor: 0,
          boxShadow: `{softShadow} ${buttonShadowColor}`,
          "&:hover": {
            transform: "scale(1.01)",
            transition:
              "transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s",
          },
        },
        SOFT_SHADOW_ROUND: {
          borderRadius: roundRadious,
          border: `none`,
          backgroundColor: "none",
          boxShadow: `${softShadow} ${buttonShadowColor}`,
          "&:hover": {
            transform: "scale(1.01)",
            transition:
              "transform 0.25s cubic-bezier(0.08, 0.59, 0.29, 0.99) 0s",
          },
        },
        HARD_SHADOW_RECT: {
          borderRadius: rectRadius,
          border: `1px solid ${buttonShadowColor}`,
          backgroundColor: 0,
          boxShadow: `${hardShadow} ${buttonShadowColor}`,
          "&:hover": {
            transform: "translate(4px, 4px)",
            boxShadow: `${hardShadowHovered} ${buttonShadowColor}`,
          },
        },
        HARD_SHADOW_ROUNDISH: {
          borderRadius: roundRadious,
          border: `1px solid ${buttonShadowColor}`,
          backgroundColor: 0,
          boxShadow: `${hardShadow} ${buttonShadowColor}`,
          "&:hover": {
            transform: "translate(4px, 4px)",
            boxShadow: `${hardShadowHovered} ${buttonShadowColor}`,
          },
        },
        HARD_SHADOW_ROUND: {
          borderRadius: roundRadious,
          border: `1px solid ${buttonShadowColor}`,
          backgroundColor: "none",
          boxShadow: `${hardShadow} ${buttonShadowColor}`,
          "&:hover": {
            transform: "translate(4px, 4px)",
            boxShadow: `${hardShadowHovered} ${buttonShadowColor}`,
          },
        },
      },
    },
  });

  const components = {
    ProfilePage,
    ProfileLinkButton,
  };

  return {
    components,
    buttonStyle,
    safeForegroundColor: foreground,
  };
};
