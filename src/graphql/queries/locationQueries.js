import gql from 'graphql-tag'

export const GET_LOCATIONS = gql `
    query locations {
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
`
export const GET_LOCATION = gql `
    query location(id:ID!) {
        location {
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
export const ORG_LOCATIONS = gql `
    query orgLocations(id:ID!) {
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
`