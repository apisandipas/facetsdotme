import { notificationSlideIn, styled } from "./theme.config";

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

export const Container = styled("div", {
  display: "flex",
  flexDirection: "column",
  margin: "0 auto",
  maxWidth: "1040px",
  // width: "100%",
});

export const RoundedBox = styled("div", {
  display: "flex",
  flexDirection: "row",
  backgroundColor: "$slate400",
  boxShadow: "$md",
  borderRadius: "25px",
  padding: "2rem",
});

export const NotificationBanner = styled("div", {
  width: "100vw",
  zIndex: "9999",
  position: "absolute",
  left: 0,
  bottom: "-58px",
  pr: "1rem",
  color: "$slate200",
  display: "flex",
  alignItems: "center",
  animationDelay: `2s`,
  animation: `${notificationSlideIn} 1s reverse`,
  "& > div ": {
    py: "1rem",
    maxWidth: "1040px",
    margin: "0 auto",
  },
  variants: {
    show: {
      true: {
        animation: `${notificationSlideIn} 0.5s forwards`,
      },
      false: {
        animation: `${notificationSlideIn} 0.5s reverse`,
      },
    },
    type: {
      notification: {
        background: "$emerald500",
      },
      warning: {
        backgroundColor: "$amber500",
      },
      error: {
        backgroundColor: "$rose500",
      },
    },
  },
});
