import ApolloClient from 'apollo-boost'

export const apollo = new ApolloClient({
  uri: process.env.REACT_APP_GRAPHQL_HOST,
})
