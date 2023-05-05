import { useState } from "react";
import {
  Box,
  Button,
  Container,
  ErrorMsg,
  Flex,
  Form,
  FormButton,
  FormField,
  Input,
  Label,
  RoundedBox,
  TextArea,
  styled,
} from "@facets/ui";
import { ErrorMessage, useFormik } from "formik";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { Loading } from "~/components/Loading";
import { AppearanceScreen } from "~/components/appearance/AppearanceScreen";
import { ProfilePreviewProvider } from "~/contexts";

export default function DashboardProfile() {
  return (
    <Layout pageTitle="Appearance">
      <Container>
        <Flex>
          <ProfilePreviewProvider>
            <Container
              css={{
                maxWidth: "800px",
                flexGrow: 1,
                px: "1rem",
              }}
            >
              <AppearanceScreen />
            </Container>
          </ProfilePreviewProvider>
        </Flex>
      </Container>
    </Layout>
  );
}
