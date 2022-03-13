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

export const ME_QUERY = gql`
  query GetMe {
    me {
      id
      email
      username
      profile {
        isPublic
        firstName
        lastName
        birthDate
        phoneNumber
        professions {
          organization
          start
          end
          position
          isWorking
        }
        educations {
          organization
          start
          end
          position
          isWorking
        }
      }
      createdAt
      updatedAt
    }
  }
`
