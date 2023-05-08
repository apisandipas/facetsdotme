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
  overflow: "hidden",
  variants: {
    size: {
      large: {
        width: "120px",
        height: "120px",
      },
      small: {
        width: "40px",
        height: "40px",
        fontSize: "$lg",
      },
    },
  },
});

const AvatarImage = styled("img", {
  variants: {
    size: {
      large: {
        width: "120px",
        height: "120px",
      },
      small: {
        width: "40px",
        height: "40px",
        fontSize: "$lg",
      },
    },
  },
  defaultVariants: {
    size: "large",
  },
});

export const AvatarPlaceholder = ({
  handle,
  image,
  ...rest
}: {
  handle: string;
}) => {
  if (image) {
    return (
      <AvatarPlaceholderInner {...rest}>
        <AvatarImage
          src={`https://facetsdotme.s3.us-east-2.amazonaws.com/${image}`}
          size={rest.size}
        />
      </AvatarPlaceholderInner>
    );
  }
  const avatarPlaceholder = handle ? handle[1]?.toUpperCase() : "@";
  return (
    <AvatarPlaceholderInner {...rest}>
      {avatarPlaceholder}
    </AvatarPlaceholderInner>
  );
};
