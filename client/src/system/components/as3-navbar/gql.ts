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
export const TAKE_ACCOUNTS_QUERY = gql`
  query GetS_Accounts($search: String!) {
    accounts(
      skip: 0
      take: 8
      where: {
        or: [
          { or: { username: { contains: $search } } }
          { or: { profile: { firstName: { contains: $search } } } }
          { or: { profile: { lastName: { contains: $search } } } }
        ]
      }
    ) {
      items {
        id
        username
        profile {
          firstName
          lastName
          avatarUrl
          country
          experience {
            position
            isWorking
          }
          education {
            isWorking
          }
        }
        writtenPostsCount
      }
    }
  }
`
