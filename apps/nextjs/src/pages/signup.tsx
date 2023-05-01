import { useRouter } from "next/router";
import { checkHandleAvailable } from "@facets/api/src/router/user/user.service";
import {
  Box,
  Container,
  ErrorMsg,
  Flex,
  Form,
  FormButton,
  Input,
  Label,
} from "@facets/ui";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { validateEmail } from "~/utils/validation";
import { Layout } from "~/components/Layout";

interface IProfileFields {
  handle: string;
}

interface IUserFields {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
  profile: IProfileFields;
}

const validate = async (
  values: IUserFields,
  checkHandleAvailability: any,
  checkEmailAvailablity: any,
) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = "Please enter an email address";
  } else if (!validateEmail(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (values.email) {
    const emailAvailable = await checkEmailAvailablity.mutateAsync({
      email: values.email,
    });
    if (!emailAvailable) {
      errors.email = "Email is already in use.";
    }
  }

  if (!values.name) {
    errors.name = "Name must be entered";
  }

  if (!values.profile.handle) {
    errors.profile = errors.profile || {};
    errors.profile.handle = "Handle is required";
  }

  if (values.profile.handle) {
    const handleAvailable = await checkHandleAvailability.mutateAsync({
      handle: values.profile.handle,
    });
    if (!handleAvailable) {
      errors.profile = errors.profile || {};
      errors.profile.handle = "Handle is not available";
    }
  }

  if (!values.password) {
    errors.password = "Password required";
  }
  if (!values.passwordConfirm) {
    errors.passwordConfirm = "Please confirm your password.";
  }
  if (values.password !== values.passwordConfirm) {
    errors.passwordConfirm = "Password mismatch!";
  }

  return errors;
};

export default function CreateAccountScreen() {
  const session = useSession();
  console.log({ session });
  const signUp = api.user.signUp.useMutation();
  const checkEmailAvailability = api.user.checkEmailAvailability.useMutation();
  const checkHandleAvailability =
    api.user.checkHandleAvailability.useMutation();
  const router = useRouter();
  const { handleSubmit, errors, values, handleChange, resetForm, touched } =
    useFormik<IUserFields>({
      initialValues: {
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
        profile: {
          handle: "",
        },
      },
      validate: (values) =>
        validate(values, checkHandleAvailability, checkEmailAvailability),
      onSubmit: async (values) => {
        const res = await signUp.mutateAsync(
          {
            email: values.email,
            name: values.name,
            password: values.password,
            profile: {
              handle: values.profile.handle,
            },
          },
          {
            onSuccess: () => {
              resetForm();
              router.push("/login");
            },
          },
        );
      },
    });

  return (
    <Layout pageTitle="Create an account">
      <Container>
        <Flex
          css={{
            flexDirection: "column",
            justifyContent: "center",
            mx: "auto",
            width: "320px",
          }}
        >
          <h2 style={{ margin: "0 auto 2rem" }}>Sign up for an account</h2>
          <Form onSubmit={handleSubmit}>
            <Box css={{ mb: "$2" }}>
              <Label htmlFor="email">Email</Label>
              <Input
                name="email"
                value={values.email}
                onChange={handleChange}
                invalid={errors.email && touched.email}
              />
              {errors.email && touched.email ? (
                <ErrorMsg>{errors.email}</ErrorMsg>
              ) : null}
            </Box>
            <Box css={{ mb: "$2" }}>
              <Label htmlFor="name">Name</Label>
              <Input
                name="name"
                value={values.name}
                onChange={handleChange}
                invalid={errors.name && touched.name}
              />
              {errors.name && touched.name ? (
                <ErrorMsg>{errors.name}</ErrorMsg>
              ) : null}
            </Box>
            <Box css={{ mb: "$2" }}>
              <Label htmlFor="handle">@Handle</Label>
              <Input
                name="profile.handle"
                value={values.profile.handle}
                onChange={handleChange}
                invalid={errors.profile?.handle && touched.profile?.handle}
              />
              {errors.profile?.handle && touched.profile?.handle ? (
                <ErrorMsg>{errors.profile?.handle}</ErrorMsg>
              ) : null}
            </Box>
            <Box css={{ mb: "$2" }}>
              <Label htmlFor="password">Password</Label>
              <Input
                name="password"
                type="password"
                value={values.password}
                onChange={handleChange}
                invalid={errors.password && touched.password}
              />
              {errors.password && touched.password ? (
                <ErrorMsg>{errors.password}</ErrorMsg>
              ) : null}
            </Box>
            <Box css={{ mb: "$2" }}>
              <Label htmlFor="passwordConfirm">Confirm Password</Label>
              <Input
                name="passwordConfirm"
                type="password"
                value={values.passwordConfirm}
                onChange={handleChange}
                invalid={errors.passwordConfirm && touched.passwordConfirm}
              />
              {errors.passwordConfirm && touched.passwordConfirm ? (
                <ErrorMsg>{errors.passwordConfirm}</ErrorMsg>
              ) : null}
            </Box>
            <FormButton>Sign Up</FormButton>
          </Form>
        </Flex>
      </Container>
    </Layout>
  );
}
