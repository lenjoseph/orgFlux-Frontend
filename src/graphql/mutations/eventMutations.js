import gql from 'graphql-tag'

export const CREATE_LOCATION = gql `
  mutation createLocation($locationInput: locationInputData!) {
        createLocation(locationInput: {
            organization: $organization,
            name: $name,
            address: $address,
            city: $city
            state: $state
            country: $country
            zip: $zip
        }) {
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

export const CREATE_EVENT = gql `
    mutation createEvent($eventInput: eventInputData!) {
        createEvent(eventInput: {
            organization: $organization,
            name: $name,
            eventDate: $eventDate,
            description: $description
        }) {
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
    mutation updateEvent($id: ID!, $eventInput: eventInputData!) {
        updateEvent(id: $id, eventInput: {
            organization: $organization,
            name: $name,
            eventDate: $eventDate,
            description: $description
        }) {
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

export const DELETE_EVENT = gql `
    mutation deleteEvent($id: ID!) {
        deleteEvent(id: $id) {
            Boolean
        }
    }
`