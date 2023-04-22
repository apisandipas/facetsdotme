import { styled } from "./theme.config";

export const CenteredContainer = styled("div", {
  minHeight: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  gap: "1.5rem",
  margin: "0 auto",
  padding: "0 1rem",
  textAlign: "center",
  maxWidth: "100%",
});

export const Box = styled("div", {});

export const Flex = styled("div", {
  display: "flex",
});
