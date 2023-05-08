import * as Dialog from "@radix-ui/react-dialog";

import { Button } from "./Button";
import { Flex } from "./Utils";
import { keyframes, styled } from "./theme.config";

export const ModalDialog = ({
  title,
  description,
  children,
  isOpen,
  setIsOpen,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
  isOpen: boolean;
  setIsOpen: (next: boolean) => void;
}) => (
  <Dialog.Root open={isOpen}>
    <Dialog.Portal>
      <DialogOverlay />
      <DialogContent>
        <DialogTitle>{title}</DialogTitle>

        <Flex css={{ flexDirection: "column" }}>
          {children || "Hello World"}
        </Flex>
        {/* <Dialog.Close asChild>
          <Button
            css={{ width: "$full" }}
            aria-label="Close"
            onClick={() => setIsOpen(false)}
          >
            Close
          </Button>
        </Dialog.Close> */}
      </DialogContent>
    </Dialog.Portal>
  </Dialog.Root>
);

const overlayShow = keyframes({
  "0%": { opacity: 0 },
  "100%": { opacity: 1 },
});

const contentShow = keyframes({
  "0%": { opacity: 0, transform: "translate(-50%, -48%) scale(.96)" },
  "100%": { opacity: 1, transform: "translate(-50%, -50%) scale(1)" },
});

const DialogOverlay = styled(Dialog.Overlay, {
  backgroundColor: "rgba(0,0,0, 0.9)",
  position: "fixed",
  inset: 0,
  animation: `${overlayShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
});

const DialogContent = styled(Dialog.Content, {
  backgroundColor: "white",
  borderRadius: 6,
  boxShadow:
    "hsl(206 22% 7% / 35%) 0px 10px 38px -10px, hsl(206 22% 7% / 20%) 0px 10px 20px -15px",
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90vw",
  maxWidth: "450px",
  maxHeight: "85vh",
  padding: 25,
  animation: `${contentShow} 150ms cubic-bezier(0.16, 1, 0.3, 1)`,
  "&:focus": { outline: "none" },
});

const DialogTitle = styled(Dialog.Title, {
  margin: 0,
  fontWeight: 500,
  color: "$slate900",
  fontSize: 17,
});

const DialogDescription = styled(Dialog.Description, {
  margin: "10px 0 20px",
  color: "$slate800",
  fontSize: 15,
  lineHeight: 1.5,
});
