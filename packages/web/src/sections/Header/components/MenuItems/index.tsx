import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Pane, Button, Menu, Popover, Avatar, Text } from "evergreen-ui";

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
      <Pane>
        <Popover
          content={
            <Menu>
              <Menu.Group>
                <Menu.Item>Profile</Menu.Item>
              </Menu.Group>
              <Menu.Divider />
              <Menu.Group>
                <Menu.Item>
                  <Text onClick={handleLogOut}>Log Out</Text>
                </Menu.Item>
              </Menu.Group>
            </Menu>
          }
        >
          <Avatar src={viewer.avatar} />
        </Popover>
      </Pane>
    ) : (
      <Pane>
        <Link to="/login">
          <Button appearance="primary">Sign In</Button>
        </Link>
      </Pane>
    );

  return (
    <Pane display="flex" alignItems="center">
      <Pane>
        <Link to="/host">Host</Link>
      </Pane>
      <Pane marginLeft={16}>{subMenuLogin}</Pane>
    </Pane>
  );
};
