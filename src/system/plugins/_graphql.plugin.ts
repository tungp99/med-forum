import { ApolloClient, HttpLink, InMemoryCache, split } from '@apollo/client'
import { getMainDefinition } from '@apollo/client/utilities'
import { GraphQLWsLink } from '@apollo/client/link/subscriptions'
import { createClient } from 'graphql-ws'

const link = split(
  ({ query }) => {
    const definition = getMainDefinition(query)
    return (
      definition.kind === 'OperationDefinition' &&
      definition.operation === 'subscription'
    )
  },
  new GraphQLWsLink(
    createClient({
      url: `ws://${process.env.REACT_APP_SERVICE_HOST}`,
    })
  ),
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
