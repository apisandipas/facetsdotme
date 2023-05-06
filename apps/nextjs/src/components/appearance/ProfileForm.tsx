import { useEffect, useState } from "react";
import {
  Box,
  Button,
  ErrorMsg,
  Flex,
  Form,
  Input,
  Label,
  RoundedBox,
  TextArea,
  styled,
} from "@facets/ui";
import { useFormik } from "formik";
import { useSession } from "next-auth/react";

import { api } from "~/utils/api";
import { useNotification } from "~/contexts";
import { AvatarPlaceholder } from "../AvatarPlaceholder";
import { Loading } from "../Loading";

interface IProfileFields {
  handle: string;
  bio: string;
}

const validate = async (
  values: IProfileFields,
  checkHandleAvailability: any,
  currentHandle: string,
) => {
  const errors = {} as any;

  if (!values.handle) {
    errors.handle = "Please enter a unique handle";
  }

  if (values.handle !== currentHandle) {
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

const BioLengthIndicator = styled("div", {
  fontSize: "$sm",
  color: "$slate500",
  ml: "auto",
  variants: {
    invalid: {
      true: {
        color: "$rose600",
      },
    },
  },
});

export const ProfileForm = ({}) => {
  const utils = api.useContext();
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

  const [isSubmitting, setIsSubmitting] = useState(false);

  const checkHandleAvailability =
    api.user.checkHandleAvailability.useMutation();

  const updateProfile = api.profile.update.useMutation();

  const handle = profileData?.handle;
  const { values, errors, touched, handleChange, handleSubmit, setFieldValue } =
    useFormik({
      initialValues: {
        handle: handle || "",
        bio: profileData?.bio || "",
      },
      validate: (values) => validate(values, checkHandleAvailability, handle),
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

  const bioLengthMax = 200;
  const bioLength = values?.bio?.length;

  return (
    <>
      <Form onSubmit={handleSubmit}>
        <RoundedBox css={{ mb: "2rem" }}>
          <Flex
            css={{
              flexDirection: "column",
              width: "$full",
            }}
          >
            <Flex
              css={{
                gap: "1.5rem",

                mb: "1rem",
              }}
            >
              <Box>
                <AvatarPlaceholder handle={handle} />
              </Box>
              <Flex
                css={{
                  flexDirection: "column",
                  width: "$full",
                }}
              >
                <Box>
                  <Button
                    type="button"
                    css={{ width: "$full", mb: "1rem", fontSize: "$lg" }}
                  >
                    Pick an image
                  </Button>
                </Box>
                <Box>
                  <Button
                    variant="secondary"
                    type="button"
                    css={{ width: "$full", fontSize: "$lg" }}
                  >
                    Remove
                  </Button>
                </Box>
              </Flex>
            </Flex>
            <Label htmlFor="handle-input">Handle</Label>
            <Input
              name="handle"
              id="handle-input"
              onChange={handleChange}
              value={values.handle}
              css={{ mb: "1rem" }}
              invalid={errors.handle && touched.handle}
            />
            {errors.handle && touched.handle ? (
              <ErrorMsg>{errors.handle}</ErrorMsg>
            ) : null}

            <Label htmlFor="bio-input">Bio</Label>
            <TextArea
              rows={4}
              name="bio"
              id="bio-input"
              onChange={handleChange}
              value={values.bio}
              invalid={errors.bio && touched.bio}
              placeholder="Bio goes here..."
            ></TextArea>
            <BioLengthIndicator invalid={bioLength > bioLengthMax}>
              {bioLength || 0} / {bioLengthMax}
            </BioLengthIndicator>
            {errors.bio && touched.bio ? (
              <ErrorMsg>{errors.bio}</ErrorMsg>
            ) : null}
            <Button
              type="submit"
              disabled={isSubmitting}
              css={{ fontSize: "$xl", mt: "1rem" }}
            >
              Update Profile
            </Button>
          </Flex>
        </RoundedBox>
      </Form>
    </>
  );
};
