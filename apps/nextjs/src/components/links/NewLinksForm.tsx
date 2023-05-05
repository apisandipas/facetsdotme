import { useState } from "react";
import {
  Box,
  ErrorMsg,
  Flex,
  Form,
  FormButton,
  Input,
  Label,
  RoundedBox,
} from "@facets/ui";
import { useFormik } from "formik";

import { api } from "~/utils/api";
import { validateLink } from "~/utils/validation";
import { useNotification, useProfilePreview } from "~/contexts";

export function NewLinkForm({
  profileId,
  linkCount,
}: {
  profileId: string;
  linkCount: number;
}) {
  const utils = api.useContext();
  const { refreshPreview } = useProfilePreview();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { showNotification } = useNotification();
  const createLink = api.link.create.useMutation();
  const { values, errors, touched, handleChange, handleSubmit, resetForm } =
    useFormik({
      initialValues: {
        text: "",
        url: "",
      },
      validate: validateLink,
      onSubmit: async (values) => {
        console.log({ values });
        setIsSubmitting(true);
        await createLink.mutateAsync(
          {
            profileId: profileId,
            text: values.text,
            url: values.url,
            sortOrder: linkCount,
          },
          {
            onSuccess: () => {
              setIsSubmitting(false);
              /* setShowNewLinkForm(false); */
              refreshPreview();
              resetForm();
              showNotification({ message: "New Link Created!" });
              utils.link.byProfileId.invalidate();
            },
            onError: (e) => {
              setIsSubmitting(false);
              console.log({ e });
              showNotification({
                message: "Uh-oh. Something went wrong!",
                type: "error",
              });
            },
          },
        );
      },
    });
  return (
    <>
      <RoundedBox css={{ mb: "1rem" }}>
        <Form onSubmit={handleSubmit} css={{ width: "$full" }}>
          <Flex css={{ gap: "1rem" }}>
            <Flex>
              <Box>
                <Label htmlFor="new-link-text-input">Text</Label>
                <Input
                  name="text"
                  id="new-link-text-input"
                  onChange={handleChange}
                  value={values.text}
                />
                {errors.text && touched.text ? (
                  <ErrorMsg>{errors.text}</ErrorMsg>
                ) : null}
              </Box>
            </Flex>
            <Flex css={{ flexGrow: "1" }}>
              <Box css={{ width: "100%" }}>
                <Label htmlFor="new-link-url-input">URL</Label>
                <Input
                  name="url"
                  css={{ width: "100%" }}
                  id="new-link-url-input"
                  onChange={handleChange}
                  value={values.url}
                />

                {errors.url && touched.url ? (
                  <ErrorMsg>{errors.url}</ErrorMsg>
                ) : null}
              </Box>
            </Flex>
          </Flex>
          <Flex>
            <FormButton
              css={{ width: "$full", fontSize: "$xl" }}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Submitting..." : "Add"}
            </FormButton>
          </Flex>
        </Form>
      </RoundedBox>
    </>
  );
}
