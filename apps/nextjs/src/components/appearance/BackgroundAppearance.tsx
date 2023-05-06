import { useEffect, useState } from "react";
import { Box, Flex, RoundedBox, styled } from "@facets/ui";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useNotification, useProfilePreview } from "~/contexts";
import { ColorPicker } from "./ColorPicker";
import { GradientSelector } from "./GradientSelector";

const backgroundVariants = {
  SOLID: "Flat Color",
  GRADIENT: "Gradient",
  /* IMAGE: "Image", */
};

const BackgroundDemoBox = styled(Box, {
  width: "100px",
  height: "100px",
  mb: "0.5rem",
  variants: {
    variant: {
      SOLID: {
        background: "$slate600",
      },
      GRADIENT: {
        linearGradient: "$slate200, $slate600",
      },
    },
  },
});

const ColorBox = styled("button", {
  border: 0,
  padding: "1.25rem",
  cursor: "pointer",
  background: "$slate100",
  variants: {
    selected: {
      true: {
        boxShadow: "$outline",
      },
    },
  },
});

export const BackgroundAppearance = () => {
  const utils = api.useContext();
  const { refreshPreview } = useProfilePreview();
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const profileId = session?.user?.profile.id as string;
  const updateBgStyle = api.themeSettings.updateBgStyle.useMutation();
  const updateBgColor = api.themeSettings.updateBgColor.useMutation();
  const updateBgGradientDirection =
    api.themeSettings.updateBgGradientDirection.useMutation();

  const { data: themeSettings, isLoading } =
    api.themeSettings.byProfileId.useQuery({
      profileId,
    });

  // possible refactor to formik state
  const [selectedBgStyle, selectBgStyle] = useState("SOLID");
  const [selectedBgColor, selectBgColor] = useState("#34d399");
  const [selectedGradientDirection, selectGradientDirection] =
    useState("TO_TOP");

  useEffect(() => {
    themeSettings?.bgStyle && selectBgStyle(themeSettings.bgStyle);
    themeSettings?.bgColor && selectBgColor(themeSettings.bgColor);
    themeSettings?.bgGradientDirection &&
      selectGradientDirection(themeSettings.bgGradientDirection);
  }, [themeSettings]);

  const handleStyleChange = async (newBgStyle: string) => {
    console.log({ newBgStyle });
    if (newBgStyle !== selectedBgStyle) {
      selectBgStyle(newBgStyle);
      await updateBgStyle.mutateAsync(
        {
          profileId,
          bgStyle: newBgStyle,
        },
        {
          onSuccess: () => {
            setTimeout(() => {
              refreshPreview();
            }, 1000);
          },
        },
      );
    }
  };

  const handleColorChange = async (newColorValue: string) => {
    if (newColorValue !== selectedBgColor) {
      selectBgColor(newColorValue);
      await updateBgColor.mutateAsync(
        {
          profileId,
          bgColor: newColorValue,
        },
        {
          onSuccess: () => {
            /* showNotification({ message: "Background color updated!" }); */
            setTimeout(() => {
              refreshPreview();
            }, 1000);
          },
        },
      );
    }
  };

  const handleGradientDirectionChange = async (
    newGradientDirection: string,
  ) => {
    if (newGradientDirection !== selectedGradientDirection) {
      selectGradientDirection(newGradientDirection);
      await updateBgGradientDirection.mutateAsync(
        {
          profileId,
          bgGradientDirection: newGradientDirection,
        },
        {
          onSuccess: () => {
            console.log("success");
            setTimeout(() => {
              refreshPreview();
            }, 1000);
          },
        },
      );
    }
  };

  return (
    <>
      <h3>Background</h3>
      <RoundedBox css={{ mb: "2rem" }}>
        <Flex css={{ flexDirection: "column" }}>
          <Flex css={{ gap: "1rem", mb: "1rem" }}>
            {Object.keys(backgroundVariants).map((variantKey, key) => {
              return (
                <ColorBox
                  selected={variantKey === selectedBgStyle}
                  onClick={() => handleStyleChange(variantKey)}
                >
                  <BackgroundDemoBox variant={variantKey} />
                  {backgroundVariants[variantKey]}
                </ColorBox>
              );
            })}
          </Flex>
          <Flex
            css={{
              p: "1.5rem",
              background: "$slate300",
              borderRadius: "$lg",
            }}
          >
            <ColorPicker
              value={selectedBgColor}
              handleChange={handleColorChange}
            />
          </Flex>

          {selectedBgStyle === "GRADIENT" && (
            <Flex
              css={{
                p: "1.5rem",
                mt: "1rem",
                background: "$slate300",
                borderRadius: "$lg",
              }}
            >
              <GradientSelector
                value={selectedGradientDirection}
                handleChange={handleGradientDirectionChange}
              />
            </Flex>
          )}
        </Flex>
      </RoundedBox>
    </>
  );
};
