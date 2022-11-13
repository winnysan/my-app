import { gql } from '@apollo/client'

export const CREATE_POST = gql`
  mutation createPost($body: String!) {
    createPost(body: $body) {
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

export const ADD_AVATAR = gql`
  mutation addAvatar($avatar: String!) {
    addAvatar(avatar: $avatar) {
      id
      avatar
    }
  }
`
