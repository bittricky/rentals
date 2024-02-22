import React from "react";
import { Link } from "react-router-dom";

import { Viewer } from "../../graphql/lib/types";
import { MenuItems } from "./components/MenuItems";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const Header = ({ viewer, setViewer }: Props) => {
  return (
    <div>
      <div>
        <Link to="/">Logo</Link>
      </div>
      <div>
        <MenuItems viewer={viewer} setViewer={setViewer} />
      </div>
    </div>
  );
};
