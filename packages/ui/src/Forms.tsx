import { Field } from "formik";

import { Button } from "./Button";
import { Box } from "./Utils";
import { styled } from "./theme.config";

export const Form = styled("form", {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  textAlign: "left",
});

export const ErrorMsg = styled("div", {
  color: "$rose600",
  fontSize: "0.75rem",
  ml: "auto",
});

export const Input = styled("input", {
  display: "block",
  width: "$full",
  borderRadius: "$md",
  border: "0",
  padding: "$1p5",
  color: "$slate900",
  fontSize: "$sm",
  boxShadow: "$inner",
  variants: {
    invalid: {
      true: {
        border: "1px solid $rose700",
      },
    },
  },
});

export const TextArea = styled("textarea", {
  display: "block",
  width: "$full",
  borderRadius: "$md",
  border: "0",
  padding: "$1p5",
  color: "$slate900",
  fontSize: "$sm",
  boxShadow: "$sm",
  variants: {
    invalid: {
      true: {
        border: "1px solid $rose700",
      },
    },
  },
});

export const Label = styled("label", {
  display: "block",
  fontSize: "$base",
  width: "$full",
});

export const FormButton = styled(Button, {
  backgroundColor: "$slate700",
  borderRadius: "25px",
  border: "none",
  color: "$slate100",
  mt: "$6",
  px: "$3",
  py: "$1p5",
  cursor: "pointer",
});

export const FormField = ({
  name,
  type = "text",
  placeholder = "",
  ...rest
}: {
  name: string;
  type?: string;
  placeholder?: string;
}) => {
  return (
    <Field name={name}>
      {({ field, meta }) => {
        if (rest.as === "textarea") {
          return (
            <Box css={{ mb: "$2" }}>
              <TextArea {...field} />
              {meta.error && meta.touched && <ErrorMsg>{meta.error}</ErrorMsg>}
            </Box>
          );
        } else {
          return (
            <Box css={{ mb: "$2", position: "relative" }}>
              <Input type={type} placeholder={placeholder} {...field} />
              {meta.error && meta.touched && (
                <ErrorMsg css={{ position: "absolute" }}>{meta.error}</ErrorMsg>
              )}
            </Box>
          );
        }
      }}
    </Field>
  );
};
