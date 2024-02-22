import React from "react";
import { Link } from "react-router-dom";
import { Pane, Heading } from "evergreen-ui";

import { Viewer } from "../../graphql/lib/types";
import { MenuItems } from "./components/MenuItems";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Header = ({ viewer, setViewer }: Props) => {
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
      <MenuItems viewer={viewer} setViewer={setViewer} />
    </Pane>
  );
};
