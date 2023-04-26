import { Head } from "next/document";
import {
  Box,
  Button,
  Container,
  Flex,
  FormButton,
  FormField,
  Label,
  RoundedBox,
  XIcon as XIconBase,
  styled,
} from "@facets/ui";
import { ErrorMessage, Field, FieldArray, Form, Formik } from "formik";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { Layout } from "~/components/Layout";
import { Loading } from "~/components/Loading";
import { Title } from "~/components/Title";
import { useNotification } from "~/contexts/NotificationsContext";

const Error = styled(ErrorMessage, {
  color: "red",
  fontSize: "0.75rem",
  ml: "auto",
});

const XIcon = styled(XIconBase, {});

interface ILinkFields {
  id?: number;
  text: string;
  url: string;
}

interface ILinksFields {
  userId: string;
  links: ILinkFields[];
}

const validate = (values: ILinksFields) => {
  const errors = {} as any;
  if (values.links) {
    values.links.forEach((link: ILinkFields, index: number) => {
      let e = {} as ILinkFields;
      if (!link.text) {
        e.text = "Link Text is required";
      }
      if (!link.url) {
        e.url = "Link Url is required";
      }

      if (typeof e.text !== "undefined" || typeof e.url !== "undefined") {
        errors.links = errors.links || [];
        errors.links[index] = e;
      }
    });
  }
  return errors;
};

export default function DashboardProfile() {
  const { showNotification } = useNotification();
  const { data: session, status } = useSession();
  const profileId = session?.user?.profile?.id as string;
  const { data: linkData, isLoading } = api.link.byProfileId.useQuery({
    profileId,
  });
  const updateLinks = api.link.createOrUpdate.useMutation();

  if (isLoading || status === "loading") return <Loading />;
  if (status === "unauthenticated") {
    window.location = "/";
  }

  return (
    <Layout pageTitle="Links">
      <Container
        css={{
          maxWidth: "800px",
          px: "4rem",
        }}
      >
        <h2>Links</h2>
        <Formik
          validate={validate}
          initialValues={{
            links: linkData || [{ text: "", url: "" }],
          }}
          onSubmit={async (
            values: ILinksFields,
            /* { setSubmitting }: FormikHelpers<IProfileFields>, */
          ) => {
            await updateLinks.mutateAsync(
              { profileId, links: values.links },
              {
                onSuccess: () => {
                  showNotification({ message: "Links updated!" });
                },
              },
            );
          }}
        >
          {({
            values,
            isSubmitting,
          }: {
            values: ILinksFields;
            isSubmitting: () => boolean;
          }) => (
            <Form
              style={{
                maxWidth: "700px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <FieldArray name="links">
                {({ insert, remove, push }) => (
                  <RoundedBox css={{ mb: "2rem" }}>
                    {values.links.length > 0 &&
                      values.links.map(
                        (link, index: { link: ILinkFields; index: number }) => (
                          <Flex
                            key={index}
                            css={{
                              mb: "0.5rem",
                              gap: "$4",
                              alignItems: "end",
                            }}
                          >
                            <Box>
                              <Field name={`links.${index}.id`} type="hidden" />
                              <Field
                                name={`links.${index}.profileId`}
                                value={`${profileId}`}
                                type="hidden"
                              />
                              <Label
                                htmlFor={`links.${index}.name`}
                                css={{ mr: "1rem" }}
                              >
                                Text
                              </Label>
                              <FormField
                                css={{ mb: 0 }}
                                name={`links.${index}.text`}
                              />
                            </Box>
                            <Flex
                              css={{ flexDirection: "column", flexGrow: "1" }}
                            >
                              <Label
                                css={{ mr: "1rem" }}
                                htmlFor={`links.${index}.url`}
                              >
                                Url
                              </Label>
                              <FormField name={`links.${index}.url`} />
                            </Flex>
                            <Box css={{ marginLeft: "auto" }}>
                              <Button
                                type="button"
                                css={{
                                  mb: "0.25rem",
                                  width: "35px",
                                  height: "35px",
                                  backgroundColor: "$rose500",
                                  "&:hover": {
                                    backgroundColor: "$rose600",
                                  },
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                                onClick={() => remove(index)}
                              >
                                <XIcon />
                              </Button>
                            </Box>
                          </Flex>
                        ),
                      )}
                    <Flex>
                      <FormButton
                        type="button"
                        css={{
                          mt: "1rem",
                          ml: "auto",
                          fontSize: "$lg",
                          fontFamily: "$body",
                        }}
                        onClick={() => push({ text: "", url: "" })}
                      >
                        + Add Link
                      </FormButton>
                    </Flex>
                  </RoundedBox>
                )}
              </FieldArray>
              <FormButton
                css={{
                  fontSize: "$lg",
                  fontFamily: "$body",
                }}
                type="submit"
                disabled={isSubmitting}
              >
                Update Links
              </FormButton>
            </Form>
          )}
        </Formik>
      </Container>
    </Layout>
  );
}
