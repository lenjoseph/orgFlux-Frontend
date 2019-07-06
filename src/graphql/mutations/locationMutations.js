import gql from 'graphql-tag'

// passing
export const CREATE_LOCATION = gql `
  mutation createLocation($organization: String!, $name: String!, $address: String!, $city: String!, $state: String!, $country: String!, $zip: Int) {
        createLocation(
            organization: $organization,
            name: $name,
            address: $address,
            city: $city
            state: $state
            country: $country
            zip: $zip
        ) {
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

export const CREATE_ORGANIZATION = gql `
mutation createOrganization($name: String!) {
    createOrganization(name: $name) {
                _id
                name
                CreatedAt
                UpdatedAt
        }
}
`
// pasing
export const UPDATE_LOCATION = gql `
    mutation updateLocation($id: ID!, $organization: String!, $name: String!, $address: String!, $city: String!, $state: String!, $country: String!, $zip: Int) {
    updateLocation(
        id: $id
        organization: $organization,
        name: $name,
        address: $address,
        city: $city
        state: $state
        country: $country
        zip: $zip
        ) {
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
export const DELETE_LOCATION = gql `
    mutation deleteLocation($id: ID!) {
        deleteLocation(id:$id) {
            name
        }
    }
`