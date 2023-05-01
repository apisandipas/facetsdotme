export const validateLink = (values: any) => {
  const errors = {} as any;

  if (!values.text) {
    errors.text = "Please give your link some text";
  }

  if (!values.url) {
    errors.url = "Please give your link a url.";
  }

  return errors;
};

export const validateEmail = (email: string) => {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
};
