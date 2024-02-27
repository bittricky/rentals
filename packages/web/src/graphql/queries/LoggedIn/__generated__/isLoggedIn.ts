/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: isLoggedIn
// ====================================================

export interface isLoggedIn_isLoggedIn {
  __typename: "Viewer";
  id: string | null;
  token: string | null;
  avatar: string | null;
  hasWallet: boolean | null;
}

export interface isLoggedIn {
  isLoggedIn: isLoggedIn_isLoggedIn;
}
