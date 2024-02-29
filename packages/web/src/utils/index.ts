import { createStandaloneToast } from "@chakra-ui/react";

const { toast } = createStandaloneToast();
//TODO: refactor to keep DRY
export const displaySuccessNotification = (message: string) => {
  return toast({
    title: message,
    status: "success",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};

export const displayErrorMessage = (message: string) => {
  return toast({
    title: message,
    status: "error",
    duration: 5000,
    isClosable: true,
    position: "top",
  });
};
