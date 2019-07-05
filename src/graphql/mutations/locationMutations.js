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

export const UPDATE_LOCATION = gql `
    mutation updateLocation($id: ID!, $locationInput: locationInputData!) {
    updateLocation(id: $id, locationInput: {
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

export const DELETE_LOCATION = gql `
    mutation deleteLocation($id: ID!) {
        deleteLocation(id:$id) {
            Boolean
        }
    }
`