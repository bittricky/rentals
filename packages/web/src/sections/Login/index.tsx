import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { GoogleLogin } from "@react-oauth/google";
import { Pane, Heading, Paragraph, Spinner } from "evergreen-ui";

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
      <Pane
        display="flex"
        alignItems="center"
        justifyContent="center"
        height="100vh"
      >
        <Spinner />
      </Pane>
    );
  }

  const loginErrorBanner = logInError ? (
    <ErrorBanner description="Sorry! We weren't able to log you in. Please try again soon." />
  ) : null;

  return (
    <Pane
      display="flex"
      alignItems="center"
      justifyContent="center"
      height="100vh"
    >
      <Pane
        width={400}
        textAlign="center"
        padding={24}
        borderRadius={8}
        border="default"
        elevation={2}
      >
        {loginErrorBanner}
        <Heading size={600}>Login to your Rentals</Heading>
        <Paragraph marginTop={8}>
          Sign in with Google to start booking your rentals!
        </Paragraph>
        <GoogleLogin
          onSuccess={handleLogin}
          onError={() =>
            displayErrorMessage(
              "Google login was unsuccessful. Please try again later."
            )
          }
        />
      </Pane>
    </Pane>
  );
};

Login.displayName = "Login";
