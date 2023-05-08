import { useCallback, useMemo, useState } from "react";
import { Box, Button, Flex, ModalDialog } from "@facets/ui";
import axios from "axios";
import { useSession } from "next-auth/react";
import { useDropzone } from "react-dropzone";

import { api } from "~/utils/api";
import { useProfilePreview } from "~/contexts";
import { AvatarPlaceholder } from "../AvatarPlaceholder";

export const AvatarSelection = ({
  image,
  handle,
}: {
  image: string;
  handle: string;
}) => {
  const utils = api.useContext();
  const { refreshPreview } = useProfilePreview();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: session, update: updateSession } = useSession();
  const removeAvatar = api.profile.updateImage.useMutation();

  const handleRemoveAvatar = async () => {
    await removeAvatar.mutateAsync(
      {
        userId: session?.user?.id,
        image: "",
      },
      {
        onSuccess: () => {
          setTimeout(() => {
            updateSession({ image: "" });
            utils.profile.invalidate();
            refreshPreview();
          }, 1000);
        },
      },
    );
  };

  return (
    <>
      <Flex
        css={{
          gap: "1.5rem",
          mb: "1rem",
        }}
      >
        <Box>
          <AvatarPlaceholder handle={handle} image={image} />
        </Box>
        <Flex
          css={{
            flexDirection: "column",
            width: "$full",
          }}
        >
          <Box>
            <Button
              onClick={() => setIsModalOpen(true)}
              type="button"
              css={{ width: "$full", mb: "1rem", fontSize: "$lg" }}
            >
              Pick an image
            </Button>
            <ModalDialog
              title={"Upload an avatar"}
              description={"Drag and drop a file to customize your avatar."}
              isOpen={isModalOpen}
              setIsOpen={setIsModalOpen}
              children={
                <DropZone handle={handle} setIsModalOpen={setIsModalOpen} />
              }
            />
          </Box>
          <Box>
            <Button
              onClick={handleRemoveAvatar}
              variant="secondary"
              type="button"
              css={{ width: "$full", fontSize: "$lg" }}
            >
              Remove
            </Button>
          </Box>
        </Flex>
      </Flex>
    </>
  );
};

const DropZone = ({ setIsModalOpen, handle }) => {
  const { data: session, update: updateSession } = useSession();
  const { refreshPreview } = useProfilePreview();
  const userId = session?.user.id as string;
  const [presignedUrl, setPresignedUrl] = useState<string | null>(null);
  const [newFilename, setNewFilename] = useState("");
  const fetchPresignedUrls = api.uploads.getUploadPresignedUrl.useMutation();
  const updateProfileImage = api.profile.updateImage.useMutation();
  const [submitDisabled, setSubmitDisabled] = useState(true);
  const utils = api.useContext();

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      accept: {
        "image/png": [".png", ".jpg", ".jpeg", ".gif"],
      },
      maxFiles: 1,
      maxSize: 5 * 2 ** 30, // roughly 5GB
      multiple: false,
      onDropAccepted: async (files, _event) => {
        const file = files[0] as File;
        const newFile = new File(
          [file],
          `${handle}_${+new Date()}.${file.name.split(".").pop()}`,
          { type: file.type },
        );
        setNewFilename(newFile.name);
        await fetchPresignedUrls.mutateAsync(
          {
            key: newFile.name,
          },
          {
            onSuccess: (url) => {
              setPresignedUrl(url);
              setSubmitDisabled(false);
            },
          },
        );
      },
    });

  const files = useMemo(() => {
    if (!submitDisabled)
      return acceptedFiles.map((file) => (
        <li key={file.name}>
          {file.name} - {file.size} bytes
        </li>
      ));
    return null;
  }, [acceptedFiles, submitDisabled]);

  const handleSubmit = useCallback(async () => {
    if (acceptedFiles.length > 0 && presignedUrl !== null) {
      const file = acceptedFiles[0] as File;
      try {
        const response = await axios.put(presignedUrl, file.slice(), {
          headers: { "Content-Type": file.type },
        });
        if (response) {
          console.log(response);
          console.log("Successfully uploaded ", newFilename);
          await updateProfileImage.mutateAsync(
            {
              userId,
              image: newFilename,
            },
            {
              onSuccess: () => {
                setIsModalOpen(false);
                updateSession({ image: newFilename });
                setTimeout(() => {
                  refreshPreview();
                }, 1000);
              },
            },
          );
        }
      } catch (e) {
        console.error(e);
      }
      setSubmitDisabled(true);
      await utils.profile.byUserId.invalidate();
      /* await utils.uploads.getObjects.invalidate(); */
    }
  }, [acceptedFiles, utils.uploads.getObjects, presignedUrl]);

  return (
    <>
      <div {...getRootProps()} className="dropzone-container">
        <input {...getInputProps()} />
        {isDragActive ? (
          <Flex
            css={{
              height: "$full",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <p>Drop the file here...</p>
          </Flex>
        ) : (
          <Flex
            css={{
              height: "$full",
              alignItems: "center",
              justifyContent: "center",
              border: "2px dashed $slate800",
              padding: "2rem",
              textAlign: "center",
            }}
          >
            <p>Drag n drop file here, or click to select files</p>
          </Flex>
        )}
      </div>
      <Box css={{ p: "1rem" }}>
        Files pending upload
        <ul>{files}</ul>
      </Box>
      <Flex css={{ gap: "1rem", width: "$full" }}>
        <Button
          variant="secondary"
          css={{ flexGrow: 1 }}
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
        <Button
          css={{ flexGrow: 1 }}
          onClick={() => void handleSubmit()}
          disabled={
            presignedUrl === null ||
            acceptedFiles.length === 0 ||
            submitDisabled
          }
        >
          Upload
        </Button>
      </Flex>
    </>
  );
};
