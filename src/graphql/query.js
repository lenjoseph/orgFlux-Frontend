import gql from 'graphql-tag'

export const GET_EVENTS = gql `
    query events {
        events { events{
        _id
        name
        description
        CreatedAt
        UpdatedAt
        }
    }
  }
`