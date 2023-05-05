import { Container, Flex } from "@facets/ui";

import { Layout } from "~/components/Layout";
import { LinkScreen } from "~/components/links/LinkScreen";
import { ProfilePreviewProvider } from "~/contexts/ProfilePreviewContext";

export default function DashboardLink() {
  return (
    <Layout pageTitle="Links">
      <Container>
        <Flex>
          <ProfilePreviewProvider>
            <Container
              css={{
                px: "1rem",
                flexGrow: 1,
                maxWidth: "800px",
              }}
            >
              <LinkScreen />
            </Container>
          </ProfilePreviewProvider>
        </Flex>
      </Container>
    </Layout>
  );
}
