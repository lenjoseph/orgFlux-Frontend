import gql from 'graphql-tag'

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

export const GET_ORGANIZATION = gql `
    query organization(id: ID!) {
        organization {
            _id
            name
            CreatedAt
            UpdatedAt
        }
    }
`