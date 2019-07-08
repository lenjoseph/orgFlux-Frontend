import gql from 'graphql-tag'

// passing
export const CREATE_EVENT = gql `
    mutation createEvent($organization: String!, $name: String!, $eventDate: String!, $eventTime: String!, $description: String!) {
        createEvent(
            organization: $organization,
            name: $name,
            eventDate: $eventDate,
            eventTime: $eventTime,
            description: $description
        ) {
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
`

// passing
export const UPDATE_EVENT = gql `
    mutation updateEvent($id: ID!, $organization: String!, $name: String!, $eventDate: String!, $eventTime: String!, $description: String!) {
        updateEvent(
            id: $id,
            organization: $organization,
            name: $name,
            eventDate: $eventDate,
            eventTime: $eventTime,
            description: $description
        ) {
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
`
// passing
export const DELETE_EVENT = gql `
    mutation deleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            name
        }
    }
`