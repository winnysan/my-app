import { gql } from '@apollo/client'

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
      id
      body
    }
  }
`
