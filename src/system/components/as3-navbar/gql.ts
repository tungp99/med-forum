import { gql } from '@apollo/client'

export const ACCOUNT_LOGGED_IN_SUBSCRIPTION = gql`
  subscription AuthenticationStatistics {
    authenticationStatistics
  }
`

export const ACCOUNT_CREATED_SUBSCRIPTION = gql`
  subscription AccountCreated {
    accountCreated
  }
`
