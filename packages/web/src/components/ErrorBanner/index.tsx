import React from "react";

interface Props {
  message?: string;
  description?: string;
}

export const ErrorBanner = (props: Props) => {
  const {
    message = "Uh oh! Something went wrong :(",
    description = "Look like something went wrong. Please check your connection and/or try again soon.",
  } = props;
  return (
    <>
      <div>
        <div>
          <span>{message}</span>
          <span>{description}</span>
        </div>
      </div>
    </>
  );
};
