import { gql, useQuery, useSubscription } from '@apollo/client'
import { client } from './client'

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

const POST_CREATED_SUBSCRIPTION = gql`
  subscription postCreated {
    postCreated {
      id
      body
    }
  }
`

function getPosts() {
  const { data, loading, error } = useQuery(GET_POSTS)
  console.log('[getPosts]', data)
}

function postCreatedSubscription() {
  useSubscription(POST_CREATED_SUBSCRIPTION, {
    onData: subscriptionData => {
      console.log('[subscriptionData]', subscriptionData)
    },
  })
}

export default function App() {
  // getPosts()
  postCreatedSubscription()

  // const subscriber = client
  //   .subscribe({
  //     query: gql`
  //       subscription postCreated {
  //         postCreated {
  //           id
  //           body
  //         }
  //       }
  //     `,
  //   })
  //   .subscribe(postCreated => {
  //     console.log('[postCreated]', postCreated)
  //   })

  // subscriber.unsubscribe()

  return <></>
}
