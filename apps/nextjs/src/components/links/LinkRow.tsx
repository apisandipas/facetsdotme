import { useState } from "react";
import {
  Box,
  Button,
  ErrorMsg,
  Flex,
  FormButton,
  HandleIcon as HandleIconBase,
  Input,
  Label,
  PencilIcon as PencilIconBase,
  RoundedBox,
  TrashIcon as TrashIconBase,
  styled,
} from "@facets/ui";
import { useFormik } from "formik";
import { Draggable } from "react-beautiful-dnd";

import { api } from "~/utils/api";
import { validateLink } from "~/utils/validation";
import { useProfilePreview } from "~/contexts";
import { useNotification } from "~/contexts/NotificationsContext";

const HandleIcon = styled(HandleIconBase, {});
const PencilIcon = styled(PencilIconBase, {});
const TrashIcon = styled(TrashIconBase, {});
const IconButton = styled("div", {
  cursor: "pointer",
  background: "$slate800",
  borderRadius: "8px",
  display: "flex",
  width: "2rem",
  height: "2rem",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px",
  color: "$slate300",
  "&:hover": {
    backgroundColor: "$slate700",
  },
});

const InputWrapper = styled(Flex, {
  flexDirection: "column",
  "@md": {
    flexDirection: "row",
  },
});
const DeleteMsg = styled("div", {
  mb: "1rem",
  color: "$slate300",
  "@md": {
    mb: 0,
  },
});
export function LinkRow({ link, index }) {
  const utils = api.useContext();
  const { refreshPreview } = useProfilePreview();
  const [isEditing, setIsEditing] = useState(false);
  const [promptForDeletion, setPromptForDeletion] = useState(false);
  const { showNotification } = useNotification();
  const updateLink = api.link.update.useMutation();
  const deleteLink = api.link.delete.useMutation();
  const { values, errors, touched, handleSubmit, handleChange, resetForm } =
    useFormik({
      initialValues: link,
      validate: validateLink,
      onSubmit: async (values) => {
        setIsEditing(false);
        console.log({ values });
        await updateLink.mutateAsync(values, {
          onSuccess: () => {
            showNotification({ message: "Link updated!" });
            setIsEditing(false);
            utils.link.byProfileId.invalidate();
          },
        });
      },
    });

  const handleDelete = async () => {
    await deleteLink.mutateAsync(
      { id: link.id },
      {
        onSuccess: () => {
          showNotification({ message: "Link deleted!" });
          refreshPreview();
          utils.link.byProfileId.invalidate();
        },
      },
    );
  };

  return (
    <Draggable draggableId={link.id} index={index}>
      {(provided) => (
        <RoundedBox
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          css={{ p: 0, mb: "1rem", alignItems: "center" }}
        >
          <HandleIcon css={{ ml: "1rem" }} />
          <Flex
            css={{
              flexDirection: "column",
              width: "$full",
            }}
          >
            <Flex css={{ flexDirection: "row", p: "2rem", pl: "1rem" }}>
              <Box css={{ flexGrow: 1 }}>
                <Flex css={{ flexDirection: "column", mb: "1rem" }}>
                  <InputWrapper>
                    <Label
                      css={{ width: "auto", mr: "2rem" }}
                      htmlFor="new-link-text-input"
                    >
                      Text
                    </Label>
                    <Input
                      css={{ mr: "2rem", maxWidth: "450px" }}
                      name="text"
                      id="new-link-text-input"
                      onChange={handleChange}
                      value={values.text}
                      disabled={!isEditing}
                    />
                  </InputWrapper>
                  {errors.text && touched.text ? (
                    <ErrorMsg css={{ mr: "2rem" }}>{errors.text}</ErrorMsg>
                  ) : null}
                </Flex>

                <Flex css={{ flexDirection: "column" }}>
                  <InputWrapper>
                    <Label
                      css={{ width: "auto", mr: "2rem" }}
                      htmlFor="new-link-url-input"
                    >
                      URL&nbsp;
                    </Label>
                    <Input
                      css={{ mr: "2rem", maxWidth: "450px" }}
                      name="text"
                      id="new-link-url-input"
                      onChange={handleChange}
                      value={values.url}
                      disabled={!isEditing}
                    />
                  </InputWrapper>
                  {errors.url && touched.url ? (
                    <ErrorMsg css={{ mr: "2rem" }}>{errors.url}</ErrorMsg>
                  ) : null}
                </Flex>
              </Box>
              <Flex
                css={{
                  flexDirection: "column",
                  ml: "1rem",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                {isEditing && (
                  <Flex css={{ flexDirection: "column" }}>
                    <Button onClick={handleSubmit}>Save</Button>
                    <Box
                      css={{ cursor: "pointer", fontSize: "$sm", mt: "0.5rem" }}
                      onClick={() => {
                        setIsEditing(false);
                        resetForm();
                      }}
                    >
                      Cancel
                    </Box>
                  </Flex>
                )}
                {!isEditing && (
                  <>
                    <IconButton
                      css={{ mb: "0.5rem" }}
                      onClick={() => setIsEditing(true)}
                    >
                      <PencilIcon />
                    </IconButton>
                    {!promptForDeletion && (
                      <IconButton onClick={() => setPromptForDeletion(true)}>
                        <TrashIcon />
                      </IconButton>
                    )}
                  </>
                )}
              </Flex>
            </Flex>
            <Box>
              {promptForDeletion && (
                <InputWrapper
                  css={{
                    m: "2rem",
                    ml: 0,
                    mt: 0,
                    p: "1rem",
                    alignItems: "bottom",
                    background: "$rose500",
                    br: "25px",
                  }}
                >
                  <DeleteMsg>Permanently delete this link?</DeleteMsg>
                  <Flex
                    css={{
                      ml: "auto",
                      alignItems: "center",
                    }}
                  >
                    <FormButton
                      css={{ m: 0, ml: "auto", backgroundColor: "$rose900" }}
                      onClick={handleDelete}
                    >
                      Delete forever
                    </FormButton>
                    <Box
                      css={{
                        cursor: "pointer",
                        fontSize: "$sm",
                        ml: "1rem",
                        lineHeight: "29px",
                      }}
                      onClick={() => setPromptForDeletion(false)}
                    >
                      Cancel
                    </Box>
                  </Flex>
                </InputWrapper>
              )}
            </Box>
          </Flex>
        </RoundedBox>
      )}
    </Draggable>
  );
}
