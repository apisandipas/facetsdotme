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
  styled,
} from "@facets/ui";
import { ErrorMessage, useFormik } from "formik";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { Loading } from "~/components/Loading";
import { useNotification } from "~/contexts/NotificationsContext";

interface IProfileFields {
  handle: string;
  bio: string;
}

const validate = async (values: IProfileFields, checkHandleAvailability) => {
  const errors = {} as any;

  if (!values.handle) {
    errors.handle = "Please enter a unique handle";
  }

  if (values.handle) {
    const handleAvailable = await checkHandleAvailability.mutateAsync({
      handle: values.handle,
    });

    if (!handleAvailable) {
      errors.handle = "Handle not available";
    }
    if (values.handle.length > 24) {
      errors.handle = "Handle must be 24 characters or fewer.";
    }
  }

  if (values.bio && values.bio.length > 200) {
    errors.bio = "Bio must be 200 characters or fewer.";
  }

  return errors;
};

export default function DashboardProfile() {
  const utils = api.useContext();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const { data: session } = useSession();
  const { showNotification } = useNotification();
  const userId = session?.user.id as string;
  const { data: profileData, isLoading } = api.profile.byUserId.useQuery(
    {
      userId,
    },
    {
      onSuccess: (values) => {
        setFieldValue("handle", values?.handle);
        setFieldValue("bio", values?.bio);
      },
    },
  );
  const checkHandleAvailability =
    api.user.checkHandleAvailability.useMutation();
  const updateProfile = api.profile.update.useMutation();
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        handle: profileData?.handle || "",
        bio: profileData?.bio || "",
      },
      validate: (values) => validate(values, checkHandleAvailability),
      onSubmit: async (values: IProfileFields) => {
        setIsSubmitting(true);
        const res = await updateProfile.mutateAsync(
          {
            userId,
            ...values,
          },
          {
            onSuccess: () => {
              setIsSubmitting(false);
              showNotification({ message: "Profile updated!" });
              utils.profile.byUserId.invalidate();
            },
            onError: (e) => {
              console.log({ e });
              setIsSubmitting(false);
              showNotification({
                message: "Something went wrong!",
                type: "error",
              });
            },
          },
        );
      },
    });

  if (isLoading) return <Loading />;

  return (
    <Layout pageTitle="Profile Settings">
      <Container
        css={{
          maxWidth: "800px",
          px: "4rem",
        }}
      >
        <h2>Profile</h2>
        <Form
          onSubmit={handleSubmit}
          style={{
            maxWidth: "700px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <RoundedBox css={{ mb: "2rem" }}>
            <Flex css={{ flexDirection: "column" }}>
              <Label htmlFor="handle-input">Handle</Label>
              <Input
                name="handle"
                id="handle-input"
                onChange={handleChange}
                value={values.handle}
              />
              {errors.handle && touched.handle ? (
                <ErrorMsg>{errors.handle}</ErrorMsg>
              ) : null}

              <Label htmlFor="bio-input">Bio</Label>
              <textarea
                name="bio"
                id="bio-input"
                onChange={handleChange}
                value={values.bio}
                placeholder="Bio goes here..."
              ></textarea>
              {errors.bio && touched.bio ? (
                <ErrorMsg>{errors.bio}</ErrorMsg>
              ) : null}
            </Flex>
          </RoundedBox>
          <FormButton type="submit" disabled={isSubmitting}>
            Update Profile
          </FormButton>
        </Form>
      </Container>
    </Layout>
  );
}
