import { gql } from '@apollo/client'

export const GET_MY_POSTS_QUERY = gql`
  query GetMyPosts($accountId: String!, $isPublished: Boolean!, $skip: Int!) {
    posts(
      accountId: $accountId
      where: { isPublished: { eq: $isPublished } }
      order: { createdAt: DESC }
      skip: $skip
      take: 8
    ) {
      items {
        score
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
      where: {
        profile: { isPublic: { eq: $isPublic } }
        and: { email: { contains: $search } }
      }
      skip: $skip
      take: 12
    ) {
      items {
        writtenPostsCount
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
    accounts(skip: $skip, take: 12, where: { email: { contains: $search } }) {
      items {
        writtenPostsCount
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
export const CREATE_ACCOUNT_MUTATION = gql`
  mutation CreateAccount($input: CreateAccountInput!) {
    createAccount(input: $input) {
      id
    }
  }
`
export const GET_POSTS_ADMIN_QUERY = gql`
  query GetPostsAdmin(
    $isPublished: Boolean!
    $skip: Int!
    $timeFilter: DateTime!
  ) {
    posts(
      where: {
        isPublished: { eq: $isPublished }
        and: { createdAt: { gte: $timeFilter } }
      }
      order: { createdAt: DESC }
      skip: $skip
      take: 8
    ) {
      items {
        score
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
export const GET_COLLECTOR_QUERY = gql`
  query GetCollectedPosts($skip: Int!, $collection: [String]!) {
    posts(
      where: { id: { in: $collection } }
      order: { createdAt: DESC }
      skip: $skip
      take: 8
    ) {
      items {
        score
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
