import React from "react";
import { Pane, Alert } from "evergreen-ui";

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
    <Pane>
      <Alert intent="danger" title={message} marginBottom={32}>
        {description}
      </Alert>
    </Pane>
  );
};
