import { useEffect, useState } from "react";
import { Head } from "next/document";
import { useRouter } from "next/router";
import {
  Box,
  Button,
  Container,
  ErrorMsg,
  Flex,
  Form,
  FormButton,
  Input,
  Label,
  styled,
} from "@facets/ui";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import { Layout } from "~/components/Layout";
import { userState } from "../store/atoms";

/* import { api } from "~/utils/api"; */

interface IUserFields {
  email: string;
  password: string;
}

const validate = (values: IUserFields) => {
  const errors: any = {};

  if (!values.email) {
    errors.email = "Please enter an email address";
    // TODO Replace with something more robust
    // TODO Pull out into utility function
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
    errors.email = "Please enter a valid email address";
  }

  if (!values.password) {
    errors.password = "Password required";
  }

  return errors;
};

export default function CreateAccountScreen() {
  const router = useRouter();
  const [user, setUser] = useRecoilState(userState);
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();

  const { handleSubmit, errors, values, handleChange, resetForm, touched } =
    useFormik<IUserFields>({
      initialValues: {
        email: "",
        password: "",
      },
      validate,
      onSubmit: async (values) => {
        setIsLoading(true);
        const res = await signIn("credentials", {
          redirect: false,
          email: values.email,
          password: values.password,
          callbackUrl: `${window.location.origin}`,
        });
        if (!res?.ok) {
          resetForm();
          setIsLoading(false);
        }
      },
    });

  useEffect(() => {
    if (session) {
      setUser(session.user);
      router.push("/dashboard/links");
    }
  }, [session]);

  return (
    <Layout pageTitle="Login">
      <Container>
        <Flex
          css={{
            flexDirection: "column",
            justifyContent: "center",
            mx: "auto",
            width: "320px",
            py: "$48",
          }}
        >
          <h2 style={{ margin: "0 auto 2rem" }}>Sign in to your account</h2>
          <Form
            onSubmit={handleSubmit}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <Box css={{ mb: "$2" }}>
              <Label htmlFor="email">Email Address</Label>
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
            <FormButton>Login</FormButton>
          </Form>
        </Flex>
      </Container>
    </Layout>
  );
}
