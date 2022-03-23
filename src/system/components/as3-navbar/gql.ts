import { gql } from '@apollo/client'

export const ACCOUNT_LOGGED_IN_SUBSCRIPTION = gql`
  subscription AccountLoggedIn {
    accountLoggedIn
  }
`

export const ACCOUNT_LOGGED_OUT_SUBSCRIPTION = gql`
  subscription AccountLoggedOut {
    accountLoggedOut
  }
`

export const ACCOUNT_CREATED_SUBSCRIPTION = gql`
  subscription AccountCreated {
    accountCreated
  }
`
