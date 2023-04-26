import Head from "next/head";
import {
  Box,
  Button,
  Container,
  ErrorMsg,
  Flex,
  FormButton,
  FormField,
  Input,
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

interface ILinkFields {
  id?: number;
  text: string;
  url: string;
}

interface IProfileFields {
  handle: string;
  bio: string;
  links: ILinkFields[];
}

const validate = (values: IProfileFields) => {
  const errors = {} as any;

  if (!values.handle) {
    errors.handle = "Please enter a unique handle";
    // TODO create for uniqueness of handle
  }

  return errors;
};

export default function DashboardProfile() {
  const { data: session } = useSession();
  const userId = session?.user.id as string;
  const { data: profileData, isLoading } = api.profile.byUserId.useQuery({
    userId,
  });
  const updateProfile = api.profile.update.useMutation();

  if (isLoading) return <Loading />;

  return (
    <Layout pageTitle="Profile Settings">
      <Head>
        <Title pageName="Profile" />
      </Head>

      <Container
        css={{
          maxWidth: "800px",
          px: "4rem",
        }}
      >
        <h2>Profile</h2>
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
            isSubmitting: boolean;
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

                  <FormField name="handle" />
                  <Label htmlFor="bio">Bio / Blurb</Label>
                  <FormField
                    name="bio"
                    as="textarea"
                    placeholder="Bio goes here..."
                  />
                </Flex>
              </RoundedBox>
              <FormButton type="submit" disabled={isSubmitting}>
                Update Profile
              </FormButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
}
