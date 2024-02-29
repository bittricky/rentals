import React from "react";
import { Link } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Center,
  Stack,
  Box,
} from "@chakra-ui/react";

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
        sessionStorage.removeItem("token");
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
      <Box>
        <Menu>
          <MenuButton
            as={Button}
            rounded={"full"}
            variant={"link"}
            cursor={"pointer"}
            minW={0}
          >
            <Avatar size={"sm"} src={viewer.avatar} />
          </MenuButton>
          <MenuList alignItems={"center"}>
            <br />
            <Center>
              <Avatar
                size={"2xl"}
                src={"https://avatars.dicebear.com/api/male/username.svg"}
              />
            </Center>
            <MenuDivider />
            <MenuItem>Profile</MenuItem>
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    ) : (
      <Box>
        <Link to="/login">
          <Button colorScheme="purple" variant="ghost">
            Sign In
          </Button>
        </Link>
      </Box>
    );

  return (
    <Stack direction={"row"} spacing={7}>
      <Link to="/host">Host</Link>
      {subMenuLogin}
    </Stack>
  );
};

MenuItems.displayName = "MenuItems";
