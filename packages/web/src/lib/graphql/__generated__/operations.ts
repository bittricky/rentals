import * as Types from './types';

import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
const defaultOptions = {} as const;
export type ContactHostMutationVariables = Types.Exact<{
  input: Types.ContactHostInput;
}>;


export type ContactHostMutation = { __typename?: 'Mutation', contactHost: { __typename?: 'ContactHostResponse', success: boolean, message: string } };

export type AddPropertyReviewMutationVariables = Types.Exact<{
  listingId: Types.Scalars['ID']['input'];
  input: Types.ReviewInput;
}>;


export type AddPropertyReviewMutation = { __typename?: 'Mutation', addPropertyReview: { __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, listing: { __typename?: 'Listing', id: string, title: string }, author: { __typename?: 'User', id: string, name: string, avatar: string } } };

export type AddHostReviewMutationVariables = Types.Exact<{
  hostId: Types.Scalars['ID']['input'];
  input: Types.ReviewInput;
}>;


export type AddHostReviewMutation = { __typename?: 'Mutation', addHostReview: { __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, host: { __typename?: 'Host', id: string, user: { __typename?: 'User', name: string } }, author: { __typename?: 'User', id: string, name: string, avatar: string } } };

export type LogOutMutationVariables = Types.Exact<{ [key: string]: never; }>;


export type LogOutMutation = { __typename?: 'Mutation', logOut: { __typename?: 'Viewer', didRequest: boolean } };

export type LogInMutationVariables = Types.Exact<{
  input: Types.LoginInput;
}>;


export type LogInMutation = { __typename?: 'Mutation', logIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, hasWallet?: boolean | null, didRequest: boolean } };

export type ListingsQueryVariables = Types.Exact<{
  location?: Types.InputMaybe<Types.Scalars['String']['input']>;
  filter: Types.ListingsFilter;
  propertyType?: Types.InputMaybe<Types.Scalars['String']['input']>;
  minPrice?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  maxPrice?: Types.InputMaybe<Types.Scalars['Int']['input']>;
  limit: Types.Scalars['Int']['input'];
  page: Types.Scalars['Int']['input'];
}>;


export type ListingsQuery = { __typename?: 'Query', listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: Types.ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, swimmingPools: number, pantries: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }> }> } };

export type ListingQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type ListingQuery = { __typename?: 'Query', listing: { __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: Types.ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, swimmingPools: number, pantries: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }>, bookings?: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, tenant: { __typename?: 'User', id: string, name: string, avatar: string } }> } | null, reviews?: { __typename?: 'PropertyReviews', total: number, result: Array<{ __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } | null } };

export type UserQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type UserQuery = { __typename?: 'Query', user: { __typename?: 'User', id: string, name: string, avatar: string, email: string, hasWallet: boolean, income?: number | null, isHost: boolean, bookings: { __typename?: 'Bookings', total: number, result: Array<{ __typename?: 'Booking', id: string, checkIn: string, checkOut: string, listing: { __typename?: 'Listing', id: string, title: string, images: Array<string>, address: string, price: number } }> }, listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, images: Array<string>, address: string, price: number }> }, hostProfile?: { __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number } | null } };

export type HostsQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']['input'];
  page: Types.Scalars['Int']['input'];
}>;


