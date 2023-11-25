//TODO: Add notification functionality
export const displaySuccessNotification = (
  message: string,
  description?: string
) => {
  return {
    message,
    description,
    placement: "topLeft",
    style: {
      marginTop: 50,
    },
  };
};
//TODO: display the error messafe
export const displayErrorMessage = (error: string) => {
  console.error(error);
};
