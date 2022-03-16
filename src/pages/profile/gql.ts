import { gql } from '@apollo/client'

export const GET_ACCOUNT_QUERY = gql`
  query GetAccount($id: String) {
    account(id: $id) {
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
