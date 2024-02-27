import React from "react";
import { Pane, Heading } from "evergreen-ui";

export const Skeleton = () => {
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      padding={16}
      borderBottom
    >
      <Heading size={600}>Logo</Heading>
    </Pane>
  );
};
