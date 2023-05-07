import { useEffect, useState } from "react";
import { Box, Flex, RoundedBox, styled } from "@facets/ui";

import { api } from "~/utils/api";
import { useThemeSettings } from "~/utils/hooks/useThemeSettings";
import { useThemedComponents } from "~/utils/hooks/useThemedComponents";
import { toTitleCase } from "~/utils/string-fns";
import { useProfilePreview } from "~/contexts";
import { ColorPicker } from "./ColorPicker";

export const ButtonAppearance = () => {
  const utils = api.useContext();
  const { refreshPreview } = useProfilePreview();
  const { themeSettings, profileId } = useThemeSettings();
  const { buttonVariants } = useThemedComponents(themeSettings);

  const [selectedButtonStyle, selectButtonStyle] = useState("SOLID_RECT");
  const updateButtonStyle = api.themeSettings.updateButtonStyles.useMutation();

  const [selectedFGColor, selectFGColor] = useState("#ffffff");
  const updateButtonFGColor =
    api.themeSettings.updateButtonFGColor.useMutation();

  const [selectedBGColor, selectBGColor] = useState("#94a3b8");
  const updateButtonBGColor =
    api.themeSettings.updateButtonBGColor.useMutation();

  const [selectedButtonShadowColor, selectButtonShadowColor] =
    useState("#444444");
  const updateButtonShadowColor =
    api.themeSettings.updateButtonShadowColor.useMutation();

  useEffect(() => {
    themeSettings && selectButtonStyle(themeSettings.buttonStyle);
    themeSettings && selectFGColor(themeSettings.buttonFGColor);
    themeSettings && selectBGColor(themeSettings.buttonBGColor);
    themeSettings && selectButtonShadowColor(themeSettings.buttonShadowColor);
  }, [themeSettings]);

  const handleStyleChange = async (newStyle: string) => {
    console.log(newStyle);
    if (newStyle !== selectedButtonStyle) {
      selectButtonStyle(newStyle);
      await updateButtonStyle.mutateAsync(
        { profileId, buttonStyle: newStyle },
        {
          onSuccess: () => {
            utils.themeSettings.invalidate();
            setTimeout(() => {
              refreshPreview();
            }, 1000);
          },
        },
      );
    }
  };

  const handleFGColorChange = async (newFGColor: string) => {
    if (newFGColor !== selectedFGColor) {
      selectFGColor(newFGColor);
      await updateButtonFGColor.mutateAsync(
        {
          profileId,
          buttonFGColor: newFGColor,
        },
        {
          onSuccess: () => {
            utils.themeSettings.invalidate();
            setTimeout(() => {
              refreshPreview();
            }, 1000);
          },
        },
      );
    }
  };

  const handleBGColorChange = async (newBGColor: string) => {
    if (newBGColor !== selectedBGColor) {
      selectBGColor(newBGColor);
      await updateButtonBGColor.mutateAsync(
        {
          profileId,
          buttonBGColor: newBGColor,
        },
        {
          onSuccess: () => {
            utils.themeSettings.invalidate();
            setTimeout(() => {
              refreshPreview();
            }, 1000);
          },
        },
      );
    }
  };

  const handleButtonShadowColorChange = async (newShadowColor: string) => {
    if (selectedButtonShadowColor !== newShadowColor) {
      selectButtonShadowColor(newShadowColor);
      await updateButtonShadowColor.mutateAsync(
        {
          profileId,
          buttonShadowColor: newShadowColor,
        },
        {
          onSuccess: () => {
            utils.themeSettings.invalidate();
            setTimeout(() => {
              refreshPreview();
            }, 1000);
          },
        },
      );
    }
  };

  const PickAButton = styled("button", {
    p: "1rem",
    color: selectedFGColor,
    cursor: "pointer",
    width: "190px",
    "&:hover": {},
    variants: {
      selected: {
        true: {
          boxShadow: "$outline",
        },
      },
    },
  });
  return (
    <>
      <h3>Buttons</h3>
      <RoundedBox css={{ mb: "2rem" }}>
        <Flex css={{ flexDirection: "column", width: "$full" }}>
          <Flex>
            <Box
              css={{
                display: "grid",
                gridTemplateColumns: "auto auto auto",
                rowGap: "0.5rem",
                columnGap: "0.5rem",
              }}
            >
              {buttonVariants &&
                Object.keys(buttonVariants).map((variantKey) => {
                  return (
                    <PickAButton
                      key={variantKey}
                      onClick={() => handleStyleChange(variantKey)}
                      selected={selectedButtonStyle === variantKey}
                    >
                      <Box
                        css={{
                          width: "100px",
                          padding: "1rem",
                          width: "$full",
                          ...buttonVariants[variantKey],
                          "&:hover": {}, // negate button hover styles
                        }}
                      >
                        &nbsp;
                        {/* {toTitleCase(variantKey)} */}
                      </Box>
                    </PickAButton>
                  );
                })}
            </Box>
          </Flex>
          <Box
            css={{
              display: "grid",
              mt: "1rem",
              gridTemplateColumns: "auto auto ",
              rowGap: "0.5rem",
              columnGap: "0.5rem",
            }}
          >
            <Box
              css={{
                p: "1.5rem",
                width: "$full",
                background: "$slate300",
                borderRadius: "$lg",
              }}
            >
              <ColorPicker
                handleChange={handleFGColorChange}
                value={selectedFGColor}
                label={"Foreground Color"}
                showHex={false}
              />
            </Box>
            <Box
              css={{
                p: "1.5rem",
                width: "$full",
                background: "$slate300",
                borderRadius: "$lg",
              }}
            >
              <ColorPicker
                handleChange={handleBGColorChange}
                value={selectedBGColor}
                label={"Background Color"}
                showHex={false}
              />
            </Box>
            <Box
              css={{
                p: "1.5rem",
                width: "$full",
                background: "$slate300",
                borderRadius: "$lg",
              }}
            >
              <Box css={{ ml: "auto" }}>
                <ColorPicker
                  handleChange={handleButtonShadowColorChange}
                  value={selectedButtonShadowColor}
                  label={"Shadow Color"}
                  showHex={false}
                />
              </Box>
            </Box>
          </Box>
        </Flex>
      </RoundedBox>
    </>
  );
};
function refreshPreview() {
  throw new Error("Function not implemented.");
}
