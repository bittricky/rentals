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

export const LISTING = gql`
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

export const GET_HOSTS = gql`
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

export const GET_HOST = gql`
  query Host($id: ID!) {
    host(id: $id) {
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

export const HOST_REVIEWS = gql`
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

export const NEARBY_LOCATIONS = gql`
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