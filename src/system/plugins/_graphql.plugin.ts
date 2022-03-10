import { ApolloClient, InMemoryCache } from '@apollo/client'

export const apollo = new ApolloClient({
  uri: process.env.REACT_APP_SERVICE_HOST,
  cache: new InMemoryCache(),
  defaultOptions: {
    watchQuery: { notifyOnNetworkStatusChange: true },
  },
})
