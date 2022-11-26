import { gql, useQuery } from '@apollo/client'

const GET_POSTS = gql`
  query getPosts {
    posts {
      id
      body
      user {
        id
        name
        email
      }
    }
  }
`

function getPosts() {
  const { data, loading, error } = useQuery(GET_POSTS)
  console.log('[getPosts]', data)
}

export default function App() {
  getPosts()

  return <></>
}
