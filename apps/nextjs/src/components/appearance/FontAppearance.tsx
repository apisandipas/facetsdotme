import { useEffect, useState } from "react";
import { Box, ColorPicker, DropdownMenu, Flex, RoundedBox } from "@facets/ui";

import { api } from "~/utils/api";
import { useGoogleFonts } from "~/utils/hooks/useGoogleFonts";
import { useThemeSettings } from "~/utils/hooks/useThemeSettings";
import { useProfilePreview } from "~/contexts";

export const FontAppearance = () => {
  const utils = api.useContext();
  const { refreshPreview } = useProfilePreview();
  const { themeSettings, profileId } = useThemeSettings();

  const [selectedFontValue, selectFontValue] = useState("Roboto Sans");
  const updateFont = api.themeSettings.updateFont.useMutation();
  const [selectedFontColor, selectFontColor] = useState("#000000");
  const updateFontColor = api.themeSettings.updateFontColor.useMutation();

  useEffect(() => {
    themeSettings && selectFontValue(themeSettings.font);
    themeSettings && selectFontColor(themeSettings.fontColor);
  }, [themeSettings]);

  const handleFontChange = async (newFontValue: string) => {
    if (newFontValue !== selectedFontValue) {
      selectFontValue(newFontValue);
      await updateFont.mutateAsync(
        {
          profileId,
          font: newFontValue,
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

  const handleFontColorChange = async (newFontColor: string) => {
    if (newFontColor !== selectedFontColor) {
      selectFontColor(newFontColor);
      await updateFontColor.mutateAsync(
        {
          profileId,
          fontColor: newFontColor,
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
  const { fontsAvailable, getFontClassName } = useGoogleFonts();

  return (
    <>
      <h3>Fonts</h3>
      <RoundedBox css={{ mb: "2rem" }}>
        <Flex css={{ flexDirection: "column", width: "$full" }}>
          <Flex>
            <Flex
              css={{
                borderRadius: "$lg",
                background: "$slate300",
                padding: "1.5rem",
                width: "$full",
                alignItems: "center",
                gap: "2rem",
                mb: "1rem",
              }}
            >
              <DropdownMenu
                ariaLabel={"Fonts"}
                placeholder={"Select a font..."}
                value={selectedFontValue}
                handleChange={handleFontChange}
                options={fontsAvailable}
              />
              <Box
                className={getFontClassName(selectedFontValue)}
                css={{ fontSize: "$lg" }}
              >
                Text will look like this...
              </Box>
            </Flex>
          </Flex>

          <Flex
            css={{
              borderRadius: "$lg",
              background: "$slate300",
              padding: "1.5rem",
              width: "$full",
              alignItems: "center",
              gap: "2rem",
              mb: "1rem",
            }}
          >
            <ColorPicker
              handleChange={handleFontColorChange}
              value={selectedFontColor}
              label={"Font Color"}
            />
          </Flex>
        </Flex>
      </RoundedBox>
    </>
  );
};
function refreshPreview() {
  throw new Error("Function not implemented.");
}
