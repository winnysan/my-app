import { gql } from '@apollo/client'

export const GET_POSTS = gql`
  query posts {
    posts {
      id
      body
      createdAt
      author {
        id
        name
      }
    }
  }
`
