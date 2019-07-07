import gql from 'graphql-tag'

export const CREATE_EVENT = gql `
    mutation createEvent($organization: String!, $name: String!, $eventDate: String!, $description: String!) {
        createEvent(
            organization: $organization,
            name: $name,
            eventDate: $eventDate,
            description: $description
        ) {
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

export const UPDATE_EVENT = gql `
    mutation updateEvent($id: ID!, $organization: String!, $name: String!, $eventDate: String!, $description: String!) {
        updateEvent(
            id: $id,
            organization: $organization,
            name: $name,
            eventDate: $eventDate,
            description: $description
        ) {
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
// passing
export const DELETE_EVENT = gql `
    mutation deleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            name
        }
    }
`