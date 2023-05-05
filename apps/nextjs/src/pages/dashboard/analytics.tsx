import { Head } from "next/document";
import {
  Box,
  Button,
  Container,
  Flex,
  Label,
  RoundedBox,
  styled,
} from "@facets/ui";
import {
  ErrorMessage,
  Field,
  FieldArray,
  Form,
  Formik,
  FormikHelpers,
} from "formik";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { Loading } from "~/components/Loading";

const Error = styled(ErrorMessage, {
  color: "red",
  fontSize: "0.75rem",
  ml: "auto",
});

interface IProfileFields {
  handle: string;
  bio: string;
}

const validate = (values: IProfileFields) => {
  const errors = {} as any;

  if (!values.handle) {
    // TODO create for uniqueness of handle
    errors.handle = "Please enter a unique handle";
  }
  return errors;
};

export default function DashboardProfile() {
  const { data: session, status } = useSession();
  const userId = session?.user.id as string;
  const { data: profileData, isLoading } = api.profile.byUserId.useQuery({
    userId,
  });
  const updateProfile = api.profile.update.useMutation();

  if (isLoading || status === "loading") return <Loading />;
  if (status === "unauthenticated") {
    window.location = "/";
  }

  return (
    <Layout pageTitle="Analytics">
      <Container
        css={{
          maxWidth: "800px",
          px: "4rem",
        }}
      >
        <h2>Analytics</h2>
        <Formik
          validate={validate}
          initialValues={{
            handle: profileData?.handle || "",
            bio: profileData?.bio || "",
          }}
          onSubmit={async (
            values: IProfileFields,
            /* { setSubmitting }: FormikHelpers<IProfileFields>, */
          ) => {
            const res = await updateProfile.mutateAsync({
              userId,
              ...values,
            });
          }}
        >
          {({
            values,
            isSubmitting,
          }: {
            values: IProfileFields;
            isSubmitting: boolean | undefined;
          }) => (
            <Form
              style={{
                maxWidth: "700px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <RoundedBox css={{ mb: "2rem" }}>
                <Flex css={{ flexDirection: "column" }}>
                  <Label htmlFor="handle">Handle</Label>
                  <Field placeholder="Handle" name="handle" />

                  <Label htmlFor="bio">Bio / Blurb</Label>
                  <Field
                    name="bio"
                    as="textarea"
                    placeholder="Bio goes here..."
                  />
                </Flex>
              </RoundedBox>
              <button type="submit" disabled={isSubmitting}>
                Update Profile
              </button>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
}
