import { ApolloClient, InMemoryCache } from '@apollo/client'

console.log(process.env.REACT_APP_GRAPHQL_SERVICE)

export const apollo = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_SERVICE,
  cache: new InMemoryCache(),
})
