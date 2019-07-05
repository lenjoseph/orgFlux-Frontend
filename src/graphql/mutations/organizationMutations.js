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