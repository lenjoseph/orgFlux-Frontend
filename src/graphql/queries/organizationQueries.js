import gql from 'graphql-tag'

export const GET_ORGANIZATIONS = gql `
            query organizations {
                organizations {
                    organizations{
                _id
                name
                CreatedAt
                UpdatedAt
            }
        }
    }
`