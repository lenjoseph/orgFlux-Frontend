import gql from 'graphql-tag'

export const GET_EVENTS = gql `
    query events {
        events {
        _id
        organization
        name
        description
        eventDate
        CreatedAt
        UpdatedAt
    }
  }
`

export const GET_EVENT = gql `
    query event($id: ID!) {
        event(id: $id) {
        _id
        name
        organization
        description
        eventDate
        CreatedAt
        UpdatedAt
        }
    }
`

export const ORG_EVENTS = gql `
    query orgEvents($id: ID!) {
        events(id: $id) {
        _id
        name
        organization
        description
        eventDate
        CreatedAt
        UpdatedAt
        }
    }
`