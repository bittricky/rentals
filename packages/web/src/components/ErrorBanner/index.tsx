import React from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Stack,
} from "@chakra-ui/react";

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = (props: Props) => {
  const {
    message = "Uh oh! Something went wrong :(",
    description = "Looks like something went wrong. Please check your connection and/or try again soon.",
  } = props;
  return (
    <Stack spacing={3}>
      <Alert status="error">
        <AlertIcon />
        <AlertTitle>{message}</AlertTitle>
        <AlertDescription>{description}</AlertDescription>
      </Alert>
    </Stack>
  );
};

ErrorBanner.displayName = "ErrorBanner";
