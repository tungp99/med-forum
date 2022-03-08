import { gql } from '@apollo/client'

export const REGISTRATION_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      account {
        id
        profile {
          firstName
          lastName
        }
      }
      accessToken
      refreshToken
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      account {
        id
        profile {
          firstName
          lastName
        }
      }
      accessToken
      refreshToken
    }
  }
`
