import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { useMutation } from "@apollo/client";
import {
  Avatar,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  Stack,
  Box,
  Text,
  Link,
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
            <MenuItem>
              <Link
                as={RouterLink}
                to={`/user/${viewer.id}`}
                style={{ width: "100%" }}
              >
                Profile
              </Link>
            </MenuItem>
            <MenuDivider />
            <MenuItem onClick={handleLogOut}>Logout</MenuItem>
          </MenuList>
        </Menu>
      </Box>
    ) : (
      <Box>
        <Link as={RouterLink} to="/login" _hover={{ textDecor: "none" }}>
          <Button colorScheme="purple" variant="ghost">
            Sign In
          </Button>
        </Link>
      </Box>
    );

  return (
    <Stack direction={"row"} spacing={7} align="center">
      <Link as={RouterLink} to="/host" _hover={{ textDecor: "none" }}>
        <Text fontSize="md">Host</Text>
      </Link>
      {subMenuLogin}
    </Stack>
  );
};

MenuItems.displayName = "MenuItems";
