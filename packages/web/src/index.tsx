import React, { useState, useEffect } from "react";
import { render } from "react-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ChakraProvider, Box, Spinner } from "@chakra-ui/react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  useQuery,
  HttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import { IS_LOGGED_IN } from "./graphql/queries";
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

const authLink = setContext((_, { headers }) => {
  const token = sessionStorage.getItem("token");
  return {
    ...headers,
    "X-CSRF-Token": token || "",
  };
});

const httpLink = new HttpLink({
  uri: "/api",
  credentials: "include",
});

const link = authLink.concat(httpLink);

const client = new ApolloClient({
  link,
  cache: new InMemoryCache(),
});

//TODO: remove the use of non auth tokens being sent from the server to the client
const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
};

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer);
  const { data, loading, error } = useQuery(IS_LOGGED_IN);

  useEffect(() => {
    if (data && data.isLoggedIn) {
      const { id, token, avatar, hasWallet } = data.isLoggedIn;

      setViewer({
        id,
        token,
        avatar,
        hasWallet,
        didRequest: true,
      });

      if (token) {
        sessionStorage.setItem("token", token);
      } else {
        sessionStorage.removeItem("token");
      }
    }
  }, [data]);

  if (loading) {
    return (
      <Box>
        <Skeleton />
        <Box>
          <Spinner />
        </Box>
      </Box>
    );
  }

  if (error)
    return (
      <ErrorBanner description="We weren't able to verify if you were logged in. Please try again later!" />
    );

  return (
    <Router>
      <Header viewer={viewer} setViewer={setViewer} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/host" element={<Host />} />
        <Route path="/listing/:id" element={<Listing />} />
        <Route path="/listings/:location?" element={<Listings />} />
        <Route
          path="/user/:id"
          Component={(props) => <User {...props} viewer={viewer} />}
        />
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
    <ChakraProvider>
      <GoogleOAuthProvider clientId={clientId as string}>
        <ApolloProvider client={client}>
          <App />
        </ApolloProvider>
      </GoogleOAuthProvider>
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
