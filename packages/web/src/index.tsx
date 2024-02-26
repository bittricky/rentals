import React, { useState, useEffect, useRef } from "react";
import { render } from "react-dom";
import { Pane, Spinner } from "evergreen-ui";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useMutation,
} from "@apollo/client";
import { LOG_IN } from "./graphql/mutations";
import {
  LogIn as LoginData,
  LogInVariables,
} from "./graphql/mutations/LogIn/__generated__/LogIn";
import { Viewer } from "./graphql/lib/types";
import {
  Header,
  Home,
  Host,
  Listing,
  User,
  NotFound,
  Listings,
  Login,
} from "./sections";
import { ErrorBanner, Skeleton } from "./components";
import reportWebVitals from "./reportWebVitals";

import "./styles/index.css";

const client = new ApolloClient({
  uri: "/api",
  cache: new InMemoryCache(),
});

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const [logIn, { error }] = useMutation<LoginData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn);
      }
    },
  });

  //TODO: causing an infinite loop - FIX
  // const logInRef = useRef(logIn);

  // useEffect(() => {
  //   logInRef.current();
  // });

  const skeletonLoading =
    !viewer.didRequest && !error ? (
      <Pane>
        <Skeleton />
        <Spinner marginX="auto" marginY="auto" />
      </Pane>
    ) : null;

  const logInErrorBannerElement = error ? (
    <ErrorBanner description="We were not able to verify if you were logged in. Please try again later." />
  ) : null;

  return (
    <Router>
      {logInErrorBannerElement}
      <Header viewer={viewer} setViewer={setViewer} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<Host />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/listings/:location?" element={<Listings />} />
        <Route path="/user/:id" element={<User />} />
        <Route
          path="/login"
          Component={(props) => <Login {...props} setViewer={setViewer} />}
        />
        <Route element={<NotFound />} />
      </Routes>
    </Router>
  );
};

const clientId = process.env.REACT_APP_G_CLIENT_ID;

render(
  <React.StrictMode>
    {/*TODO: store this in an environment variable */}
    <GoogleOAuthProvider clientId={clientId as string}>
      <ApolloProvider client={client}>
        <App />
      </ApolloProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
