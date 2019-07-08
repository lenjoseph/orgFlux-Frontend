import gql from 'graphql-tag'

// passing
export const GET_LOCATIONS = gql `
    query locations {
      locations{
        locations {
        _id
        organization
        name
        address
        city
        state
        country
        zip
        latitude
        longitude
        CreatedAt
        UpdatedAt
    }
  }
  }
`
// passing
export const GET_LOCATION = gql `
    query location($id: ID!) {
        location(id: $id) {
        _id
        organization
        name
        address
        city
        state
        country
        zip
        latitude
        longitude
        CreatedAt
        UpdatedAt
    }
  }
`

// passing
export const ORG_LOCATIONS = gql `
    query orgLocations($id: ID!) {
        orgLocations(id: $id) {
          locations{
        _id
        organization
        name
        address
        city
        state
        country
        zip
        latitude
        longitude
        CreatedAt
        UpdatedAt
    }
  }
  }
`