import { Button } from "@facets/ui";
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
  /*
   *   if (values.links) {
   *     values.links.forEach((link: ILinkFields, index: number) => {
   *       let e = {} as ILinkFields;
   *       if (!link.text) {
   *         e.text = "Link Text is required";
   *       }
   *       if (!link.url) {
   *         e.url = "Link Url is required";
   *       }
   *
   *       if (typeof e.text !== "undefined" || typeof e.url !== "undefined") {
   *         errors.links = errors.links || [];
   *         errors.links[index] = e;
   *       }
   *     }); */
  /* } */
  console.log({ errors });
  return errors;
};

export default function DashboardProfile() {
  const { data: session } = useSession();
  console.log({ session });
  const userId = session?.user.id as string;
  const { data: profileData, isLoading } = api.profile.byUserId.useQuery({
    userId,
  });
  console.log({ profileData });
  const updateProfile = api.profile.update.useMutation();

  if (isLoading) return <>Loading...</>;

  return (
    <Layout>
      <h2>Dashboard / Profile</h2>
      <Formik
        validate={validate}
        initialValues={{
          handle: profileData?.handle || "",
          bio: profileData?.bio || "",
          links: profileData?.links || [{ text: "", url: "" }],
        }}
        onSubmit={async (
          values: IProfileFields,
          /* { setSubmitting }: FormikHelpers<IProfileFields>, */
        ) => {
          const res = await updateProfile.mutateAsync({
            userId,
            ...values,
          });
          console.log({ res });
        }}
      >
        {({
          values,
          isSubmitting,
        }: {
          values: IProfileFields;
          isSubmitting: () => boolean;
        }) => (
          <Form
            style={{
              maxWidth: "50%",
              display: "flex",
              margin: "auto",
              flexDirection: "column",
              justifyContent: "center",
              /* alignItems: "center", */
              marginBottom: 50,
              marginTop: 50,
            }}
          >
            <label htmlFor="handle">Handle</label>
            <Field placeholder="Handle" name="handle" />

            <label htmlFor="bio">Bio / Blurb</label>
            <Field name="bio" placeholder="Bio goes here..." />

            {/* <FieldArray name="links">
              {({ insert, remove, push }) => (
                <div>
                  <h4>Links</h4>
                  {values.links.length > 0 &&
                    values.links.map(
                      (link, index: { link: ILinkFields; index: number }) => (
                        <div className="row" key={index}>
                          <div className="col">
                            <Field name={`links.${index}.id`} type="hidden" />
                            <label htmlFor={`links.${index}.name`}>Text</label>
                            <Field
                              name={`links.${index}.text`}
                              placeholder="My Social Media Profile"
                              type="text"
                            />
                            <ErrorMessage
                              name={`links.${index}.text`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <label htmlFor={`links.${index}.url`}>Url</label>
                            <Field
                              name={`links.${index}.url`}
                              placeholder="http://facets.me/jane.doe"
                            />
                            <ErrorMessage
                              name={`links.${index}.url`}
                              component="div"
                              className="field-error"
                            />
                          </div>
                          <div className="col">
                            <Button
                              type="button"
                              className="secondary"
                              onClick={() => remove(index)}
                            >
                              &times;
                            </Button>
                          </div>
                        </div>
                      ),
                    )}
                  <Button
                    type="button"
                    className="secondary"
                    onClick={() => push({ text: "", url: "" })}
                  >
                    Add Link
                  </Button>
                </div>
              )}
            </FieldArray> */}
            <button type="submit" disabled={isSubmitting}>
              Update Profile
            </button>
          </Form>
        )}
      </Formik>
    </Layout>
  );
}
