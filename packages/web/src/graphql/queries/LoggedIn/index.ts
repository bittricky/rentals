import { gql } from "apollo-boost";

export const IS_LOGGED_IN = gql`
  query isLoggedIn {
    isLoggedIn {
      id
      token
      avatar
      hasWallet
    }
  }
`;