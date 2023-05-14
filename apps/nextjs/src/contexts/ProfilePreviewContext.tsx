import React, { ReactNode, createContext, useContext, useState } from "react";
import { Container, styled } from "@facets/ui";

interface ProfilePreviewContextType {
  refreshPreview: () => void;
}

const PreviewFrameWrapper = styled("div", {
  padding: "1rem",
  background: "#111",
  borderRadius: "45px",
  ml: "1rem",
  transform:
    "scale(0.691782) translateY(-11%) translateX(10%) translate3d(0px, 0px, 0px)",
  position: "sticky",
  top: "90px",
});
const PreviewFrame = styled("iframe", {
  borderRadius: "35px",
  width: "352px",
  height: "724px",
});

const ProfilePreviewContext = createContext<ProfilePreviewContextType | null>(
  null,
);

export function useProfilePreview() {
  const context = useContext(ProfilePreviewContext);
  if (!context) {
    throw new Error(
      "useProfilePreview must be used within a ProfilePreviewProvider",
    );
  }
  return context;
}

interface ProfilePreviewProviderProps {
  children: ReactNode;
}

export function ProfilePreviewProvider({
  children,
}: ProfilePreviewProviderProps) {
  const [iframeKey, setIframeKey] = useState<number>(Date.now());

  const refreshPreview = () => {
    setIframeKey(Date.now());
  };

  const value = { refreshPreview };

  return (
    <ProfilePreviewContext.Provider value={value}>
      {children}
      <Container>
        <PreviewFrameWrapper>
          <PreviewFrame key={iframeKey} src="/@bryanp"></PreviewFrame>
        </PreviewFrameWrapper>
      </Container>
    </ProfilePreviewContext.Provider>
  );
}
