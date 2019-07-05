import gql from 'graphql-tag'

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
export const UPDATE_ORGANIZATION = gql `
    mutation updateOrganization($id: ID!, $name: String!) {
        updateOrganization(id: $id, name: $name) {
            _id
            name
            CreatedAt
            UpdatedAt
        }
    }
`