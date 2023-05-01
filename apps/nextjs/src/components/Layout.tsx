import Head from "next/head";
import { XIcon, styled } from "@facets/ui";

import { NavBar } from "./NavBar";

const Page = styled("main", {
  marginTop: "$6",
  "@md": {
    marginTop: "$16",
  },
});

const LayoutInner = styled("div", {});

export const Layout = ({
  children,
  pageTitle = "",
}: {
  children: React.ReactNode;
  pageTitle: string;
}) => {
  return (
    <LayoutInner>
      <Head>
        <title>
          Facets.me - promote each facets of your online presence{" "}
          {pageTitle && `- ${pageTitle}`}
        </title>
      </Head>
      <NavBar />
      <Page>{children}</Page>
    </LayoutInner>
  );
};
