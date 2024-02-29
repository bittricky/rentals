import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import { Flex, Heading, Stack, Text, Spinner, Box } from "@chakra-ui/react";

import { LOG_IN } from "../../graphql/mutations/LogIn";
import {
  LogIn as LoginData,
  LogInVariables,
} from "../../graphql/mutations/LogIn/__generated__/LogIn";
import { displaySuccessNotification, displayErrorMessage } from "../../utils";
import { ErrorBanner } from "../../components";

interface Props {
  setViewer: (viewer: any) => void;
}

export const Login = ({ setViewer }: Props): JSX.Element => {
  const navigate = useNavigate();
  const [logIn, { loading: logInLoading, error: logInError }] = useMutation<
    LoginData,
    LogInVariables
  >(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
        sessionStorage.setItem("token", data.logIn.token as string);
        displaySuccessNotification("You've successfully logged in!");
        navigate(`/user/${data.logIn.id}`);
      }
    },
  });

  const handleLogin = async (credentialResponse: any) => {
    try {
      const { credential } = credentialResponse;

      logIn({
        variables: {
          input: { idToken: credential },
        },
      });
    } catch (error) {
      console.error(error);
      displayErrorMessage(
        "Sorry! We weren't able to log you in. Please try again later!"
      );
    }
  };

  if (logInLoading) {
    return (
      <Box>
        <Spinner />
      </Box>
    );
  }

  const loginErrorBanner = logInError ? (
    <ErrorBanner description="Sorry! We weren't able to log you in. Please try again soon." />
  ) : null;

  return (
    <Flex minH={"100vh"} align={"center"} justify={"center"}>
      <Stack
        spacing={4}
        w={"full"}
        maxW={"md"}
        rounded={"xl"}
        boxShadow={"lg"}
        p={6}
        my={12}
      >
        {loginErrorBanner}
        <Heading fontSize={{ base: "2xl", md: "3xl" }}>
          Login to your Rentals
        </Heading>
        <Text marginTop={8}>
          Sign in with Google to start booking your rentals!
        </Text>
        {/* TODO: customize Google SSO Button */}
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() =>
            displayErrorMessage(
              "Google login was unsuccessful. Please try again later."
            )
          }
        />
      </Stack>
    </Flex>
  );
};

Login.displayName = "Login";
