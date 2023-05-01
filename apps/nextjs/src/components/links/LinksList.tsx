import {
  Box,
  Button,
  ErrorMsg,
  Flex,
  FormButton,
  Input,
  Label,
  RoundedBox,
} from "@facets/ui";

import { LinkRow } from "./LinkRow";

export function LinksList({ links }) {
  return links?.map((link, index) => (
    <LinkRow link={link} index={index} key={link.id} />
  ));
}
