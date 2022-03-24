import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'
import { setContext } from '@apollo/client/link/context'

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem('access_token')
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
    },
  }
})

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  new WebSocketLink({
    uri: `ws://${process.env.REACT_APP_SERVICE_HOST}`,
    options: { reconnect: true },
  }),
  authLink.concat(
    new HttpLink({
      uri: `http://${process.env.REACT_APP_SERVICE_HOST}`,
    })
  )
)

export const apollo = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { notifyOnNetworkStatusChange: true },
  },
})
