import { toaster } from "evergreen-ui";

//TODO: Add notification functionality
export const displaySuccessNotification = (message: string) => {
  return toaster.success(message);
};
//TODO: display the error messafe
export const displayErrorMessage = (error: string) => {
  return toaster.warning(error);
};
