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

export const UPDATE_EXPERIENCE_MUTATION = gql`
  mutation UpdateExperience($input: ProfessionsInput!) {
    updateExperience(input: $input) {
      isSuccess
      affectedRecords
    }
  }
`

export const UPDATE_EDUCATION_MUTATION = gql`
  mutation UpdateEducation($input: ProfessionsInput!) {
    updateEducation(input: $input) {
      isSuccess
      affectedRecords
    }
  }
`
export const CHANGE_PASSWORD_MUTATION = gql`
  mutation ChangePassword($input: ChangePasswordInput!) {
    changePassword(input: $input) {
      isSuccess
      affectedRecords
    }
  }
`
