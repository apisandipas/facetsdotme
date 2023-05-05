import { styled } from "@facets/ui";

const AvatarPlaceholderInner = styled("div", {
  width: "96px",
  height: "96px",
  borderRadius: "100%",
  background: "$slate900",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$2xl",
  color: "$white",
  variants: {
    size: {
      large: {
        width: "120px",
        height: "120px",
      },
    },
  },
});

export const AvatarPlaceholder = ({ handle, ...rest }: { handle: string }) => {
  const avatarPlaceholder = handle ? handle[1]?.toUpperCase() : "@";
  return (
    <AvatarPlaceholderInner {...rest}>
      {avatarPlaceholder}
    </AvatarPlaceholderInner>
  );
};
