import { Box, Flex, Label, styled } from "@facets/ui";
import * as RadioGroup from "@radix-ui/react-radio-group";

const RadioGroupRoot = styled(RadioGroup.Root, {
  display: "flex",
  flexDirection: "column",
  gap: 10,
});

const RadioGroupItem = styled(RadioGroup.Item, {
  all: "unset",
  backgroundColor: "white",
  width: 25,
  height: 25,
  borderRadius: "100%",
  boxShadow: `0 2px 10px $slate900`,
  mr: "0.5rem",
  /* "&:hover": { backgroundColor: violet.violet3 }, */
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

const RadioGroupIndicator = styled(RadioGroup.Indicator, {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  width: "100%",
  height: "100%",
  position: "relative",
  "&::after": {
    content: '""',
    display: "block",
    width: 11,
    height: 11,
    borderRadius: "50%",
    backgroundColor: "$sky500",
  },
});

export const GradientSelector = ({ handleChange, value }) => {
  return (
    <Box>
      <Box css={{ fontSize: "$lg", mb: "0.5rem" }}>Gradient Direction</Box>
      <RadioGroupRoot
        defaultValue={value}
        aria-label="Gradient Direction"
        onValueChange={(newValue) => handleChange(newValue)}
      >
        <Flex css={{ alignItems: "center" }}>
          <RadioGroupItem value="TO_TOP" id="r1">
            <RadioGroupIndicator />
          </RadioGroupItem>
          <Label htmlFor="r1">Gradient Up</Label>
        </Flex>
        <Flex css={{ alignItems: "center" }}>
          <RadioGroupItem value="TO_BOTTOM" id="r2">
            <RadioGroupIndicator />
          </RadioGroupItem>
          <Label htmlFor="r2">Gradient Down</Label>
        </Flex>
      </RadioGroupRoot>
    </Box>
  );
};
