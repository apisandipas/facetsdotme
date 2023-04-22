import { useRouter } from "next/router";
import { Button, CenteredContainer } from "@facets/ui";
import { useFormik } from "formik";

import { api } from "~/utils/api";

interface IUserFields {
  email: string;
  name: string;
  password: string;
  passwordConfirm: string;
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

  if (!values.name) {
    errors.name = "Name must be entered";
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
  const signUp = api.user.signUp.useMutation();
  const router = useRouter();
  const { handleSubmit, errors, values, handleChange, resetForm, touched } =
    useFormik<IUserFields>({
      initialValues: {
        email: "",
        name: "",
        password: "",
        passwordConfirm: "",
      },
      validate,
      onSubmit: async (values) => {
        await signUp.mutateAsync(
          {
            email: values.email,
            name: values.name,
            password: values.password,
          },
          {
            onSuccess: () => {
              resetForm();
              router.push("/");
            },
          },
        );
      },
    });

  return (
    <CenteredContainer>
      CreateAccount Screen
      <div>Form Goes Here</div>
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
          placeholder="name"
          name="name"
          value={values.name}
          onChange={handleChange}
        />
        {errors.name && touched.name ? <div>{errors.name}</div> : null}
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
        <input
          placeholder="confirm password"
          name="passwordConfirm"
          type="password"
          value={values.passwordConfirm}
          onChange={handleChange}
        />
        {errors.passwordConfirm && touched.passwordConfirm ? (
          <div>{errors.passwordConfirm}</div>
        ) : null}
        <Button>Sign Up</Button>
      </form>
    </CenteredContainer>
  );
}
