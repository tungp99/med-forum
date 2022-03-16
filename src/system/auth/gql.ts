import { gql } from '@apollo/client'

export const REFRESH_TOKEN_MUTATION = gql`
  mutation RefreshToken($input: RefreshTokenInput!) {
    refreshAccessToken(input: $input) {
      isSuccess
      accessToken
      refreshToken
    }
  }
`

export const REGISTRATION_MUTATION = gql`
  mutation Register($input: RegisterInput!) {
    register(input: $input) {
      accessToken
      refreshToken
    }
  }
`

export const LOGIN_MUTATION = gql`
  mutation Login($input: LoginInput!) {
    login(input: $input) {
      accessToken
      refreshToken
    }
  }
`
