import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";

import { LOG_OUT } from "../../../../graphql/mutations";
import { LogOut as LogOutData } from "../../../../graphql/mutations/LogOut/__generated__/LogOut";
import { Viewer } from "../../../../graphql/lib/types";

import {
  displaySuccessNotification,
  displayErrorMessage,
} from "../../../../utils";

interface Props {
  viewer: Viewer;
  setViewer: (viewer: Viewer) => void;
}

export const MenuItems = ({ viewer, setViewer }: Props) => {
  const [logOut] = useMutation<LogOutData>(LOG_OUT, {
    onCompleted: (data) => {
      if (data && data.logOut) {
        setViewer(data.logOut);
        displaySuccessNotification("You've successfully logged out!");
      }
    },
    onError: (data) => {
      displayErrorMessage(
        "Sorry! We weren't able to log you out. Please try again later."
      );
    },
  });

  const handleLogOut = () => logOut();

  const subMenuLogin =
    viewer.id && viewer.avatar ? (
      <div>
        <ul>
          <li>Profile</li>
          <li>
            <div onClick={handleLogOut}>Log Out</div>
          </li>
        </ul>
      </div>
    ) : (
      <div>
        <ul>
          <Link to="/host">
            <li>Host</li>
          </Link>
          <li>
            <Link to="/login">
              <button>Sign In</button>
            </Link>
          </li>
        </ul>
      </div>
    );

  return <div>{subMenuLogin}</div>;
};
