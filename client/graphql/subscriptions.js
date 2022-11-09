import { gql } from '@apollo/client'

export const POST_ADDED_SUBSCRIPTION = gql`
  subscription PostAddedSubscription {
    post: postAdded {
      id
      body
      createdAt
    }
  }
`
