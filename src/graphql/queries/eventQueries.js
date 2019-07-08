import gql from 'graphql-tag'

// passing
export const GET_EVENTS = gql `
    query events {
        events{
        events {
        _id
        organization
        name
        description
        eventDate
        eventTime
        CreatedAt
        UpdatedAt
    }
  } 
    }
`

// passing
export const GET_EVENT = gql `
    query event($id: ID!) {
        event(id: $id) {
        _id
        name
        organization
        description
        eventDate
        eventTime
        CreatedAt
        UpdatedAt
        }
    }
`

// passing
export const ORG_EVENTS = gql `
    query orgEvents($id: ID!) {
        orgEvents(id: $id) {
            events{
        _id
        name
        organization
        description
        eventDate
        eventTime
        CreatedAt
        UpdatedAt
        }
    }
    }
`