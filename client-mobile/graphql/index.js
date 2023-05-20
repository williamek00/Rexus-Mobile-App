import {gql} from '@apollo/client'

export const FETCH_PRODUCTS = gql`
    query FetchProducts{
        products {
            id
            name
            slug
            description
            price
        }
    }
`