export type HostsQuery = { __typename?: 'Query', hosts: { __typename?: 'Hosts', total: number, result: Array<{ __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number, user: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type HostQueryVariables = Types.Exact<{
  id: Types.Scalars['ID']['input'];
}>;


export type HostQuery = { __typename?: 'Query', host: { __typename?: 'Host', id: string, license: string, agency: string, experience: string, specializations: Array<string>, ratings: number, reviewCount: number, user: { __typename?: 'User', id: string, name: string, avatar: string, email: string }, reviews: { __typename?: 'HostReviews', total: number, result: Array<{ __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } } };

export type PropertyReviewsQueryVariables = Types.Exact<{
  listingId: Types.Scalars['ID']['input'];
  limit: Types.Scalars['Int']['input'];
  page: Types.Scalars['Int']['input'];
}>;


export type PropertyReviewsQuery = { __typename?: 'Query', propertyReviews: { __typename?: 'PropertyReviews', total: number, result: Array<{ __typename?: 'PropertyReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type HostReviewsQueryVariables = Types.Exact<{
  hostId: Types.Scalars['ID']['input'];
  limit: Types.Scalars['Int']['input'];
  page: Types.Scalars['Int']['input'];
}>;


export type HostReviewsQuery = { __typename?: 'Query', hostReviews: { __typename?: 'HostReviews', total: number, result: Array<{ __typename?: 'HostReview', id: string, content: string, rating: number, createdAt: string, author: { __typename?: 'User', id: string, name: string, avatar: string } }> } };

export type FeaturedListingsQueryVariables = Types.Exact<{
  limit: Types.Scalars['Int']['input'];
}>;


export type FeaturedListingsQuery = { __typename?: 'Query', listings: { __typename?: 'Listings', total: number, result: Array<{ __typename?: 'Listing', id: string, title: string, description: string, images: Array<string>, country: string, admin: string, city: string, type: Types.ListingType, address: string, price: number, numOfGuests: number, bedrooms: number, bathrooms: number, averageRating?: number | null, reviewCount?: number | null, host: { __typename?: 'User', id: string, name: string, avatar: string, hasWallet: boolean }, features: Array<{ __typename?: 'Feature', name: string, icon: string, description?: string | null }> }> } };

export type NearbyLocationsQueryVariables = Types.Exact<{
  listingId: Types.Scalars['ID']['input'];
  radius: Types.Scalars['Float']['input'];
}>;


export type NearbyLocationsQuery = { __typename?: 'Query', nearbyLocations: { __typename?: 'NearbyLocations', categories: Array<{ __typename?: 'NearbyCategory', name: string, icon: string, places: Array<{ __typename?: 'NearbyPlace', name: string, distance: number, type: string }> }> } };

export type IsLoggedInQueryVariables = Types.Exact<{ [key: string]: never; }>;


export type IsLoggedInQuery = { __typename?: 'Query', isLoggedIn: { __typename?: 'Viewer', id?: string | null, token?: string | null, avatar?: string | null, name?: string | null, email?: string | null, didRequest: boolean } };


export const ContactHostDocument = gql`
    mutation ContactHost($input: ContactHostInput!) {
  contactHost(input: $input) {
    success
    message
  }
}
    `;
export type ContactHostMutationFn = Apollo.MutationFunction<Types.ContactHostMutation, Types.ContactHostMutationVariables>;

/**
 * __useContactHostMutation__
 *
 * To run a mutation, you first call `useContactHostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useContactHostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [contactHostMutation, { data, loading, error }] = useContactHostMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useContactHostMutation(baseOptions?: Apollo.MutationHookOptions<Types.ContactHostMutation, Types.ContactHostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.ContactHostMutation, Types.ContactHostMutationVariables>(ContactHostDocument, options);
      }
export type ContactHostMutationHookResult = ReturnType<typeof useContactHostMutation>;
export type ContactHostMutationResult = Apollo.MutationResult<Types.ContactHostMutation>;
export type ContactHostMutationOptions = Apollo.BaseMutationOptions<Types.ContactHostMutation, Types.ContactHostMutationVariables>;
export const AddPropertyReviewDocument = gql`
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
export type AddPropertyReviewMutationFn = Apollo.MutationFunction<Types.AddPropertyReviewMutation, Types.AddPropertyReviewMutationVariables>;

/**
 * __useAddPropertyReviewMutation__
 *
 * To run a mutation, you first call `useAddPropertyReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddPropertyReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addPropertyReviewMutation, { data, loading, error }] = useAddPropertyReviewMutation({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddPropertyReviewMutation(baseOptions?: Apollo.MutationHookOptions<Types.AddPropertyReviewMutation, Types.AddPropertyReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AddPropertyReviewMutation, Types.AddPropertyReviewMutationVariables>(AddPropertyReviewDocument, options);
      }
export type AddPropertyReviewMutationHookResult = ReturnType<typeof useAddPropertyReviewMutation>;
export type AddPropertyReviewMutationResult = Apollo.MutationResult<Types.AddPropertyReviewMutation>;
export type AddPropertyReviewMutationOptions = Apollo.BaseMutationOptions<Types.AddPropertyReviewMutation, Types.AddPropertyReviewMutationVariables>;
export const AddHostReviewDocument = gql`
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
export type AddHostReviewMutationFn = Apollo.MutationFunction<Types.AddHostReviewMutation, Types.AddHostReviewMutationVariables>;

/**
 * __useAddHostReviewMutation__
 *
 * To run a mutation, you first call `useAddHostReviewMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddHostReviewMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addHostReviewMutation, { data, loading, error }] = useAddHostReviewMutation({
 *   variables: {
 *      hostId: // value for 'hostId'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAddHostReviewMutation(baseOptions?: Apollo.MutationHookOptions<Types.AddHostReviewMutation, Types.AddHostReviewMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.AddHostReviewMutation, Types.AddHostReviewMutationVariables>(AddHostReviewDocument, options);
      }
export type AddHostReviewMutationHookResult = ReturnType<typeof useAddHostReviewMutation>;
export type AddHostReviewMutationResult = Apollo.MutationResult<Types.AddHostReviewMutation>;
export type AddHostReviewMutationOptions = Apollo.BaseMutationOptions<Types.AddHostReviewMutation, Types.AddHostReviewMutationVariables>;
export const LogOutDocument = gql`
    mutation LogOut {
  logOut {
    didRequest
  }
}
    `;
export type LogOutMutationFn = Apollo.MutationFunction<Types.LogOutMutation, Types.LogOutMutationVariables>;

/**
 * __useLogOutMutation__
 *
 * To run a mutation, you first call `useLogOutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogOutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logOutMutation, { data, loading, error }] = useLogOutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogOutMutation(baseOptions?: Apollo.MutationHookOptions<Types.LogOutMutation, Types.LogOutMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LogOutMutation, Types.LogOutMutationVariables>(LogOutDocument, options);
      }
export type LogOutMutationHookResult = ReturnType<typeof useLogOutMutation>;
export type LogOutMutationResult = Apollo.MutationResult<Types.LogOutMutation>;
export type LogOutMutationOptions = Apollo.BaseMutationOptions<Types.LogOutMutation, Types.LogOutMutationVariables>;
export const LogInDocument = gql`
    mutation LogIn($input: LoginInput!) {
  logIn(input: $input) {
    id
    token
    avatar
    hasWallet
    didRequest
  }
}
    `;
export type LogInMutationFn = Apollo.MutationFunction<Types.LogInMutation, Types.LogInMutationVariables>;

/**
 * __useLogInMutation__
 *
 * To run a mutation, you first call `useLogInMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogInMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logInMutation, { data, loading, error }] = useLogInMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLogInMutation(baseOptions?: Apollo.MutationHookOptions<Types.LogInMutation, Types.LogInMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<Types.LogInMutation, Types.LogInMutationVariables>(LogInDocument, options);
      }
export type LogInMutationHookResult = ReturnType<typeof useLogInMutation>;
export type LogInMutationResult = Apollo.MutationResult<Types.LogInMutation>;
export type LogInMutationOptions = Apollo.BaseMutationOptions<Types.LogInMutation, Types.LogInMutationVariables>;
export const ListingsDocument = gql`
    query Listings($location: String, $filter: ListingsFilter!, $propertyType: String, $minPrice: Int, $maxPrice: Int, $limit: Int!, $page: Int!) {
  listings(
    location: $location
    filter: $filter
    propertyType: $propertyType
    minPrice: $minPrice
    maxPrice: $maxPrice
    limit: $limit
    page: $page
  ) {
    total
    result {
      id
      title
      description
      images
      host {
        id
        name
        avatar
        hasWallet
      }
      country
      admin
      city
      type
      address
      price
      numOfGuests
      bedrooms
      bathrooms
      swimmingPools
      pantries
      features {
        name
        icon
        description
      }
      averageRating
      reviewCount
    }
  }
}
    `;

/**
 * __useListingsQuery__
 *
 * To run a query within a React component, call `useListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingsQuery({
 *   variables: {
 *      location: // value for 'location'
 *      filter: // value for 'filter'
 *      propertyType: // value for 'propertyType'
 *      minPrice: // value for 'minPrice'
 *      maxPrice: // value for 'maxPrice'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useListingsQuery(baseOptions: Apollo.QueryHookOptions<Types.ListingsQuery, Types.ListingsQueryVariables> & ({ variables: Types.ListingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ListingsQuery, Types.ListingsQueryVariables>(ListingsDocument, options);
      }
export function useListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ListingsQuery, Types.ListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ListingsQuery, Types.ListingsQueryVariables>(ListingsDocument, options);
        }
export function useListingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.ListingsQuery, Types.ListingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ListingsQuery, Types.ListingsQueryVariables>(ListingsDocument, options);
        }
export type ListingsQueryHookResult = ReturnType<typeof useListingsQuery>;
export type ListingsLazyQueryHookResult = ReturnType<typeof useListingsLazyQuery>;
export type ListingsSuspenseQueryHookResult = ReturnType<typeof useListingsSuspenseQuery>;
export type ListingsQueryResult = Apollo.QueryResult<Types.ListingsQuery, Types.ListingsQueryVariables>;
export const ListingDocument = gql`
    query Listing($id: ID!) {
  listing(id: $id) {
    id
    title
    description
    images
    host {
      id
      name
      avatar
      hasWallet
    }
    country
    admin
    city
    type
    address
    price
    numOfGuests
    bedrooms
    bathrooms
    swimmingPools
    pantries
    features {
      name
      icon
      description
    }
    bookings(limit: 10, page: 1) {
      total
      result {
        id
        checkIn
        checkOut
        tenant {
          id
          name
          avatar
        }
      }
    }
    reviews(limit: 5, page: 1) {
      total
      result {
        id
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
    averageRating
    reviewCount
  }
}
    `;

/**
 * __useListingQuery__
 *
 * To run a query within a React component, call `useListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useListingQuery(baseOptions: Apollo.QueryHookOptions<Types.ListingQuery, Types.ListingQueryVariables> & ({ variables: Types.ListingQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.ListingQuery, Types.ListingQueryVariables>(ListingDocument, options);
      }
export function useListingLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.ListingQuery, Types.ListingQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.ListingQuery, Types.ListingQueryVariables>(ListingDocument, options);
        }
export function useListingSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.ListingQuery, Types.ListingQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.ListingQuery, Types.ListingQueryVariables>(ListingDocument, options);
        }
export type ListingQueryHookResult = ReturnType<typeof useListingQuery>;
export type ListingLazyQueryHookResult = ReturnType<typeof useListingLazyQuery>;
export type ListingSuspenseQueryHookResult = ReturnType<typeof useListingSuspenseQuery>;
export type ListingQueryResult = Apollo.QueryResult<Types.ListingQuery, Types.ListingQueryVariables>;
export const UserDocument = gql`
    query User($id: ID!) {
  user(id: $id) {
    id
    name
    avatar
    email
    hasWallet
    income
    bookings(limit: 10, page: 1) {
      total
      result {
        id
        listing {
          id
          title
          images
          address
          price
        }
        checkIn
        checkOut
      }
    }
    listings(limit: 10, page: 1) {
      total
      result {
        id
        title
        images
        address
        price
      }
    }
    isHost
    hostProfile {
      id
      license
      agency
      experience
      specializations
      ratings
      reviewCount
    }
  }
}
    `;

/**
 * __useUserQuery__
 *
 * To run a query within a React component, call `useUserQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useUserQuery(baseOptions: Apollo.QueryHookOptions<Types.UserQuery, Types.UserQueryVariables> & ({ variables: Types.UserQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.UserQuery, Types.UserQueryVariables>(UserDocument, options);
      }
export function useUserLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.UserQuery, Types.UserQueryVariables>(UserDocument, options);
        }
export function useUserSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.UserQuery, Types.UserQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.UserQuery, Types.UserQueryVariables>(UserDocument, options);
        }
export type UserQueryHookResult = ReturnType<typeof useUserQuery>;
export type UserLazyQueryHookResult = ReturnType<typeof useUserLazyQuery>;
export type UserSuspenseQueryHookResult = ReturnType<typeof useUserSuspenseQuery>;
export type UserQueryResult = Apollo.QueryResult<Types.UserQuery, Types.UserQueryVariables>;
export const HostsDocument = gql`
    query Hosts($limit: Int!, $page: Int!) {
  hosts(limit: $limit, page: $page) {
    total
    result {
      id
      user {
        id
        name
        avatar
      }
      license
      agency
      experience
      specializations
      ratings
      reviewCount
    }
  }
}
    `;

/**
 * __useHostsQuery__
 *
 * To run a query within a React component, call `useHostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHostsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useHostsQuery(baseOptions: Apollo.QueryHookOptions<Types.HostsQuery, Types.HostsQueryVariables> & ({ variables: Types.HostsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.HostsQuery, Types.HostsQueryVariables>(HostsDocument, options);
      }
export function useHostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.HostsQuery, Types.HostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.HostsQuery, Types.HostsQueryVariables>(HostsDocument, options);
        }
export function useHostsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.HostsQuery, Types.HostsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.HostsQuery, Types.HostsQueryVariables>(HostsDocument, options);
        }
export type HostsQueryHookResult = ReturnType<typeof useHostsQuery>;
export type HostsLazyQueryHookResult = ReturnType<typeof useHostsLazyQuery>;
export type HostsSuspenseQueryHookResult = ReturnType<typeof useHostsSuspenseQuery>;
export type HostsQueryResult = Apollo.QueryResult<Types.HostsQuery, Types.HostsQueryVariables>;
export const HostDocument = gql`
    query Host($id: ID!) {
  host(id: $id) {
    id
    user {
      id
      name
      avatar
      email
    }
    license
    agency
    experience
    specializations
    ratings
    reviewCount
    reviews(limit: 5, page: 1) {
      total
      result {
        id
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
  }
}
    `;

/**
 * __useHostQuery__
 *
 * To run a query within a React component, call `useHostQuery` and pass it any options that fit your needs.
 * When your component renders, `useHostQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHostQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useHostQuery(baseOptions: Apollo.QueryHookOptions<Types.HostQuery, Types.HostQueryVariables> & ({ variables: Types.HostQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.HostQuery, Types.HostQueryVariables>(HostDocument, options);
      }
export function useHostLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.HostQuery, Types.HostQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.HostQuery, Types.HostQueryVariables>(HostDocument, options);
        }
export function useHostSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.HostQuery, Types.HostQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.HostQuery, Types.HostQueryVariables>(HostDocument, options);
        }
export type HostQueryHookResult = ReturnType<typeof useHostQuery>;
export type HostLazyQueryHookResult = ReturnType<typeof useHostLazyQuery>;
export type HostSuspenseQueryHookResult = ReturnType<typeof useHostSuspenseQuery>;
export type HostQueryResult = Apollo.QueryResult<Types.HostQuery, Types.HostQueryVariables>;
export const PropertyReviewsDocument = gql`
    query PropertyReviews($listingId: ID!, $limit: Int!, $page: Int!) {
  propertyReviews(listingId: $listingId, limit: $limit, page: $page) {
    total
    result {
      id
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
}
    `;

/**
 * __usePropertyReviewsQuery__
 *
 * To run a query within a React component, call `usePropertyReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertyReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertyReviewsQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function usePropertyReviewsQuery(baseOptions: Apollo.QueryHookOptions<Types.PropertyReviewsQuery, Types.PropertyReviewsQueryVariables> & ({ variables: Types.PropertyReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.PropertyReviewsQuery, Types.PropertyReviewsQueryVariables>(PropertyReviewsDocument, options);
      }
export function usePropertyReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.PropertyReviewsQuery, Types.PropertyReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.PropertyReviewsQuery, Types.PropertyReviewsQueryVariables>(PropertyReviewsDocument, options);
        }
export function usePropertyReviewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.PropertyReviewsQuery, Types.PropertyReviewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.PropertyReviewsQuery, Types.PropertyReviewsQueryVariables>(PropertyReviewsDocument, options);
        }
export type PropertyReviewsQueryHookResult = ReturnType<typeof usePropertyReviewsQuery>;
export type PropertyReviewsLazyQueryHookResult = ReturnType<typeof usePropertyReviewsLazyQuery>;
export type PropertyReviewsSuspenseQueryHookResult = ReturnType<typeof usePropertyReviewsSuspenseQuery>;
export type PropertyReviewsQueryResult = Apollo.QueryResult<Types.PropertyReviewsQuery, Types.PropertyReviewsQueryVariables>;
export const HostReviewsDocument = gql`
    query HostReviews($hostId: ID!, $limit: Int!, $page: Int!) {
  hostReviews(hostId: $hostId, limit: $limit, page: $page) {
    total
    result {
      id
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
}
    `;

/**
 * __useHostReviewsQuery__
 *
 * To run a query within a React component, call `useHostReviewsQuery` and pass it any options that fit your needs.
 * When your component renders, `useHostReviewsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useHostReviewsQuery({
 *   variables: {
 *      hostId: // value for 'hostId'
 *      limit: // value for 'limit'
 *      page: // value for 'page'
 *   },
 * });
 */
export function useHostReviewsQuery(baseOptions: Apollo.QueryHookOptions<Types.HostReviewsQuery, Types.HostReviewsQueryVariables> & ({ variables: Types.HostReviewsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.HostReviewsQuery, Types.HostReviewsQueryVariables>(HostReviewsDocument, options);
      }
export function useHostReviewsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.HostReviewsQuery, Types.HostReviewsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.HostReviewsQuery, Types.HostReviewsQueryVariables>(HostReviewsDocument, options);
        }
export function useHostReviewsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.HostReviewsQuery, Types.HostReviewsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.HostReviewsQuery, Types.HostReviewsQueryVariables>(HostReviewsDocument, options);
        }
export type HostReviewsQueryHookResult = ReturnType<typeof useHostReviewsQuery>;
export type HostReviewsLazyQueryHookResult = ReturnType<typeof useHostReviewsLazyQuery>;
export type HostReviewsSuspenseQueryHookResult = ReturnType<typeof useHostReviewsSuspenseQuery>;
export type HostReviewsQueryResult = Apollo.QueryResult<Types.HostReviewsQuery, Types.HostReviewsQueryVariables>;
export const FeaturedListingsDocument = gql`
    query FeaturedListings($limit: Int!) {
  listings(filter: PRICE_HIGH_TO_LOW, limit: $limit, page: 1) {
    total
    result {
      id
      title
      description
      images
      host {
        id
        name
        avatar
        hasWallet
      }
      country
      admin
      city
      type
      address
      price
      numOfGuests
      bedrooms
      bathrooms
      features {
        name
        icon
        description
      }
      averageRating
      reviewCount
    }
  }
}
    `;

/**
 * __useFeaturedListingsQuery__
 *
 * To run a query within a React component, call `useFeaturedListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useFeaturedListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useFeaturedListingsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *   },
 * });
 */
export function useFeaturedListingsQuery(baseOptions: Apollo.QueryHookOptions<Types.FeaturedListingsQuery, Types.FeaturedListingsQueryVariables> & ({ variables: Types.FeaturedListingsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.FeaturedListingsQuery, Types.FeaturedListingsQueryVariables>(FeaturedListingsDocument, options);
      }
export function useFeaturedListingsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.FeaturedListingsQuery, Types.FeaturedListingsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.FeaturedListingsQuery, Types.FeaturedListingsQueryVariables>(FeaturedListingsDocument, options);
        }
export function useFeaturedListingsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.FeaturedListingsQuery, Types.FeaturedListingsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.FeaturedListingsQuery, Types.FeaturedListingsQueryVariables>(FeaturedListingsDocument, options);
        }
export type FeaturedListingsQueryHookResult = ReturnType<typeof useFeaturedListingsQuery>;
export type FeaturedListingsLazyQueryHookResult = ReturnType<typeof useFeaturedListingsLazyQuery>;
export type FeaturedListingsSuspenseQueryHookResult = ReturnType<typeof useFeaturedListingsSuspenseQuery>;
export type FeaturedListingsQueryResult = Apollo.QueryResult<Types.FeaturedListingsQuery, Types.FeaturedListingsQueryVariables>;
export const NearbyLocationsDocument = gql`
    query NearbyLocations($listingId: ID!, $radius: Float!) {
  nearbyLocations(listingId: $listingId, radius: $radius) {
    categories {
      name
      icon
      places {
        name
        distance
        type
      }
    }
  }
}
    `;

/**
 * __useNearbyLocationsQuery__
 *
 * To run a query within a React component, call `useNearbyLocationsQuery` and pass it any options that fit your needs.
 * When your component renders, `useNearbyLocationsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNearbyLocationsQuery({
 *   variables: {
 *      listingId: // value for 'listingId'
 *      radius: // value for 'radius'
 *   },
 * });
 */
export function useNearbyLocationsQuery(baseOptions: Apollo.QueryHookOptions<Types.NearbyLocationsQuery, Types.NearbyLocationsQueryVariables> & ({ variables: Types.NearbyLocationsQueryVariables; skip?: boolean; } | { skip: boolean; }) ) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.NearbyLocationsQuery, Types.NearbyLocationsQueryVariables>(NearbyLocationsDocument, options);
      }
export function useNearbyLocationsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.NearbyLocationsQuery, Types.NearbyLocationsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.NearbyLocationsQuery, Types.NearbyLocationsQueryVariables>(NearbyLocationsDocument, options);
        }
export function useNearbyLocationsSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.NearbyLocationsQuery, Types.NearbyLocationsQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.NearbyLocationsQuery, Types.NearbyLocationsQueryVariables>(NearbyLocationsDocument, options);
        }
export type NearbyLocationsQueryHookResult = ReturnType<typeof useNearbyLocationsQuery>;
export type NearbyLocationsLazyQueryHookResult = ReturnType<typeof useNearbyLocationsLazyQuery>;
export type NearbyLocationsSuspenseQueryHookResult = ReturnType<typeof useNearbyLocationsSuspenseQuery>;
export type NearbyLocationsQueryResult = Apollo.QueryResult<Types.NearbyLocationsQuery, Types.NearbyLocationsQueryVariables>;
export const IsLoggedInDocument = gql`
    query IsLoggedIn {
  isLoggedIn {
    id
    token
    avatar
    name
    email
    didRequest
  }
}
    `;

/**
 * __useIsLoggedInQuery__
 *
 * To run a query within a React component, call `useIsLoggedInQuery` and pass it any options that fit your needs.
 * When your component renders, `useIsLoggedInQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useIsLoggedInQuery({
 *   variables: {
 *   },
 * });
 */
export function useIsLoggedInQuery(baseOptions?: Apollo.QueryHookOptions<Types.IsLoggedInQuery, Types.IsLoggedInQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<Types.IsLoggedInQuery, Types.IsLoggedInQueryVariables>(IsLoggedInDocument, options);
      }
export function useIsLoggedInLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<Types.IsLoggedInQuery, Types.IsLoggedInQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<Types.IsLoggedInQuery, Types.IsLoggedInQueryVariables>(IsLoggedInDocument, options);
        }
export function useIsLoggedInSuspenseQuery(baseOptions?: Apollo.SkipToken | Apollo.SuspenseQueryHookOptions<Types.IsLoggedInQuery, Types.IsLoggedInQueryVariables>) {
          const options = baseOptions === Apollo.skipToken ? baseOptions : {...defaultOptions, ...baseOptions}
          return Apollo.useSuspenseQuery<Types.IsLoggedInQuery, Types.IsLoggedInQueryVariables>(IsLoggedInDocument, options);
        }
export type IsLoggedInQueryHookResult = ReturnType<typeof useIsLoggedInQuery>;
export type IsLoggedInLazyQueryHookResult = ReturnType<typeof useIsLoggedInLazyQuery>;
export type IsLoggedInSuspenseQueryHookResult = ReturnType<typeof useIsLoggedInSuspenseQuery>;
export type IsLoggedInQueryResult = Apollo.QueryResult<Types.IsLoggedInQuery, Types.IsLoggedInQueryVariables>;