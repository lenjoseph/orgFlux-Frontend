import gql from 'graphql-tag'

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


export const GET_ORGANIZATIONS = gql `
            query organizations {
                organizations {
                    organizations {
                _id
                name
                CreatedAt
                UpdatedAt
            }
        }
    }
`


export const GET_LOCATION = gql `
    query location($id:ID!) {
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
export const ORG_LOCATIONS = gql `
    query orgLocations($id:ID!) {
        locations(id: $id) {
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