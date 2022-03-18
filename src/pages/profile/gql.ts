import { gql } from '@apollo/client'

export const GET_ACCOUNT_QUERY = gql`
  query GetAccount($id: String!) {
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
        experience {
          organization
          start
          end
          position
          isWorking
        }
        education {
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

export const UPDATE_PROFILE_CONTACT_MUTATION = gql`
  mutation UpdateProfileContact($input: UpdateAccountInput!) {
    updateAccount(input: $input) {
      isSuccess
      affectedRecords
    }
  }
`
