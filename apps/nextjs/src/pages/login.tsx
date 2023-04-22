import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { Button, CenteredContainer } from "@facets/ui";
import { useFormik } from "formik";
import { signIn, useSession } from "next-auth/react";
import { useRecoilState } from "recoil";

import { userState } from "./store/atoms";

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
      router.push("/");
    }
  }, [session]);
  return (
    <CenteredContainer>
      CreateAccount Screen
      <div>Form Goes Here</div>
      {isLoading ?? "Submitting...."}
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          marginBottom: 50,
          marginTop: 50,
        }}
      >
        <input
          placeholder="email address"
          name="email"
          value={values.email}
          onChange={handleChange}
        />
        {errors.email && touched.email ? <div>{errors.email}</div> : null}

        <input
          placeholder="password"
          name="password"
          type="password"
          value={values.password}
          onChange={handleChange}
        />
        {errors.password && touched.password ? (
          <div>{errors.password}</div>
        ) : null}
        <Button>Login</Button>
      </form>
    </CenteredContainer>
  );
}
