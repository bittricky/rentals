import React from "react";
import { Link } from "react-router-dom";
import { Pane, Heading } from "evergreen-ui";

export const Skeleton = () => {
  return (
    <Pane
      display="flex"
      justifyContent="space-between"
      padding={16}
      borderBottom
    >
      <Link to="/">
        <Heading size={600}>Logo</Heading>
      </Link>
    </Pane>
  );
};
