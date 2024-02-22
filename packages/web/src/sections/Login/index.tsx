import { useEffect, useRef } from "react";
import { redirect } from "react-router-dom";
import { useApolloClient, useMutation } from "@apollo/client";
import { Pane, Heading, Paragraph, Button, Text } from "evergreen-ui";

import { LOG_IN } from "../../graphql/mutations/LogIn";
import { AUTH_URL } from "../../graphql/queries/AuthUrl";
import {
  LogIn as LoginData,
  LogInVariables,
} from "../../graphql/mutations/LogIn/__generated__/LogIn";
import { AuthUrl as AuthUrlData } from "../../graphql/queries/AuthUrl/__generated__/AuthUrl";
import { displaySuccessNotification, displayErrorMessage } from "../../utils";
import { ErrorBanner } from "../../components";

interface Props {
  setViewer: (viewer: any) => void;
}

export const Login = ({ setViewer }: Props): JSX.Element => {
  const client = useApolloClient();
  const [logIn, { data: logInData, loading: logInLoading, error: logInError }] =
    useMutation<LoginData, LogInVariables>(LOG_IN, {
      onCompleted: (data) => {
        if (data && data.logIn) {
          setViewer(data.logIn);
          displaySuccessNotification("You've successfully logged in!");
        }
      },
    });

  const loginRef = useRef(logIn);

  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code");
    if (code) {
      loginRef.current({ variables: { input: { code } } });
    }
  }, []);

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      });

      window.location.href = data.authUrl;
    } catch (error) {
      console.error(error);
      displayErrorMessage(
        "Sorry! We weren't able to log you in. Please try again later!"
      );
    }
  };

  if (logInLoading) {
    //TODO: add a loading component and call here
    console.log("....loading");
  }

  if (logInData && logInData.logIn) {
    const { id: viewerId } = logInData.logIn;
    redirect(`/user/${viewerId}`);
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
      background="tint2"
    >
      <Pane
        width={400}
        textAlign="center"
        padding={24}
        borderRadius={8}
        border="default"
        elevation={2}
        background="white"
      >
        {loginErrorBanner}
        <Heading size={600}>Login to your Rentals</Heading>
        <Paragraph marginTop={8}>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quod, quae
          voluptatum. Quisquam, voluptate. Quisquam, voluptate.
        </Paragraph>
        <Pane
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop={16}
        >
          <Button
            marginBottom={8}
            appearance="primary"
            onClick={handleAuthorize}
          >
            Sign in with Google
          </Button>
          <Text size={300} color="muted">
            Note: By signing in, you'll be redirected to the Google consent form
            to sign in with your Google account.
          </Text>
        </Pane>
      </Pane>
    </Pane>
  );
};

Login.displayName = "Login";
