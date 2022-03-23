import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { WebSocketLink } from '@apollo/client/link/ws'

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
  new HttpLink({
    uri: `http://${process.env.REACT_APP_SERVICE_HOST}`,
  })
)

export const apollo = new ApolloClient({
  link,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { notifyOnNetworkStatusChange: true },
  },
})
