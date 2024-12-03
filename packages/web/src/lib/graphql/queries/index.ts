import { gql } from '@apollo/client';

export const LISTINGS = gql`
  query Listings(
    $location: String
    $filter: ListingsFilter!
    $propertyType: String
    $minPrice: Int
    $maxPrice: Int
    $limit: Int!
    $page: Int!
  ) {
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
        image
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

export const LISTING = gql`
  query Listing($id: ID!) {
    listing(id: $id) {
      id
      title
      description
      image
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

export const USER = gql`
  query User($id: ID!) {
    user(id: $id) {
      id
      name
      avatar
      contact
      hasWallet
      income
      bookings(limit: 10, page: 1) {
        total
        result {
          id
          listing {
            id
            title
            image
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
          image
          address
          price
        }
      }
      isAgent
      agentProfile {
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

export const AGENTS = gql`
  query Agents($limit: Int!, $page: Int!) {
    agents(limit: $limit, page: $page) {
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

export const AGENT = gql`
  query Agent($id: ID!) {
    agent(id: $id) {
      id
      user {
        id
        name
        avatar
        contact
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

export const PROPERTY_REVIEWS = gql`
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

export const AGENT_REVIEWS = gql`
  query AgentReviews($agentId: ID!, $limit: Int!, $page: Int!) {
    agentReviews(agentId: $agentId, limit: $limit, page: $page) {
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

export const FEATURED_LISTINGS = gql`
  query FeaturedListings($limit: Int!) {
    listings(
      filter: PRICE_HIGH_TO_LOW
      limit: $limit
      page: 1
    ) {
      total
      result {
        id
        title
        description
        image
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
