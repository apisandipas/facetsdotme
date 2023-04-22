"use client";
import * as Tabs from "@radix-ui/react-tabs";
import * as Form from "@radix-ui/react-form";
import { blackA, violet, mauve } from "@radix-ui/colors";
import { styled, Button, Flex } from "ui";

export const LoginTabs = () => {
  return (
    <TabsRoot defaultValue="tab1">
      <TabsList aria-label="Manage your account">
        <TabsTrigger value="tab1">Account</TabsTrigger>
        <TabsTrigger value="tab2">Password</TabsTrigger>
      </TabsList>
      <TabsContent value="tab1">
        <Text>
          Make changes to your account here. Click save when you're done.
        </Text>
        <Fieldset>
          <Label htmlFor="name">Name</Label>
          <Input id="name" defaultValue="Pedro Duarte" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="username">Username</Label>
          <Input id="username" defaultValue="@peduarte" />
        </Fieldset>
        <Flex css={{ marginTop: 20, justifyContent: "flex-end" }}>
          <Button>Save changes</Button>
        </Flex>
      </TabsContent>
      <TabsContent value="tab2">
        <Text>
          Change your password here. After saving, you'll be logged out.
        </Text>
        <Fieldset>
          <Label htmlFor="currentPassword">Current password</Label>
          <Input id="currentPassword" type="password" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="newPassword">New password</Label>
          <Input id="newPassword" type="password" />
        </Fieldset>
        <Fieldset>
          <Label htmlFor="confirmPassword">Confirm password</Label>
          <Input id="confirmPassword" type="password" />
        </Fieldset>
        <Flex css={{ marginTop: 20, justifyContent: "flex-end" }}>
          <Button>Change password</Button>
        </Flex>
      </TabsContent>
    </TabsRoot>
  );
};

const TabsRoot = styled(Tabs.Root, {
  display: "flex",
  flexDirection: "column",
  width: 300,
  boxShadow: `0 2px 10px $gray950`,
});

const TabsList = styled(Tabs.List, {
  flexShrink: 0,
  display: "flex",
  borderBottom: `1px solid $zinc600`,
});

const TabsTrigger = styled(Tabs.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "white",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  color: "$zinc900",
  userSelect: "none",
  "&:first-child": { borderTopLeftRadius: 6 },
  "&:last-child": { borderTopRightRadius: 6 },
  "&:hover": { color: "$violet900" },
  '&[data-state="active"]': {
    color: "$violet900",
    boxShadow: "inset 0 -1px 0 0 currentColor, 0 1px 0 0 currentColor",
  },
  "&:focus": { position: "relative", boxShadow: `0 0 0 2px black` },
});

const TabsContent = styled(Tabs.Content, {
  flexGrow: 1,
  padding: 20,
  backgroundColor: "white",
  borderBottomLeftRadius: 6,
  borderBottomRightRadius: 6,
  outline: "none",
  "&:focus": { boxShadow: `0 0 0 2px black` },
});

const Text = styled("p", {
  marginTop: 0,
  marginBottom: 20,
  color: "$zinc900",
  fontSize: 15,
  lineHeight: 1.5,
});

const Fieldset = styled("fieldset", {
  all: "unset",
  marginBottom: 15,
  width: "100%",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
});

const Label = styled("label", {
  fontSize: 13,
  lineHeight: 1,
  marginBottom: 10,
  color: "$violet900",
  display: "block",
});

const Input = styled("input", {
  all: "unset",
  flex: "1 0 auto",
  borderRadius: 4,
  padding: "0 10px",
  fontSize: 15,
  lineHeight: 1,
  color: "$violet950",
  boxShadow: `0 0 0 1px $violet700`,
  height: 35,
  "&:focus": { boxShadow: `0 0 0 2px $violet800` },
});
