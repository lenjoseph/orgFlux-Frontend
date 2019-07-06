import gql from 'graphql-tag'

// passing
export const GET_ORGANIZATIONS = gql `
            query organizations {
                organizations {
                    organizations {
                _id
                name
                CreatedAt
                UpdatedAt
            }
        }
    }
`

// passing
export const GET_ORGANIZATION = gql `
    query organization($id: String!) {
        organization(id: $id) {
            name
        }
    }
`