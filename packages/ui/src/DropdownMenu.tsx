import React from "react";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from "@radix-ui/react-icons";
import * as Select from "@radix-ui/react-select";

import { styled } from "./theme.config";

export const DropdownMenu = ({
  ariaLabel,
  placeholder,
  value,
  defaultValue = value,
  handleChange,
  options,
}) => (
  <Select.Root
    value={value}
    defaultValue={defaultValue}
    onValueChange={handleChange}
  >
    <SelectTrigger aria-label={ariaLabel}>
      <Select.Value placeholder={placeholder} />
      <SelectIcon>
        <ChevronDownIcon />
      </SelectIcon>
    </SelectTrigger>
    <Select.Portal>
      <SelectContent>
        <SelectScrollUpButton>
          <ChevronUpIcon />
        </SelectScrollUpButton>
        <SelectViewport>
          {options &&
            Object.keys(options).map((optionsGroup, index) => {
              if (options[optionsGroup] === "sep") {
                return <SelectSeparator />;
              }
              return (
                <Select.Group key={`option-group-${index}`}>
                  <SelectLabel>{optionsGroup}</SelectLabel>
                  {options[optionsGroup].map((option, i) => {
                    return (
                      <SelectItem key={`option-${i}`} value={option}>
                        {option}
                      </SelectItem>
                    );
                  })}
                </Select.Group>
              );
            })}
        </SelectViewport>
        <SelectScrollDownButton>
          <ChevronDownIcon />
        </SelectScrollDownButton>
      </SelectContent>
    </Select.Portal>
  </Select.Root>
);

const SelectTrigger = styled(Select.SelectTrigger, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: "$md",
  padding: "0 15px",
  fontSize: 18,
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: "white",
  color: "$slate800",
  boxShadow: "$sm",
  width: "$2of6",
  "&:hover": { backgroundColor: "$slate300" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  "&[data-placeholder]": { color: "$slate800" },
});

const SelectIcon = styled(Select.SelectIcon, {
  color: "$slate950",
});

const SelectContent = styled(Select.Content, {
  overflow: "hidden",
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const SelectViewport = styled(Select.Viewport, {
  padding: 5,
});

const SelectItem = React.forwardRef(({ children, ...props }, forwardedRef) => {
  return (
    <StyledItem {...props} ref={forwardedRef}>
      <Select.ItemText>{children}</Select.ItemText>
      <StyledItemIndicator>
        <CheckIcon />
      </StyledItemIndicator>
    </StyledItem>
  );
});

const StyledItem = styled(Select.Item, {
  fontSize: 13,
  lineHeight: 1,
  color: "$slate800",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: "$slate200",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    outline: "none",
    backgroundColor: "$sky500",
    color: "$slate100",
  },
});

const SelectLabel = styled(Select.Label, {
  padding: "0 25px",
  fontSize: 12,
  lineHeight: "25px",
  color: "$slate500",
});

const SelectSeparator = styled(Select.Separator, {
  height: 1,
  backgroundColor: "$slate300",
  margin: 5,
});

const StyledItemIndicator = styled(Select.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  backgroundColor: "white",
  color: "$slate700",
  cursor: "default",
};

const SelectScrollUpButton = styled(Select.ScrollUpButton, scrollButtonStyles);

const SelectScrollDownButton = styled(
  Select.ScrollDownButton,
  scrollButtonStyles,
);
