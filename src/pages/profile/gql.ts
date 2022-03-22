import { gql } from '@apollo/client'

export const GET_ACCOUNT_QUERY = gql`
  query GetAccount($id: String!) {
    account(id: $id) {
      id
      email
      username
      profile {
        isPublic
        country
        firstName
        lastName
        birthDate
        phoneNumber
        qualifications {
          title
          issuedBy
          issuedAt
          expireAt
        }
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
export const UPDATE_QUALIFICATION_MUTATION = gql`
  mutation updateQualification($input: QualificationInput!) {
    addQualification(input: $input) {
      isSuccess
    }
  }
`
export const ADD_EXPERIENCE_MUTATION = gql`
  mutation AddExperience($input: ProfessionInput!) {
    addExperience(input: $input) {
      isSuccess
      affectedRecords
    }
  }
`

export const ADD_EDUCATION_MUTATION = gql`
  mutation AddEducation($input: ProfessionInput!) {
    addEducation(input: $input) {
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
export const REMOVE_EXPERIENCE_MUTATION = gql`
  mutation RemoveExperience($input: ProfessionInput!) {
    removeExperience(input: $input) {
      isSuccess
    }
  }
`
export const REMOVE_EDUCATION_MUTATION = gql`
  mutation RemoveEducation($input: ProfessionInput!) {
    removeEducation(input: $input) {
      isSuccess
    }
  }
`
export const REMOVE_QUALIFICATION_MUTATION = gql`
  mutation RemoveQualification($input: QualificationInput!) {
    removeQualification(input: $input) {
      isSuccess
    }
  }
`
