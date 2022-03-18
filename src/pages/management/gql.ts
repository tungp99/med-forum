import { gql } from '@apollo/client'

export const GET_MY_POSTS_QUERY = gql`
  query GetMyPosts($accountId: String!, $isPublished: Boolean!, $skip: Int!) {
    posts(
      accountId: $accountId
      where: { and: { isPublished: { eq: $isPublished } } }
      skip: $skip
      take: 8
      order: { createdAt: DESC }
    ) {
      items {
        id
        title
        markdownContent
        isPublished
        commentsCount
        creatorAccount {
          id
          username
        }
        createdAt
        updatedAt
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`

export const GET_ACCOUNTS_QUERY = gql`
  query GetAccounts($skip: Int!, $isPublic: Boolean!, $search: String!) {
    accounts(
      skip: $skip
      take: 8
      where: {
        profile: { isPublic: { eq: $isPublic } }
        and: { email: { contains: $search } }
      }
    ) {
      items {
        id
        email
        username
        profile {
          isPublic
          firstName
          lastName
        }
        isGod
        writtenPostsCount
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
export const GET_ALL_ACCOUNTS_QUERY = gql`
  query GetAllAccounts($skip: Int!, $search: String!) {
    accounts(skip: $skip, take: 8, where: { email: { contains: $search } }) {
      items {
        id
        email
        username
        profile {
          isPublic
          firstName
          lastName
        }
        isGod
        writtenPostsCount
      }
      pageInfo {
        hasNextPage
      }
    }
  }
`
export const DELETE_ACCOUNT_MUTATION = gql`
  mutation DeleteAccount($id: String!) {
    deleteAccount(id: $id) {
      isSuccess
      affectedRecords
    }
  }
`
