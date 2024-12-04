import { gql } from '@apollo/client';

export const CONTACT_HOST = gql`
  mutation ContactHost($input: ContactHostInput!) {
    contactHost(input: $input) {
      success
      message
    }
  }
`;

export const ADD_PROPERTY_REVIEW = gql`
  mutation AddPropertyReview($listingId: ID!, $input: ReviewInput!) {
    addPropertyReview(listingId: $listingId, input: $input) {
      id
      listing {
        id
        title
      }
      author {
        id
        name
        avatar
      }
      content
      rating
      createdAt
    }
  }
`;

export const ADD_HOST_REVIEW = gql`
  mutation AddHostReview($hostId: ID!, $input: ReviewInput!) {
    addHostReview(hostId: $hostId, input: $input) {
      id
      host {
        id
        user {
          name
        }
      }
      author {
        id
        name
        avatar
      }
      content
      rating
      createdAt
    }
  }
`;
